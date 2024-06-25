import React, { useEffect } from 'react';
import DashboardNavigation from '../../Navigation/CustomerNavigation/DashboardNavigation';
import { countryStateService } from '../../Services/countryStateService';

const Dashboard = ({ navigation }) => {
    useEffect(() => {
        countryStateService.getCountries();
        countryStateService.getStates()
    }, []);
    return (
        <DashboardNavigation navigation={navigation} />
    );
}


export default Dashboard;
