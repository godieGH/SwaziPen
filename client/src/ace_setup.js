// src/ace-setup.js
import ace from "ace-builds/src-noconflict/ace";

// Themes
import "ace-builds/src-noconflict/theme-monokai"
import "ace-builds/src-noconflict/theme-dracula"
import "ace-builds/src-noconflict/theme-one_dark"
import "ace-builds/src-noconflict/theme-solarized_dark"
import "ace-builds/src-noconflict/theme-solarized_light"
import "ace-builds/src-noconflict/theme-cobalt"
import "ace-builds/src-noconflict/theme-github"
import "ace-builds/src-noconflict/theme-github_dark"

// Programming Languages
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/mode-typescript"
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/mode-java"
import "ace-builds/src-noconflict/mode-c_cpp"
import "ace-builds/src-noconflict/mode-csharp"
import "ace-builds/src-noconflict/mode-php"
import "ace-builds/src-noconflict/mode-ruby"
import "ace-builds/src-noconflict/mode-golang"
import "ace-builds/src-noconflict/mode-rust"
import "ace-builds/src-noconflict/mode-swift"
import "ace-builds/src-noconflict/mode-kotlin"
import "ace-builds/src-noconflict/mode-scala"

// Web Languages
import "ace-builds/src-noconflict/mode-html"
import "ace-builds/src-noconflict/mode-css"
import "ace-builds/src-noconflict/mode-scss"
import "ace-builds/src-noconflict/mode-sass"
import "ace-builds/src-noconflict/mode-less"

// Markup/Config
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/mode-xml"
import "ace-builds/src-noconflict/mode-yaml"
import "ace-builds/src-noconflict/mode-toml"
import "ace-builds/src-noconflict/mode-markdown"

// Shell/Scripts
import "ace-builds/src-noconflict/mode-sh"
import "ace-builds/src-noconflict/mode-batchfile"
import "ace-builds/src-noconflict/mode-powershell"

// Database
import "ace-builds/src-noconflict/mode-sql"

// Other
import "ace-builds/src-noconflict/mode-text"

// Custom modes and themes
import "@ace_customs/modes/swazilang"; 
import "@ace_customs/themes/swazipen"; 

export default ace;