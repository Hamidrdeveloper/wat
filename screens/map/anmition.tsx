/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import { Linking, Pressable, TouchableOpacity } from "react-native";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View,
  Animated,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { SpaceH } from "../../components/space";
import CustomDrawerContent from "./CustomDrawerContent";
import MenuTwo from "./menuTwo";
import addMap from "../../assets/images/addMap.png";
import findMe from "../../assets/images/findMe.png";
import UpdateScreen from "./update";
import { ObjectContext } from "../../service/object/Object.context";
export default function Animations({setOpenObject, open, openObject,onUpdate,changeTheme,watchLocation }) {
  const [played, setPlayed] = useState(open);
  const [type, setType] = useState(false);
  const {setReactAnimation} = useContext(ObjectContext)

  useEffect(() => {
    setPlayed(open);
  }, [open]);

  const [animation, setAnimation] = useState(new Animated.Value(1));
  const openAnimation = () => {
    setTimeout(() => {
      setOpenObject(false);
    }, 100);
    
    setPlayed(true);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 2,
        duration: 950,
        useNativeDriver: false,
      }),
    ]).start(() => {});
  };
  const closeAnimation = () => {
    setTimeout(() => {
      setOpenObject(false);
    }, 100);
    setPlayed(false);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 950,
        useNativeDriver: false,
      }),
    ]).start(() => {});
  };

  const startAnimation = () => {
    if (!played) {
      openAnimation();
    } else {
      closeAnimation();
    }
  };

  const yInterpolate = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [90, 230],
  });

  const boxStyle = {
    width: yInterpolate,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, boxStyle]}>
        {played ? (
          <CustomDrawerContent
            type={type}
            onUpdate={onUpdate}
            openObject={(x) => {
              setReactAnimation(true);
              setTimeout(() => {
                setReactAnimation(false)
        
              }, 1500);
              openObject(x);
              closeAnimation();
              setType(x);
            }}
          />
        ) : (
          <>
            <MenuTwo
              type={type}
              onUpdate={onUpdate}
              openObject={(x) => {
                setReactAnimation(true);
                setTimeout(() => {
                  setReactAnimation(false)
          
                }, 1500);
                openObject(x);
                closeAnimation();
                setType(x);
              }}
            />
          </>
        )}
      </Animated.View>
      {played ? (
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            right: 20,
            top: 30,
            elevation: 8,
            zIndex: 100,
          }}
          onPress={() => {
            closeAnimation();
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/images/closedr.png")}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            right: 20,
            top: 30,
            elevation: 8,
            zIndex: 100,
          }}
          onPress={() => {
            openAnimation();
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../../assets/images/opendr.png")}
          />
        </TouchableOpacity>
      )}
      {!type ? (
        <View style={{ height: `100%`, width: 48, justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
              // objectTemplateFc();
              // navigation.navigate("AddOnMapScreen");
              changeTheme();
            }}
          >
            <Image style={{ width: 48, height: 48 }} source={addMap} />
          </TouchableOpacity>

          <SpaceH space={15} />
          <TouchableOpacity
            onPress={() => {
              watchLocation();
            }}
          >
            <Image style={{ width: 48, height: 48 }} source={findMe} />
          </TouchableOpacity>
        </View>
      ) : null}
      
    </View>
  );
}

const styles = StyleSheet.create({
  aicon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  container: {
    position: "absolute",
    height: "100%",
    left: 0,
    flexDirection: "row",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  box: {
    width: 80,
    height: `100%`,
    backgroundColor: "#fff",
    elevation: 8,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  boxShadow: {
    width: "100%",
    height: 177,
    backgroundColor: "rgba(0,0,0,0.07)",
    position: "absolute",
  },
});
