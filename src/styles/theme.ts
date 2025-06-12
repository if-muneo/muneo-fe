export const theme = {
  colors: {
    pink: '#FF0084',
    purple: '#8247C5',
    bluePurple: '#4772C5',
    black: '#000000',
    white: '#FFFFFF',
    gray: '#EBEBEB',
  },
  fonts: {
    main: '"Plus Jakarta Sans", "Noto Sans KR", sans-serif',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.12)',
  }
};

export type Theme = typeof theme;
export default theme;
