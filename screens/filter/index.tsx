import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SpaceH, SpaceW } from "../../components/space";
import { RadioButton } from "react-native-paper";
import { MapContext } from "../../service/map/Map.context";
import DropDownPicker from "react-native-dropdown-picker";
import { ObjectContext } from "../../service/object/Object.context";

const TextFilter = styled.Text`
  font-family: "Hurme";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  align-items: center;
  color: #0133aa;
  flex:1;
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
  width: 70px;
  height: 40px;
  background: #ffffff;
  /* Gray/500 */

  border: 1px solid #6783a0;
  /* White BTN */

  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  flex:1;
`;
const BoxFilter = styled.View`
  flex-direction: row;
  align-items: center;
  width: 178px;
  height: 36px;
  background: #f3f6fd;
  border-radius: 12px;
  justify-content: space-around;
  flex: 2;
  
`;
const BoxBlueButton = styled.TouchableOpacity`
 
  height: 28px;
  align-items: center;
  background: #0133aa;
  border-radius: 8px;
  justify-content: center;
  flex: 0.7;
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

export default function FilterScreen({ onChangeButton ,typeList}) {
  const [checked, setChecked] = React.useState("first");
  const [objectFilter, setObjectFilter] = React.useState({});
  const [tenant, setTenant] = React.useState("0");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([]);

  const { MapSearchMapFc, setObjectCreate, objectCreate,signalFc,objectCreatePage } =
    React.useContext(MapContext);
  const { nameCompany } = React.useContext(ObjectContext);
  React.useEffect(() => {
    setItems(nameCompany);
  }, [nameCompany]);

  React.useEffect(() => {
    if (value != null) {
      setObjectFilter({ ...objectFilter, filterId: value });
    }
  }, [value]);

  return (
    <>
      <View style={{ width: `100%`, height: `87%`, padding: 5 }}>
        <ScrollView>
          <View style={{ width: typeList?`80%`:`100%`, height: `100%` }}>
            <TouchableOpacity
            onPress={()=>{
              setObjectFilter({
                vintageFrom: 0,
                vintageTo: 0,
                officeSpaceFrom: 0,
                officeSpaceTo: 0,
                totalAreaFrom: 0,
                totalAreaTo: 0,
                vacancyFrom: 0,
                vacancyTo: 0,
                priceFrom: 0,
                priceTo: 0,
                sizeFrom: 0,
                sizeTo: 0,
                tenant:'',
                personType: "All",
                descendingYearOfConstruction: false,
                totalAreaBiggest: false,
                skip: 1,
                limit: 100,
                groupOfPeopleId: "",
              }
              
            );
            setTenant("0");
            setChecked("first")
          }}
              style={{
                width: 100,
                height: 45,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                backgroundColor: "#0133AA",
              }}
            >
              <Text
                style={{ fontFamily: "Hurme", fontSize: 13, color: "#fff" }}
              >
                {"Clear Filter"}
              </Text>
            </TouchableOpacity>
            <View style={{ height: 8 }} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
                alignItems: "center",
                
              }}
            >
              <TextFilter>{"Vintage"}</TextFilter>
              <TextFilterInput
              value={objectFilter?.vintageFrom}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, vintageFrom: e });
                }}
              />
              <SpaceW space={8} />
              <TextFilterTo>{"To"}</TextFilterTo>
              <SpaceW space={8} />
              <TextFilterInput
                value={objectFilter?.vintageTo}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, vintageTo: e });
                }}
              />
            </View>
            <SpaceH space={30} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
                alignItems: "center",
              }}
            >
              <TextFilter>{"Office space in m2"}</TextFilter>
              <TextFilterInput
              value={objectFilter?.officeSpaceFrom}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, officeSpaceFrom: e });
                }}
              />
              <SpaceW space={8} />
              <TextFilterTo>{"To"}</TextFilterTo>
              <SpaceW space={8} />
              <TextFilterInput
              value={objectFilter?.officeSpaceTo}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, officeSpaceTo: e });
                }}
              />
            </View>
            <SpaceH space={30} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
                alignItems: "center",
              }}
            >
              <TextFilter>{"Total area in m2"}</TextFilter>
              <TextFilterInput
               value={objectFilter?.totalAreaFrom}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, totalAreaFrom: e });
                }}
              />
              <SpaceW space={8} />
              <TextFilterTo>{"To"}</TextFilterTo>
              <SpaceW space={8} />
              <TextFilterInput
              value={objectFilter?.totalAreaTo}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, totalAreaTo: e });
                }}
              />
            </View>
            <SpaceH space={30} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
                alignItems: "center",
              }}
            >
              <TextFilter>{"Vacancy in %"}</TextFilter>
              <TextFilterInput
                 value={objectFilter?.vacancyFrom}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, vacancyFrom: e });
                }}
              />
              <SpaceW space={8} />
              <TextFilterTo>{"To"}</TextFilterTo>
              <SpaceW space={8} />
              <TextFilterInput
              value={objectFilter?.vacancyTo}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, vacancyTo: e });
                }}
              />
            </View>
            <SpaceH space={30} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
                alignItems: "center",
              }}
            >
              <TextFilter>{"Price in €"}</TextFilter>
              <TextFilterInput
               value={objectFilter?.priceFrom}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, priceFrom: e });
                }}
              />
              <SpaceW space={8} />
              <TextFilterTo>{"To"}</TextFilterTo>
              <SpaceW space={8} />
              <TextFilterInput
                value={objectFilter?.priceTo}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, priceTo: e });
                }}
              />
            </View>
            <SpaceH space={30} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
                alignItems: "center",
              }}
            >
              <TextFilter>{"Property size"}</TextFilter>
              <TextFilterInput
                    value={objectFilter?.sizeFrom}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, sizeFrom: e });
                }}
              />
              <SpaceW space={8} />
              <TextFilterTo>{"To"}</TextFilterTo>
              <SpaceW space={8} />
              <TextFilterInput
                    value={objectFilter?.sizeTo}
                onChangeText={(e) => {
                  setObjectFilter({ ...objectFilter, sizeTo: e });
                }}
              />
            </View>
            <SpaceH space={30} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
                alignItems: "center",
              }}
            >
              <TextFilter>{"Tenant"}</TextFilter>
              <BoxFilter>
                <BoxBlueButton
                  style={{
                    backgroundColor: tenant == "0" ? "#0133aa" : "#fff",
                  }}
                  onPress={() => {
                    setTenant("0");

                    setObjectFilter({ ...objectFilter, tenant: "All" });
                  }}
                >
                  {tenant == "0" ? (
                    <TextBlueButtonWith>All</TextBlueButtonWith>
                  ) : (
                    <TextBlueButtonBlue>All</TextBlueButtonBlue>
                  )}
                </BoxBlueButton>
                <BoxBlueButton
                  style={{
                    backgroundColor: tenant == "1" ? "#0133aa" : "#fff",
                  }}
                  onPress={() => {
                    setTenant("1");
                    setObjectFilter({ ...objectFilter, tenant: "Single" });
                  }}
                >
                  {tenant == "1" ? (
                    <TextBlueButtonWith>Single</TextBlueButtonWith>
                  ) : (
                    <TextBlueButtonBlue>Single</TextBlueButtonBlue>
                  )}
                </BoxBlueButton>
                <BoxBlueButton
                  style={{
                    backgroundColor: tenant == "2" ? "#0133aa" : "#fff",
                  }}
                  onPress={() => {
                    setTenant("2");

                    setObjectFilter({ ...objectFilter, tenant: "Multi" });
                  }}
                >
                  {tenant == "2" ? (
                    <TextBlueButtonWith>Multi</TextBlueButtonWith>
                  ) : (
                    <TextBlueButtonBlue>Multi</TextBlueButtonBlue>
                  )}
                </BoxBlueButton>
              </BoxFilter>
            </View>
            <SpaceH space={30} />
            <View
              style={{
                flexDirection: "row",
                width: `100%`,
              }}
            >
              <TextFilter >{"Persontype"}</TextFilter>
              <View style={{flex:3}}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                
                    value="1"
                    color={"#0133aa"}
                    status={checked === "1" ? "checked" : "unchecked"}
                    onPress={() => {
                      setObjectFilter({ ...objectFilter, personType: "All" });

                      setChecked("1");
                    }}
                  />
                  <TouchableOpacity
                  style={{backgroundColor:'#ffff',shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,borderRadius:8,padding:8}}
                   onPress={() => {
                    setObjectFilter({ ...objectFilter, personType: "All" });

                      setChecked("1");
                  }}>
                  <TextFilterTo
                    style={{ color: checked == "1" ? "#0133aa" : "#292D32" }}
                  >
                    {"All"}
                  </TextFilterTo>
                  </TouchableOpacity>
                 
                  <RadioButton
                    value="3"
                    color={"#0133aa"}
                    status={checked === "3" ? "checked" : "unchecked"}
                    onPress={() => {
                      setObjectFilter({
                        ...objectFilter,
                        personType: "Broker",
                      });
                      setChecked("3");
                    }}
                  />
                   <TouchableOpacity
                   style={{backgroundColor:'#ffff',shadowColor: "#000",
                   shadowOffset: {
                     width: 0,
                     height: 1,
                   },
                   shadowOpacity: 0.22,
                   shadowRadius: 2.22,borderRadius:8,padding:8}}
                   onPress={() => {
                    setObjectFilter({
                      ...objectFilter,
                      personType: "Broker",
                    });
                    setChecked("3");
                  }}>
                  <TextFilterTo
                    style={{ color: checked == "3" ? "#0133aa" : "#292D32" }}
                  >
                    {"Broker"}
                  </TextFilterTo>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                <RadioButton
                    value="2"
                    color={"#0133aa"}
                    uncheckedColor={"red"}
                    status={checked === "2" ? "checked" : "unchecked"}
                    onPress={() => {
                      setObjectFilter({
                        ...objectFilter,
                        personType: "Tenant",
                      });
                      setChecked("2");
                    }}
                  />
                  <TouchableOpacity
                  style={{backgroundColor:'#ffff',shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,borderRadius:8,padding:8}}
                   onPress={() => {
                    setObjectFilter({
                      ...objectFilter,
                      personType: "Tenant",
                    });
                    setChecked("2");
                  }}>
                  <TextFilterTo
                    style={{ color: checked == "2" ? "#0133aa" : "#292D32" }}
                  >
                    {"Tenant"}
                  </TextFilterTo>
                  </TouchableOpacity>
                  </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value="4"
                    color={"#0133aa"}
                    status={checked === "4" ? "checked" : "unchecked"}
                    onPress={() => {
                      setObjectFilter({ ...objectFilter, personType: "Owner" });
                      setChecked("4");
                    }}
                  />
                   <TouchableOpacity
                   style={{backgroundColor:'#ffff',shadowColor: "#000",
                   shadowOffset: {
                     width: 0,
                     height: 1,
                   },
                   shadowOpacity: 0.22,
                   shadowRadius: 2.22,borderRadius:8,padding:8}}
                   onPress={() => {
                    setObjectFilter({ ...objectFilter, personType: "Owner" });
                    setChecked("4");
                  }}>
                  <TextFilterTo
                    style={{ color: checked == "4" ? "#0133aa" : "#292D32" }}
                  >
                    {"Owner"}
                  </TextFilterTo>
                  </TouchableOpacity>
                 
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                <RadioButton
                    value="5"
                    color={"#0133aa"}
                    status={checked === "5" ? "checked" : "unchecked"}
                    onPress={() => {
                      setObjectFilter({
                        ...objectFilter,
                        personType: "Previous tenant",
                      });
                      setChecked("5");
                    }}
                  />
                   <TouchableOpacity
                   style={{backgroundColor:'#ffff',shadowColor: "#000",
                   shadowOffset: {
                     width: 0,
                     height: 1,
                   },
                   shadowOpacity: 0.22,
                   shadowRadius: 2.22,borderRadius:8,padding:8}}
                   onPress={() => {
                    setObjectFilter({
                      ...objectFilter,
                      personType: "Previous tenant",
                    });
                    setChecked("5");
                  }}>
                  <TextFilterTo
                    style={{ color: checked == "5" ? "#0133aa" : "#292D32" }}
                  >
                    {"Previous tenant"}
                  </TextFilterTo>
                  </TouchableOpacity>
                  </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <RadioButton
                    value="6"
                    color={"#0133aa"}
                    status={checked === "6" ? "checked" : "unchecked"}
                    onPress={() => {
                      setObjectFilter({
                        ...objectFilter,
                        personType: "Previous owner",
                      });
                      setChecked("6");
                    }}
                  />
                   <TouchableOpacity
                   style={{backgroundColor:'#ffff',shadowColor: "#000",
                   shadowOffset: {
                     width: 0,
                     height: 1,
                   },
                   shadowOpacity: 0.22,
                   shadowRadius: 2.22,borderRadius:8,padding:8}}
                   onPress={() => {
                    setObjectFilter({
                      ...objectFilter,
                      personType: "Previous owner",
                    });
                    setChecked("6");
                  }}>
                  <TextFilterTo
                    style={{ color: checked == "6" ? "#0133aa" : "#292D32" }}
                  >
                    {"Previous owner"}
                  </TextFilterTo>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
                  style={{
                    flexDirection: "row",
                    width: `100%`,
                    alignItems: "center",
                  }}
                >
                   <SpaceH space={20} />
            <TextFilter style={{width: `80%`}}>{"Company"}</TextFilter>
            <SpaceW space={10} />
            <View
                  style={{
                    flexDirection: "row",
                    width: `70%`,
                    alignItems: "center",
                  }}
                >
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              placeholder={"Select a company"}
              setItems={setItems}
              style={{ borderColor: "rgba(174, 193, 218, 1)",  }}
            />
            </View>
            <SpaceH space={20} />
            </View>
            <SpaceH space={20} />
            <View style={{ width: `100%`, alignItems: "center" }}>
              <BlueButtonBlue
                onPress={() => {
                  signalFc()
                  setObjectCreate({ ...objectCreatePage, ...objectFilter });
                  onChangeButton();
                }}
              >
                <TextBlueButtonWith>Apply</TextBlueButtonWith>
              </BlueButtonBlue>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
