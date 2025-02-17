// tailwind.config.js
export const content = [
  './src/**/*.html',
  './src/**/*.vue',
  './src/**/*.js',
];
export const darkMode = 'class';
export const theme = {
  extend: {
    fontFamily: {
      body: ['DM Sans', 'san-serif']
    },
    colors: {
      primary: ' #1ed760',
      secondary: '#6f5cf1'
    },
    minHeight: {
      '1/2': '50%'
    }
  }
};
export const variants = {
  extend: {}
};
export const plugins = [];
