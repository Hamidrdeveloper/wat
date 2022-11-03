import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import Icon from "../../assets/images/pen.png";
import Arrow from "../../assets/images/arrow.png";
import ImageOne from "../../assets/images/homeOne.png";
import ImageCamera from "../../assets/images/camera.png";
import IconTick from "../../assets/images/tick.png";
import IconDelete from "../../assets/images/fi_trash.png";
import * as ImagePicker from 'expo-image-picker';

import { SpaceH, SpaceW } from "../../components/space";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE ,Marker} from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { Modal } from "react-native";
import frame from "../../assets/images/frame.png";
import { ObjectContext } from "../../service/object/Object.context";
import Delete from "../../assets/images/u_trash.png";
import { BASE_URL } from "../../utils/main";

const BackView = styled.ScrollView`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
`;
const IconRight = styled.Image`
  width: 30px;
  height: 30px;
  top: 5px;
`;
const TouchSortLeft = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 15px;
  top: 30px;
`;
const IconLeft = styled.Image`
  width: 24px;
  height: 24px;
 
`;
const Label = styled.Text`
font-family: "Hurme";
font-style: normal;
font-size: 18px;
padding-left:30px;
padding-right:30px;
top: 5px;
/* identical to box height, or 133% */
display: flex;
align-items: center;
text-align: center;
font-family: "Hurme";

color: #ffffff;
`;

const Header = styled.View`
  width: 100%;
  height: 74px;
  flex-direction: row;
  background: #0133aa;
  align-items: center;
  justify-content: center;
`;
const ImageHome = styled.Image`
  width: 100%;
  height: 220px;
  backgroundColor:
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
const AddressText = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;
  color: #0133aa;
`;
const AddressTextSmall = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 14px;
  color: #0133aa;
`;
const Padding = styled.View`
  padding-left: 25px;
  padding-right: 25px;
`;
const Input = styled.TextInput`
  box-sizing: border-box;

  width: 100%;
  height: 40px;

  /* White */
  background: #ffffff;

  /* Gray/500 */
  border: 1px solid #6783a0;

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  padding: 5px;
  font-family: "Hurme";

`;
const InputSearchBig = styled.TextInput`
  box-sizing: border-box;

  width: 100%;
  height: 114px;

  /* White */
  background: #ffffff;

  /* Gray/500 */
  border: 1px solid #6783a0;
  text-align-vertical: top;
  font-family: "Hurme";

  /* White BTN */
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  padding: 5px;
`;
const LabelTextInput = styled.TextInput`
  width: 100%;

  padding:5px;

  font-family: "Hurme";
  font-style: normal;
  font-size: 12px;
  line-height: 12px;
  font-family: "Hurme";

  /* identical to box height, or 100% */

  color: #0133aa;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const ImageInToAdd = styled.Image`
  width: 40px;
  height: 40px;
`;
const TextIcon = styled.Text`
  width: 60px;

  font-family: "Hurme";
  font-style: normal;
  font-size: 10px;

  /* identical to box height, or 160% */
  display: flex;
  align-items: center;
  text-align: center;

  color: #ffffff;
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
const TextButton = styled.Text`
  font-style: normal;
  font-size: 18px;
  text-align: center;
  color: #ffffff;
  font-family: "Hurme";

`;
const IconSrc = styled.Image`
  width: 20px;
  height: 20px;
`;
const IconSrcDelete = styled.Image`
  width: 15px;
  height: 15px;
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
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 25%;
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
const Click = styled.TouchableOpacity`
  position: absolute;
  right: 25px;
  top: 25px;
  width: 50px;
  height: 50px;
`;
const ImageFrm = styled.Image`
  width: 50px;
  height: 50px;
`;
const ClickDelete = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 48px;

  background: #ff001f;
  border-radius: 8px;
`;
const ClickCancel = styled.TouchableOpacity`
  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 112px;
  height: 48px;
  border: 1.5px solid #445a74;
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
const TextButtonCancel = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;

  /* identical to box height, or 133% */
  text-align: center;

  /* Gray/0 */
  color: #445a74;
`;
const TouchSort = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 20px;
`;
const ImageDelete = styled.Image`
  width: 20px;
  height: 20px;

`;
const ImageDeleteTouch = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  position:absolute;
  top:50px;
  right:15px;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: `100%`,
    height: 200,
  },
});
export default function EditItemPage({navigation}) {
  const [modelVisible, setModelVisible] = useState(false);
  const {objectCreatePutFc,isEditObject,deleteObjectIdFc,objectsDetails,setIsEditObject} = useContext(ObjectContext);
  const [addressBig, setAddressBig] = useState(objectsDetails.address)
  const [multiImage, setMultiImage] = useState([{image:"add"}])
  const [addressSave, setAddressSave] = useState([""])

  const [fullName, setFullName] = useState()
  const  address =objectsDetails.address;
  const [location, setLocation] = useState([1])
  const [markers, setMarkers] = useState()
  const [image, setImage] = useState(null);
  useEffect(() => {
    setFullName(objectsDetails.fullName)
   var addressChange=[];
    objectsDetails.address?.map(res=>{
      addressChange.push(res.address)
    })
    setAddressSave(addressChange)
    setLocation({
      lat:objectsDetails?.location?.lat,
      lng:objectsDetails?.location?.lng,
    })
    let data= [{image:'add'}];
    objectsDetails?.photoGallery.map((value)=>{
      console.log(value.photo);
      data.push({image:{uri:`${BASE_URL}/api/v1/files/${value.photo}`}})
      
    })
    setMultiImage(data)
  }, [])

  useEffect(() => {
    if(isEditObject){
      navigation.goBack();
      setIsEditObject(false)
    }
  
  
  }, [isEditObject])
  
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
    console.log("addressSave",addressBig);
    
  }, [addressBig])
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
      
    }
  
  };
  const ModalFilter = () => {
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
            <TextFilter>Are you sure delete this photo?</TextFilter>
            <SpaceH space={40} />
            <View style={{ flexDirection: "row" }}>
              <ClickCancel
                onPress={() => {
                  setModelVisible(false);
                }}
              >
                <TextButtonCancel>{"No"}</TextButtonCancel>
              </ClickCancel>
              <SpaceW space={15} />
              <ClickDelete
                onPress={() => {
                  deleteObjectIdFc(objectsDetails._id)
                  setModelVisible(false);
                }}
              >
                <TextButtonDelete>{"Delete"}</TextButtonDelete>
                <SpaceW space={15}/>
                <IconSrc source={IconDelete}/>
              </ClickDelete>
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
    console.log("renderInputBig",address);
    
    return (
      <View style={{height:185,width:`100%`}}>
       
       <LabelTextInput>{`Address ${id}`}</LabelTextInput>
        <InputSearchBig placeholder={value?.address} onChangeText={(e)=>
       { 
        let changeAddress =address.map((res,index) =>{ 
          console.log('changeAddress',res);
          
         if(id-1 === index){
          return e
         }else{
          return res.address
         }
        })
        setAddressSave(changeAddress)}}/>
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
  return (
    <>
      <StatusBar hidden />
      <BackView>
        <Header>
        <TouchSort
          onPress={() => {
            objectCreatePutFc(fullName,addressSave,location,image,multiImage)
          }}
        >
          <IconRight resizeMode={"contain"} source={IconTick} />
          </TouchSort>
          <Label numberOfLines={1}>{objectsDetails.fullName}</Label>
           <TouchSortLeft
            onPress={() => {
              navigation.goBack()
            }}>
          <IconLeft resizeMode={"contain"} source={Arrow} />
          </TouchSortLeft>
        </Header>
        <View style={{backgroundColor: "#CBE6FF", width: `100%`,
  height: 220}}>
          {image==null? 
          <ImageHome source={{uri:`${BASE_URL}/api/v1/files/${objectsDetails.symbolPhoto}`}} />
           :
          <ImageHome source={{uri:image?.uri}} />
        }
          <FrameEditImag onPress={()=> pickImage()}>
            <IconSrcDelete source={Icon} />
            <SpaceW space={10} />
            <TextEditImag>{"Edit symbol photo"}</TextEditImag>
          </FrameEditImag>
        </View>

        <Padding>
          <SpaceH space={20} />
          <LabelTextInput>{"Full name *"}</LabelTextInput>

          <Input placeholder={objectsDetails.fullName} onChangeText={(e)=>setFullName(e)} />
          <SpaceH space={20} />
          {addressBig.map((data,index) =>{return renderInputBig(data,index+1)})}
          <SpaceH space={20} />
          <ButtonBoxFilter onPress={()=>{
        
        let value =5;
        setAddressBig([...addressBig,value])
        address.push('1');}}>
            <TextButton>{"Add more address"}</TextButton>
            <IconSrc source={IconTick} />
          </ButtonBoxFilter>
          <SpaceH space={20} />
          <View style={{width:`100%`}}>
          <FlatList
            numColumns={3}
            maxToRenderPerBatch={6}
            data={multiImage}
            renderItem={({ item,index }) => {
              console.log(index);

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
                      pickImageMulti()
                    }}>
                      <ImageInToAdd
                        resizeMode={"contain"}
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
          latitude:markers==null? objectsDetails?.location?.lat:markers?.coordinate?.latitude,
          longitude: markers==null? objectsDetails?.location?.lng:markers?.coordinate?.longitude,
          latitudeDelta: 3,
          longitudeDelta: 4,
        }}
        style={{width:`100%`,height:200}}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
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
          <SpaceH space={100}/>
        </Padding>
        <ModalFilter />
      
      </BackView>
    </>
  );
}
