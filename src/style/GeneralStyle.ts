import styled from '@emotion/styled';

interface IButtonRounded {
  backgroundColor: string;
  padding: string;
  isPositionAbsolute?: Boolean,
  customStyles?: string,
  onClick?(): void,
};

interface IMainTitle {
  fontSize?: string;
};

interface IImageResize {
  width: string,
  height: string,
};

export const ParentContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  position: relative;
  min-height: 100vh;
  background-color: #FFF;
`;

export const MainTitle = styled.p<IMainTitle>`
  font-size: ${props => props.fontSize ? props.fontSize : '30px'} ;
  font-weight: bold;
  margin: 0;
`

export const ButtonRounded = styled.button<IButtonRounded>`
  border-radius: 999px;
  border: none;
  background-color: ${props => props.backgroundColor};
  padding: ${props => props.padding};
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  cursor: pointer;
  
  ${({ isPositionAbsolute }) => isPositionAbsolute &&`
    position: absolute;
    top: 30px;
    left: 30px;
  `}
`

export const ImageResize = styled.img<IImageResize>`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export const InputBase = styled.input`
  width: 100%;
  line-height: 3;
  border: none;
  border-radius: 6px;
  outline: none;
  padding-left: 10px;
`

export const ToastBase = styled.p`
  border-radius: 8px;
  background-color: #000;
  padding: 8px 12px;
  box-shadow: 0px 2px 4px #0000001a;
  position: fixed;
  bottom: 5vh;
  color: #fff;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  z-index: 10;
`
