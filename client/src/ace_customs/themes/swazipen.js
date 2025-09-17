import ace from "ace-builds/src-noconflict/ace";

ace.define(
   "ace/theme/swazipen",
   ["require", "exports", "module", "ace/lib/dom"],
   function (require, exports, module) {
      exports.isDark = true;
      exports.cssClass = "ace-swazipen";
      exports.cssText = `
    /* VSCode-like base */
    .ace-swazipen {
      background-color: #1e1e1e;
      color: #d4d4d4;
    }

    .ace-swazipen .ace_gutter {
      background: #1e1e1e;
      color: #858585;
      border-right: 1px solid #2a2a2a;
    }

    .ace-swazipen .ace_print-margin {
      width: 1px;
      background: #2a2a2a;
    }

    .ace-swazipen .ace_cursor {
      color: #aeafad;
      border-left: 2px solid #aeafad;
    }

    .ace-swazipen .ace_marker-layer .ace_selection {
      background: #264f78;
    }
    .ace-swazipen .ace_marker-layer .ace_selected-word {
      border: 1px solid #515c6a;
      background: #264f78cc;
    }
    .ace-swazipen.ace_multiselect .ace_selection.ace_start {
      box-shadow: 0 0 3px 0px #1e1e1e;
      border-radius: 2px;
    }

    .ace-swazipen .ace_marker-layer .ace_active-line {
      background: #2a2d2e;
    }
    .ace-swazipen .ace_gutter-active-line {
      background: #23272d;
    }

    .ace-swazipen .ace_marker-layer .ace_bracket {
      margin: -1px 0 0 -1px;
      border: 1px solid #515c6a;
      border-radius: 2px;
    }
    .ace-swazipen .ace_marker-layer .ace_stack {
      background: #ca1243;
    }

    .ace-swazipen .ace_indent-guide {
      border-right: 1px solid #404040 !important;
      background: none !important;
      opacity: 0.35;
    }

    .ace-swazipen .ace_fold {
      background-color: #4ec9b0;
      border-color: #d4d4d4;
    }

    .ace-swazipen .ace_error {
      color: #f44747;
      background-color: #1e1e1e;
      border-bottom: 1px dotted #f44747;
    }
    .ace-swazipen .ace_invalid {
      color: #f44747;
      background-color: #1e1e1e;
      text-decoration: underline wavy #f44747;
    }
    .ace-swazipen .ace_warning {
      color: #ff8800;
      background-color: #1e1e1e;
      border-bottom: 1px dotted #ff8800;
    }

    /* Comments */
    .ace-swazipen .ace_comment {
      color: #6a9955;
      font-style: italic;
    }

    /* Strings */
    .ace-swazipen .ace_string {
      color: #ce9178;
    }

    /* Numbers */
    .ace-swazipen .ace_numeric,
    .ace-swazipen .ace_constant.ace_numeric {
      color: #b5cea8;
    }

    /* Keywords (general) */
    .ace-swazipen .ace_keyword {
      color: #569cd6;
      font-weight: bold;
    }
    
    .ace-swazipen .ace_keyword.operator {
      color: #d4d4d4;
      font-weight: normal;
    }

    /* Special modifiers (unda, thabiti) — light pink */
    .ace-swazipen .ace_keyword.ace_control {
      color: #f19cec;
      font-weight: 100;
    }

    /* SwaziLang special keywords (other storage-like words) */
    .ace-swazipen .ace_storage {
      color: #569cd6; /* light blue for kazi/tabia */
      font-weight: bold;
    }

    /* Keep storage.type explicit too */
    .ace-swazipen .ace_storage.type {
      color: #569cd6;
      font-weight: bold;
    }

    /* Constants (true/false/kweli/sikweli) */
    .ace-swazipen .ace_constant.ace_language {
      color: #c779e8;
      font-style: italic;
    }

    /* Built-in functions */
    .ace-swazipen .ace_support.ace_function {
      color: #dcdcaa;
      font-weight: bold;
    }

    /* Function names */
    .ace-swazipen .ace_entity.ace_name.ace_function,
    .ace-swazipen .ace_function {
      color: #dcdcaa;
    }

    /* Class/struct names */
    .ace-swazipen .ace_entity.ace_name.ace_class {
      color: #4ec9b0;
      font-weight: bold;
    }
    .ace-swazipen .ace_support.ace_class {
      color: #4ec9b0;
    }

    /* Variable identifiers */
    .ace-swazipen .ace_variable {
      color: #9cdcfe;
    }
    .ace-swazipen .ace_variable.language {
      color: #4fc1ff;
    }
    .ace-swazipen .ace_variable.parameter {
      color: #d7ba7d;
    }
    .ace-swazipen .ace_identifier {
      color: #99d6c6;
    }

    /* Operators and punctuation */
    .ace-swazipen .ace_operator,
    .ace-swazipen .ace_punctuation {
      color: #d4d4d4;
    }
    .ace-swazipen .ace_paren,
    .ace-swazipen .ace_bracket {
      color: #d4d4d4;
    }

    /* Object keys (inside objects/dictionaries) */
    .ace-swazipen .ace_variable.ace_property {
      color: #9cdcfe;
    }
    .ace-swazipen .ace_entity.ace_other.ace_attribute-name {
      color: #c8c8c8;
    }

    /* Highlight for constants, static, getters */
    .ace-swazipen .ace_storage.modifier {
      color: #b267e6;
      font-style: italic;
    }
    
    .ace-swazipen .ace_entity.ace_name.ace_function {
      color: #f5deb3; /* wheat/cream */
      font-weight: bold;
    }

    /* Misc */
    .ace-swazipen .ace_markup.ace_heading {
      color: #dcb67a;
    }
    .ace-swazipen .ace_markup.ace_list {
      color: #b5cea8;
    }
    .ace-swazipen .ace_markup.ace_link {
      color: #4ec9b0;
      text-decoration: underline;
    }
    .ace-swazipen .ace_markup.ace_deleted {
      color: #f44747;
      background-color: #ffeaea;
    }
    .ace-swazipen .ace_markup.ace_inserted {
      color: #6a9955;
      background-color: #eaffea;
    }
    .ace-swazipen .ace_markup.ace_changed {
      color: #569cd6;
      background-color: #eaeaff;
    }

    /* Accessibility: selection border */
    .ace-swazipen .ace_selection {
      border-radius: 2px;
      border: 1px solid #264f78;
    }
  `;

      var dom = require("ace/lib/dom");
      dom.importCssString(exports.cssText, exports.cssClass);
   }
);
