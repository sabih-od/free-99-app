import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bgColor, generalFontSize, GlobalStyle, itemBg, margin, padding, textColor, themeColor, whiteColor } from '../../Styles/Theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLongArrowUp, faSliders } from '@fortawesome/free-solid-svg-icons'
import { Svg, Path, G, Rect, ClipPath, Defs } from 'react-native-svg'
import { userService } from '../../Services/userService'
import { useSelector } from 'react-redux'
import { productService } from '../../Services/productService'
import NotiModal from '../../Components/NotiModal/NotiModal'
import { errorToast, successToast } from '../../Utils/toast'

const VendorWallet = ({ navigation }) => {
    const [loading, setLoading] = useState()
    const { payments } = useSelector((state) => state.user);
    const authData = useSelector((state) => state.auth.data)
    useEffect(() => {
        userService.getWallet();
    }, [])

    useEffect(() => {
    }, [payments])

    cnctWlt = async () => {
        setLoading(true); // Set loading to true before the async operation
        try {
            await userService.connectStripe();
            await userService.getProfile()
            successToast("Wallet Successfully Connected");
            navigation.goBack()
        } catch (error) {
            errorToast("Error connecting Wallet");
        } finally {
            setLoading(false); // Set loading back to false after the async operation completes
            navigation.navigate("addProduct");
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyle.container, padding('top', 25)]}>
                    <View style={GlobalStyle.section}>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                            <Text style={[GlobalStyle.secMainHeading]}>This Month</Text>
                            {/* <TouchableOpacity style={[GlobalStyle.themeBtn, { width: 'auto', paddingHorizontal: 16, backgroundColor: 'transparent' }]}>
                                <FontAwesomeIcon icon={faSliders} color={themeColor} size={generalFontSize + 4} />
                            </TouchableOpacity> */}
                        </View>
                        <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }]}>
                            <View style={GlobalStyle.featureBox}>
                                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                                    <Svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M4.69485 2.34479L0.0409561 21.3965C-0.052364 21.7385 0.0156874 22.1043 0.225724 22.3899C0.435761 22.6754 0.764758 22.8493 1.11899 22.862H5.86727L4.69485 2.34479Z" fill="#F29C1F" />
                                        <Path d="M7.03965 25.2069H5.86724C5.22053 25.2049 4.69676 24.6812 4.69482 24.0345V2.34479H30.4879C31.1346 2.34672 31.6584 2.8705 31.6603 3.5172V17L7.03965 25.2069Z" fill="#F0C419" />
                                        <Path d="M32.8327 17H8.21196C7.56446 17 7.03955 17.5249 7.03955 18.1724V32.8276C7.03955 33.4751 7.56446 34 8.21196 34H32.8327C33.4802 34 34.0051 33.4751 34.0051 32.8276V18.1724C34.0051 17.5249 33.4802 17 32.8327 17Z" fill="#26B99A" />
                                        <Path d="M9.38459 13.4828C10.3559 13.4828 11.1432 12.6954 11.1432 11.7241C11.1432 10.7529 10.3559 9.96552 9.38459 9.96552C8.41334 9.96552 7.62598 10.7529 7.62598 11.7241C7.62598 12.6954 8.41334 13.4828 9.38459 13.4828Z" fill="#F29C1F" />
                                        <Path d="M15.2464 13.4828C16.2177 13.4828 17.005 12.6954 17.005 11.7241C17.005 10.7529 16.2177 9.96552 15.2464 9.96552C14.2752 9.96552 13.4878 10.7529 13.4878 11.7241C13.4878 12.6954 14.2752 13.4828 15.2464 13.4828Z" fill="#F29C1F" />
                                        <Path d="M26.9708 13.4828C27.942 13.4828 28.7294 12.6954 28.7294 11.7241C28.7294 10.7529 27.942 9.96552 26.9708 9.96552C25.9995 9.96552 25.2122 10.7529 25.2122 11.7241C25.2122 12.6954 25.9995 13.4828 26.9708 13.4828Z" fill="#F29C1F" />
                                        <Path d="M20.5224 14.069C20.3669 14.069 20.2179 14.0072 20.1079 13.8972L19.5217 13.311C19.2996 13.081 19.3028 12.7154 19.5289 12.4893C19.755 12.2632 20.1206 12.26 20.3506 12.4821L20.4315 12.563L22.3795 9.64021C22.4957 9.46596 22.6961 9.36696 22.9051 9.3805C23.1141 9.39404 23.3001 9.51806 23.3928 9.70585C23.4856 9.89363 23.4712 10.1167 23.3549 10.2909L21.0101 13.8081C20.9135 13.9551 20.7559 14.0508 20.581 14.069C20.5605 14.069 20.5417 14.069 20.5224 14.069Z" fill="#4FBA6F" />
                                        <Path d="M12.3155 26.9654C13.2868 26.9654 14.0741 26.1781 14.0741 25.2068C14.0741 24.2355 13.2868 23.4482 12.3155 23.4482C11.3442 23.4482 10.5569 24.2355 10.5569 25.2068C10.5569 26.1781 11.3442 26.9654 12.3155 26.9654Z" fill="#81CCB8" />
                                        <Path d="M28.7293 26.9654C29.7006 26.9654 30.4879 26.1781 30.4879 25.2068C30.4879 24.2355 29.7006 23.4482 28.7293 23.4482C27.7581 23.4482 26.9707 24.2355 26.9707 25.2068C26.9707 26.1781 27.7581 26.9654 28.7293 26.9654Z" fill="#81CCB8" />
                                        <Path d="M31.6603 3.5172V7.03444H4.69482V2.34479H30.4879C31.1346 2.34672 31.6584 2.8705 31.6603 3.5172Z" fill="#E64C3C" />
                                        <Path d="M34.0051 29.3104V32.8276C34.0032 33.4743 33.4794 33.9981 32.8327 34H29.3154C29.3154 32.7562 29.8095 31.5634 30.689 30.6839C31.5685 29.8045 32.7613 29.3104 34.0051 29.3104Z" fill="#14A085" />
                                        <Path d="M11.7292 17C11.7292 19.59 9.62957 21.6896 7.03955 21.6896V18.1724C7.04148 17.5257 7.56526 17.0019 8.21196 17H11.7292Z" fill="#14A085" />
                                        <Path d="M11.7292 34H8.21196C7.56526 33.9981 7.04148 33.4743 7.03955 32.8276V29.3104C8.28332 29.3104 9.47615 29.8045 10.3556 30.6839C11.2351 31.5634 11.7292 32.7562 11.7292 34Z" fill="#14A085" />
                                        <Path d="M34.0051 18.1724V21.6896C31.4151 21.6896 29.3154 19.59 29.3154 17H32.8327C33.4794 17.0019 34.0032 17.5257 34.0051 18.1724Z" fill="#14A085" />
                                        <Path d="M29.3155 1.17241C29.3155 0.524908 28.7906 0 28.1431 0C27.4956 0 26.9707 0.524908 26.9707 1.17241V3.51724C26.9707 4.16475 27.4956 4.68966 28.1431 4.68966C28.7906 4.68966 29.3155 4.16475 29.3155 3.51724V1.17241Z" fill="#95A5A5" />
                                        <Path d="M22.8673 1.17241C22.8673 0.524908 22.3424 0 21.6949 0C21.0474 0 20.5225 0.524908 20.5225 1.17241V3.51724C20.5225 4.16475 21.0474 4.68966 21.6949 4.68966C22.3424 4.68966 22.8673 4.16475 22.8673 3.51724V1.17241Z" fill="#95A5A5" />
                                        <Path d="M16.4188 1.17241C16.4188 0.524908 15.8939 0 15.2464 0C14.5989 0 14.074 0.524908 14.074 1.17241V3.51724C14.074 4.16475 14.5989 4.68966 15.2464 4.68966C15.8939 4.68966 16.4188 4.16475 16.4188 3.51724V1.17241Z" fill="#95A5A5" />
                                        <Path d="M9.97081 1.17241C9.97081 0.524908 9.4459 0 8.79839 0C8.15088 0 7.62598 0.524908 7.62598 1.17241V3.51724C7.62598 4.16475 8.15088 4.68966 8.79839 4.68966C9.4459 4.68966 9.97081 4.16475 9.97081 3.51724V1.17241Z" fill="#95A5A5" />
                                        <Path d="M19.7461 33L17.0461 28.29V27.18H17.9461C18.3061 27.18 18.6211 27.13 18.8911 27.03C19.1711 26.92 19.4011 26.765 19.5811 26.565C19.7711 26.365 19.9011 26.125 19.9711 25.845H17.0461V24.735H19.9561C19.8961 24.475 19.7911 24.245 19.6411 24.045C19.5011 23.845 19.3111 23.69 19.0711 23.58C18.8411 23.46 18.5611 23.4 18.2311 23.4H17.0461V22.29H23.8111V23.4H21.4561C21.6261 23.59 21.7661 23.795 21.8761 24.015C21.9961 24.235 22.0761 24.475 22.1161 24.735H23.8111V25.845H22.1461C22.0461 26.585 21.7611 27.165 21.2911 27.585C20.8211 27.995 20.2161 28.275 19.4761 28.425L22.4161 33H19.7461Z" fill="#3ADCBD" />
                                    </Svg>
                                    <Text style={GlobalStyle.featureBoxStatus}>
                                        +5%
                                        <FontAwesomeIcon icon={faLongArrowUp} color={themeColor} size={generalFontSize - 4} />
                                    </Text>
                                </View>
                                <Text style={[GlobalStyle.featureBoxTitle, margin('top', 10)]}>${payments?.allFunds.toFixed(2)}</Text>
                                <Text style={GlobalStyle.featureBoxDesc}>Income</Text>
                            </View>
                            <View style={GlobalStyle.featureBox}>
                                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                                    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M5.90502 5.36163H34.095C34.9839 5.36163 35.7046 6.08234 35.7046 6.97132V13.4141H4.29541V6.97124C4.29541 6.08226 5.01604 5.36163 5.90502 5.36163Z" fill="#DC4955" />
                                        <Path d="M5.9051 5.36165C5.01611 5.36165 4.29541 6.08235 4.29541 6.97134V13.4141H6.66807V6.97126C6.66807 6.08228 7.38877 5.36157 8.27775 5.36157H5.9051V5.36165Z" fill="#C42430" />
                                        <Path d="M34.095 5.36163H23.5649V13.4141H35.7047V6.97124C35.7047 6.08226 34.9841 5.36163 34.095 5.36163Z" fill="#C42430" />
                                        <Path d="M34.0951 35.3715H5.9051C5.01611 35.3715 4.29541 34.6508 4.29541 33.7618V11.1057H35.7046V33.7618C35.7047 34.6508 34.9841 35.3715 34.0951 35.3715Z" fill="#F1F6F7" />
                                        <Path d="M23.5649 13.94C23.5649 14.604 23.8413 15.2447 24.3234 15.6978C24.7744 16.1219 25.3634 16.3553 25.9818 16.3552C26.5656 16.3552 27.13 16.1422 27.5712 15.7554L29.3959 14.1556C29.4393 14.1174 29.4947 14.0964 29.5517 14.0964H35.7047V11.1057H23.5649V13.94Z" fill="#D2E4E7" />
                                        <Path d="M6.76447 24.4591C6.73221 24.4591 6.70025 24.4605 6.66807 24.4608V11.1057H4.29541V33.7618C4.29541 34.6508 5.01611 35.3715 5.9051 35.3715H15.2777C15.4493 34.6875 15.541 33.9721 15.541 33.2355C15.5411 28.3962 11.6039 24.4591 6.76447 24.4591Z" fill="#D2E4E7" />
                                        <Path d="M11.5814 8.60524C10.7168 8.60524 10.0159 7.9043 10.0159 7.03969V3.29907C10.0159 2.43446 10.7168 1.73352 11.5814 1.73352C12.446 1.73352 13.147 2.43446 13.147 3.29907V7.03969C13.147 7.9043 12.446 8.60524 11.5814 8.60524Z" fill="#9BB9C3" />
                                        <Path d="M20.0001 8.60524C19.1355 8.60524 18.4346 7.9043 18.4346 7.03969V3.29907C18.4346 2.43446 19.1355 1.73352 20.0001 1.73352C20.8647 1.73352 21.5657 2.43446 21.5657 3.29907V7.03969C21.5657 7.9043 20.8647 8.60524 20.0001 8.60524Z" fill="#9BB9C3" />
                                        <Path d="M17.9188 19.119H15.7393C15.5171 19.119 15.3369 18.9388 15.3369 18.7166V16.5371C15.3369 16.3149 15.5171 16.1347 15.7393 16.1347H17.9188C18.1411 16.1347 18.3212 16.3149 18.3212 16.5371V18.7166C18.3211 18.9388 18.141 19.119 17.9188 19.119Z" fill="#9BB9C3" />
                                        <Path d="M24.2609 19.119H22.0814C21.8591 19.119 21.679 18.9388 21.679 18.7166V16.5371C21.679 16.3149 21.8591 16.1347 22.0814 16.1347H24.2608C24.4831 16.1347 24.6632 16.3149 24.6632 16.5371V18.7166C24.6633 18.9388 24.4832 19.119 24.2609 19.119Z" fill="#9BB9C3" />
                                        <Path d="M30.6029 19.119H28.4234C28.2012 19.119 28.021 18.9388 28.021 18.7166V16.5371C28.021 16.3149 28.2012 16.1347 28.4234 16.1347H30.6029C30.8251 16.1347 31.0053 16.3149 31.0053 16.5371V18.7166C31.0053 18.9388 30.8251 19.119 30.6029 19.119Z" fill="#DC4955" />
                                        <Path d="M11.5767 24.7307H9.39729C9.17503 24.7307 8.99487 24.5505 8.99487 24.3283V22.1488C8.99487 21.9266 9.17503 21.7464 9.39729 21.7464H11.5767C11.799 21.7464 11.9792 21.9266 11.9792 22.1488V24.3283C11.9792 24.5505 11.799 24.7307 11.5767 24.7307Z" fill="#9BB9C3" />
                                        <Path d="M17.9188 24.7307H15.7393C15.5171 24.7307 15.3369 24.5505 15.3369 24.3283V22.1488C15.3369 21.9266 15.5171 21.7464 15.7393 21.7464H17.9188C18.1411 21.7464 18.3212 21.9266 18.3212 22.1488V24.3283C18.3211 24.5505 18.141 24.7307 17.9188 24.7307Z" fill="#9BB9C3" />
                                        <Path d="M24.2607 24.7307H22.0811C21.8589 24.7307 21.6787 24.5505 21.6787 24.3283V22.1488C21.6787 21.9266 21.8589 21.7464 22.0811 21.7464H24.2606C24.4828 21.7464 24.663 21.9266 24.663 22.1488V24.3283C24.6631 24.5505 24.4829 24.7307 24.2607 24.7307Z" fill="#9BB9C3" />
                                        <Path d="M30.6029 24.7307H28.4234C28.2012 24.7307 28.021 24.5505 28.021 24.3283V22.1488C28.021 21.9266 28.2012 21.7464 28.4234 21.7464H30.6029C30.8251 21.7464 31.0053 21.9266 31.0053 22.1488V24.3283C31.0053 24.5505 30.8251 24.7307 30.6029 24.7307Z" fill="#DC4955" />
                                        <Path d="M17.9188 30.3425H15.7393C15.5171 30.3425 15.3369 30.1624 15.3369 29.9401V27.7606C15.3369 27.5384 15.5171 27.3582 15.7393 27.3582H17.9188C18.1411 27.3582 18.3212 27.5384 18.3212 27.7606V29.9401C18.3211 30.1624 18.141 30.3425 17.9188 30.3425Z" fill="#9BB9C3" />
                                        <Path d="M24.2607 30.3425H22.0811C21.8589 30.3425 21.6787 30.1624 21.6787 29.9401V27.7606C21.6787 27.5384 21.8589 27.3582 22.0811 27.3582H24.2606C24.4828 27.3582 24.663 27.5384 24.663 27.7606V29.9401C24.6631 30.1624 24.4829 30.3425 24.2607 30.3425Z" fill="#9BB9C3" />
                                        <Path d="M11.5767 19.119H9.39729C9.17503 19.119 8.99487 18.9388 8.99487 18.7166V16.5371C8.99487 16.3149 9.17503 16.1347 9.39729 16.1347H11.5767C11.799 16.1347 11.9792 16.3149 11.9792 16.5371V18.7166C11.9792 18.9388 11.799 19.119 11.5767 19.119Z" fill="#9BB9C3" />
                                        <Path d="M30.6029 30.3425H28.4234C28.2012 30.3425 28.021 30.1624 28.021 29.9401V27.7606C28.021 27.5384 28.2012 27.3582 28.4234 27.3582H30.6029C30.8251 27.3582 31.0053 27.5384 31.0053 27.7606V29.9401C31.0053 30.1624 30.8251 30.3425 30.6029 30.3425Z" fill="#DC4955" />
                                        <Path d="M37.7465 12.0844H29.5517C29.0066 12.0844 28.4799 12.2827 28.0692 12.6428L26.2446 14.2426C25.9846 14.4706 25.5769 14.2859 25.5769 13.94V2.26211C25.577 1.01273 26.5859 0 27.8305 0H37.7465C38.9911 0 40 1.01273 40 2.26211V9.82227C40 11.0716 38.9911 12.0844 37.7465 12.0844Z" fill="#7398D4" />
                                        <Path d="M27.8304 0C26.5858 0 25.5769 1.01273 25.5769 2.26211V13.94C25.5769 14.2859 25.9845 14.4706 26.2446 14.2426L26.8802 13.6853V2.26211C26.8803 1.01273 27.8892 0 29.1338 0L27.8304 0Z" fill="#4377C4" />
                                        <Path d="M6.76445 26.4711C3.02852 26.4711 0 29.4997 0 33.2355C0 36.9715 3.02852 40 6.76445 40C10.5003 40 13.5289 36.9715 13.5289 33.2355C13.5289 29.4997 10.5003 26.4711 6.76445 26.4711Z" fill="#FFE17D" />
                                        <Path d="M7.05461 37L5.43461 34.174V33.508H5.97461C6.19061 33.508 6.37961 33.478 6.54161 33.418C6.70961 33.352 6.84761 33.259 6.95561 33.139C7.06961 33.019 7.14761 32.875 7.18961 32.707H5.43461V32.041H7.18061C7.14461 31.885 7.08161 31.747 6.99161 31.627C6.90761 31.507 6.79361 31.414 6.64961 31.348C6.51161 31.276 6.34361 31.24 6.14561 31.24H5.43461V30.574H9.49361V31.24H8.08061C8.18261 31.354 8.26661 31.477 8.33261 31.609C8.40461 31.741 8.45261 31.885 8.47661 32.041H9.49361V32.707H8.49461C8.43461 33.151 8.26361 33.499 7.98161 33.751C7.69961 33.997 7.33661 34.165 6.89261 34.255L8.65661 37H7.05461Z" fill="#FFD164" />
                                        <Path d="M1.80797 33.2356C1.80797 29.8064 4.36023 26.9751 7.66844 26.5331C7.37258 26.4935 7.07117 26.4712 6.76445 26.4712C3.02852 26.4711 0 29.4997 0 33.2356C0 36.9715 3.02852 40 6.76445 40C7.07117 40 7.3725 39.9777 7.66844 39.9381C4.36023 39.496 1.80797 36.6648 1.80797 33.2356Z" fill="#FFD164" />
                                        <Path d="M29.1792 9.94772C28.8556 9.94772 28.5933 9.68538 28.5933 9.36178V4.6178H27.8186C27.4949 4.6178 27.2327 4.35545 27.2327 4.03186C27.2327 3.70827 27.4949 3.44592 27.8186 3.44592H29.1792C29.5029 3.44592 29.7652 3.70827 29.7652 4.03186V9.3617C29.7652 9.68538 29.5029 9.94772 29.1792 9.94772Z" fill="#F1F6F7" />
                                        <Path d="M34.1423 10.0172C33.8377 10.0172 33.5684 9.82365 33.4713 9.53475C33.469 9.52787 33.4667 9.52092 33.4647 9.51389L32.4762 6.16311L31.8751 9.4931C31.8176 9.81162 31.5124 10.0229 31.1944 9.96568C30.8759 9.90818 30.6644 9.60342 30.7218 9.28498L31.6708 4.02701C31.7327 3.70482 31.999 3.46936 32.3198 3.44779C32.6404 3.42576 32.9359 3.62404 33.0383 3.92881C33.0405 3.93561 33.0427 3.94256 33.0448 3.94951L34.1345 7.64334L35.1858 3.95553C35.1877 3.94881 35.1898 3.94209 35.192 3.93537C35.2912 3.62967 35.5849 3.42928 35.9052 3.44701C36.2259 3.46506 36.4948 3.69764 36.5589 4.01248L37.5655 9.27904C37.6262 9.59686 37.4178 9.90381 37.1 9.96451C36.7818 10.0254 36.4752 9.81678 36.4145 9.49896L35.7762 6.15912L34.8217 9.5074C34.8198 9.5142 34.8177 9.521 34.8155 9.52771C34.721 9.81889 34.4519 10.0154 34.1459 10.0171C34.1447 10.0172 34.1434 10.0172 34.1423 10.0172Z" fill="#F1F6F7" />
                                    </Svg>
                                    <Text style={GlobalStyle.featureBoxStatus}>
                                        +5%
                                        <FontAwesomeIcon icon={faLongArrowUp} color={themeColor} size={generalFontSize - 4} />
                                    </Text>
                                </View>
                                <Text style={[GlobalStyle.featureBoxTitle, margin('top', 10)]}>${payments?.withdrawFunds.toFixed(2)}</Text>
                                <Text style={GlobalStyle.featureBoxDesc}>Withdraw</Text>
                            </View>
                            <View style={[GlobalStyle.featureBox, GlobalStyle.fullWidth]}>
                                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between', marginBottom: 10 }]}>
                                    <Svg width="40" height="42" viewBox="0 0 40 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Path d="M3.78841 42H9.59604C9.94272 42 10.2238 41.7189 10.2238 41.3723V36.0691C10.2238 35.7224 9.94272 35.4413 9.59604 35.4413H3.78841C3.44173 35.4413 3.16064 35.7224 3.16064 36.0691V41.3723C3.16064 41.7189 3.44165 42 3.78841 42Z" fill="#4C9CD6" />
                                        <Path d="M28.7113 22.3241H35.3261C35.6728 22.3241 35.9539 22.043 35.9539 21.6964V20.3285C35.9539 19.9818 35.6728 19.7007 35.3261 19.7007H28.7113C28.3646 19.7007 28.0835 19.9818 28.0835 20.3285V21.6964C28.0835 22.043 28.3646 22.3241 28.7113 22.3241Z" fill="#90C962" />
                                        <Path d="M25.0764 10.7476L31.5208 3.22912C31.7826 2.92371 32.255 2.92371 32.5168 3.22912L38.9611 10.7476C39.3258 11.173 39.0235 11.8303 38.4631 11.8303H36.6098C36.2476 11.8303 35.9539 12.1239 35.9539 12.4862V16.4213C35.9539 16.7835 35.6603 17.0772 35.2981 17.0772H28.7394C28.3772 17.0772 28.0836 16.7835 28.0836 16.4213V12.4862C28.0836 12.1239 27.7899 11.8303 27.4277 11.8303H25.5744C25.014 11.8302 24.7117 11.173 25.0764 10.7476Z" fill="#90C962" />
                                        <Path d="M16.5438 17.3448C19.5894 14.2992 19.5894 9.36123 16.5438 6.3156C13.4982 3.26998 8.56022 3.26998 5.5146 6.3156C2.46897 9.36123 2.46897 14.2992 5.5146 17.3448C8.56022 20.3904 13.4982 20.3904 16.5438 17.3448Z" fill="#FFE179" />
                                        <Path d="M11.0311 17.0302C13.903 17.0302 16.2311 14.7021 16.2311 11.8302C16.2311 8.95832 13.903 6.63019 11.0311 6.63019C8.15919 6.63019 5.83105 8.95832 5.83105 11.8302C5.83105 14.7021 8.15919 17.0302 11.0311 17.0302Z" fill="#FFCB5B" />
                                        <Path d="M11.0311 4.03021C10.7258 4.03021 10.4248 4.04834 10.1287 4.08247C14.0113 4.52984 17.0262 7.82765 17.0262 11.8302C17.0262 15.8328 14.0113 19.1306 10.1287 19.5779C10.4248 19.6121 10.7258 19.6302 11.0311 19.6302C15.3389 19.6302 18.8311 16.138 18.8311 11.8302C18.8311 7.5224 15.3389 4.03021 11.0311 4.03021Z" fill="#FFCC66" />
                                        <Path d="M11.0311 6.63025C10.7231 6.63025 10.4219 6.65858 10.1287 6.7099C12.5701 7.13733 14.4263 9.26632 14.4263 11.8303C14.4263 14.3941 12.5702 16.5231 10.1287 16.9507C10.4219 17.002 10.7231 17.0303 11.0311 17.0303C13.9029 17.0303 16.2311 14.7021 16.2311 11.8303C16.231 8.95832 13.9029 6.63025 11.0311 6.63025Z" fill="#FFB85B" />
                                        <Path d="M35.3263 22.3241H33.531C33.8777 22.3241 34.1588 22.0431 34.1588 21.6963V20.3284C34.1588 19.9816 33.8777 19.7006 33.531 19.7006H35.3263C35.673 19.7006 35.954 19.9816 35.954 20.3284V21.6963C35.954 22.0431 35.673 22.3241 35.3263 22.3241Z" fill="#71B956" />
                                        <Path d="M34.1588 16.4213V12.4862C34.1588 12.124 34.4524 11.8303 34.8147 11.8303H36.6099C36.2477 11.8303 35.9541 12.124 35.9541 12.4862V16.4213C35.9541 16.7836 35.6604 17.0772 35.2982 17.0772H33.5029C33.8652 17.0772 34.1588 16.7836 34.1588 16.4213Z" fill="black" />
                                        <Path d="M38.4632 11.8302H36.6679C37.2283 11.8302 37.5305 11.173 37.1659 10.7476L31.1211 3.69539L31.5207 3.22912C31.7825 2.92371 32.2549 2.92371 32.5167 3.22912L38.9611 10.7476C39.3258 11.173 39.0235 11.8302 38.4632 11.8302Z" fill="black" />
                                        <Path d="M33.4537 42.0001H39.2613C39.608 42.0001 39.8891 41.719 39.8891 41.3723V25.5753C39.8891 25.2287 39.608 24.9476 39.2613 24.9476H33.4537C33.107 24.9476 32.8259 25.2287 32.8259 25.5753V41.3723C32.8259 41.719 33.107 42.0001 33.4537 42.0001Z" fill="#4C9CD6" />
                                        <Path d="M39.2614 24.9476H37.4595C37.8062 24.9476 38.0872 25.2287 38.0872 25.5753V41.3723C38.0872 41.719 37.8062 42.0001 37.4595 42.0001H39.2614C39.6081 42.0001 39.8892 41.719 39.8892 41.3723V25.5753C39.8892 25.2287 39.6082 24.9476 39.2614 24.9476Z" fill="#3689C9" />
                                        <Path d="M23.5653 42.0001H29.3729C29.7196 42.0001 30.0007 41.719 30.0007 41.3723V28.1988C30.0007 27.8521 29.7196 27.571 29.3729 27.571H23.5653C23.2186 27.571 22.9375 27.8521 22.9375 28.1988V41.3723C22.9375 41.719 23.2186 42.0001 23.5653 42.0001Z" fill="#4C9CD6" />
                                        <Path d="M29.373 27.571H27.571C27.9177 27.571 28.1988 27.8521 28.1988 28.1988V41.3723C28.1988 41.719 27.9177 42.0001 27.571 42.0001H29.373C29.7197 42.0001 30.0008 41.719 30.0008 41.3723V28.1988C30.0008 27.8521 29.7197 27.571 29.373 27.571Z" fill="#3689C9" />
                                        <Path d="M13.6768 42.0001H19.4845C19.8311 42.0001 20.1122 41.719 20.1122 41.3723V30.8223C20.1122 30.4756 19.8311 30.1945 19.4845 30.1945H13.6768C13.3302 30.1945 13.0491 30.4756 13.0491 30.8223V41.3723C13.0491 41.719 13.3302 42.0001 13.6768 42.0001Z" fill="#4C9CD6" />
                                        <Path d="M19.4836 30.1944H17.6816C18.0283 30.1944 18.3094 30.4755 18.3094 30.8222V41.3723C18.3094 41.7189 18.0283 42 17.6816 42H19.4836C19.8303 42 20.1113 41.7189 20.1113 41.3723V30.8222C20.1113 30.4754 19.8303 30.1944 19.4836 30.1944Z" fill="#3689C9" />
                                        <Path d="M9.59587 35.4408H7.79395C8.14063 35.4408 8.42171 35.7219 8.42171 36.0686V41.3723C8.42171 41.7189 8.14063 42 7.79395 42H9.59587C9.94255 42 10.2236 41.7189 10.2236 41.3723V36.0686C10.2236 35.7219 9.94255 35.4408 9.59587 35.4408Z" fill="#3689C9" />
                                        <Path d="M11.1 15L9.4913 12.1936V11.5322H10.0275C10.3433 11.5322 10.6085 11.4637 10.823 11.3267C11.0375 11.1837 11.1745 10.9871 11.2341 10.7368H9.4913V10.0754H11.2252C11.1715 9.84902 11.0613 9.66133 10.8945 9.51237C10.7277 9.35746 10.4953 9.28 10.1974 9.28H9.4913V8.61862H13.5221V9.28H12.1189C12.3275 9.50642 12.4585 9.77156 12.5122 10.0754H13.5221V10.7368H12.53C12.4705 11.1777 12.2977 11.5233 12.0117 11.7736C11.7316 12.0179 11.3741 12.1847 10.9392 12.2741L12.6909 15H11.1Z" fill="#F8920D" />
                                    </Svg>
                                    <Text style={GlobalStyle.featureBoxStatus}>
                                        +5%
                                        <FontAwesomeIcon icon={faLongArrowUp} color={themeColor} size={generalFontSize - 4} />
                                    </Text>
                                </View>
                                <Text style={[GlobalStyle.featureBoxTitle, margin('top', 10)]}>${payments?.availableFunds.toFixed(2)}</Text>
                                <Text style={GlobalStyle.featureBoxDesc}>Available Funds</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('vendorTransaction')}
                            style={[GlobalStyle.themeBtn2, margin('top', 20)]}
                        >
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <G clip-path="url(#clip0_28_2721)">
                                    <Path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12H4C4 16.418 7.582 20 12 20C16.418 20 20 16.418 20 12C20 7.582 16.418 4 12 4C9.25 4 6.824 5.387 5.385 7.5H8V9.5H2V3.5H4V6C5.824 3.57 8.729 2 12 2ZM13 7V11.585L16.243 14.828L14.828 16.243L11 12.413V7H13Z" fill="#307504" />
                                </G>
                                <Defs>
                                    <ClipPath id="clip0_28_2721">
                                        <Rect width="24" height="24" fill={themeColor} />
                                    </ClipPath>
                                </Defs>
                            </Svg>
                            <Text style={GlobalStyle.themeBtn2Text}>
                                Transaction History
                            </Text>
                        </TouchableOpacity>
                        {!authData?.stripe_account_id && (
                            <TouchableOpacity
                                onPress={cnctWlt}
                                style={[GlobalStyle.themeBtn2, margin('top', 20)]}
                            >
                                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <G clip-path="url(#clip0_28_2729)">
                                        <Path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.653V16.347L12 20.689L19.5 16.347V7.653L12 3.311ZM12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16ZM12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="#307504" />
                                    </G>
                                    <Defs>
                                        <ClipPath id="clip0_28_2729">
                                            <Rect width="24" height="24" fill={themeColor} />
                                        </ClipPath>
                                    </Defs>
                                </Svg>

                                <Text style={GlobalStyle.themeBtn2Text}>
                                    Connect Wallet
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
            <NotiModal modalIsVisible={loading} title={"Loading"} />
        </SafeAreaView>
    )
}

export default VendorWallet

const styles = StyleSheet.create({})