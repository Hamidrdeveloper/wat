import { Image, Text, TouchableOpacity, View } from "react-native";
import { SpaceH } from "../../components/space";
import React from "react";

export default function CustomDrawerContent({ openObject, type,onUpdate }) {
  const [isButton, setButton] = React.useState("Publity");
  const [isButtonLan, setButtonLan] = React.useState("EN");
  const [switchButton, setSwitch] = React.useState(false);
  React.useEffect(() => {
    setSwitch(type);
  }, [type]);
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
        <View style={{ width: `100%`, paddingLeft: 30 }}>
          <View
            style={{
              width: 60,
              height: 4 * 63,
              backgroundColor: "#ffff",
              elevation: 8,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <SpaceH space={15} />
            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 40,
                backgroundColor:
                  isButton == "Publity" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
              }}
              onPress={() => {
                setButton("Publity");
              }}
            >
              <Text
                style={{
                  fontFamily: "Hurme",
                  textAlign: "center",
                  color: isButton == "Publity" ? "#fff" : "#003E77",
                  fontSize: 12,
                }}
              >
                {"Publity group"}
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
            </TouchableOpacity>
          </View>
        </View>
        <SpaceH space={8} />
        <View style={{ width: `100%`, paddingLeft: 30 }}>
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
                  isButtonLan == "EN" ? "#0133AA" : "rgba(243, 246, 253,0.5)",
              }}
              onPress={() => {
                setButtonLan("EN");
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
                setButtonLan("DE");
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
          <TouchableOpacity
        onPress={()=>onUpdate()}>
        <Image
                resizeMode="contain"
                source={require("../../assets/images/update.png")}
                style={{ width: 60, height: 60 }}
              />
              </TouchableOpacity>
        </View>
        
      </View>
    
      <SpaceH space={40} />
    </View>
  );
}
