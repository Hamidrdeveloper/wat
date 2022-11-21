import "react-native-gesture-handler";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  PROVIDER_GOOGLE,
  Callout,
  Marker,
  MAP_TYPES,
  Polygon,
  Geojson,
  Polyline,
} from "react-native-maps";
import MapView from "react-native-map-clustering";
import http from "../../utils/http-common";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  PermissionsAndroid,
  Pressable,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import {
  Svg,
  Image as ImageSvg,
  Defs,
  ClipPath,
  Circle,
  Rect,
} from "react-native-svg";
import Mark from "../../assets/images/markT.png";
import Home from "../../assets/images/homeOne.png";
import WebView from "react-native-webview";
import { SpaceH, SpaceW } from "../../components/space";
import styled from "styled-components/native";
import * as Location from "expo-location";
import frame from "../../assets/images/frame.png";
import filterIcon from "../../assets/images/filterIcon.png";
import searchIcon from "../../assets/images/search_normal.png";
import addMap from "../../assets/images/addMap.png";
import findMe from "../../assets/images/findMe.png";
import nullImage from "../../assets/images/nullImage.png";
import AppLoading from "expo-app-loading";

import MapSearching from "./searchOnMap";
import { MapContext } from "../../service/map/Map.context";
import Navigation from "../../navigation";
import { ProfileContext } from "../../service/profile/Profile.context";
import { ObjectContext } from "../../service/object/Object.context";
const Shadow = styled.View`
  background: rgba(0, 0, 0, 0.2);

  height: 100%;
`;
const PopUp = styled.View`
  background: #ffffff;
  border-radius: 16px;
  height: 45%;
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
  font-family: "Hurme";
  font-style: normal;

  font-size: 17px;

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
  width: 90%;
  height: 48px;

  background: #0133aa;
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
const width = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerTwo: {
    width: width - 90,
    height: 150,
    backgroundColor: "#fff",
  },
  map: {
    height: "120%",
  },
  // Callout bubble
  bubbleC: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    width: 300,
    height: 290,
  },
  bubble: {
    padding: 15,
    width: 400,
    height: 290,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },

  // Character name
  name: {
    fontSize: 18,
    color: "#003E77",
    fontFamily: "Hurme",
    width: 120,
  },
  nameTitle: {
    fontSize: 16,
    fontFamily: "Hurme",
    color: "#7B93AF",
    width: 120,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
const customHTML = (image) =>
  `
  <html>
<body>
<img src=${findMe} alt="Paris" style="width:80%;height:80%; border-radius: 30px;">
</body>
</html>`;
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
  font-size: 18px;

  /* identical to box height, or 133% */
  display: flex;
  align-items: center;
  text-align: center;
  font-family: "Hurme";

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
const IconLeft = styled.Image`
  width: 24px;
  height: 24px;
`;
const TouchSortLeft = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 20px;
`;
const ViewBottomMap = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 48px;
  height: 104px;
  left: 24px;
  bottom: 30px;
`;
const ImageBottomMap = styled.Image`
  width: 48px;
  height: 48px;
`;
import { useFonts } from "expo-font";
import Menu from "./menu";
import MenuTwo from "./menuTwo";
import Animations from "./anmition";
import AnimationsTwo from "./AnimationsTwo";
import UpdateScreen from "./update";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BASE_URL } from "../../utils/main";
import { EvilIcons } from "@expo/vector-icons";
let latOld = 0;
let lngOld = 0;
let cul = 0;
let culTwo = "";
let culb = 13;
let culTwob = "";
let zoomLevel = "";
let global_lngInter;
let global_latInter;
let global_lngInterb;
let global_latInterb;
export default function MapScreen({ navigation }) {
  const [modelVisible, setModelVisible] = useState(false);
  const [modelVisibleSearch, setModelVisibleSearch] = useState(false);
  const [isPicture, setPicture] = useState(false);
  const [unPicture, setUnPicture] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openMark, setOpenMark] = useState("");
  const [closeOpen, setCloseOpen] = useState(false);
  
  const [typeList, setTypeList] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [changeTheme, setChangeTheme] = useState(false);
  const {
    MapFc,
    MapSearchMapFc,
    mapObjects,
    setObjectCreate,
    numberPage,
    objectCreate,
    setStopLoopRequest,
    setObjectCreatePage,
    isLoadingMap,
    abortFc,
    signalFc,
  } = useContext(MapContext);
  const { objectFc, isShowObjectLoading, objectIdFc,setOpenObject,openObject,isShowObject } = useContext(ObjectContext);

  const [itemSelect, setItemSelect] = useState(null);

  const [isLoadingComplete] = useFonts({
    Hurme: require("../../assets/fonts/LeagueGothic-Regular.ttf"),
  });
  const [location, setLocation] = useState({
    latitude: 48.49213981185477,
    longitude: 11.405534230960301,
  });
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the LOCATION");
      } else {
        console.log("LOCATION permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  useEffect(() => {
    if(isShowObject){
      setOpenObject(true);
      setOpenMenu(false);
    }
  }, [isShowObject]);
  useEffect(() => {
    setTimeout(() => {
      mapRef?.current?.getCamera().then((cam) => {
        console.log(cam);
        cam.center.latitude = 52.50582068850052;
        cam.center.longitude = 13.421645455080744;
        cam.zoom = 10;
        mapRef?.current?.animateCamera(cam);
      });
    }, 2000);
    objectFc();
    // MapSearchMapFc(30, 40, 40, 40, 30);

    // requestCameraPermission();

    return;
  }, []);
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
            <SpaceH space={30} />
            <TextFilter>Filter object on map</TextFilter>
            <SpaceH space={30} />
            <View style={{ flexDirection: "row" }}>
              {unPicture ? (
                <TouchableOpacity
                  onPress={() => setUnPicture(!unPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      backgroundColor: "#0133aa",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setUnPicture(!unPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                  }}
                />
              )}
              <SpaceW space={15} />
              <TextFilterCheckBox>Pictured</TextFilterCheckBox>
            </View>
            <SpaceH space={20} />
            <View style={{ flexDirection: "row" }}>
              {isPicture ? (
                <TouchableOpacity
                  onPress={() => setPicture(!isPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      borderWidth: 0,
                      borderRadius: 7,
                      width: 20,
                      height: 20,
                      backgroundColor: "#0133aa",
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setPicture(!isPicture)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    width: 25,
                    height: 25,
                    borderColor: "#B2C2D6",
                  }}
                />
              )}
              <SpaceW space={15} />
              <TextFilterCheckBox>Unpictured</TextFilterCheckBox>
            </View>
            <SpaceH space={40} />
            <View style={{ flexDirection: "row" }}>
              <ClickDelete
                onPress={() => {
                  setModelVisible(false);
                }}
              >
                <TextButtonDelete>{"Done"}</TextButtonDelete>
                <SpaceW space={15} />
                {/* <IconSrc source={IconDelete}/> */}
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
  const mapRef = useRef(null);
  function watchLocation() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let gps = await Location.getCurrentPositionAsync({});
      setLocation(gps.coords);
      console.log(gps);
      let r = {
        latitude: 52.50582068850052,
        longitude: 13.421645455080744,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };

      mapRef?.current?.getCamera().then((cam) => {
        console.log(cam);
        cam.center.latitude = gps.coords.latitude;
        cam.center.longitude = gps.coords.longitude;
        cam.zoom += 10;
        mapRef?.current?.animateCamera(cam);
      });

      // mapRef.current?.animateToRegion(
      //   {
      //     latitude:  gps.coords.latitude,
      //     longitude: gps.coords.longitude,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   },
      //   2000
      // )
    })();
  }
  const myPlace = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: [64.165329, 48.844287],
        },
      },
    ],
  };
  function getDifference(a, b) {
    console.log("Math.abs(a - b)", Math.abs(a - b));

    return Math.abs(a - b);
  }
  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };
  if (!isLoadingComplete) {
    return <AppLoading />;
  } else {
    return (
      <>
        <StatusBar animated={true} hidden={true} />
        <View
          style={{ width: `100%`, height: `100%`, backgroundColor: "#f0eeeb" }}
        >
          {!typeList ? (
            <MapView
              pitchEnabled={true}
             
              ref={mapRef}
              initialRegion={INITIAL_REGION}
              style={styles.map}
              showsUserLocation
              zoomEnabled={true}
              scrollEnabled={true}
              rotateEnabled={true}
              onRegionChangeComplete={(res) => {
                console.log(
                  "getCamera",
                  Math.log2(
                    360 *
                      (Dimensions.get("window").width /
                        256 /
                        res.longitudeDelta)
                  ) + 1
                );
                let zoom = parseInt(
                  Math.log2(
                    360 *
                      (Dimensions.get("window").width /
                        256 /
                        res.longitudeDelta)
                  ) + 1
                );
                let latitudeDelta = res.latitudeDelta;
                let longitudeDelta = res.longitudeDelta;

                let lat = res.longitude + latitudeDelta / 2 + "";
                let lng = res.latitude + longitudeDelta / 2 + "";
                let latb = res.longitude - latitudeDelta / 2 + "";
                let lngb = res.latitude - longitudeDelta / 2 + "";

                if (res.latitude + 1 > 9) {
                  global_latInter = parseFloat(lat);
                  global_latInterb = parseFloat(latb);
                } else {
                  global_latInter = parseFloat(lat);
                  global_latInterb = parseFloat(latb);
                }
                if (res.longitude + 1 > 9) {
                  global_lngInter = parseFloat(lng);
                  global_lngInterb = parseFloat(lngb);
                } else {
                  global_lngInter = parseInt(lng);
                  global_lngInterb = parseInt(lngb);
                }
                zoomLevel = getDifference(zoom, 20);

                setObjectCreatePage({
                  ...objectCreate,
                  ...{
                    screenY1: global_latInterb,
                    screenX1: global_lngInterb,
                    screenY2: global_latInter,
                    screenX2: global_lngInter,
                    zoomLevel: `LEVEL_${zoomLevel}`,
                  },
                });
              }}
              mapType={!changeTheme ? "standard" : "satellite"}
            >
              {mapObjects?.map((data) => {
                return (
                  <Marker
                    coordinate={{
                      longitude: data?.location?.lng,
                      latitude: data?.location?.lat,
                    }}
                    tracksViewChanges={true}
                    mapType={MAP_TYPES.HYBRID}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followsUserLocation={true}
                    title="Test Title"
                    key={data._id}
                    description="This is the test description"
                  >
                  
                    {data?.symbolPhoto ? (
                      <Image
                        style={{ width: 75, height: 75 }}
                        resizeMode={"contain"}
                        source={require("../../assets/images/Subtract.png")}
                      />
                    ) : (
                      <Image
                        style={{ width: 75, height: 75 }}
                        resizeMode={"contain"}
                        source={require("../../assets/images/markT.png")}
                      />
                    )}
                    <Callout
                    onPress={()=>{
                      objectIdFc(data?._id);
                      setOpenMark(data);
                      setItemSelect(data);}}
                                        key={data._id}>
                      <View style={{ width: 400 }}>
                        <Pressable
                          
                          style={[styles.bubble, { alignSelf: "center" }]}
                        >
                          {/* <Text>A short description</Text> */}
                          <View style={{ flexDirection: "row" }}>
                            <Svg height="80" width="80">
                              <Defs>
                                <ClipPath id="clip">
                                  <Rect
                                    id="rect"
                                    x="5%"
                                    y="5%"
                                    width="80%"
                                    height="80%"
                                    rx="15"
                                  />
                                </ClipPath>
                              </Defs>

                              <ImageSvg
                                width="100%"
                                height="100%"
                                opacity="1"
                                preserveAspectRatio="none"
                                href={{
                                  uri: `${BASE_URL}/api/v1/files/${data?.symbolPhoto}`,
                                }}
                                clipPath="url(#clip)"
                              />
                            </Svg>
                            <View style={{ width: `90%` }}>
                              <Text
                                style={{
                                  color: "#003e77",
                                  fontFamily: "Hurme",
                                  fontSize: 14,
                                  width: `100%`,
                                  fontWeight: "700",
                                }}
                              >
                                {data?.objectName}
                              </Text>
                              {data?.address?.length > 0 ? (
                                <Text
                                  style={{
                                    width: `100%`,
                                    color: "#7B93AF",
                                    fontSize: 14,
                                    fontFamily: "Hurme",
                                  }}
                                >
                                  {`${data?.address[0]?.address_on_map}`}
                                </Text>
                              ) : null}
                            </View>
                          </View>
                          <View
                            style={{
                              padding: 20,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: `100%`,
                            }}
                          >
                            <View>
                              <Text
                                style={{
                                  color: "#003E77",
                                  fontWeight: "700",
                                  fontSize: 16,
                                  fontFamily: "Hurme",
                                }}
                              >
                                {data?.totalArea}
                              </Text>
                              <Text style={{ color: "#7B93AF", fontSize: 16 }}>
                                {"Total area"}
                              </Text>
                            </View>

                            <View>
                              <Text style={{ color: "#003E77", fontSize: 16, fontWeight: "700",
                            fontFamily: "Hurme", }}>
                                {data?.officeSpace}
                              </Text>
                              <Text style={{ color: "#7B93AF",
                            fontWeight: "600",
                            fontSize: 10,fontFamily: "Hurme", }}>
                                {"Office space"}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              padding: 20,
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: `100%`,
                            }}
                          >
                            <View>
                              <Text style={{ color: "#003E77", fontSize: 16, fontWeight: "700",
                            fontFamily: "Hurme", }}>
                                {new Date(
                                  data?.constructionYear
                                ).toLocaleDateString()}
                              </Text>
                              <Text style={{ color: "#7B93AF",fontWeight: "600",
                                  fontSize: 10,
                                  fontFamily: "Hurme", }}>
                                {"Construction year"}
                              </Text>
                            </View>

                            <View>
                              <Text style={{ color: "#003E77", fontSize: 16 , fontWeight: "700",
                            fontFamily: "Hurme",}}>
                                {data?.vacantArea}
                              </Text>
                              <Text style={{ color: "#7B93AF", fontWeight: "600",
                                  fontSize: 10,
                                  fontFamily: "Hurme",}}>
                                {"Vacant Area"}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                        {/* <TouchableOpacity
                         
                          onPress={() => {
                            alert("hi")
                            objectIdFc(data?._id);
                            setOpenMark(data);
                            setItemSelect(data);
                          }}
                          style={{width:400,height:290,backgroundColor:'#000',position:'absolute'}}
                        >

                        </TouchableOpacity> */}
                      </View>
                    </Callout>
                  </Marker>
                );
              })}
            </MapView>
          ) : null}
          <ModalFilter />
          <MapSearching
            navigation={navigation}
            show={modelVisibleSearch}
            onChangeBack={() => {
              setModelVisibleSearch(false);
            }}
          />

          <UpdateScreen
            onChange={() => setUpdateShow(false)}
            open={updateShow}
            navigation={navigation}
          />
          <View
            style={{
              position: "absolute",
              height: 200,
              width: 300,
              top: 15,
              right: `38%`,
            }}
          >
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails
              onPress={(data, details = null) => {
                mapRef?.current?.getCamera().then((cam) => {
                  console.log(cam);
                  cam.center.latitude = details?.geometry?.location?.lat;
                  cam.center.longitude = details?.geometry?.location?.lng;
                  cam.zoom = 6;
                  mapRef?.current?.animateCamera(cam);
                });
              }}
              query={{
                key: "AIzaSyCu0_rNhV2wN8CGmZR_C2C9ObybaLKI61k",
                language: "en",
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 80,
              width: 200,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                signalFc();
                setObjectCreate({
                  ...objectCreate,
                  ...{
                    screenY1: global_latInterb,
                    screenX1: global_lngInterb,
                    screenY2: global_latInter,
                    screenX2: global_lngInter,
                    zoomLevel: `LEVEL_${zoomLevel}`,
                  },
                });
              }}
              style={{
                backgroundColor: "#ffff",
                width: 170,
                justifyContent: "center",
                height: 80,
                borderRadius: 50,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-around",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
              }}
            >
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "Hurme", fontSize: 15 }}>
                  {"Find Location"}
                </Text>
                <Text>{`Page ${
                  !numberPage?.current ? 0 : numberPage?.current
                }/${!numberPage?.pages ? 0 : numberPage?.pages}`}</Text>
              </View>
              {isLoadingMap ? (
                <ActivityIndicator size={"small"} color={"#0133aa"} />
              ) : null}
            </TouchableOpacity>
            
            <View style={{ width: 10 }} />
            {isLoadingMap ? (
              <Pressable
                style={{
                  width: 60,
                  justifyContent: "center",
                  height: 60,
                  alignItems: "center",
                }}
                onPress={() => {
                  abortFc();

                  setStopLoopRequest(true);
                }}
              >
                <View
                  style={{
                    backgroundColor: "#ffff",
                    width: 40,
                    justifyContent: "center",
                    height: 40,
                    borderRadius: 50,
                    alignItems: "center",
                    flexDirection: "row",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                  }}
                >
                  <EvilIcons name="close" size={20} color={"#000"} />
                </View>
              </Pressable>
            ) : null}
          </View>
          <AnimationsTwo
            open={openObject}
            openMark={openMark}
            setOpenMark={setOpenMark}
            setCloseOpen={setCloseOpen}
            closeOpen={closeOpen}
            onChange={(item) => {
              setOpenMenu(false);
              setItemSelect(item);
              
              if (item?.location) {
                mapRef?.current?.getCamera().then((cam) => {
                  cam.center.latitude = item?.location?.lat;
                  cam.center.longitude = item?.location?.lng;
                  cam.zoom = 6;
                  mapRef?.current?.animateCamera(cam);
                });
              }
            }}
            itemSelect={itemSelect}
            type={typeList}
            navigation={navigation}
          />
          <Animations
            watchLocation={() => {
              watchLocation();
            }}
            onUpdate={() => setUpdateShow(!updateShow)}
            open={openMenu}
            setOpenObject={setOpenObject}
            changeTheme={() => setChangeTheme(!changeTheme)}
            openObject={(x) => {
              setOpenObject(false);
              setCloseOpen(true)
              setTypeList(x);
            
            
            }}
          />
        </View>
        {isShowObjectLoading ? (
          <View style={{position:'absolute',top:200,width:`100%`,height:100,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator size={"large"} color={"#0133aa"} />
                </View>
              ) : null}
      </>
    );
  }
}
