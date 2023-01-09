import React, { useEffect, useState } from "react";
import { Linking, Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Storage from "../../utils/storeData/index";
import Constants from 'expo-constants';
export const TextGray = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  align-items: center;

  /* Gray/700 */
  color: #445a74;
`;
export const ViewClose = styled.Image`
  width: 48px;
  height: 48px;
`;

export const TitleUpdate = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  /* identical to box height, or 150% */

  color: #7b93af;
`;
export const TitleUpdateBlue = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;

  /* identical to box height, or 150% */
  text-align: right;

  color: #0133aa;
`;
export const ViewBlue = styled.Image`
  height: 48;
  width: 100%;
`;
export const ViewRed = styled.Text`
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 100%;
  /* Red/500 */
  border: 1.5px solid #ff4869;
  border-radius: 8px;
`;

export default function UpdateScreen({ open, onChange, navigation }) {
  const [close, setClose] = useState(false);
  useEffect(() => {
    setClose(open);
  }, [open]);
  return (
    <View>
      <StatusBar animated={true} hidden={true} />
      <Modal transparent visible={close}>
        <View
          style={{
            width: `100%`,
            height: `100%`,
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffff",
              borderRadius: 15,
              width: `40%`,
              height: `80%`,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 80,
              }}
            >
              <TextGray>{"About the app"}</TextGray>
              <TouchableOpacity
                onPress={() => {
                  setClose(false);
                  onChange();
                }}
              >
                <ViewClose
                  source={require("../../assets/images/closeupdate.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 30,
              }}
            >
              <TitleUpdate>{"Version"}</TitleUpdate>
              <TitleUpdateBlue>{Constants.manifest?.version+""}</TitleUpdateBlue>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 30,
              }}
            >
              <TitleUpdate>{"Last Update"}</TitleUpdate>
              <TitleUpdateBlue>{"21. October 2022"}</TitleUpdateBlue>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 30,
              }}
            >
              <TitleUpdate>{"Objects"}</TitleUpdate>
              <TitleUpdateBlue>{"9881"}</TitleUpdateBlue>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 30,
              }}
            >
              <TitleUpdate>{"Object - data"}</TitleUpdate>
              <TitleUpdateBlue>{"Update data"}</TitleUpdateBlue>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 30,
              }}
            >
              <TitleUpdate>{"Object - media files"}</TitleUpdate>
              <TitleUpdateBlue>{"Update data"}</TitleUpdateBlue>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: 30,
              }}
            >
              <TitleUpdate>{"Map material"}</TitleUpdate>
              <TitleUpdateBlue>{"Offline available"}</TitleUpdateBlue>
            </View>
            <TitleUpdate>
              {
                "For using this software offline you need to have minimum 20Gb free disk Space . Make sure you have enough space, a wifi connection at the app is not closed while synchronizing."
              }
            </TitleUpdate>
            <View style={{ height: 20 }} />
            <TouchableOpacity
              onPress={() => {
                if(Constants.manifest?.version=="19.0.0"){
                  alert("You are using the latest update")
                }else{
                  const link =
                  'itms-apps://apps.apple.com/';
                Linking.canOpenURL(link).then(
                  (supported) => {
                    supported && Linking.openURL(link);
                  },
                  (err) => console.log(err)
                );
                }
              }}
            >
            <ViewBlue
              resizeMode="contain"
              source={require("../../assets/images/Buttons(2).png")}
            />
            </TouchableOpacity>
            <View style={{ height: 15 }} />
            <TouchableOpacity
              onPress={() => {
                setClose(false)
                Storage.removeData("User");
                navigation.navigate("SignIn");
              }}
            >
              <ViewBlue
                resizeMode="contain"
                source={require("../../assets/images/Buttons(3).png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
