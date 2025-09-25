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
      var specialKeywords =
        "AINAYA|NINAMBARI|NINENO|NIBOOLEAN|NIKAZI|NILISTI";
      var specialModifiers =
        "unda|thabiti|rudisha|rithi|futa|subiri|tumia|ruhusu|onesha";
      var operationalKeywords = "sawa|sisawa|na|au|si";
      var builtinClasses =
        "Seti|Ramani|Kamusi|Listi|Boolean|Nambari|Neno|Ahadi|Makosa|MakosaYaAina|MakosaYaMrejeo|MakosaYaMpangilio";
      var builtinConstants = "kweli|sikweli";
      var builtinFunctions = "chapisha|andika";

      // Master keyword map (case-sensitive)
      var keywordMapper = this.createKeywordMapper(
        {
          keyword: languageKeywords,
          "keyword.control": specialModifiers + "|" + specialKeywords,
          "keyword.operator": operationalKeywords,
          "variable.language": builtinClasses,
          "constant.language": builtinConstants,
          "support.function": builtinFunctions
        },
        "identifier",
        false
      );

      // Start with the full rule set (we will inject brace-handling for nested template expressions).
      this.$rules = {
        start: [
          // Multi-line comments: enter comment state
          { token: "comment", regex: "\\/\\*", next: "comment" },
          // Single-line comments
          { token: "comment", regex: "\\/\\/.*$" },
          { token: "comment", regex: "#.*$" },

          // Strings (double and single)
          { token: "string", regex: '"', next: "dqs" },
          { token: "string", regex: "'", next: "sqs" },

          // Template literal (backticks) - push-based handling:
          {
            token: "string.quasi.start",
            regex: /`/,
            push: [
              { token: "constant.language.escape", regex: "\\\\." },
              // when we see ${, push the main 'start' so expressions inside are tokenized.
              { token: "paren.quasi.start", regex: /\$\{/, push: "start" },
              // closing backtick -> pop quasi
              { token: "string.quasi.end", regex: /`/, next: "pop" },
              { defaultToken: "string.quasi" }
            ]
          },

          // Numbers
          {
            token: "constant.numeric",
            regex: "\\b\\d+(?:\\.\\d+)?\\b"
          },

          // Declarations / class-like constructs
          {
            token: ["storage.type", "text", "entity.name.class"],
            regex: "(muundo)(\\s+)(" + identifierRe + ")"
          },
          {
            token: ["keyword.control", "text", "entity.name.class"],
            regex: "(rithi)(\\s+)(" + identifierRe + ")"
          },

          // Builtin class usage with paren
          {
            token: ["variable.language", "paren.lparen"],
            regex: "\\b(" + builtinClasses + ")(\\s*\\()"
          },

          { token: "paren.rparen", regex: "\\)" },

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
          // Match end of C-style comment and return to start (detect terminator exactly)
          { token: "comment", regex: ".*?\\*/", next: "start" },
          { defaultToken: "comment" }
        ]
      };

      //
      // Inject brace-handler at the front of the start rules.
      // This is the same safe pattern used by Ace's JS mode:
      // - it recognizes { and } and manipulates the tokenizer stack so that
      //   template expressions pushed by the quasi-rule (via push: "start")
      //   will be properly popped when '}' is seen and the tokenizer returns
      //   to the quasi state.
      //
      // The onMatch implementation below is deliberately careful and closely
      // mirrors the implementation in Ace's JS mode.
      //
      this.$rules.start.unshift({
        regex: "[{}]",
        onMatch: function (val, currentState, stack) {
          // default next state is empty (stay in current)
          this.next = val == "{" ? this.nextState : "";
          if (val == "{") {
            // entering a brace: if there is an existing stack, push current info so we can restore later
            if (stack && stack.length) {
              stack.unshift("start", currentState);
            }
          } else if (val == "}" && stack && stack.length) {
            // leaving a brace-level: pop and restore previous state
            stack.shift();
            this.next = stack.shift();
            // if we restored into a string/quasi-like state, signal that this '}' closed a template expression
            if (this.next && (this.next.indexOf("string") != -1 || this.next.indexOf("jsx") != -1 || this.next.indexOf("quasi") != -1))
              return "paren.quasi.end";
          }
          return val == "{" ? "paren.lparen" : "paren.rparen";
        },
        nextState: "start"
      });

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
      // Ensure stop marker matches closing tokens correctly (*/ for comments)
      this.foldingStopMarker =
        /(\}|\]|^\s*[\:\}]|^\s*\/\/|^\s*#|^\s*\*\/)/;

      // Defensive getFoldWidgetRange to avoid returning invalid ranges.
      this.getFoldWidgetRange = function (session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
          try {
            if (match[1] === "{" || match[1] === "[") {
              return this.openingBracketBlock(session, match[1], row, match.index);
            } else if (match[1] === "/*") {
              return this.commentBlock(session, row, match.index);
            } else {
              return this.indentationBlock(session, row);
            }
          } catch (e) {
            // If a folding helper throws or returns invalid value, avoid breaking ACE
            return null;
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