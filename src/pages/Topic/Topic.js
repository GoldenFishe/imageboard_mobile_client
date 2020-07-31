import React, {useEffect, useState, memo} from 'react';
import {Text, ScrollView, View, Image, Button, StyleSheet} from "react-native";

import {Api} from "../../utils/Api";

const Topic = ({route, navigation}) => {
    const [threads, setThreads] = useState([]);
    useEffect(() => {
        Api.GET(`https://2ch.hk/${route.params.id}/index.json`)
            .then(threads => setThreads(threads.threads))
    }, [])
    console.log(threads);
    return (
        <ScrollView style={styles.container}>
            {threads.map(thread => {
                return (
                    <View key={thread.thread_num}
                          style={styles.thread}>
                        {thread.posts.map(post => {
                            return (
                                <View key={post.num}
                                      style={styles.post}>
                                    {post.files.map(file => {
                                        return (
                                            <Image key={file.md5}
                                                   style={{
                                                       width: file.tn_width,
                                                       height: file.tn_height, ...styles.postImage
                                                   }}
                                                   source={{uri: `https://2ch.hk${file.thumbnail}`}}/>
                                        )
                                    })}
                                    <Text style={styles.postComment}>{post.comment}</Text>
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

export default memo(Topic);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"
    },
    thread: {
        borderBottomWidth: 1,
        borderBottomColor: '#cfcdcd',
        paddingBottom: 20,
        paddingTop: 20,
        // marginBottom: 20
    },
    post: {
        borderBottomWidth: 1,
        borderColor: '#eaeaea',
        // marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    postImage: {
        // marginBottom: 5
    },
    postComment: {
        fontSize: 15
    }
});