import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, Image, Text } from "react-native";
// import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";
// import { Avatar,Content,ListItem,Text} from '@rneui/themed';

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFiltered } = props;

  return (
    <ScrollView style={{width: width}}>
      <Text styles={styles.textProducts}>Products</Text>

      {
      
      productsFiltered.length > 0 ? (
        productsFiltered.map((item) => {
          return (
            <View key={item._id} style={styles.itemContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: item.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
  
              <View>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.textdescription}>{item.description}</Text>
              </View>
            </View>
          );
        })
      ):(
        <View>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
  }, 
  image:{
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600"
  },
  textdescription:{
    fontSize: 14,
    marginLeft: 10,
    color: "grey",
  },
});

export default SearchedProduct;
