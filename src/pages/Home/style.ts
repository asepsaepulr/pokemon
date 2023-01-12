import styled from 'styled-components';
import media from 'styled-media-query';
import background from "../../assets/image/bg.jpg";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 30px 80px;
  
  > h1 {
    font-weight: bold;
    font-size: 50px;

    color: ${({ theme }) => theme.colors.text.black};
  }

  > svg {
    position: fixed;
    left: 0;
    right: 0;
    margin: 0 auto;

    z-index: -1;
    height: 100vh;
    width: auto;

    path {
      fill: rgba(0, 0, 0, 0.03);
    }
  }

  button {
    font-size: 20px;

    width: 20%;
    height: 50px;
    background: #FBAD48;
    margin: 30px 20px 30px 30px;
    text-align: center;

    outline: 0;
    border: 0;
    border-radius: 4px;
    opacity: 0.8;

    transition: all linear 0.2s;

    &:hover {
      opacity: 2;
      cursor: pointer;
    }
  }

  button.mypokemon {
    position: fixed;
    top: 1vw;
    right: 1vw;
  
    width: 200px;
    height: 40px;
    border-radius: 10px;
    border: 2;
    //background-color: transparent;
    border-color: #F1BC78;
    color: #FFFFFF;
    &:hover {
      opacity: 1;
      cursor: pointer;
      background-color: #FF7C00;
    }
  }

  ${media.lessThan('large')`
    padding: 10px;
  `};
`;

export const Background = styled.div`
background: url(${background});
// filter: blur(8px);
// -webkit-filter: blur(8px);
height: 100%;
width: 100%; 
background-position: center;
background-repeat: no-repeat;
background-size: cover;
`;
export const Pokemons = styled.div`
  flex: 1;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;

  ${media.lessThan('huge')`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${media.lessThan('large')`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 50px;
  `};
`;
