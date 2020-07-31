import React, {useEffect, useState, memo} from 'react';
import {ScrollView, View, Text} from 'react-native';

import {Api} from "../../utils/Api";

const Thread = ({route}) => {
    console.log(route);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        Api.GET(`https://2ch.hk/${route.params.category}/res/${route.params.topic}.json`)
            .then(posts => setPosts(posts.threads[0].posts))
    }, [])
    console.log(posts);
    return (
        <ScrollView>
            {posts.map(post => {
                return (
                    <View key={post.num}>
                        <Text>{post.comment}</Text>
                    </View>
                )
            })}
        </ScrollView>
    );
};

export default memo(Thread);