import React, {useEffect, useState} from 'react';
import {Text, ScrollView, View, Image, Button} from "react-native";

import {Api} from "../../utils/Api";

const Topic = ({route, navigation}) => {
    console.log(route);
    const [threads, setThreads] = useState([]);
    useEffect(() => {
        Api.GET(`https://2ch.hk/${route.params.id}/index.json`)
            .then(threads => setThreads(threads.threads))
    }, [])
    console.log(threads);
    return (
        <ScrollView>
            {threads.map(thread => {
                return (
                    <View key={thread.thread_num}>
                        {thread.posts.map(post => {
                            return (
                                <View key={post.num}>
                                    {post.files.map(file => {
                                        return (
                                            <Image key={file.md5}
                                                   style={{width: file.tn_width, height: file.tn_height}}
                                                   source={{uri: `https://2ch.hk${file.thumbnail}`}}/>
                                        )
                                    })}
                                    <Text>{post.comment}</Text>
                                </View>
                            )
                        })}
                        <Button title="Ответить"
                                onPress={() => navigation.navigate('Thread', {
                                    category: route.params.id,
                                    topic: thread.thread_num
                                })}/>
                    </View>
                )
            })}
        </ScrollView>
    );
};

export default Topic;