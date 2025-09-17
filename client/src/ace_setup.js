// src/ace-setup.js
import ace from "ace-builds/src-noconflict/ace";

// Register your custom mode & theme so they exist before editor mounts
import "@ace_customs/modes/swazilang"; // your mode file (in src)
import "@ace_customs/themes/swazipen"; // your theme file (in src)