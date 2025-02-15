import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'logo-font' : ['Hanalei Fill', 'system-ui']
      },
      colors: {
        // --------------------------------- BG COLORS ---------------------------------
        'bg-primary': '#000000',
        'bg-primary-opacity': '#000000e8',
        'bg-secondary': '#ffffff',
        'bg-second': '#131313',
        'bg-third': '#111111',
        'bg-input': '#e2e8f0',
        'bg-data': '#282828',
        'bg-meal-title': '#cbd5e1',
        // TEXT COLORS
        'text-primary': '#ffffff',
        'text-secondary': '#000000',
        'text-error': '#e83221',
        'text-error-dark': '#b91c1c',
        'text-more': '#86efac',
        'text-less': '#93c5fd',
        // --------------------------------- BUTTONS COLORS ---------------------------------
        'btn-primary': '#1d4ed8',
        'btn-primary-hover': '#2563eb',
        'btn-exit': '#f87171',
        'btn-exit-hover': '#ef4444',
        'btn-add-active': '#166534',
        'btn-add-hover': '#16a34a',
        'btn-plus': '#22c55e',
        'btn-plus-hover': '#16a34a',
        'btn-minus': '#ef4444',
        'btn-edit': '#3b82f6',
        'btn-edit-hover': '#1d4ed8',
        'btn-delete': '#ef4444',
        'btn-delete-hover': '#991b1b',
        'btn-create': '#166534',
        'btn-cancel': '#991b1b',
        'btn-cancel-hover': '#dc2626',
        // --------------------------------- PRIMARY THEME COLORS ---------------------------------
        'primary-color': '#f8bf58',
        'primary-focus': '#e0a740',
        'primary-disabled': '#756123',
        'primary-active': '#eac174',
        'primary-data': '#90743f',
        // --------------------------------- SHADOW COLORS ---------------------------------
        'shadow-primary': '#000000',
        'shadow-secondary' : '#eac174',
        'shadow-third' : '#ffffff',
        // --------------------------------- ICONS COLORS ---------------------------------
        'icon-delete': '#fca5a5',
        'icon-active': '#4ade80',
        'icon-inactive': '#9ca3af',
        // --------------------------------- BORDERS COLORS ---------------------------------
        'border-primary': '#ffffff',
        'border-secondary': '#000000',
        // --------------------------------- GENDER COLORS ---------------------------------
        'male-color': '#60a5ea',
        'female-color': '#f472b6',
        // --------------------------------- SWITCH COLORS ---------------------------------
        'switch-green': '#05df72',
        'switch-red': '#ff6467',
        // --------------------------------- NOT SAVED COLORS ---------------------------------
        'not-saved': '#64748b',
        'not-saved-hover': '#1e293b',
        // --------------------------------- SAVED COLORS ---------------------------------
        'saved': '#16a34a',
        'saved-hover': '#166534',
        // --------------------------------- SLIDER COLORS ---------------------------------
        'slider-color': '#f8f4f6',
        // --------------------------------- TOAST COLORS ---------------------------------
        'toast-success': '#22c55e',
        'toast-error': '#ef4444',
        // --------------------------------- BARBELL COLORS ---------------------------------
        'barbell-icon': '#22c55e',
        'barbell-no-icon': '#ef4444'
      },
    },
  },
  plugins: [],
};
export default config;
