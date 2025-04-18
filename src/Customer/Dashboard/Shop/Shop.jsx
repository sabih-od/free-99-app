import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {bgColor, GlobalStyle, margin, padding} from '../../../Styles/Theme';
import Categories from '../../../Components/Categories/Categories';
import Products from '../../../Components/Products/Products';
import {useSelector} from 'react-redux';
import NotiModal from '../../../Components/NotiModal/NotiModal';
import HomeProducts from '../../../Components/HomeProducts/HomeProducts';

const Shop = () => {
  const loading = useSelector(state => state.auth.loading);
  const searchInput = useRef();
  const [isProductLoading, setIsLoading] = useState(loading);
  const [searchValue, setSearchValue] = useState('');
  const [showHomeProducts, setShowHomeProducts] = useState(true);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const handleClearInput = () => {
    setSearchValue('');
    if (searchInput.current) {
      searchInput.current.clear();
    }
  };

  const handleCategoryPress = () => {
    setShowHomeProducts(false);
  };

  return (
    <SafeAreaView style={{backgroundColor: bgColor, flex: 1}}>
      {/* <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          if (searchInput.current) {
            searchInput.current.focus();
          }
        }}
      >
        <View style={[GlobalStyle.input, GlobalStyle.row, GlobalStyle.aic, { height: 40, paddingHorizontal: 0, paddingLeft: 20 }]}>
          <FontAwesomeIcon icon={faSearch} color={'#828282'} size={generalFontSize - 4} />
          <TextInput
            ref={searchInput}
            style={{ marginLeft: 10, height: 40, flex: 1 }}
            placeholder="Search"
            placeholderTextColor="#828282"
            value={searchValue}
            onChangeText={setSearchValue}
          />
          {searchValue.length > 0 && (
            <TouchableOpacity style={styles.clearBtn} activeOpacity={0.8} onPress={handleClearInput}>
              <FontAwesomeIcon icon={faTimesCircle} color={'#828282'} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[GlobalStyle.container, padding('top', 15)]}>
          <Categories
            mainTitle={'Categories'}
            onCategoryPress={handleCategoryPress}
          />
          {isProductLoading ? (
            <NotiModal
              canHide
              modalIsVisible={isProductLoading}
              title={'Loading'}
            />
          ) : (
            <View style={margin('top', 10)}>
              {showHomeProducts ? <HomeProducts /> : <Products />}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  clearBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
});
