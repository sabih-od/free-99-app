import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { goBackInHistory } from '../../Redux/Store/Slices/Navigation/Index';

export const useNavigateBack = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const history = useSelector((state) => state.navigation.history);

    const navigateBack = () => {
        // Ensure there are at least two entries in the history
        if (history.length > 1) {
            const previousRoute = history[history.length - 2]; // Get the route before the current one
            dispatch(goBackInHistory()); // Remove the current route
            navigation.navigate(previousRoute); // Navigate to the previous route
        } else if (navigation.canGoBack()) {
            navigation.goBack(); // Use built-in navigation stack fallback
        } else {
            console.warn('No more routes to navigate back to.');
        }
    };

    return navigateBack;
};
