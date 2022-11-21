import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import { Switch } from "react-native-paper";
import CustomSwitch, { ZeroOneSwitch } from "../../components/CustomSwitch/CustomSwitch";
import { MapContext } from "../../service/map/Map.context";

const TextFilter = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  align-items: center;
  color: #0133aa;
`;
const TextFilterTo = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  align-items: center;
  color: #0133aa;
`;
const TextFilterInput = styled.TextInput`
  box-sizing: border-box;
  width: 81px;
  background: #ffffff;
  /* Gray/500 */

  border: 1px solid #6783a0;
  /* White BTN */

  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
const BoxFilter = styled.View`
  flex-direction: row;
  align-items: center;
  width: 178px;
  height: 36px;
  background: #f3f6fd;
  border-radius: 12px;
  justify-content: space-around;
`;
const BoxBlueButton = styled.View`
  width: 31px;
  height: 28px;
  align-items: center;
  background: #0133aa;
  border-radius: 8px;
  justify-content: center;
`;
const TextBlueButtonWith = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: #ffffff;
`;
const TextBlueButtonBlue = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-size: 12px;
  color: #0133aa;
`;
const BlueButtonBlue = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 122px;
  height: 40px;
  background: #0133aa;
  border-radius: 8px;
`;

export default function SortScreen({onChangeButton}) {
  const [checked, setChecked] = React.useState("first");
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const { MapFc, MapSearchMapFc, objectCreatePage,signalFc, setObjectCreate, objectCreate } =
  React.useContext(MapContext);
  const [objectFilter, setObjectFilter] = React.useState({});
  const [isOn, setIsOn] = React.useState(objectCreate?.descendingYearOfConstruction);
  const [isOnTwo, setIsOnTwo] = React.useState(objectCreate?.totalAreaBiggest);
  const onChange = () => {
    setObjectFilter({ ...objectFilter, descendingYearOfConstruction: !isOn });
    setIsOn(!isOn);
  };
  const onChangeTwo = () => {
    setObjectFilter({ ...objectFilter, totalAreaBiggest: !isOnTwo });

    setIsOnTwo(!isOnTwo);
  };
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <>
      <View style={{ width: `100%`, height: `100%`, padding: 5 }}>
        <View
          style={{
            flexDirection: "row",
            width: `100%`,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextFilter>{"Year of construction: descending"}</TextFilter>

          <ZeroOneSwitch
            size={80}
            value={isOn}
            onChange={() => onChange()}
            knobColor={"white"}
            borderColor={"#0133aa"}
            indicatorColor={"#0133aa"}
            backgroundColor={"white"}
            borderWidth={2}
            backgroundColorActive={"#0133aa"}
            knobBorderColor={'#C3D1F1'}
            knobBorderWidth={2}
            animationSpeed={"fast"}
            elevation={10}
            imageOff={require('../../assets/images/Union.png')}
            imageOn={require('../../assets/images/VectorTick.png')}

          />
        </View>
        <SpaceH space={20}/>
        <View
          style={{
            flexDirection: "row",
            width: `100%`,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextFilter>{"Total area: Biggest area "}</TextFilter>

          <ZeroOneSwitch
            size={80}
            value={isOnTwo}
            onChange={() => onChangeTwo()}
            knobColor={"white"}
            borderColor={"#0133aa"}
            indicatorColor={"#0133aa"}
            backgroundColor={"white"}
            borderWidth={2}
            backgroundColorActive={"#0133aa"}
            knobBorderColor={'#C3D1F1'}
            knobBorderWidth={2}
            animationSpeed={"fast"}
            elevation={10}
            imageOff={require('../../assets/images/Union.png')}
            imageOn={require('../../assets/images/VectorTick.png')}

          />
        </View>
        <SpaceH space={90} />
        <View style={{ width: `100%`, alignItems: "center" }}>
          <BlueButtonBlue onPress={()=>{
            signalFc()
            setObjectCreate({ ...objectCreate, ...objectFilter });
            onChangeButton()
            }}>
            <TextBlueButtonWith>Apply</TextBlueButtonWith>
          </BlueButtonBlue>
        </View>
      </View>
    </>
  );
}
