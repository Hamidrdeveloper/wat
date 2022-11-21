import React from "react";
import { Image, Text, TouchableOpacity, View, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SpaceH, SpaceW } from "../../components/space";
import styled from "styled-components/native";
import MapView, { MAP_TYPES, Marker } from "react-native-maps";
import { ObjectContext } from "../../service/object/Object.context";
import { BASE_URL } from "../../utils/main";
const BorderViewText = styled.View`
  background: #fbfcff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  height: 79px;
  padding: 15px;
  width: 100%;
`;
const TitleItem = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #003e77;
`;
const TitleItemSmall = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  color: #003e77;
  padding: 5px;
  width: 90%;
`;
const DetailItem = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #7b93af;
  width: 70%;
`;
const ViewBorder = styled.View`
  box-sizing: border-box;
  height: 116px;
  width: 30%;
  background: #fbfcff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  elevation: 8;
  padding: 15px;
  justify-content: space-around;
`;
const ViewBorderLarge = styled.View`
  box-sizing: border-box;
  height: 116px;
  width: 55%;
  background: #fbfcff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  elevation: 8;
  justify-content: space-around;
`;
const ViewBorderSmall = styled.View`
  box-sizing: border-box;
  height: 116px;
  width: 40%;
  background: #fbfcff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  elevation: 8;
  justify-content: space-around;
`;
const ViewBorderLargeMidum = styled.View`
  box-sizing: border-box;
  height: 116px;
  width: 48%;
  background: #fbfcff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 15px;
  elevation: 8;
  justify-content: space-around;
`;
const ViewBorderLargeTwo = styled.View`
  box-sizing: border-box;
  height: 116px;
  width: 58%;
  background: #fbfcff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  elevation: 8;
  padding: 15px;
  justify-content: space-around;
`;
const ViewBorderLargeTree = styled.View`
  box-sizing: border-box;
  height: 116px;
  width: 38%;
  background: #fbfcff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  elevation: 8;
  padding: 15px;
  justify-content: space-around;
`;

const TextBorderBige = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
 

  /* identical to box height, or 100% */

  color: #003e77;
`;
const TextBorderSmale = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;

  /* identical to box height, or 171% */

  color: #7b93af;
`;
const Line = styled.View`
  height: 0px;
  opacity: 0.5;
  margintop: 10px;
  border: 0.9px solid #7b93af;
`;
const TextSample = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the `;

export default function OpenItem({ onChange, navigation, onLarge }) {
  const mapRef = React.useRef(null);
  const { objectsDetails, objectIdFc,baseData } = React.useContext(ObjectContext);

  React.useEffect(() => {
    if (objectsDetails?.location) {
      mapRef?.current?.getCamera().then((cam) => {
        console.log(cam);
        cam.center.latitude = objectsDetails?.primaryAddress[0]?.location?.lat;
        cam.center.lngitude = objectsDetails?.primaryAddress[0]?.location?.lng;
        cam.zoom = 10;
        mapRef?.current?.animateCamera(cam);
      });
      setTimeout(() => {
      mapRef?.current?.getCamera().then((cam) => {
        console.log(cam);
        cam.center.latitude = objectsDetails?.primaryAddress[0]?.location.lat;
        cam.center.longitude = objectsDetails?.primaryAddress[0]?.location.lng;
        cam.zoom = 8;
        mapRef?.current?.animateCamera(cam);
      });
    }, 3000);
    }
  }, [objectsDetails]);
  
  React.useEffect(() => {
    if (objectsDetails?.location) {
      setTimeout(() => {
        mapRef?.current?.getCamera().then((cam) => {
          console.log(cam);
          cam.center.latitude = objectsDetails?.primaryAddress[0]?.location.lat;
          cam.center.longitude = objectsDetails?.primaryAddress[0]?.location.lng;
          cam.zoom = 8;
          mapRef?.current?.animateCamera(cam);
        });
      }, 1000);
      setTimeout(() => {
        mapRef?.current?.getCamera().then((cam) => {
          console.log(cam);
          cam.center.latitude = objectsDetails?.primaryAddress[0]?.location.lat;
          cam.center.longitude = objectsDetails?.primaryAddress[0]?.location.lng;
          cam.zoom = 8;
          mapRef?.current?.animateCamera(cam);
        });
      }, 3000);
    }
  }, []);
  let tenet = {};

  if (objectsDetails?.tenants?.length > 0) {
    tenet = objectsDetails?.tenants[0];
  }
  let previousOwners = {};

  if (objectsDetails?.previousOwners?.length > 0) {
    previousOwners = objectsDetails?.previousOwners[0];
  }
  let altimeter = {};

  if (objectsDetails?.altimeter?.length > 0) {
    altimeter = objectsDetails?.altimeter[0];
  }

  return (
    <>
      {objectsDetails != null ? (
        <View
          style={{
            width: `100%`,
            alignItems: "center",
            top: 10,
            height: `95%`,
            backgroundColor: "#fff",
            padding: 15,
            borderRadius: 30,
            marginRight: 15,
          }}
        >
          <ScrollView style={{ width: `100%` }}>
            <Image
              resizeMode="stretch"
              style={{ width: `100%`, height: 345 }}
              source={{
                uri: `${BASE_URL}/api/v1/files/${objectsDetails?.symbolPhoto}`,
              }}
            />
            <SpaceH space={15} />
            {objectsDetails?.primaryAddress.map((value,index)=>{
              return (
                <>
                <BorderViewText>
              <TitleItem>
                {value.address_on_map}
              </TitleItem>
              <DetailItem>{`${index+1}st Address`}</DetailItem>
            </BorderViewText>
                </>
              )
            })}
            
           
           
            <View
              style={{
                width: `100%`,
                height: 90,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 150, height: 50 }}
                source={require("../../assets/images/IntroText.png")}
              />
              <SpaceW space={50} />
              <View
                style={{
                  backgroundColor: "#7B93AF",
                  height: 1.1,
                  width: `80%`,
                }}
              />
            </View>
            <View style={{ width: `100%`, height: 100 }}>
              {objectsDetails?.introText?.length>0?
               <DetailItem>{objectsDetails?.introText[0]?.title_en}</DetailItem>
              :null 
            }
            </View>
            <View
              style={{
                width: `100%`,
                height: 70,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 150, height: 70 }}
                source={require("../../assets/images/overView.png")}
              />
              <SpaceW space={50} />
              <View
                style={{
                  backgroundColor: "#7B93AF",
                  height: 1.1,
                  width: `80%`,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 120,
                width: `100%`,
                justifyContent: "space-between",
              }}
            >
              <ViewBorder>
                <TextBorderBige>{objectsDetails?.surfaces?.totalArea}</TextBorderBige>
                <TextBorderSmale>{"Total Area"}</TextBorderSmale>
              </ViewBorder>
              <ViewBorder>
                <TextBorderBige>{tenet?.officeSpace}</TextBorderBige>
                <TextBorderSmale>{"Office space"}</TextBorderSmale>
              </ViewBorder>
              <ViewBorder>
                <TextBorderBige>{objectsDetails?.surfaces?.plotSize}</TextBorderBige>
                <TextBorderSmale>{"Property size"}</TextBorderSmale>
              </ViewBorder>
            </View>
            <SpaceH space={10} />
            <View
              style={{
                flexDirection: "row",
                height: 120,
                width: `100%`,
                justifyContent: "space-between",
              }}
            >
              <ViewBorder>
                <TextBorderBige style={{fontSize:26}}>
                  {new Date(parseInt(objectsDetails?.objectType?.yearOfConstruction)).toLocaleDateString()}
                </TextBorderBige>
                <TextBorderSmale>{"Construction year"}</TextBorderSmale>
              </ViewBorder>
              <ViewBorder>
                <TextBorderBige>{objectsDetails?.objectType?.vacancy}</TextBorderBige>
                <TextBorderSmale>{"Vacancy rate"}</TextBorderSmale>
              </ViewBorder>
              <ViewBorder>
               
                  {baseData?.condition.map( x =>
                   {
                    if( x?._id ==objectsDetails?.objectType?.condition){
                      return  <TextBorderBige>{x?.title_en }</TextBorderBige>
                    }
                   }
                    
                    )}
              
            
                <TextBorderSmale>{"Condition"}</TextBorderSmale>
              </ViewBorder>
            </View>
            <SpaceH space={10} />
            <View
              style={{
                flexDirection: "row",
                height: 120,
                width: `100%`,
                justifyContent: "space-between",
              }}
            >
              <ViewBorder>
                <TextBorderBige>
                  {objectsDetails?.objectType?.floorsOfConstruction}
                </TextBorderBige>
                <TextBorderSmale>{"Floors"}</TextBorderSmale>
              </ViewBorder>
              <ViewBorder>
                <TextBorderBige>{objectsDetails?.generalNumbers?.sanitationCostTotal+" €"}
                </TextBorderBige>
                <TextBorderSmale>{"Plot size"}</TextBorderSmale>
              </ViewBorder>
              <ViewBorder>
                <TextBorderBige>
                  {objectsDetails?.objectType?.parkingSpaceOuterSurface}
                </TextBorderBige>
                <TextBorderSmale>{"Outdoor parking spaces"}</TextBorderSmale>
              </ViewBorder>
            </View>
            <SpaceH space={10} />
            <View
              style={{
                flexDirection: "row",
                height: 120,
                width: `100%`,
                justifyContent: "space-between",
              }}
            >
              <ViewBorderLargeMidum>
                <TextBorderBige>
                  {objectsDetails?.generalNumbers?.buildingCostTotal+" €"}
                </TextBorderBige>
                <TextBorderSmale>{"Building Cost Total"}</TextBorderSmale>
              </ViewBorderLargeMidum>
              <ViewBorderLargeMidum>
                <TextBorderBige>
                  {objectsDetails?.objectType?.parkingSpaceUndergroundCarPark}
                </TextBorderBige>
                <TextBorderSmale>{"indoor parking spaces"}</TextBorderSmale>
              </ViewBorderLargeMidum>
            </View>
            <SpaceH space={10} />
            <View
              style={{
                flexDirection: "row",
                height: 120,
                width: `100%`,
                justifyContent: "space-between",
              }}
            >
              <ViewBorderLargeMidum>
                <TextBorderBige>
                  {objectsDetails?.generalNumbers?.annualNetRentTotal+" €"}
                </TextBorderBige>
                <TextBorderSmale>{"Annual rent net"}</TextBorderSmale>
              </ViewBorderLargeMidum>
              <ViewBorderLargeMidum>
                <TextBorderBige>{previousOwners?.price}</TextBorderBige>
                <TextBorderSmale>{"Purchase prices incl. Time"}</TextBorderSmale>
              </ViewBorderLargeMidum>
            </View>
            <View>
              <SpaceH space={15} />
              <View
                style={{
                  width: `100%`,
                  height: 70,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 320, height: 250 }}
                  source={require("../../assets/images/owner.png")}
                />
                <SpaceW space={50} />
                <View
                  style={{
                    backgroundColor: "#7B93AF",
                    height: 1.1,
                    width: `80%`,
                  }}
                />
                <SpaceH space={15} />
              </View>
              <FlatList
                maxToRenderPerBatch={6}
                data={objectsDetails?.owners}
                renderItem={item => {
              
                  return(
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 8,
                            backgroundColor: "#292D32",
                          }}
                        />
                        <SpaceW space={10} />
                        <Text style={{ fontSize: 14, color: "#57728E" }}>
                          {item?.item?.name}
                        </Text>
                      </View>
                      <Text style={{ fontSize: 14, color: "#57728E" }}>
                        {item?.item?.dateOfPurchase}
                      </Text>
                    </View>
                  </>
                )}}
              />
              <SpaceH space={15} />
              <View
                style={{
                  width: `100%`,
                  height: 70,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 150, height: 70 }}
                  source={require("../../assets/images/timline.png")}
                />
                <SpaceW space={50} />
                <View
                  style={{
                    backgroundColor: "#7B93AF",
                    height: 1.1,
                    width: `80%`,
                  }}
                />
                <SpaceH space={15} />
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Text style={{ fontSize: 14,flex:2, color: "#57728E" }}>
                  {"Tenant"}
                </Text>
                <Text style={{ fontSize: 14,flex:1, color: "#57728E" }}>
                  {"Total space"}
                </Text>
                <Text style={{ fontSize: 14,flex:1, color: "#57728E" }}>
                  {"Monthly rent"}
                </Text>
                <Text style={{ fontSize: 14,flex:1, color: "#57728E" }}>
                  {"End of rent"}
                </Text>
              </View>
              <Line />
              <SpaceH space={15} />
              <FlatList
              maxToRenderPerBatch={6}
                data={objectsDetails?.tenants}
                renderItem={(item) => {
                  let dateOne =new Date(parseInt(item?.item?.rentalEndDate)).toLocaleDateString();
                  console.log(item?.item);
                  
                  return (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 14,flex:2, color: "#57728E" }}>
                        {item?.item?.affiliates?.companyName}
                      </Text>
                      <Text style={{ fontSize: 14,flex:1, color: "#57728E" }}>
                        {item?.item?.totalRentPrice}
                      </Text>
                      <Text style={{ fontSize: 14,flex:1, color: "#57728E" }}>
                        {item?.item?.officeSpace}
                      </Text>
                      <Text style={{ fontSize: 14,flex:1, color: "#57728E" }}>
                      {`${dateOne}`}
                      </Text>
                    </View>
                  </>
                )}}
              />
              <SpaceH space={15} />
              <View
                style={{
                  width: `100%`,
                  height: 70,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 150, height: 70 }}
                  source={require("../../assets/images/remark.png")}
                />
                <SpaceW space={50} />
                <View
                  style={{
                    backgroundColor: "#7B93AF",
                    height: 1.1,
                    width: `80%`,
                  }}
                />
                <SpaceH space={15} />
              </View>
              <FlatList
              maxToRenderPerBatch={6}
                data={objectsDetails?.remarks}
                renderItem={({item}) => (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 30,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 8,
                            backgroundColor: "#292D32",
                          }}
                        />
                        <SpaceW space={30} />
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#57728E",
                            paddingRight: 80,
                          }}
                        >
                          {item?.comment}
                        </Text>
                      </View>
                    </View>
                    <SpaceH space={10} />
                  </>
                )}
              />
              <View style={{ flexDirection: "row" , height: 240,}}>
                <MapView
                  ref={mapRef}
                  mapPadding={{top: 0, right: 0, bottom: -25, left: 0}}
                  style={{
                    flex: 1,
                    height: 240,
                    marginLeft: 30,
                    borderRadius: 15,
                  }}
                  showsUserLocation
                  zoomEnabled={false}
                  scrollEnabled={false}
                  rotateEnabled={false}
                  stopPropagation={false}
                >
                  <Marker
                    coordinate={{
                      latitude:
                        objectsDetails?.primaryAddress[0]?.location?.lat,
                      longitude:
                        objectsDetails?.primaryAddress[0]?.location?.lng,
                    }}
                    mapType={MAP_TYPES.HYBRID}
                    showsUserLocation={false}
                    showsMyLocationButton={false}
                    followsUserLocation={false}
                  
                  >
                    <Image
                  style={{ width: 65, height: 65 }}
                  resizeMode={"contain"}
                  source={require("../../assets/images/Subtract.png")}
                />
                  </Marker>
                </MapView>
                <View style={{ flex: 1, paddingLeft: 15 }}>
                  <FlatList
                  maxToRenderPerBatch={6}
                    data={objectsDetails?.photoGallery}
                    numColumns={2}
                    renderItem={({ item }) => (
                      <>
                      <TouchableOpacity
                      style={{
                        width: `45%`,
                        marginRight: 8,
                        marginTop: 8,
                        height: 100,
                        borderRadius: 8,
                      }}
                      onPress={()=>{navigation.navigate("FullImage",{image:`${BASE_URL}/api/v1/files/${item?.id}`});}}>
                        <Image
                          style={{
                            width: `100%`,
                            height: 100,
                            borderRadius: 8,
                          }}
                          source={{ uri: `${BASE_URL}/api/v1/files/${item?.id}` }}
                        />
                        </TouchableOpacity>
                      </>
                    )}
                  />
                </View>
              </View>
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FullMap");
                }}
                style={{
                  width: 130,
                  height: 100,
                  position: "absolute",
                  left: 15,
                  top: 15,
                }}
              /> */}
             
            </View>
            <SpaceH space={15} />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View
                style={{
                  width: `100%`,
                  height: 70,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 150, height: 70 }}
                  source={require("../../assets/images/videosccren.png")}
                />
                <SpaceW space={50} />
                <View
                  style={{
                    backgroundColor: "#7B93AF",
                    height: 1.1,
                    width: `80%`,
                  }}
                />
                <SpaceH space={15} />
              </View>
              <Image
                resizeMode="contain"
                style={{ width: `100%`, height: 300 }}
                source={require("../../assets/images/videoseto.png")}
              />
              <TouchableOpacity
                onPress={() => {
                  if(objectsDetails?.videoGallery?.length>0)
                  navigation.navigate("VideoPlay");
                }}
                style={{ width: 200, height: 200, position: "absolute" }}
              />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <View
                style={{
                  width: `100%`,
                  height: 70,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  resizeMode="contain"
                  style={{ width: 150, height: 70 }}
                  source={require("../../assets/images/setopap.png")}
                />
                <SpaceW space={50} />
                <View
                  style={{
                    backgroundColor: "#7B93AF",
                    height: 1.1,
                    width: `80%`,
                  }}
                />
  
              </View>
              <Image
                resizeMode="contain"
                style={{ width: `100%`, height: 300 }}
                source={require("../../assets/images/videoclick.png")}
              />
              <TouchableOpacity
                onPress={() => {
                  if(objectsDetails?.videoGallery?.length>0)
                  navigation.navigate("VideoPlay");
                }}
                style={{ width: 200, height: 200, position: "absolute" }}
              />
            </View>
          </ScrollView>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              left: 30,
              top: 30,
            }}
            onPress={() => {
              onChange();
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
              source={require("../../assets/images/closeFrame.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              left: 80,
              top: 30,
            }}
            onPress={() => {
              onLarge();
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: 50, height: 50 }}
              source={require("../../assets/images/largeObject.png")}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}
