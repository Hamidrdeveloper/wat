import React, { useContext, useState } from "react";
import RightIcon from "../../assets/images/setting.png";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Profile from "../../assets/images/profile.png";
import Pen from "../../assets/images/pen.png";
import * as ImagePicker from 'expo-image-picker';
import Arrow from "../../assets/images/arrow.png";

import { SpaceH, SpaceW } from "../../components/space";
import { Dimensions } from "react-native";
import { ProfileContext } from "../../service/profile/Profile.context";
import { BASE_URL } from "../../utils/main";
const hight = Dimensions.get('screen').height;
const Padding = styled(View)`
  padding: 24px;
  height:${hight-130};
`;

const ViewRow = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items:center;
  justify-content: center;
`;

const BackView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  /* Gray/0 */
  background: #ffffff;
`;
const Header = styled.View`
  width: 100%;
  height: 64px;
  left: 0px;
  flex-direction: row;
  background: #0133aa;
  align-items: center;
  justify-content: center;
`;
const Label = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;
  top:10px;

  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;
const TouchSort = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 20px;
`;
const IconRight = styled.Image`
  width: 24px;
  height: 24px;
`;
const ImageProfile = styled.Image`
  box-sizing: border-box;

  width: 110px;
  height: 110px;
  border: 2px solid #ffffff;
  filter: drop-shadow(0px 2px 7px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  align-self:center;
`;
const ImagePen = styled.Image`
  box-sizing: border-box;
  width: 18px;
  height: 18px;
`;
const TextName = styled.Text`
  height: 24px;

  font-family: "Hurme";
  font-style: normal;
  
  font-size: 18px;
  display: flex;
  align-items: center;

  color: #003e77;
`;
const TextNameSmall = styled.Text`
  height: 24px;

  font-family: "Hurme";
  font-style: normal;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: #003e77;
`;
const ViewButton = styled.View`
  box-sizing: border-box;
  align-items: flex-start;
  right: 0;
  top:90;
  position: absolute;
  width: 32px;
  height: 32px;
  background: #0133aa;
  border: 1px solid #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  align-items: center;
  justify-content: center;

`;
const FrameImage = styled.View`
  width: 32px;
  height: 32px;

  background: rgba(206, 217, 245, 0.24);
  border-radius: 8px;
`;
const TextNameTools = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  
  font-size: 15px;
  color: #003e77;
`;
const LabelEdit = styled.Text`
  width: 310px;

  font-style: normal;
  font-size: 12px;
  color: #0133aa;
  font-family: "Hurme";

`;
const TextInput = styled.TextInput`
  box-sizing: border-box;
  width: 310px;
  height: 40px;
  padding:5px;
  margin-top: 10px;
  /* White */
  background: #ffffff;
  font-family: "Hurme";

  /* Gray/500 */
  border: 1px solid #6783a0;

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const ButtonNextClick = styled.TouchableOpacity`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  position: absolute;
  bottom:0;
  left:24;
  width: 310px;
  height: 48px;
  background:#0133aa;
  border: 1.5px solid #0133aa;
  border-radius: 8px;
`;
const TextBlue = styled.Text`
  font-style: normal;
  font-size: 15px;
  color: #fff;
  font-family: "Hurme";

`;
const LabelRequer = styled.Text`
  width: 310px;
  font-style: normal;
  font-family: "Hurme";

  font-size: 10px;
  color: red;
`;
const TouchEdit = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 30px;
`;
const IconLeft = styled.Image`
  width: 24px;
  height: 24px;

`;
export default function EditProfileScreen({navigation}) {
  const {userProfileFc,userAvatarFc,profile} = useContext(ProfileContext);
  const [image, setImage] = useState(null);

  const [fullName, setFullName] = useState(profile?.fullName)

  const [phoneNumber, setPhoneNumber] = useState(profile?.phoneNumber)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
  
    if (!result.cancelled) {
      setImage(result.uri);
      userAvatarFc(result)
    }
  
  };
  return (
    <BackView>
      <Header>
     
        <Label>{"Edite Profile"}</Label>
        <TouchEdit
          onPress={()=>{navigation.goBack()}}>
          <IconLeft resizeMode={"contain"} source={Arrow} />
          </TouchEdit>
      </Header>
      <Padding>
        <ViewRow onPress={()=>pickImage()}>
          <ImageProfile source={{uri:image==null?`${BASE_URL}/api/v1/files/${profile.avatar}`:
        image}} />
          <SpaceW space={15} />
          <ViewButton>
            <ImagePen source={Pen} />
          </ViewButton>
        </ViewRow>
        <SpaceH space={40} />
        <LabelEdit>{"First Name"}</LabelEdit>
        <TextInput placeholder={profile.fullName} onChangeText={(e)=>{setFullName(e)}}/>
        <SpaceH space={15} />
        <LabelEdit>{"Email"}</LabelEdit>
        <TextInput placeholder={profile.email} />
        <SpaceH space={15} />
        <LabelEdit>{"Phone Number"}</LabelEdit>
        <TextInput placeholder={profile.phoneNumber==null?"+1234567891":profile.phoneNumber} onChangeText={(e)=>{setPhoneNumber(e)}} />
        <SpaceH space={5}/>
        <LabelRequer>{"Your phone number must be +05318487275"}</LabelRequer>
        <SpaceH space={40} />
        <ButtonNextClick onPress={()=>{userProfileFc(fullName,phoneNumber)
        navigation.goBack()}}>
          <TextBlue>{"Done"}</TextBlue>
        </ButtonNextClick>
      </Padding>
      <StatusBar hidden />
    </BackView>
  );
}
