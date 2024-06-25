import Toast from 'react-native-toast-message'


export const successToast = (message) => {
    Toast.show({
        type: 'success',
        text1: message
    });
}

export const errorToast = (message) => {
    Toast.show({
        type: 'error',
        text1: message
    });
}

export const infoToast = (message) => {
    Toast.show({
        type: 'info',
        text1: message
    });
}