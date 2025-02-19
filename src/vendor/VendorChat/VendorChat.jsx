import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { bgColor, GlobalStyle, margin, padding } from '../../Styles/Theme'
import { useDispatch, useSelector } from 'react-redux'
import { chatService } from '../../Services/chatService'
import ListingCard from '../../Components/Chat/ListingCard'
import Chat from '../../Components/Chat/Chat'
import { resetChatMessages } from '../../Redux/Store/Slices/Chat'

const VendorChat = () => {
    const dispatch = useDispatch();
    const { vendorParticipants, messages } = useSelector(state => state.chat);
    const { event } = useSelector(state => state.pusher);
    const [chatServiceVendorParticipants, setChatServiceVendorParticipants] = useState(null); 

    useEffect(() => {
        setChatServiceVendorParticipants(chatService.vendorParticipants());

        return void(setChatServiceVendorParticipants(null));
    }, []);

    useEffect(() => {
        if(chatServiceVendorParticipants) chatServiceVendorParticipants();
    }, [chatServiceVendorParticipants]);
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
            <View style={[GlobalStyle.container, padding('top', 20)]}>
                <View style={[GlobalStyle.row, GlobalStyle.aic, { justifyContent: 'space-between' }]}>
                    <Text style={[GlobalStyle.secMainHeading]}>Customer Chat</Text>
                </View>
                <View style={[margin('top', 30)]}>
                    <Chat
                        participants={vendorParticipants}
                        messages={messages}
                        get={({ conversationalItem }) => {
                            chatService.fetchMessages(conversationalItem?.user_id)
                        }}
                        post={({ conversationalItem, payload }) => {
                            chatService.sendMessages(conversationalItem?.user_id, payload)
                                .then(() => {
                                    chatService.fetchMessages(conversationalItem?.user_id)
                                })
                        }}
                        reset={() => {
                            if(resetChatMessages) dispatch(resetChatMessages)
                        }}
                        event={event}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default VendorChat;