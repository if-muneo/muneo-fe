import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    color-scheme: light dark;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html, body, #root {
    width: 100%;
    height: 100%;
  }
  
  body {
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.white};
    color: ${theme.colors.black};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    font-weight: 500;
    color: ${theme.colors.bluePurple};
    transition: color 0.25s;
  }
  
  a:hover {
    color: ${theme.colors.purple};
  }
  
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: ${theme.colors.gray};
    cursor: pointer;
    transition: border-color 0.25s;
  }
  
  button:hover {
    border-color: ${theme.colors.bluePurple};
  }
  
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
  
  input {
    font-family: inherit;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  #root {
    width: 100%;
    margin: 0 auto;   
  }
`;

export default GlobalStyle;
