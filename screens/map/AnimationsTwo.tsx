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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { SpaceH } from "../../components/space";
import CustomDrawerContent from "./CustomDrawerContent";
import MenuTwo from "./menuTwo";
import addMap from "../../assets/images/addMap.png";
import findMe from "../../assets/images/findMe.png";
import OpenItem from "./openItem";
import Menu from "./menu";
const width = Dimensions.get("window").width;
export default function AnimationsTwo({openMark,setOpenMark,open, navigation, onChange, type ,itemSelect}) {
  useEffect(() => {
    if (open) {
      openAnimation();
    } else {
      closeAnimation();
    }
  }, [open]);
  useEffect(() => {
    if (playedOnce) {
      openAnimationTree();
    } else {
      closeAnimationTree();
    }
  }, [playedOnce]);
  useEffect(() => {
    console.log("openMark",openMark);
    
    if (openMark!="") {
      setChangeC(false)
      onChange(openMark);
      openAnimation();
    } else {
      
    }
  }, [openMark]);
  const [animation, setAnimation] = useState(new Animated.Value(1));
  const [played, setPlayed] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(false);
  const [changeC, setChangeC] = useState(false);

  const openAnimationTree = () => {
    setPlayed(true);
    setPlayedOnce(true);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 2,
        duration: 950,
        useNativeDriver: false,
      }),
    ]).start(() => {});
  };
  const closeAnimationTree = () => {
    setPlayed(false);
    setPlayedOnce(false);
    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 950,
        useNativeDriver: false,
      }),
    ]).start(() => {});
  };
  const openAnimation = () => {
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
      onChange();
      openAnimation();
    } else {
      closeAnimation();
    }
  };

  const yInterpolate = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [`0%`, `60%`],
  });
  const yInterpolateOnce = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [`0%`, `90%`],
  });
  const boxStyle = {
    width: !playedOnce ? yInterpolate : yInterpolateOnce,

  };
  let yInterpolateMenu = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [325, 325],
  });
  let yInterpolateMenuTrue = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [`90%`, `33%`],
  });
  const boxStyleMenu = {
    width: yInterpolateMenuTrue,
 
  };
  return (
    <View style={styles.container}>
     
      {!playedOnce ? (
        <>
          {type ? (
            <Animated.View style={[styles.box, boxStyleMenu]}>
              <Menu
                typeList={type}
                openObject={changeC}
                
                onChange={(item) => {
                  setChangeC(true)
                  onChange(item);
                  openAnimation();
                }}
              />
            </Animated.View>
          ) : (
            <View style={[styles.box, { width: 325 }]}>
              <Menu
              openObject={changeC}
                typeList={type}
                onChange={(item) => {
                  setChangeC(false)
                  onChange(item);
                  openAnimation();
                }}
              />
            </View>
          )}
        </>
      ) : null}
      {type ? (
        <Animated.View style={[styles.box, boxStyle]}>
          {played ? (
            <OpenItem
             itemSelect={itemSelect}
              onChange={() => {
                setPlayedOnce(false);
                setChangeC(false)
                onChange();
                closeAnimation();
                setOpenMark("")
               
              }}
              onLarge={() => {
                openAnimationTree();
               
              }}
              navigation={navigation}
            />
          ) : null}
        </Animated.View>
      ) : null}
      {!type ? (
        <Animated.View style={[styles.box, boxStyle]}>
          {played ? (
            <OpenItem
            itemSelect={itemSelect}
              onLarge={() => {
                setPlayedOnce(!playedOnce);
              }}
              onChange={() => {
                setPlayedOnce(false);
                setChangeC(false)
                onChange();
                closeAnimation();
                setOpenMark("")

              }}
              navigation={navigation}
            />
          ) : null}
        </Animated.View>
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
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  box: {
    width: 500,
    height: `100%`,
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
