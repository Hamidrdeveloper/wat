//Example of Pinch to Zoom Image in React Native
//https://aboutreact.com/react-native-pinch-to-zoom-image/

//import React in our code
import React from 'react';
import styled from "styled-components/native";
import Arrow from "../../assets/images/arrow.png";

//import all the components we are going to use
import { SafeAreaView, StyleSheet, View } from 'react-native';

//import ImageViewer which will help us to zoom Image
import ImageViewer from 'react-native-image-zoom-viewer';

const FullImage = ({ route, navigation}) => {
    const images = [
        {
          url:
            'https://www.deutschland.de/sites/default/files/styles/crop_page/public/media/image/deutschland-wohnt.jpg?itok=Lgzaqlia',
        },
        {
          url:
            'https://www.howtogermany.com/images/store-invest-ab-rooftop-apartment.jpg',
        },
      ];

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
    <SafeAreaView style={{ flex: 1 }}>
      <Header>
        <TouchSort
         onPress={()=>{navigation.goBack()}}
        >
          <IconRight  resizeMode="contain" source={Arrow} />
        </TouchSort>
      </Header>
      <View style={styles.container}>
        <ImageViewer imageUrls={[ {url:route.params.image}]}  />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
});

export default FullImage;
