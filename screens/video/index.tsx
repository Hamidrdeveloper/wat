import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import { Video } from 'expo-av';
import styled from "styled-components/native";
import Arrow from "../../assets/images/arrow.png";
import React from 'react';
import { ObjectContext } from '../../service/object/Object.context';
import { BASE_URL } from '../../utils/main';
export default function VideoPlay({navigation}) {
  const video = React.useRef(null);
  const secondVideo = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [statusSecondVideo, setStatusSecondVideo] = React.useState({});
  const { objectsDetails, objectIdFc } = React.useContext(ObjectContext);
  const Header = styled.View`
  width: 100%;
  height: 64px;
  left: 0px;
  padding-top:10px;
  flex-direction: row;
  background: #0133aa;
  align-items: center;
  justify-content: center;
`;
const TouchSort = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 20px;
`;
const IconRight = styled.Image`
  width: 24px;
  height: 24px;
  top:5px;
`;
  return (
    <View style={styles.container}>
        <Header>
        <TouchSort
         onPress={()=>{navigation.goBack()}}
        >
          <IconRight  resizeMode="contain" source={Arrow} />
        </TouchSort>
      </Header>
      <Video
        ref={video}
        style={styles.video}
        source={{uri: `${BASE_URL}/api/v1/files/${objectsDetails?.videoGallery[0].id}`}}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        isLooping
        onPlaybackStatusUpdate={setStatus}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
    alignSelf: 'stretch'
  },
  buttons: {
    margin: 16
  }
});
  