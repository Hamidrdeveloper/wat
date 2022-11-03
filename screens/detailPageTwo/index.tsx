import React, { useContext } from "react";
import styled from "styled-components/native";
import Icon from "../../assets/images/pen.png";
import Arrow from "../../assets/images/arrow.png";
import ImageOne from "../../assets/images/homeOne.png";
import { SpaceH } from "../../components/space";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import { ObjectContext } from "../../service/object/Object.context";
import { BASE_URL } from "../../utils/main";

const BackView = styled.ScrollView`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
`;
const IconRight = styled.Image`
  width: 24px;
  height: 24px;
`;
const TouchEditRight = styled.TouchableOpacity`
  position: absolute;
  right: 15px;
  top: 30px;
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
const Label = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 18px;
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
`;
const ImageItem = styled.Image`
  width: ${(Dimensions.get("window").width - 60) / 3};
  height: 98px;
  border-radius: 6px;
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
`;
const Map = styled.View`
  padding-left: 25px;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: `92%`,
    height: 200,
    borderRadius: 8,
  },
});
export default function DetailPageTwo({ navigation }) {
  const { objectsDetails } = useContext(ObjectContext);
  const addressRender = (item, index) => {
    return (
      <>
        <SpaceH space={10} />
        <AddressText>{`${index}nd Address`}</AddressText>
        <SpaceH space={10} />

        {typeof item.address == "string" ? (
          <AddressTextSmall>{item?.address}</AddressTextSmall>
        ) : (
          <AddressTextSmall>{item?.address?.address}</AddressTextSmall>
        )}
      </>
    );
  };
  return (
    <>
      <StatusBar hidden />
      <BackView>
        <Header>
          <Label numberOfLines={1}>{objectsDetails.fullName}</Label>
          <TouchEdit
            onPress={() => {
              navigation.goBack();
            }}
          >
            <IconLeft resizeMode={"contain"} source={Arrow} />
          </TouchEdit>
        </Header>
        <ImageHome
          source={{
            uri: `${BASE_URL}/api/v1/files/${objectsDetails.symbolPhoto}`,
          }}
        />
        <Padding>
          {objectsDetails.address.map((res, index) => {
            return addressRender(res, index + 1);
          })}
          <SpaceH space={25} />
          <FlatList
            numColumns={3}
            maxToRenderPerBatch={6}
            data={objectsDetails?.photoGallery}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: (Dimensions.get("window").width - 50) / 3,
                    height: 105,
                  }}
                >
                  <ImageItem
                    source={{
                      uri: `${BASE_URL}/api/v1/files/${item?.photo}`,
                    }}
                  />
                </View>
              );
            }}
          />
          <MapView
        region={{
          latitude: objectsDetails?.location?.lat,
          longitude: objectsDetails?.location?.lng,
          latitudeDelta: 3,
          longitudeDelta: 4,
        }}
        provider={PROVIDER_GOOGLE}

        style={styles.map}
        showsUserLocation
        zoomEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
      >
        {objectsDetails?.location!=null?
         <MapView.Marker
              coordinate={{
                latitude:objectsDetails?.location?.lat!=null ?objectsDetails?.location?.lat:0,
                longitude: objectsDetails?.location?.lng!=null ?objectsDetails?.location?.lng:0,
              }}
              
            />
          :null}
            {/* {productsFiltered.map((data) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              title={data.name}
              description={data.description}
              onPress={() => {
                handleOpenProductModal(data);
              }}
            />
          );
        })} */}
          </MapView>
          <SpaceH space={25} />
        </Padding>
      </BackView>
    </>
  );
}
