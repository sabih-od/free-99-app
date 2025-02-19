import React, {useState, useEffect} from 'react';
import {View, FlatList, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import ListingCard from './Components/ListingCard';
import ConversationModal from './Components/ConversationModal';
// import { GetAdminChatMessagesAPI, GetBotMessagesAPI, SendBotMessageAPI } from '../../Store/Actions/ChatActions';
import { store } from '../../Redux/Store';
import { setPaginateData, resetChatMessages } from '../../Redux/Store/Slices/Chat';
import { Routes } from '../../Constants/Routes';
import { chatService } from '../../Services/chatService';
import { Pusher } from "@pusher/pusher-websocket-react-native";
import { PusherService } from '../../Services/pusherService';
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from '../../Constants';

const Chat = ({
    participants = []
}) => {
    const dispatch = useDispatch(); 
    const [conversationModalVisibility, setConversationModalVisibility] = useState(false);
    const [conversationalItem, setConversationalItem] = useState({});
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(null);
    
    const { messages, paginateData } = useSelector(state => state.chat);
    const { authId } = useSelector(state => state.auth);
    const { event } = useSelector(state => state.pusher);

    useEffect(() => {    
        const currentPage = messages?.current_page;
        const messagesData = messages?.data;

        let allData = {};
        allData = {...paginateData, ...{[currentPage]: messagesData}};
        dispatch(setPaginateData(allData));

    }, [messages]);

    useEffect(() => {
        if(!conversationModalVisibility) setData([]);
    }, [conversationModalVisibility]);

    useEffect(() => {
        let allData = [];

        if (paginateData) {
            for (const key in paginateData) {
                if (Object.prototype.hasOwnProperty.call(paginateData, key)) {
                const element = paginateData[key];

                if (Array.isArray(element)) {
                    allData.push(...element);
                } else if (element) {
                    allData.push(element);
                }
                }
            }
        }
        
        setData(allData);
    }, [paginateData]);

    useEffect(() => {
        chatService.fetchMessages(conversationalItem?.id);
    }, [event]);

    const conversation = (item = null) => {
        // open the conversation modal
        setConversationModalVisibility(true);

        // set the selected friend info for the conversation modal
        setConversationalItem(item);

        chatService.fetchMessages(item?.id);
        
    }

    const onCloseConversation = () => {
        // close the conversation modal
        setConversationModalVisibility(false);
        
        // reset chat messages state from store (Clear all previous conversations with the current user)
        store.dispatch(resetChatMessages());
    }

    const onSubmitConversation = async(payload) => {
        chatService.sendMessages(conversationalItem?.id, payload).then(() => {
            chatService.fetchMessages(conversationalItem?.id);
        });
    }

    const onScrollConversation = (event) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;

        if (contentOffsetY <= 0) {
            const params = {};
            const currentPage = messages?.current_page;
            const nextPage = parseInt(currentPage)+1;
            params.page = nextPage;
            setCurrentPage(nextPage);
            
            if(messages?.next_page_url !== null) {
                chatService.fetchMessages(conversationalItem?.id, params);
            }
        }
    }
    
    return (
        <>
            <FlatList
                data={participants}
                keyExtractor={item => item.id}
                renderItem={({item}) => <ListingCard item={item} actions={{ conversation }} />}
                ItemSeparatorComponent={<View style={styles.sep} />}
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
            />
        </>
    );
}

export default Chat;