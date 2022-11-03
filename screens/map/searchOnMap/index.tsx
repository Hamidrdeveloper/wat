import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, ScrollView, Modal } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import RightIcon from "../../../assets/images/arrow.png";
import { MapContext } from "../../../service/map/Map.context";
import nullImage from "../../../assets/images/nullImage.png";
import { SpaceH, SpaceW } from "../../../components/space";
import { ObjectContext } from "../../../service/object/Object.context";
import { BASE_URL } from "../../../utils/main";

const BackView = styled.View`
  width: 100%;
  height: 100%;
  /* Gray/0 */
  background: #ffffff;
  opacity: 0.9;
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
const LabelInput = styled.Text`
  width: 100%;
  font-family: "Hurme";
  font-style: normal;

  font-size: 12px;
  color: #0133aa;
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
const TouchSort = styled.TouchableOpacity`
  position: absolute;
  left: 15px;
  top: 20px;
`;
const IconRight = styled.Image`
  width: 24px;
  height: 24px;
`;
const InputSearch = styled.TextInput`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  padding: 5px;
  background: #ffffff;
  border: 1px solid #aec1da;
  border-radius: 8px;
  font-family: "Hurme";
`;

const Padding = styled(View)`
  padding: 24px;
  align-items: center;
`;
const ViewCard = styled.TouchableOpacity`
  box-sizing: border-box;

  padding: 7px;
  width: 100%;
  height: 115px;
  flex-direction: row;
  background: #ffffff;
  border: 1px solid #eaedf2;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin-top: 10px;
`;
const ImageHome = styled.Image`
  width: 99px;
  height: 99px;
  background: #977e7e;
  border-radius: 8px;
`;
const TextHome = styled.Text`
  font-family: "Hurme";
  font-style: normal;

  font-size: 14px;

  align-items: center;

  color: #003e77;
`;
const TextAddress = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  width:70%;
  font-size: 12px;
  align-items: center;
  color: #7b93af;
`;
export default function MapSearching({
  show = true,
  onChangeBack,
  navigation,
}) {
  const { MapFc, mapObjectsSearch } = useContext(MapContext);
  const { objects, objectTwoIdFc, isShowObjectTwo,setIsShowObjectTwo } = useContext(ObjectContext);

  const [modelVisibleSetting, setModelVisibleSetting] = useState(false);
  useEffect(() => {
    setModelVisibleSetting(show);
  }, [show]);
  useEffect(() => {
    if (isShowObjectTwo) {
      navigation.navigate("DetailPageTwo");
      setIsShowObjectTwo(false)
    }
    return;
  }, [isShowObjectTwo]);
  return (
    <>
      <Modal visible={modelVisibleSetting} transparent>
        <BackView>
          <Header>
            <Label>{"Search on map"}</Label>
            <TouchSort
              onPress={() => {
                setModelVisibleSetting(false);
                onChangeBack();
              }}
            >
              <IconRight resizeMode={"contain"} source={RightIcon} />
            </TouchSort>
          </Header>
          <Padding>
            <LabelInput>Search here</LabelInput>
            <SpaceH space={10} />
            <InputSearch
              onChangeText={(e) => {
                MapFc(1, 100, e);
              }}
              placeholder={"Search here"}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              {mapObjectsSearch?.map((data) => {
                return (
                  <ViewCard
                    onPress={() => {
                      objectTwoIdFc(data._id);
                    }}
                  >
                    {data.symbolPhoto == "" ? (
                      <ImageHome source={nullImage} />
                    ) : (
                      <ImageHome
                        source={{
                          uri: `${BASE_URL}/api/v1/files/${data.symbolPhoto}`,
                        }}
                      />
                    )}
                    <SpaceW space={20} />
                    <View style={{width:`80%`}}>
                      <TextHome>{data.fullName}</TextHome>
                      <SpaceH space={30} />
                      {typeof data.address=="string"? 
                      <TextAddress>{data.address}</TextAddress>
                    :<TextAddress>{data?.address?.address}</TextAddress>}
                    </View>
                  </ViewCard>
                );
              })}
              <SpaceH space={120} />
            </ScrollView>
          </Padding>
        </BackView>
      </Modal>
    </>
  );
}
