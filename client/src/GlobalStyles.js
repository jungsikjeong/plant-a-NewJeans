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
    strong{
      font-weight: bold;
    }
    em{
      font-style: oblique;
    }
    .ql-size-small{
      font-size:.75em;
    }
    .ql-size-large{
      font-size:1.5em;
    }
    .ql-size-huge{
      font-size:2.5em;
    }
    

    body{
      margin:0;
      padding:0;
      position: relative;
      font-family: 'Noto Sans KR', 'sans-serif';
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
      /* width: 100%;
      height: 100%; */
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

    /* 스크롤 커스텀 css */
  .scrollable-list::-webkit-scrollbar {
    width: 5px; /* 스크롤 바의 너비 */
    background-color: #f1f1f1; /* 스크롤 바의 배경색 */
    border-radius: 4px; /* 스크롤 바의 모서리 둥글기 */
  }
  .scrollable-list::-webkit-scrollbar-thumb {
    background-color: #888; /* 스크롤 바의 색상 */
    border-radius: 4px; /* 스크롤 바의 모서리 둥글기 */
  }
  .scrollable-list::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* 스크롤 바에 마우스를 올렸을 때의 색상 */
  }

  /* 데이터 없음 */
  .no-data{
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    padding: 10px 24px;
    margin:1rem;
    color:gray;
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

   
`;

export default GlobalStyles;
