import * as React from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";

export default function FullMap() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    setTimeout(() => {
      mapRef?.current?.getCamera().then((cam) => {
        console.log(cam); 
        cam.center.latitude= 48.142211870984006;
        cam.center.longitude= 11.58264004828484;
        cam.zoom += 8;
        mapRef?.current?.animateCamera(cam);
      });
    }, 3000);

  }, []);
  return (
    <View style={styles.container}>
       <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation
          provider={PROVIDER_GOOGLE}

          zoomEnabled={true}
          scrollEnabled={true}
          rotateEnabled={true}
          
        >
<Marker
             
             coordinate={{
               latitude: 48.142211870984006,
               longitude: 11.58264004828484,
             }}
             showsUserLocation={true}
             showsMyLocationButton={true}
             followsUserLocation={true}
             image={require("../../assets/images/markT.png")}
             title="Test Title"
             description="This is the test description"
           />
</MapView>
    </View>
  );
}
const styles = StyleSheet.create({
    map:{
        width:`100%`,
        height:`100%`
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  