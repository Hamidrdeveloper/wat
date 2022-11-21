import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SpaceH } from "../../components/space";
import React from "react";
import { ObjectContext } from "../../service/object/Object.context";
import { MapContext } from "../../service/map/Map.context";
import { Langue } from "../../utils/main";
import Storage from '../../utils/storeData/index';

export default function CustomDrawerContent({ openObject, type,onUpdate }) {
  const [isButtonLan, setButtonLan] = React.useState("EN");
  const { objects, objectIdFc, objectFc,nameCompany ,lanObject} = React.useContext(ObjectContext);
  const { objectCreatePage, setObjectCreate, objectCreate,isButtonDrawer ,setButtonDrawer} =
    React.useContext(MapContext);
  const [switchButton, setSwitch] = React.useState(false);
  React.useEffect(() => {
    setSwitch(type);
  }, [type]);
  React.useEffect(() => {
    setButtonLan(lanObject);
  }, [lanObject]);
  return (
    <View>
      <View
        style={{
          width: `100%`,
          backgroundColor: "#fff",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <SpaceH space={20} />
        <Image
          resizeMode="contain"
          source={require("../../assets/images/menuOne.png")}
          style={{ width: `100%`, height: 80 }}
        />
        <SpaceH space={10} />
        <TouchableOpacity
          onPress={() => {
            setSwitch(false);
            openObject(false);
            objectFc()
          }}
        >
          {!switchButton ? (
            <Image
              resizeMode="contain"
              source={require("../../assets/images/menuTwo.png")}
              style={{ width: 200, height: 50 }}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={require("../../assets/images/maplongwithe.png")}
              style={{ width: 200, height: 50 }}
            />
          )}
        </TouchableOpacity>
        <SpaceH space={20} />
        <TouchableOpacity
          onPress={() => {
            setSwitch(true);
            openObject(true);
          }}
        >
          {switchButton ? (
            <Image
              resizeMode="contain"
              source={require("../../assets/images/objectlongblue.png")}
              style={{ width: 200, height: 50 }}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={require("../../assets/images/menuTree.png")}
              style={{ width: 200, height: 50 }}
            />
          )}
        </TouchableOpacity>
        <SpaceH space={10} />
        <View style={{ paddingLeft: 8 }}>
            <View
              style={{
                width: 60,
                height: nameCompany?.length * 68,
                backgroundColor: "#ffff",
                elevation: 8,
                borderRadius: 30,
                alignItems: "center",
              }}
            >
               <SpaceH space={15} />
              <FlatList
                data={nameCompany}
                maxToRenderPerBatch={6}
                showsVerticalScrollIndicator={false}
                renderItem={  ({item})=>{
                  return(
                    <>
                    <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  backgroundColor:
                  isButtonDrawer ==item?.label
                      ? "#0133AA"
                      : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  if( isButtonDrawer ==item?.label){
                    setObjectCreate({ ...objectCreatePage, ...{groupOfPeopleId:''}});
                    setButtonDrawer('');
                  }else{
                    setObjectCreate({ ...objectCreatePage, ...{groupOfPeopleId: item?.value}});
                    setButtonDrawer(item?.label);
                  }
                
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    textAlign: "center",
                    color: isButtonDrawer == item?.label ? "#fff" : "#003E77",
                    fontSize: 12,
                  }}
                >
                  {item?.label}
                </Text>
              </TouchableOpacity>
              <SpaceH space={15} />
                    </>
                  )
                }}
              />
              
              
              {/* <SpaceH space={8} /> */}
              {/* <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  backgroundColor:
                    isButton == "PREOS" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  setButton("PREOS");
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    color: isButton == "PREOS" ? "#fff" : "#003E77",
                    fontSize: 13,
                  }}
                >
                  {"PREOS"}
                </Text>
              </TouchableOpacity>
              <SpaceH space={8} />
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  backgroundColor:
                    isButton == "GORE" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  setButton("GORE");
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    color: isButton == "GORE" ? "#fff" : "#003E77",
                    fontSize: 15,
                  }}
                >
                  {"GORE"}
                </Text>
              </TouchableOpacity>
              <SpaceH space={8} />
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  backgroundColor:
                    isButton == "4th" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  setButton("4th");
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    color: isButton == "4th" ? "#fff" : "#003E77",
                    fontSize: 15,
                  }}
                >
                  {"4th"}
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        <SpaceH space={8} />
        <View style={{ width: `100%`, paddingLeft: 8 }}>
            <View
              style={{
                width: `100%`,
                height: 2 * 63,
                backgroundColor: "#ffff",
                elevation: 8,
                borderRadius: 30,
                alignItems: "center",
              }}
            >
              <SpaceH space={8} />
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  backgroundColor:
                    isButtonLan == "EN" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  Langue.lan="EN";
                  Storage.storeData("lan", "en");
                  setButtonLan("EN");
                  objectFc();
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    color: isButtonLan == "EN" ? "#fff" : "#003E77",
                    fontSize: 13,
                  }}
                >
                  {"EN"}
                </Text>
              </TouchableOpacity>
              <SpaceH space={8} />
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 40,
                  backgroundColor:
                    isButtonLan == "DE" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  Langue.lan="DE";
                  Storage.storeData("lan", "de");
                  setButtonLan("DE");
                  objectFc();
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    color: isButtonLan == "DE" ? "#fff" : "#003E77",
                    fontSize: 13,
                  }}
                >
                  {"DE"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
        onPress={()=>onUpdate()}>
        <Image
                resizeMode="contain"
                source={require("../../assets/images/update.png")}
                style={{ width: 55, height: 55 }}
              />
              </TouchableOpacity>
            </View>
         
        </View>
        
      </View>
    
      <SpaceH space={40} />
    </View>
  );
}
