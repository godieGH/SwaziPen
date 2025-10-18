// src/stores/settingsStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create(
  persist(
    (set) => ({
      // Appearance settings
      theme: 'swazipen',
      textSize: 'medium',
      nightMode: true,
      
      // Editor settings
      fontSize: 14,
      indentGuides: true,
      lineNumbers: true,
      wordWrap: false,
      tabSize: 4,
      lineHeight: 1.5,
      fontFamily: 'Noto Mono Menlo',
      cursorStyle: 'ace',
      renderWhitespace: 'all',
      
      // Advanced settings
      autoSave: 'afterDelay',
      formatOnSave: false,
      minimap: true,
      scrollBeyondLastLine: true,

      // Actions
      updateSetting: (key, value) => 
        set((state) => ({ [key]: value })),
      
      updateSettings: (settings) => 
        set((state) => ({ ...settings })),
      
      resetSettings: () => 
        set({
          theme: 'swazipen',
          textSize: 'medium',
          nightMode: true,
          fontSize: 14,
          indentGuides: true,
          lineNumbers: true,
          wordWrap: false,
          tabSize: 4,
          lineHeight: 1.5,
          fontFamily: 'Noto Mono Menlo',
          cursorStyle: 'ace',
          renderWhitespace: 'all',
          autoSave: 'afterDelay',
          formatOnSave: false,
          minimap: true,
          scrollBeyondLastLine: true,
        }),
    }),
    {
      name: 'editor-settings', // localStorage key
      partialize: (state) => {
        // Remove action functions from persisted state
        const { updateSetting, updateSettings, resetSettings, ...rest } = state;
        return rest;
      },
    }
  )
);

export default useSettingsStore;