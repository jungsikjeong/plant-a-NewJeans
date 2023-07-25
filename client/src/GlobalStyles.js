import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset}
    .control-dots{
      display: none;
    }
    a{
        text-decoration: none;
        color: inherit;
    }

    *{
        box-sizing: border-box;
    }

    body{
      position: relative;
      font-family: 'Noto Sans KR', 'sans-serif';
      /* padding-bottom: 100px; */
    }
    ul,li{
      list-style: none;
        padding: 0;
        margin: 0;
    }

    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
    }
    
    input:focus {
      outline: none;
    }

    button {
      border: none;
      background: none;
      padding: 0;  
      outline: none;
      cursor: pointer;
    }


    img{  
      width: 100%;
      height: 100%;
    }

    .header-shadow{
      position: fixed;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.16);
    }
    .header-font-size{
      font-size: 50px;
    }

    .fadeInDropdown{
      visibility:visible;
      animation: fadeInDropdown 0.4s ease;
      animation-fill-mode: forwards;
    }

    .fadeOutDropdown{
      visibility: hidden;      
      animation: fadeOutDropdown 0.4s ease;
      animation-fill-mode: forwards;
    }



    @keyframes fadeInDropdown{
      0% {
        opacity: 0;
        transform: translateY(-80%);
      }
      
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeOutDropdown{
      0% {
        opacity: 1;
        transform: translateY(0);
      }

      100% {
        opacity: 0;
        transform: translateY(-80%);
      }
    }

    @media (max-width: 767px) {
      .hide-button {
        display: none;
      }
    }
`;

export default GlobalStyles;
