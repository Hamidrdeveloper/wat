import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs(()=>{
    
})`
  width: 100%;
  height:100%;
  align-items: center;
  justify-content: center;
`;
export const TextLogo = styled.Text.attrs(()=>{
    
})`
  font-size:18px;
  color:${Colors.light.withe};
  font-family: "Hurme";

  
`;
export const VerLogo = styled.Image.attrs(()=>{
    
})`
width: 23px;
height:15px;
position:absolute;
bottom:10;    
  
`;