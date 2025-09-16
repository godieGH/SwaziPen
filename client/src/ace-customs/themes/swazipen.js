import ace from "ace-builds/src-noconflict/ace";

ace.define("ace/theme/swazipen", ["require", "exports", "module", "ace/lib/dom"], function(require, exports, module) {
  exports.isDark = true;
  exports.cssClass = "ace-swazipen";
  exports.cssText = `
    .ace-swazipen {
      background-color: #121216;
      color: #ffffff;
    }
    .ace-swazipen .ace_cursor {
      color: #ffffff;
    }
    .ace-swazipen .ace_marker-layer .ace_selection {
      background: #82c6c2b2;
    }
    .ace-swazipen .ace_marker-layer .ace_active-line {
      background: #252931;
    }
    .ace-swazipen .ace_gutter {
      background: #121216;
      color: #888888;
    }
  `;

  const dom = require("ace/lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});