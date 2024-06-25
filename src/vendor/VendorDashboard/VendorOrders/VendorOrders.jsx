// Import the necessary components
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator, FlatList, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { bgColor, generalFontSize, GlobalStyle, padding, textColor, whiteColor, windowHeight } from '../../../Styles/Theme';
import { OrderMinCard } from '../../../Components/OrderCard/OrderCard';
import { vendorOrderService } from '../../../Services/vendorOrderService';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const VendorOrders = ({ navigation }) => {
  const [order, setOrder] = useState([]);
  const vendorOrderData = useSelector((state) => state.vendorOrder.newOrder);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('')

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      setLoading(true);
      await vendorOrderService.getVendorOrders();
    } catch (error) {
      console.error('Failed to fetch Orders:', error);
    } finally {
      setLoading(false);
    }
    setRefreshing(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await vendorOrderService.getVendorOrders();
      } catch (error) {
        console.error('Failed to fetch Orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setOrder(vendorOrderData);
    // console.log("vendorOrderData=> ", vendorOrderData)
  }, [vendorOrderData]);

  const filteredOrders = order.filter((item) =>
    item.order_number.toString().includes(search)
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: Dimensions.get('window').width - 40, alignSelf: 'center', marginTop: 30 }}
      >
        <View style={[GlobalStyle.input, GlobalStyle.row, GlobalStyle.aic, { height: 40, paddingHorizontal: 0, paddingLeft: 20 }]}>
          <FontAwesomeIcon icon={faSearch} color={'#828282'} size={generalFontSize - 4} />
          <TextInput
            // ref={searchInputRef}
            style={{ marginLeft: 10, height: 40, flex: 1 }} // Adjust spacing as needed
            placeholder="Search"
            placeholderTextColor="#828282"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          {/* <TouchableOpacity
                            style={{ marginRight: 15, backgroundColor: '#307504', height: 35, width: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
                            onPress={()=>{}}>
                            <FontAwesomeIcon icon={faSearch} color={'#ffffff'} size={generalFontSize - 4} />
                        </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} tintColor={whiteColor} onRefresh={onRefresh} />
        }
      >
        <View style={[GlobalStyle.container, padding('top', 25)]}>
          {/* <View style={GlobalStyle.section}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>This Month</Text>
                            <TouchableOpacity style={[GlobalStyle.themeBtn, { width: 'auto', paddingHorizontal: 16 }]}>
                                <Text style={GlobalStyle.themeBtnText}>All reports</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', flexWrap: 'wrap' }]}>
                            {genericData.map((item, index) => (
                                <View style={GlobalStyle.featureBox} key={index}>
                                    <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                                        <View style={GlobalStyle.featureBoxIcon}>
                                            <FontAwesomeIcon icon={item.sign} color={whiteColor} size={generalFontSize} />
                                        </View>
                                        <Text style={GlobalStyle.featureBoxStatus}>
                                            {item.pnl}
                                            <FontAwesomeIcon icon={faLongArrowUp} color={themeColor} size={generalFontSize - 4} />
                                        </Text>
                                    </View>
                                    <Text style={GlobalStyle.featureBoxTitle}>{item.title}</Text>
                                    <Text style={GlobalStyle.featureBoxDesc}>{item.desc}</Text>
                                </View>
                            ))}
                        </View>
                    </View> */}
          <View style={[GlobalStyle.section,]}>
            <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', paddingBottom: 10 }]}>
              <Text style={[GlobalStyle.secMainHeading, { flex: 1 }]}>Orders</Text>
            </View>

            {loading ? (
              <View style={{ alignItems: 'center', justifyContent: 'center', minHeight: windowHeight - 150 }}>
                <ActivityIndicator size="large" color={whiteColor} />
              </View>
            ) : (
              <>
                {filteredOrders?.length > 0 ? (
                  <View style={{ gap: 20, paddingBottom: 20 }}>
                    <FlatList
                      style={{ height: '100%' }}
                      contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={filteredOrders}
                      renderItem={({ item }) => (
                        <OrderMinCard item={item} />
                      )}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
                    <Text style={{ ...GlobalStyle.mainTitle, color: textColor }}>No Orders Found</Text>
                  </View>
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VendorOrders;
