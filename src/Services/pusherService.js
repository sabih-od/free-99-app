import { Pusher } from "@pusher/pusher-websocket-react-native";
import { BASE_URL, PUSHER_APP_KEY, PUSHER_APP_CLUSTER } from "../Constants";
import { useSelector } from "react-redux";
import { Alert } from "react-native";
import { store } from "../Redux/Store";
import { setPusher, resetPusher } from "../Redux/Store/Slices/Pusher";

const pusher = Pusher.getInstance();
const token = store.getState().auth.token;

export class PusherService {
  static connectPusher = async () => {
    await pusher.init({
      apiKey: PUSHER_APP_KEY,
      cluster: PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: `${BASE_URL}/api/broadcasting/auth`,
      onAuthorizer: (channelName, socketId) => {
        return new Promise((resolve, reject) => {
          fetch(`${BASE_URL}/api/broadcasting/auth`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              channel_name: channelName,
              socket_id: socketId,
            }),
          })
          .then(response => response.json())
          .then(data => {
            Alert.alert('response');
            if (data.auth) {
              resolve({
                auth: data.auth,
                channel_data: JSON.stringify({ user_id: data.user_id }),
              });
            } else {
              reject(new Error("Authorization failed"));
            }
          })
          .catch(error => {
            Alert.alert('error');
            console.error('Authorization error:', error);
            reject(error);
          });
        });
      },
    });
    
    await pusher.connect();
    
    await store.dispatch(setPusher(pusher));
    console.log("Pusher Connected!");
    return pusher;
  };

  static disconnectPusher = async () => {
    try {
      if (pusher) {
        await pusher.disconnect();
        await store.dispatch(resetPusher());
        console.log("Pusher disconnected");
      }
    } catch (error) {
      console.log("Error disconnecting from Pusher:", error);
    }
  };
}