import React, { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from 'react-native-fast-image';
import { ScrollView } from "react-native-gesture-handler";
import FilterScreen from "../filter";
import SortScreen from "../sort";
import styled from "styled-components/native";
import { SpaceW } from "../../components/space";
import { MapContext } from "../../service/map/Map.context";
import { ObjectContext } from "../../service/object/Object.context";
import { BASE_URL } from "../../utils/main";
import { useDebounce } from "./useDebounce";
const TextInputSearch = styled.TextInput`
  width: 100%;
  box-sizing: border-box;
  background: #e8edfa;
  border-radius: 40px;
  height: 40px;
  padding-left: 65px;
`;
const CircleIcon = styled.TouchableOpacity`
  box-sizing: border-box;
  align-items: flex-start;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: #0133aa;
  border-radius: 40px;
`;
const CircleIconDis = styled.View`
  box-sizing: border-box;
  align-items: flex-start;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background: #e8edfa;
  border-radius: 40px;
`;

const ImageItem = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 8px;
`;
const ViewRow = styled.View`
  flex-direction: row;
  
`;
const ViewRowSpace = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 90%;
  padding-left:15px;
`;

const TitleItem = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  width: 90%;
  color: #003e77;
`;
const DetailItem = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 12px;
  color: #7b93af;

  width: 90%;
`;
const CardItem = styled.TouchableOpacity`
  width: 100%;
  height: 215px;

  background: #ffffff;
  border: 1px solid #eaedf2;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  elevation: 8;
  padding: 8px;
  justify-content: space-around;
`;
const NumberTitle = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;

  /* identical to box height, or 150% */
  display: flex;
  align-items: center;

  color: #003e77;
`;
const NumberDetail = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;

  /* identical to box height, or 160% */
  display: flex;
  align-items: center;

  color: #7b93af;
`;
const width = Dimensions.get("window").width;
export default function Menu({ onChange, typeList }) {
  const [isButton, setButton] = React.useState("list");
  const { MapFc, MapSearchMapFc, mapObjects, setObjectCreate, objectCreate } =
    React.useContext(MapContext);
  const { objects, objectIdFc, objectFc,openObject,    reactAnimation  } = React.useContext(ObjectContext);
  const [selectedLetter, setSelectedLetter] = React.useState(-1);
  const [searchText, setSearchText] = React.useState(-1);

  const [itemArray, setItemArray] = React.useState([
    { flag: false },
    { flag: false },
    { flag: false },
    { flag: false },
    { flag: false },
    { flag: false },
    { flag: false },
    { flag: false },
    { flag: false },
  ]);
  const debouncedSearchTerm = useDebounce(searchText, 1000);
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        if (typeList) {
          objectFc(debouncedSearchTerm);
        } else {
          setObjectCreate({ ...objectCreate, ...{ searchOnMap: debouncedSearchTerm } });
        }
       
      } else {
        if (typeList) {
          objectFc(null);
        } else {
          setObjectCreate({ ...objectCreate, ...{ searchOnMap: '' } });
        }
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  const onSelect = (index) => {
    let change = itemArray.map((x, i) => {
      if (i == index) {
        return { ...i, flag: true };
      } else {
        return { ...i, flag: false };
      }
    });
    setItemArray(change);
  };

  useEffect(() => {
    setSearchText("");
  }, [typeList]);
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex:1,
          marginTop: 10,
          marginRight: 10,
          borderColor: item.flag == true ? "#0133AA" : "#ff",
          borderWidth: item.flag == true ? 1 : 0,
          borderRadius: 8,
          elevation: item.flag == true ? 12 : 4,
        }}
      >
        <CardItem
          onPress={() => {
            onSelect(index);
            objectIdFc(item?._id);
            onChange(item);
          }}
        >
          <ViewRow>
            {item?.symbolPhoto==''?
            <ImageItem
            source={require('../../assets/images/nullImage.png')}
          />
            :
          
            <ImageItem
              source={{
                uri: `${BASE_URL}/api/v1/files/${item?.symbolPhoto}`,
              }}
            />
          }
            <SpaceW space={10} />
            <View style={{flex:1}}>
              <TitleItem>{item?.objectName}</TitleItem>
              <DetailItem style>{item?.address[0]?.address_on_map}</DetailItem>
            </View>
          </ViewRow>
          <ViewRowSpace>
            <View style={{flex: 1, alignSelf:'baseline'}}>
              <NumberTitle>{item?.totalArea}</NumberTitle>
              <NumberDetail>{"Total area"}</NumberDetail>
            </View>
            <View style={{flex: 1, alignSelf:'baseline'}}>
              <NumberTitle>{item?.officeSpace}</NumberTitle>
              <NumberDetail>{"Office space"}</NumberDetail>
            </View>
          </ViewRowSpace>
          <ViewRowSpace>
            <View style={{flex: 1}}>
              <NumberTitle>{new Date(item?.constructionYear).toLocaleDateString()}</NumberTitle>
              <NumberDetail>{"Construction year"}</NumberDetail>
            </View>
            <View  style={{flex: 1}}>
              <NumberTitle>{item?.vacantArea}</NumberTitle>
              <NumberDetail>{"Vacant area"}</NumberDetail>
            </View>
          </ViewRowSpace>
        </CardItem>
      </View>
    );
  };
 
  const keyExtractor = (item) => item._id;
  const ITEM_HEIGHT = 225; // fixed height of item component
  const getItemLayout = (data, index) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * data.length,
      index,
    };
  };
  return (
    <>
      <View
        style={{
          width: `100%`,
          top: 10,
          height: `95%`,
          backgroundColor: "#fff",
          borderRadius: 15,
          right: 15,
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <View style={{ width: `100%`, marginTop: 15, padding: 15 }}>
          <View
            style={{
              width: `100%`,
              height: 50,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, height: 50, justifyContent: "center" }}>
              <TextInputSearch
                value={searchText}
                onChangeText={(e) => {
                  setSearchText(e);
                 
                }}
              />
              
              <Image
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  position: "absolute",
                  left: 20,
                }}
                source={require("../../assets/images/Group.png")}
              />
              <View
                style={{
                  width: 1,
                  height: `60%`,
                  backgroundColor: "#D1DBE8",
                  position: "absolute",
                  left: 60,
                }}
              />
            </View>
            {!typeList?
            <CircleIcon
              onPress={() => {
                setButton("filter");
              }}
              style={{
                backgroundColor: isButton == "filter" ? "#0133aa" : "#ffff",
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: isButton == "filter" ? "#ffff" : "#0133aa",
                }}
                source={require("../../assets/images/sort.png")}
              />
            </CircleIcon>:null}
            {!typeList?

            <CircleIcon
              onPress={() => {
                setButton("document");
              }}
              style={{
                backgroundColor: isButton == "document" ? "#0133aa" : "#ffff",
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: isButton == "document" ? "#ffff" : "#0133aa",
                }}
                source={require("../../assets/images/document-filter.png")}
              />
            </CircleIcon>
            :null}
          </View>
        </View>
        {isButton == "list"&&!reactAnimation ? (
          <View style={{ width: `100%`, padding: 10, height: `85%` }}>
            {typeList ? (
              <>
              {openObject?
              <View style={{ width: `100%` }}>
               <FlatList
               key={"#"}
               maxToRenderPerBatch={6}
               keyExtractor={keyExtractor}
               data={objects}
               getItemLayout={getItemLayout}
               renderItem={(item, index) => {
                 return renderItem(item, index);
               }}
             />
             </View>:
             <View style={{ width: `100%` }}>
              <FlatList
                key={"_"}
                maxToRenderPerBatch={6}
                keyExtractor={keyExtractor}
                numColumns={3}
                getItemLayout={getItemLayout}
                data={objects}
                renderItem={(item, index) => {
                  return renderItem(item, index);
                }}
              />
              </View>
            }
              </>
            ) : (
              <FlatList
                key={"#"}
                maxToRenderPerBatch={6}
                keyExtractor={keyExtractor}
                data={mapObjects}
                getItemLayout={getItemLayout}
                renderItem={(item, index) => {
                  return renderItem(item, index);
                }}
              />
            )}
          </View>
        ) : null}
          {isButton == "list" ?null:(
          <>
            {isButton != "filter" ? (
              <FilterScreen
              typeList={typeList}
                onChangeButton={() => {
                  setButton("list");
                }}
              />
            ) : (
              <SortScreen
                onChangeButton={() => {
                  setButton("list");
                }}
              />
            )}
          </>
        )}
      </View>
    </>
  );
}
