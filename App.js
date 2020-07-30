import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from "./src/pages/Dashboard/Dashboard";
import Thread from "./src/pages/Thread/Thread";
import Topic from "./src/pages/Topic/Topic";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard}/>
                <Stack.Screen name="Topic" component={Topic}/>
                <Stack.Screen name="Thread" component={Thread}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
