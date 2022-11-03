import React, { useContext, useEffect, useState } from 'react'
import {Image, Modal,View,Text, Dimensions, FlatList, TouchableOpacity} from 'react-native'
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import RightIcon from "../../../assets/images/setting.png";
import FrameImageSrc from "../../../assets/images/freamImage.png";
import { SpaceH, SpaceW } from '../../../components/space';
import IconTick from "../../../assets/images/tick.png";
import ImageOne from "../../../assets/images/homeOne.png";
import IconDelete from "../../../assets/images/fi_trash.png";
import ImageCamera from "../../../assets/images/camera.png";
import ButtonOne from "../../../assets/images/gallery.png";
import ButtonTwo from "../../../assets/images/pickir.png";
import Delete from "../../../assets/images/u_trash.png";

import MapView,{Marker} from 'react-native-maps';
import frame from "../../../assets/images/frame.png";
import { ObjectContext } from '../../../service/object/Object.context';
import * as ImagePicker from 'expo-image-picker';
import Toast from '../../../components/toast';
const BackView = styled.ScrollView`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  opacity:0.9;
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

  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
`;
const ImageInToAdd = styled.Image`
  width: 40px;
  height: 40px;
`;
const TextIcon = styled.Text`
  width: 100px;


  font-family: "Hurme";
  font-style: normal;
  
  font-size: 10px;

  /* identical to box height, or 160% */
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
const InputSearch = styled.TextInput`
box-sizing: border-box;
width: 100%;
height: 40px;

padding:5px;

/* White */
background: #FFFFFF;
/* Gray/200 */
border: 1px solid #AEC1DA;
font-family: "Hurme";

border-radius: 8px;
`;
const InputSearchBig = styled.TextInput`
box-sizing: border-box;
width: 100%;
height: 150px;
padding:5px;
/* White */
background: #FFFFFF;
/* Gray/200 */
border: 1px solid #AEC1DA;
border-radius: 8px;
font-family: "Hurme";
text-align-vertical: top;
`;


const Padding = styled(View)`
  padding: 24px;
  align-items: center;
`;
const ViewImage = styled(TouchableOpacity)`

width:100%;
height: 194px;
background: #CBE6FF;
align-items: center;
justify-content: center;
`;
const FrameImage = styled(Image)`
width: 72px;
height: 72px;
`;
const TextImage = styled(Text)`
align-items: center;
text-align: center;
font-size: 14px;
color: #0133AA;
`;
const LabelTextInput = styled.Text`
  width: 100%;
  font-family: "Hurme";

  
  font-size: 12px;
  color: #0133aa;
`;
const ButtonBoxFilter = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  width: 100%;
  height: 48px;
  background: #0133aa;
  border-radius: 8px;
`;
const IconSrc = styled.Image`
  width: 20px;
  height: 20px;
`;
const TextButton = styled.Text`

  font-style: normal;
  font-family: "Hurme";

  font-size: 18px;
  text-align: center;
  color: #ffffff;
`;
const FrameDelete = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 4px;
  top: 4px;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`;
const FrameEditImag = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 10px;

  position: absolute;
  width: 161px;
  height: 32px;
  left: 16px;
  top: 16px;

  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  border-radius: 6px;
`;
const TextEditImag = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  
  font-size: 13px;

  /* identical to box height, or 123% */
  text-align: center;

  color: #ffffff;

  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.25);
`;
const IconSrcDelete = styled.Image`
  width: 15px;
  height: 15px;
`;
const ImageItem = styled.Image`
  width: ${(Dimensions.get("window").width - 60) / 3};
  height: 98px;
  border-radius: 6px;
`;
const ImageAdd = styled.TouchableOpacity`
  width: ${(Dimensions.get("window").width - 60) / 3};
  height: 98px;
  border-radius: 6px;
  background: #0133aa;
  align-items: center;
  padding-top: 10;
`;
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 30%;
  margin-top: auto;
  padding-left: 25;
`;
const TextFilter = styled.Text`

  font-family: "Hurme";
  font-style: normal;
  
  font-size: 20px;

  /* identical to box height, or 120% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
const TextFilterCheckBox = styled.Text`
  height: 24px;
  font-family: "Hurme";
  font-style: normal;
  
  font-size:17px;

  /* identical to box height, or 120% */
  display: flex;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
const Click = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 25px;
  width: 50px;
  height: 50px;
`;
const ClickDelete = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 360px;
  height: 48px;

  background:#0133aa;
  border-radius: 8px;
`;
const TextButtonDelete = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  
  font-size: 18px;

  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #ffffff;
`;
const ImageFrm = styled.Image`
  width: 50px;
  height: 50px;
`;
const ImageButton = styled.Image`
  width: 92%;
  height: 50px;
`;
const ImageDelete = styled.Image`
  width: 20px;
  height: 20px;

`;
const ImageDeleteTouch = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  position:absolute;
  top:40px;
  right:15px;
`;

export default function AddOnMapScreen({navigation}) { 
  const {objectTemplateFc,objectCreateFc,isAddObject,setIsAddObject} = useContext(ObjectContext);
  const [fullName, setFullName] = useState(null)
  const [addressBig, setAddressBig] = useState([1])
  const [location, setLocation] = useState([1])
  const [addressSave, setAddressSave] = useState([""])
  const [multiImage, setMultiImage] = useState([{image:"add"}])
  const [typeButtom, setTypeButtom] = useState('')

  
  let address =[""];
  const [markers, setMarkers] = useState()
  const [image, setImage] = useState(null);
  const [modelVisible, setModelVisible] = useState(false);

  const [toast, setToast] = useState(false)
  useEffect(() => {
    if(isAddObject){
      navigation.navigate("TabOne")
      setIsAddObject(false)
    }
   
  }, [isAddObject])
useEffect(() => {
  objectTemplateFc();
 
}, [])
useEffect(() => {
  console.log('====================================');
  console.log('addressSave',addressSave);
  console.log('====================================');
 
}, [addressSave])
function onMapPress(e) {
  let id =1;
  setMarkers({
        coordinate: e?.nativeEvent?.coordinate,
        key: id++,
        color: "red",
    });
     setLocation({
      lat:e?.nativeEvent?.coordinate.latitude,
      lng:e?.nativeEvent?.coordinate.longitude,
    })
 
// SaveAddress=()=>{
//  console.log(JSON.stringify(this.state.markers[0].coordinate.latitude))
// }
}
useEffect(() => {
  console.log(multiImage);
  setTypeButtom([]);
}, [multiImage])
const pickImageMulti = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    let value =multiImage;
    setMultiImage([...multiImage,{image:result}]);
    
    setModelVisible(false);
  }
}
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result);
    setModelVisible(false);
    
  }

};
const pickImageCameraMulti  = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setMultiImage([...multiImage,{image:result}]);
    setModelVisible(false);
  }

};
const pickImageCamera = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result);
    setModelVisible(false);
    
  }

};
const ModalPicker = () => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modelVisible}
      onRequestClose={() => {
        setModelVisible(false);
      }}
    >
      <Shadow>
        <PopUp>
          <SpaceH space={35} />
          <TextFilter>Upload photo</TextFilter>
          <SpaceH space={40} />
          <View>
            <TouchableOpacity onPress={()=>{typeButtom!="multi"?pickImage():pickImageMulti()}}>
            <ImageButton resizeMode={'contain'} source={ButtonOne}/>
            </TouchableOpacity>
            <SpaceH space={10} />
            <TouchableOpacity onPress={()=>{typeButtom!="multi"?pickImageCamera():pickImageCameraMulti()}}>
            <ImageButton  resizeMode={'contain'} source={ButtonTwo}/>
            </TouchableOpacity>
          </View>

          <Click
            onPress={() => {
              setModelVisible(false);
            }}
          >
            <ImageFrm source={frame} />
          </Click>
        </PopUp>
      </Shadow>
    </Modal>
  );
};
const renderInputBig = (value,id)=>{
  console.log('renderInputBig',addressBig);
  
  return (
    <View style={{height:185,width:`100%`}}>
     
     <LabelTextInput>{`Address ${id}`}</LabelTextInput>
     <SpaceH space={15}/>
      <InputSearchBig onChangeText={(e)=>{
         let changeAddress =addressBig.map((res,index) =>{ 
          console.log('changeAddress',res);
          
         if(id-1 === index){
          return e
         }else{
          return addressSave[index];
         }
        })
        setAddressSave(changeAddress);
        }}/>
      <SpaceH space={15}/>
      {id!=1?
      <ImageDeleteTouch onPress={()=>{
        let data=  addressBig.filter((va)=> {
          return va !== value;
        });
        setAddressBig(data);
      }}>
      <ImageDelete source={Delete}/>
      </ImageDeleteTouch>
      :
      null}
         <SpaceH space={15}/>
    </View>
  )
}
return(
    <>
    <BackView>
    <StatusBar hidden />

    <Header>
        <Label>{"Add an object"}</Label>
        <TouchSort
          onPress={() => {
            console.log("TouchSort",address[0].length);
            
            if(fullName==null||addressSave[0]==null||location.lat==null){
              setToast(true)
            }else{
              objectCreateFc(fullName,addressSave,location,image,multiImage)
           
            }
          }}
        >
          <IconRight source={IconTick} />
        </TouchSort>
      </Header>
      <ViewImage onPress={()=>{
        setTypeButtom("e")
        setModelVisible(true)}}>
        {image!=null? 
        <Image style={{width:`100%`,height:`100%`}} source={{ uri: image?.uri }}/>
        :
        <>
        <FrameImage source={FrameImageSrc}/>
        <SpaceH space={15}/>
        <TextImage>{"Add a symbol photo"}</TextImage>
        </>
      }
      </ViewImage>
     <Padding>
     <LabelTextInput>{"Full name *"}</LabelTextInput>
     <SpaceH space={15}/>
      <InputSearch onChangeText={(e)=>setFullName(e)}/>
      <SpaceH space={15}/>
      {addressBig.map((data,index) =>{return renderInputBig(data,index+1)})}
      <SpaceH space={15}/>
      <ButtonBoxFilter onPress={()=>{
        address.push('1');
        let value =addressBig.length+1;
        setAddressBig([...addressBig,value])}}>
            <TextButton>{"Add more address"}</TextButton>
            <IconSrc source={IconTick} />
          </ButtonBoxFilter>
          <SpaceH space={20} />
          <View style={{width:`100%`}}>
          <FlatList
            numColumns={3}
            maxToRenderPerBatch={6}
            data={multiImage.reverse()}
            renderItem={({ item,index }) => {
              console.log(index+""+multiImage.length );

              return (
                <>
                  {index != multiImage.length-1 ? (
                    <View
                      style={{
                        width: (Dimensions.get("window").width - 50) / 3,
                        height: 105,
                      }}
                    >
                      <ImageItem source={{ uri: item.image.uri }} />
                      <FrameDelete
                        onPress={() => {
                          setModelVisible(true);
                        }}
                      >
                        <IconSrcDelete source={IconDelete} />
                      </FrameDelete>
                    </View>
                  ) : (
                    <ImageAdd onPress={()=>{
                      setTypeButtom("multi")

                      setModelVisible(true)
                    }}>
                      <ImageInToAdd
                        resizeMode={"center"}
                        source={ImageCamera}
                      />
                      <SpaceH space={15} />
                      <TextIcon>{"Add photo"}</TextIcon>
                    </ImageAdd>
                  )}
                </>
              );
            }}
          />
          <SpaceH space={15}/>
          </View>
               <MapView
        region={{
          latitude:markers!=null? markers?.coordinate?.latitude:48.4157770609369,
          longitude: markers!=null? markers?.coordinate?.longitude:11.455684032129676,
          latitudeDelta: 3,
          longitudeDelta: 4,
        }}
        style={{width:`100%`,height:200}}
        showsUserLocation
        onPress={e => onMapPress(e)}
      >
        {markers!=null?
          <Marker
        key={markers?.key}
        coordinate={markers?.coordinate}
        pinColor={markers?.color}
      >
         
      </Marker>
      :null}
          </MapView>
      </Padding>
      <ModalPicker/>
      <Toast show={'error'} onBack={()=>{setToast(false)}} text={"All fields must be filled"} onToast={toast}/>
    </BackView>
    </>
)
}