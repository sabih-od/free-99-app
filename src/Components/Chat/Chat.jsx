// system packages
import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';

// extensions
import ListingCard from './ListingCard';
import ConversationModal from './ConversationModal';
import Styles from './Styles';

import { store } from '../../Redux/Store';
import { setPaginateData, resetChatMessages } from '../../Redux/Store/Slices/Chat';
import { chatService } from '../../Services/chatService';

const Chat = ({
    // participants
    participants = [],
    messages = [],

    // apis
    get = () => {},
    post = () => {},

    // store events
    reset = () => {},

    // listener
    event = null
}) => {
    const [conversationModalVisibility, setConversationModalVisibility] = useState(false);
    const [conversationalItem, setConversationalItem] = useState({});
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);

    useEffect(() => {
        if(!conversationModalVisibility) setData([]);
    }, [conversationModalVisibility]);

    useEffect(() => {
        setData(messages);
    }, [messages]);

    // useEffect(() => {    
    //     const currentPage = messages?.current_page;
    //     const messagesData = messages?.data;

    //     let allData = {};
    //     allData = {...paginateData, ...{[currentPage]: messagesData}};
    //     dispatch(setPaginateData(allData));

    // }, [messages]);

    // useEffect(() => {
    //     let allData = [];

    //     if (paginateData) {
    //         for (const key in paginateData) {
    //             if (Object.prototype.hasOwnProperty.call(paginateData, key)) {
    //             const element = paginateData[key];

    //             if (Array.isArray(element)) {
    //                 allData.push(...element);
    //                 } else if (element) {
    //                     allData.push(element);
    //                 }
    //             }
    //         }
    //     }
        
    //     setData(allData);
    // }, [paginateData]);

    useEffect(() => {
        // fetch the messages as per listener work
        if(event) get({ conversationalItem });
    }, [event]);

    const conversation = (item = null) => {
        // open the conversation modal
        setConversationModalVisibility(true);

        // set the selected friend info for the conversation modal
        setConversationalItem(item);

        // fetch the messages
        get({ conversationalItem: item });
    }

    const onCloseConversation = () => {
        // close the conversation modal
        setConversationModalVisibility(false);

        // reset data of the messages
        setData([])
        
        // reset chat messages state from store (Clear all previous conversations with the current user)
        reset();
    }

    const onSubmitConversation = async(payload) => {
        // save the messages
        post({conversationalItem, payload});
    }

    const onScrollConversation = (event) => {
        // const contentOffsetY = event.nativeEvent.contentOffset.y;

        // if (contentOffsetY <= 0) {
        //     const params = {};
        //     const currentPage = messages?.current_page;
        //     const nextPage = parseInt(currentPage)+1;
        //     params.page = nextPage;
        //     setCurrentPage(nextPage);
            
        //     if(messages?.next_page_url !== null) {
        //         // fetch the messages
        //         get({ conversationalItem, params });
        //     }
        // }
    }
    
    return (
        <>
            <FlatList
                data={participants}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ListingCard item={item} actions={{ conversation }} />}
                ItemSeparatorComponent={<View style={Styles.sep} />}
                contentContainerStyle={{paddingBottom: 10}}
            />

            <ConversationModal
                isVisible={conversationModalVisibility}
                user={conversationalItem}
                data={data}
                onClose={onCloseConversation}
                onSubmit={onSubmitConversation}
                onScroll={onScrollConversation}
                autoScrollEnd={true}
                // isDisableInputArea={isDisableInputArea}
            />
        </>
    );
}

export default Chat;