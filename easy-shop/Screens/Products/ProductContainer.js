import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import ProductList from "./ProductList";
import Banner from '../../shared/Banner';
import SearchedProduct from "./SearchedProducts";

const data = require("../../assets/data/products.json");
// const category = require("../assets/data/categories.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState([]); 
  const [initialSate, setinItialSate] = useState([]); 

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(categories);
    setActive(-1)
    setinItialSate(data)

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([])
      setActive([])
      setinItialSate([])
    };
  }, []);

  const searchProduct = (text) => {
    console.log("This is ---- " + text);
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(true);
  };

  return (
    <View>
      <SearchBar
        showLoading={false}
        platform={Platform.OS}
        clearIcon={true}
        placeholder="Seach.."
        onFocus={openList}
        onChangeText={(text) => searchProduct(text)}
        style={styles.input}
        cancelButtonTitle="Cancel"
      />

       
        {focus == true ? (
          <SearchedProduct productsFiltered={productsFiltered} />
        ) : (
          <ScrollView> 
          <View style={styles.container}>
            <View>
                  <Banner />
            </View>
           
            <View style={styles.listContainer}>
              <FlatList
                data={products}
                numColumns={2}
                renderItem={({ item }) => (
                  <ProductList key={item.brand} item={item} />
                )}
                keyExtractor={(item) => item.brand}
              />
            </View>
          </View>
          </ScrollView>
        )}
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "#fff",
  },
  listContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  input: {
    backgroundColor: "gainsboro",
    color: "black",
  },
});
export default ProductContainer;
