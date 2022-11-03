import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import SMSVerifyCode from "react-native-sms-verifycode";
import Icon from "../../assets/images/frame.png";
import IconMessage from "../../assets/images/sms-tracking.png";
import { useFonts } from "expo-font";
import Tick from "../../assets/images/tick.png";
import { AuthContext } from "../../service/register/Auth.context";
import Toast from "../../components/toast";
import {View} from 'react-native'
const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items: center;
`;
const BackViewCode = styled.View`
  width: 100%;
  /* Gray/0 */
  background: #ffffff;
  align-items: center;
  padding: 20px;
`;
const Title = styled.Text`
  width: 310px;
  margin-top: 152px;
  font-style: normal;
  font-size: 40px;
  align-items: center;
  color: #003e77;
  font-family: 'Hurme';
`;
const TitleSmall = styled.Text`
  width: 310px;
  height: 48px;
  margin-top: 10px;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  font-family: "Hurme";

  /* or 150% */
  display: flex;
  align-items: center;

  color: #0133aa;
`;
const ButtonClick = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
 
  gap: 8px;
  width: 310px;
  height: 48px;
  background: #0133aa;
  border-radius: 8px;
`;
const TextButton = styled.Text`
  
  font-style: normal;
  font-size: 18px;

  font-family: "Hurme";

  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #ffffff;

  /* Inside auto layout */
  flex: none;r
  flex-grow: 0;
`;
export const IconSrc = styled.Image`
  width: 20px;
  height: 20px;
`;
const ButtonNextClick = styled.TouchableOpacity`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  width: 310px;
  height: 48px;
 
  border: 1.5px solid #fff;
  border-radius: 8px;
`;
const TextBlue = styled.Text`
  font-style: normal;
  font-size: 15px;
  color: #0133aa;
  font-family: "Hurme";

`;
export const Modal = styled.Modal`
  width: 100%;
  height: 100%;
  border: 1.5px solid #fff;
`;
export  const ViewModalShadow = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;
export  const ViewModal = styled.View`
width: 100%;
height:280px;
border-radius:25px
position:absolute;
bottom:0px;
background-color:#fff;
align-items: center;
`;
export  const TitleModal = styled.Text`
  width: 162px;
  left: 32px;
  top: 44px;
  font-family: "Hurme";
  font-style: normal;
  font-size: 20px;


  /* identical to box height, or 120% */
  display: flex;
  align-items: center;
`;
export  const ImageModal = styled.Image`
  width: 50px;
  height: 50px;
 
`;
const TextInput = styled.TextInput`
  box-sizing: border-box;
  width: 310px;
  height: 40px;
  margin-top: 10px;
  /* White */
  background: #ffffff;
  padding:5px;
  /* Gray/500 */
  border: 1px solid #6783a0;
  font-family: "Hurme";

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const Label = styled.Text`
  width: 310px;
  height: 12px;
  font-style: normal;
  font-size: 12px;
  color: #0133aa;
  font-family: "Hurme";

`;
export  const ViewRow = styled.View`
  flex-direction: row;
  height: 100px;
  width: 100%;
`;
export  const BoxImageModal = styled.TouchableOpacity`
width: 50px;
  height: 50px;
  position: absolute;
  right: 40px;
  top: 30;
  
`;
import { GToastContainer } from 'react-native-gtoast';

export default function CodeScreen({navigation}) {
  const [sendCode, setSendCode] = useState(false);
  const [sendCodeString, setSendCodeString] = useState('93249');
  const [toast, setToast] = useState(true)

  const {codeFc,isRegisterCode,codeText} = useContext(AuthContext)
  useEffect(() => {
    if(isRegisterCode){
      navigation.navigate("Start")

    }
    return ;
  }, [isRegisterCode])
  let [fontsLoaded] = useFonts({
    'hurme': require('../../assets/fonts/Hurme-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <BackView>
        <Title style={{fontFamily:'Hurme'}}>{"Enter code"}</Title>
        <TitleSmall>{"Please enter a received a code."}</TitleSmall>
        <BackViewCode>
          <SpaceH space={25} />
          <View style={{width:`100%`}}>
          <SMSVerifyCode
            verifyCodeLength={5}
            codeViewWidth={55}

            containerPaddingHorizontal={300}
            containerStyle={{width:200}}
            codeFontSize={26}
            coverColor={"#000"}
            codeColor={"#000"}
            focusedCodeViewBackgroundColor={"#000"}
            codeViewBorderColor="#0133aa"
            focusedCodeViewBorderColor="#0000FF"
            codeViewBorderWidth={1}
            codeViewBorderRadius={16}
            onInputChangeText={(e)=>{
              setSendCodeString(e)} }
          />
          </View>
        </BackViewCode>
        <SpaceH space={100} />
        <ButtonClick onPress={() => {
            codeFc(sendCodeString);
          }}>
          <TextButton>{"Submit"}</TextButton>
          <SpaceW space={10}/>
          <IconSrc resizeMode={'contain'} source={Tick} />
        </ButtonClick>
        <ButtonNextClick
          onPress={() => {
            setSendCode(true);
          }}
        >
          <TextBlue>{"Didn’t receive a code?"}</TextBlue>
        </ButtonNextClick>
        <Modal visible={sendCode} transparent>
          <ViewModalShadow>
            <ViewModal>
              <ViewRow>
                <TitleModal>{"Send code again"}</TitleModal>
                <BoxImageModal
                  onPress={() => {
                    setSendCode(false);
                  }}
                >
                <ImageModal source={Icon} />
                </BoxImageModal>
              </ViewRow>
              {/* <Label>{"Enter your Email"}</Label> */}
              {/* <TextInput /> */}
              <SpaceH space={35} />
              <ButtonClick
              onPress={()=>{setToast(true)
              setSendCode(false);}}>
                <TextButton>{"Send code"}</TextButton>
                
                  <IconSrc
                    onPress={() => {
                      setSendCode(false);
                    }}
                    source={IconMessage}
                  />
              </ButtonClick>
            </ViewModal>
          </ViewModalShadow>
        </Modal>
      </BackView>
      {/* <Toast show={'Info'} onBack={()=>{setToast(false)}} text={codeText} onToast={toast}/> */}
      <GToastContainer paddingBottom={30} />

    </>
  );
}
