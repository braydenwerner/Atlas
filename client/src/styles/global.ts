import { createGlobalStyle, css } from 'styled-components'

export default createGlobalStyle`
${() => css`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/opensans/v22/mem5YaGs126MiZpBA-UN_r8OUuhp.woff2)
      format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Gemunu Libre';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/gemunulibre/v1/X7n34bQ6Cfy7jKGXVE_YlqnbEQAFP-PIuTCp05iJDvOBeQ.woff2)
      format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }

  html {
    height: 100%;
    body {
      font-family: Open Sans, sans-serif;
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 0;
    }
  }
`}
`
