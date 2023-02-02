import React from "react";
import { StyleSheet, Image, View,SafeAreaView } from "react-native";
// import {SafeAreaView} from 'react-native-safe-area-view';

const Header = () => {
  return (
 
      <SafeAreaView style={styles.header}>
      <Image style={styles.appLogo}
        source={require("../assets/Logo.jpg")}
        resizeMode="contain"
      />
    </SafeAreaView>
  
    
  )
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 20
  },
  appLogo: {
    marginTop: 100,
    height: 50
  }
})
export default Header;