import ace from "ace-builds/src-noconflict/ace";

// Ace mode for SwaziLang (.ls, .swz)
ace.define(
   "ace/mode/swazilang_highlight_rules",
   [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/mode/text_highlight_rules"
   ],
   function (require, exports, module) {
      "use strict";
      var oop = require("ace/lib/oop");
      var TextHighlightRules =
         require("ace/mode/text_highlight_rules").TextHighlightRules;

      // Main identifier regex
      var identifierRe = "[a-zA-Z_][a-zA-Z0-9_]*";

      var SwaziLangHighlightRules = function () {
         // Language keywords
         var languageKeywords =
            "data|kazi|tabia|kama|vinginevyo|kwa|wakati|fanya|muundo|rithi|kutoka|jaribu|kamata|kisha";
         // kept other special words but removed unda/thabiti from here
         var specialKeywords = "AINAYA|NINAMBARI|NINENO|NIBOOLEAN|NIKAZI|NILISTI";
         // new group: put unda and thabiti here so they get their own color/token
         var specialModifiers =
            "unda|thabiti|rudisha|rithi|futa|subiri|tumia|ruhusu|onesha";
         var operationalKeywords = "sawa|sisawa|na|au|si";
         var builtinClasses =
            "Seti|Ramani|Kamusi|Listi|Boolean|Nambari|Neno|Ahadi|Makosa|MakosaYaAina|MakosaYaMrejeo|MakosaYaMpangilio";
         var builtinConstants = "kweli|sikweli";
         var builtinFunctions = "chapisha|andika";
         // Master keyword map
         var keywordMapper = this.createKeywordMapper(
            {
               keyword: languageKeywords,
               // map unda/thabiti to a different token so themes will color them differently
               "keyword.control": specialModifiers + "|" + specialKeywords,
               "keyword.operator": operationalKeywords,
               "variable.language": builtinClasses,
               "constant.language": builtinConstants,
               "support.function": builtinFunctions
            },
            "identifier",
            false // <-- make keyword mapping CASE-SENSITIVE (was true)
         );

         // Main rules
         this.$rules = {
            start: [
               // Multi-line comments
               { token: "comment", regex: "\\/\\*", next: "comment" },
               // Single-line comments
               { token: "comment", regex: "\\/\\/.*$" },
               { token: "comment", regex: "#.*$" },
               // Strings
               { token: "string", regex: '"', next: "dqs" },
               { token: "string", regex: "'", next: "sqs" },
               // Numbers
               { token: "constant.numeric", regex: "\\b\\d+(?:\\.\\d+)?\\b" },
               {
                  token: ["storage.type", "text", "entity.name.class"],
                  regex: "(muundo)(\\s+)(" + identifierRe + ")"
               },
               {
                  token: ["keyword.control", "text", "entity.name.class"],
                  regex: "(rithi)(\\s+)(" + identifierRe + ")"
               },
               {
                  token: ["variable.language", "paren.lparen"],
                  regex: "\\b(" + builtinClasses + ")(\\s*\\()"
               },
               {
                  token: "paren.rparen",
                  regex: "\\)"
               },
               // Function calls: identifier followed by (
               {
                  token: ["entity.name.function", "text", "paren.lparen"],
                  regex: "(" + identifierRe + ")(\\s*)(\\()"
               },
               // Keywords, operators, identifiers
               {
                  token: keywordMapper,
                  regex: "\\b" + identifierRe + "\\b"
               },
               // Operators
               {
                  token: "keyword.operator",
                  regex: "\\?|:|\\+|\\-|\\*\\*|\\*|\\/|%|&&|\\|\\||==|!=|<=|>=|<|>|=|\\b(sawa|sisawa|na|au|si)\\b"
               },
               // Ternary
               { token: "keyword.operator", regex: "\\?" },
               // Brackets/parens/braces
               { token: "paren.lparen", regex: "[\\[\\(\\{]" },
               { token: "paren.rparen", regex: "[\\]\\)\\}]" },
               // Object/array keys (inside objects)
               {
                  token: "variable",
                  regex: '"' + identifierRe + '":'
               },
               // Punctuation
               { token: "punctuation.operator", regex: "[,;\\.]" },
               // Whitespace
               { token: "text", regex: "\\s+" }
            ],
            // Double quoted string
            dqs: [
               { token: "constant.language.escape", regex: "\\\\." },
               { token: "string", regex: '"', next: "start" },
               { defaultToken: "string" }
            ],
            // Single quoted string
            sqs: [
               { token: "constant.language.escape", regex: "\\\\." },
               { token: "string", regex: "'", next: "start" },
               { defaultToken: "string" }
            ],
            // Multi-line comment state
            comment: [
               { token: "comment", regex: ".*?\\*/", next: "start" },
               { defaultToken: "comment" }
            ]
         };

         this.normalizeRules();
      };

      oop.inherits(SwaziLangHighlightRules, TextHighlightRules);

      exports.SwaziLangHighlightRules = SwaziLangHighlightRules;
   }
);

ace.define(
   "ace/mode/folding/swazilang",
   [
      "require",
      "exports",
      "ace/lib/oop",
      "ace/range",
      "ace/mode/folding/fold_mode"
   ],
   function (require, exports) {
      "use strict";
      var oop = require("ace/lib/oop");
      var Range = require("ace/range").Range;
      var BaseFoldMode = require("ace/mode/folding/fold_mode").FoldMode;

      var FoldMode = (exports.FoldMode = function () {});
      oop.inherits(FoldMode, BaseFoldMode);

      (function () {
         // Folding: C-style curly, Python-style indent, multi-line comments
         this.foldingStartMarker =
            /(\{|\[|\/\*)|(^\s*(kazi|tabia|kama|vinginevyo|kwa|wakati|fanya)\b[^\{\:]*(\:|$))/;
         this.foldingStopMarker = /(\}|\]|^\s*[\:\}]|^\s*\/\/|^\s*#|^\s*\/\*)/;

         this.getFoldWidgetRange = function (session, foldStyle, row) {
            var line = session.getLine(row);
            var match = line.match(this.foldingStartMarker);
            if (match) {
               if (match[1] === "{" || match[1] === "[") {
                  return this.openingBracketBlock(
                     session,
                     match[1],
                     row,
                     match.index
                  );
               } else if (match[1] === "/*") {
                  return this.commentBlock(session, row, match.index);
               } else {
                  // Pythonic indented block
                  return this.indentationBlock(session, row);
               }
            }
            return null;
         };
      }).call(FoldMode.prototype);
   }
);

ace.define(
   "ace/mode/swazilang",
   [
      "require",
      "exports",
      "ace/lib/oop",
      "ace/mode/text",
      "ace/mode/swazilang_highlight_rules",
      "ace/mode/folding/swazilang"
   ],
   function (require, exports) {
      "use strict";
      var oop = require("ace/lib/oop");
      var TextMode = require("ace/mode/text").Mode;
      var SwaziLangHighlightRules =
         require("ace/mode/swazilang_highlight_rules").SwaziLangHighlightRules;
      var FoldMode = require("ace/mode/folding/swazilang").FoldMode;

      var Mode = function () {
         this.HighlightRules = SwaziLangHighlightRules;
         this.foldingRules = new FoldMode();
         this.$behaviour = this.$defaultBehaviour;
         this.lineCommentStart = ["//", "#"];
         this.blockComment = { start: "/*", end: "*/" };
      };
      oop.inherits(Mode, TextMode);

      
      (function () {
         this.$id = "ace/mode/swazilang";
         this.snippetFileId = "ace/snippets/swazilang";
      }).call(Mode.prototype);

      exports.Mode = Mode;
   }
);
