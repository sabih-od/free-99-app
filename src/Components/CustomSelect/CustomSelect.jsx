import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { blackColor, fontFamily, generalFontSize, isDarkMode, isIpad, whiteColor } from '../../Styles/Theme';

const CustomSelect = ({ data, currentStatus, onValueChange }) => {
    const [displayName, setDisplayName] = useState(currentStatus || "Select item");
    const [value, setValue] = useState(null);

    useEffect(() => {
        onValueChange(value);
    }, [value]);

    const renderItem = item => (
        <View style={styles.item}>
            <Text style={styles.textItem}>{item.name}</Text>
        </View>
    );

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            maxHeight={300}
            labelField="name"
            valueField="id"
            placeholder={displayName}
            value={value}
            onChange={item => {
                setDisplayName(item.name);
                setValue(item.id);
            }}
            renderItem={renderItem}
        />
    );
};

export default CustomSelect;

const styles = StyleSheet.create({
    dropdown: {
        marginTop: 10,
        height: isIpad ? 70 : 50,
        borderRadius: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: whiteColor,
        borderColor: '#0005'
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: blackColor,
        borderBottomWidth: 1,
        borderBottomLeftRadius: 10
    },
    textItem: {
        flex: 1,
        ...fontFamily('regular'),
        fontSize: generalFontSize - 4,
        fontWeight: '400',
        lineHeight: isIpad ? generalFontSize + 10 : 18,
        textAlign: 'left',
        color: '#828282',
    },
    placeholderStyle: {
        ...fontFamily('regular'),
        fontSize: generalFontSize - 4,
        fontWeight: '400',
        lineHeight: isIpad ? generalFontSize + 10 : 18,
        textAlign: 'left',
        color: '#828282',
    },
    selectedTextStyle: {
        ...fontFamily('regular'),
        fontSize: generalFontSize - 4,
        fontWeight: '400',
        lineHeight: isIpad ? generalFontSize + 10 : 18,
        textAlign: 'left',
        color: '#828282',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: generalFontSize,
        color: blackColor,
        ...fontFamily('regular'),
    },
});
