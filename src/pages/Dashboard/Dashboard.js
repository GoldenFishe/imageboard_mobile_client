import React, {useEffect, useState, memo} from 'react';
import {View, Button, Text, ScrollView, StyleSheet, TextInput} from 'react-native';

import {Api} from "../../utils/Api";

const Dashboard = ({navigation}) => {
    const [topics, setTopics] = useState({});
    const [filteredTopics, setFilteredTopics] = useState({});
    const [topicFilter, setTopicFilter] = useState('');
    useEffect(() => {
        Api.GET('https://2ch.hk/makaba/mobile.fcgi?task=get_boards')
            .then(topics => {
                console.log(topics);
                setTopics(topics);
                setFilteredTopics(topics);
            })
    }, [])
    const filterTopics = filter => {
        const clone = {...topics};
        for (let category in clone) {
            const filteredCategory = clone[category].filter(topic => new RegExp(filter, 'igm').test(topic.name));
            !filteredCategory.length ? delete clone[category] : clone[category] = filteredCategory;
        }
        setFilteredTopics(clone);
        setTopicFilter(filter);
    }
    return (
        <ScrollView style={styles.container}>
            <TextInput value={topicFilter}
                       placeholder="Поиск по категории"
                       style={styles.filterInput}
                       onChangeText={filterTopics}/>
            {Object.keys(filteredTopics).map(category => {
                return (
                    <View key={category}
                          style={styles.category}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        <View>
                            {filteredTopics[category].map(topic => {
                                return <Button key={topic.name}
                                               style={styles.topicLink}
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

export default memo(Dashboard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    filterInput: {
        borderWidth: 1,
        borderColor: '#eaeaea',
        padding: 10,
        borderRadius: 10
    },
    category: {
        marginTop: 40
    },
    categoryTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    }
});