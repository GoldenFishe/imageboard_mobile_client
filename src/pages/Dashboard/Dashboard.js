import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Button, Text, ScrollView} from 'react-native';

import {Api} from "../../utils/Api";

const Dashboard = ({navigation}) => {
    const [topics, setTopics] = useState({});
    useEffect(() => {
        Api.GET('https://2ch.hk/makaba/mobile.fcgi?task=get_boards')
            .then(topics => setTopics(topics))
    }, [])
    console.log(topics);
    return (
        <ScrollView>
            {Object.keys(topics).map(category => {
                return (
                    <View key={category}>
                        <Text>{category}</Text>
                        <View>
                            {topics[category].map(topic => {
                                return <Button key={topic.name}
                                               title={topic.name}
                                               onPress={() => navigation.navigate('Topic', {id: topic.id})}/>
                            })}
                        </View>
                    </View>
                )
            })}
        </ScrollView>
    );
};

export default Dashboard;