import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SpaceH } from "../../components/space";
import { MapContext } from "../../service/map/Map.context";
import { ObjectContext } from "../../service/object/Object.context";
import { Langue } from "../../utils/main";
import Storage from '../../utils/storeData/index';

export default function MenuTwo({ openObject, type,onUpdate }) {
  const [isButton, setButton] = React.useState('');
  const [isButtonLan, setButtonLan] = React.useState("EN");
  const { objects, objectIdFc, objectFc,nameCompany,objectFilterSearch,setObjectFilterSearch ,lanObject,isButtonDrawerObject ,setButtonDrawerObject} = React.useContext(ObjectContext);
  const { objectCreatePage, setObjectCreate,objectCreate,   signalFc,isButtonDrawer ,setButtonDrawer } =
    React.useContext(MapContext);
  const [switchButton, setSwitch] = React.useState(false);
  const [switchButtonTitle, setSwitchTitle] = React.useState(false);

  React.useEffect(() => {
    setSwitch(type);
  }, [type]);
  React.useEffect(() => {
    setButtonLan(lanObject);
  }, [lanObject]);
  React.useEffect(() => {
    if(switchButton){
      setSwitchTitle(isButtonDrawerObject)
    }else{
      setSwitchTitle(isButtonDrawer)
    }
    
  }, [switchButton]);
  React.useEffect(() => {
    if(switchButton){
      setButtonDrawerObject(switchButtonTitle)
    }else{
      setButtonDrawer(switchButtonTitle)
    }
    
  }, [switchButtonTitle]);
  React.useEffect(() => {
    if(switchButton){
      setSwitchTitle(isButtonDrawerObject)
    }else{
      setSwitchTitle(isButtonDrawer)
    }
    
  }, [objectFilterSearch,objectCreate]);
  return (
    <>
      <View
        style={{
          width: 80,
          alignItems: "center",
          height: `100%`,
          backgroundColor: "#fff",
          position: "absolute",
          left: 0,
          zIndex: 100,
        }}
      >
        <View
          style={{
            width: `100%`,
            backgroundColor: "#fff",
            alignItems: "center",
          }}
        >
          <SpaceH space={20} />
          <Image
            resizeMode="contain"
            source={require("../../assets/images/menuOne.png")}
            style={{ width: `75%`, height: 70}}
          />
          <TouchableOpacity
            onPress={() => {
              setSwitch(false);
              openObject(false);
              
            }}
          >
            {!switchButton ? (
              <Image
                resizeMode="contain"
                source={require("../../assets/images/menuFour.png")}
                style={{ width: 40, height: 40 }}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={require("../../assets/images/mapWithe.png")}
                style={{ width: 40, height: 40 }}
              />
            )}
          </TouchableOpacity>
          <SpaceH space={10} />
          <TouchableOpacity
            onPress={() => {
              setSwitch(true);

              openObject(true);
              objectFc()
            }}
          >
            {switchButton ? (
              <Image
                resizeMode="contain"
                source={require("../../assets/images/objecttree.png")}
                style={{ width: 40, height: 40 }}
              />
            ) : (
              <Image
                resizeMode="contain"
                source={require("../../assets/images/menuFive.png")}
                style={{ width: 40, height: 40 }}
              />
            )}
          </TouchableOpacity>
          <SpaceH space={40} />
          <View style={{ width: 80, paddingLeft: 8 }}>
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
                  switchButtonTitle ==item?.label
                      ? "#0133AA"
                      : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  signalFc()
                  if(switchButton){
                  
                    if( switchButtonTitle ==item?.label){
                      setButtonDrawerObject('')
                      setSwitchTitle('');
                      setObjectFilterSearch({ ...objectFilterSearch, ...{groupOfPeopleId:''}});

                    }else{
                      setButtonDrawerObject(item?.label)
                      setSwitchTitle(item?.label);
                      setObjectFilterSearch({ ...objectFilterSearch, ...{groupOfPeopleId: item?.value}});

                    }
                  }else{
                  
                  if( switchButtonTitle ==item?.label){
                    setButtonDrawer('')
                    setSwitchTitle('');
                    setObjectCreate({ ...objectCreatePage, ...{groupOfPeopleId:''}});

                  }else{
                    setButtonDrawer(item?.label)
                    setSwitchTitle(item?.label);
                    setObjectCreate({ ...objectCreatePage, ...{groupOfPeopleId: item?.value}});

                  }
                }
                
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    textAlign: "center",
                    color: switchButtonTitle == item?.label ? "#fff" : "#003E77",
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
          <SpaceH space={15} />
          <View style={{ width: `100%`, paddingLeft: 8 }}>
            <View
              style={{
                width: 60,
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
                    isButtonLan == "en" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  Langue.lan="en";
                  Storage.storeData("lan", "en");
                  setButtonLan("en");
                  objectFc();
                }}
              >
                <Text
                  style={{
                    fontFamily: "Hurme",
                    color: isButtonLan == "en" ? "#fff" : "#003E77",
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
                    isButtonLan == "de" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
                }}
                onPress={() => {
                  Langue.lan="de";
                  Storage.storeData("lan", "de");
                  setButtonLan("de");
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
            </View>
          </View>
        </View>
        <SpaceH space={5} />
        <TouchableOpacity
        onPress={()=>onUpdate()}>
        <Image
                resizeMode="contain"
                source={require("../../assets/images/update.png")}
                style={{ width: 55, height: 55 }}
              />
              </TouchableOpacity>
        <SpaceH space={40} />
      </View>
    </>
  );
}
