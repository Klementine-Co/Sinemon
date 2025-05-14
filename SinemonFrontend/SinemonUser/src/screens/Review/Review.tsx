
import React from "react";
import { ReactNode, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput
} from "react-native";
import { COLORS } from "../../constants";

export default function Review(props: reviewprops) {
    const { pageactions, pageaction, commenttype, setComment } = props;

    useEffect(() => {
        if (commenttype === undefined) {
            pageaction !== undefined ? pageaction(5) : undefined;
        };
    },[]);

    const [value, onChangeText] = React.useState('');

    const setcomment = (text: string, type: string) => {
        if (setComment !== undefined) { setComment(text, type) }
    }

    const PAGEACTIONS = () => {
        if (pageactions !== undefined) { return (pageactions()) }
    };
    const COMMENT_TYPES = {
        A: 'SATISFIED'
        , B: 'NOT SATISFIED'
        , C: 'ECSTATIC'
        , D: 'DISAPPOINTED'
        , E: 'OVER'
        , F: 'LIVID'
    }

    function SATISFIED(type: string) {
        return (
            <>
                <View style={{ borderColor: 'black', maxHeight: 50, flex: 1 }}>
                    <Text>
                        I was satisfied with dr blank because he was kind and polite.
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 30, flex: 1 }}>
                    <Text>
                        and instead reviews like:
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 60, flex: 1 }}>
                    <Text>
                        I was satisfied with dr blank because he addressed all my complaints and I'm clear on my prognosis.
                    </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    I was satisfied with dr blank because,
                </Text>
                <TextInput style={styles.input} multiline={true} returnKeyType={'done'} returnKeyLabel={'done'} blurOnSubmit={true} onSubmitEditing={() => { setcomment(value, type) }} onChangeText={(text) => onChangeText(text)}>
                </TextInput>
            </>
        );
    };

    function NOTSATISFIED(type: string) {
        return (
            <>
                <View style={{ borderColor: 'black', maxHeight: 50, flex: 1 }}>
                    <Text>
                        I was not satisfied with dr blank because he had bad bedside manner.
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 30, flex: 1 }}>
                    <Text>
                        and instead reviews like:
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 60, flex: 1 }}>
                    <Text>
                        I was not satisfied with dr blank because he did not explain a plan of care after my visit for getting better.
                    </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    I was not satisfied with dr blank because,
                </Text>
                <TextInput style={styles.input} multiline={true} returnKeyType={'done'} returnKeyLabel={'done'} blurOnSubmit={true} onSubmitEditing={() => { setcomment(value, type) }} onChangeText={(text) => onChangeText(text)}>
                </TextInput>
            </>
        )
    };

    function ECSTATIC(type: string) {
        return (
            <>
                <View style={{ borderColor: 'black', maxHeight: 50, flex: 1 }}>
                    <Text>
                        I am ecstatic with dr blank because dr blank is great at treating patients.
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 30, flex: 1 }}>
                    <Text>
                        and instead reviews like:
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 60, flex: 1 }}>
                    <Text>
                        I am ecstatic with dr blank because dr blank treated my condition and im better now.
                    </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    I am ecstatic with dr blank because,
                </Text>
                <TextInput style={styles.input} multiline={true} returnKeyType={'done'} returnKeyLabel={'done'} blurOnSubmit={true} onSubmitEditing={() => { setcomment(value, type) }} onChangeText={(text) => onChangeText(text)}>
                </TextInput>
            </>
        )
    };
    function DISAPPOINTED(type: string) {
        return (
            <>
                <View style={{ borderColor: 'black', maxHeight: 50, flex: 1 }}>
                    <Text>
                        I am disappointed with dr blank because dr blank and his staff were rude.
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 30, flex: 1 }}>
                    <Text>
                        and instead reviews like:
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 60, flex: 1 }}>
                    <Text>
                        I am disappointed with dr blank because I suspect dr blank did not treat my condition.
                    </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    I am disappointed with dr blank because,
                </Text>
                <TextInput style={styles.input} multiline={true} returnKeyType={'done'} returnKeyLabel={'done'} blurOnSubmit={true} onSubmitEditing={() => { setcomment(value, type) }} onChangeText={(text) => onChangeText(text)}>
                </TextInput>
            </>
        )
    };
    function OVER(type: string) {
        return (
            <>
                <View style={{ borderColor: 'black', maxHeight: 50, flex: 1 }}>
                    <Text>
                        I am over the moon with dr blank because dr blank saved my life.
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 30, flex: 1 }}>
                    <Text>
                        and instead reviews like:
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 60, flex: 1 }}>
                    <Text>
                        I am over the moon with dr blank because dr blank caught a misdiagnosed condition and I am now in better health.        </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    I am over the moon with dr blank because,
                </Text>
                <TextInput style={styles.input} multiline={true} returnKeyType={'done'} returnKeyLabel={'done'} blurOnSubmit={true} onSubmitEditing={() => { setcomment(value, type) }} onChangeText={(text) => onChangeText(text)}>
                </TextInput>
            </>
        )
    };

    function LIVID(type: string) {
        return (
            <>
                <View style={{ borderColor: 'black', maxHeight: 50, flex: 1 }}>
                    <Text>
                        I am livid with dr blank because if I kept going to Dr blank i would be worse.
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 30, flex: 1 }}>
                    <Text>
                        and instead reviews like:
                    </Text>
                </View>
                <View style={{ borderColor: 'black', maxHeight: 60, flex: 1 }}>
                    <Text>
                        I am livid with dr blank because dr blank misdiagnosed my condition for years that was caught later by dr blank2 and improved my health.        </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                    I am livid with dr blank because,
                </Text>
                <TextInput style={styles.input} multiline={true} returnKeyType={'done'} returnKeyLabel={'done'} blurOnSubmit={true} onSubmitEditing={() => { setcomment(value, type) }} onChangeText={(text) => onChangeText(text)}>
                </TextInput>
            </>
        )
    };

    function reviewType(type: string | undefined) {
        switch (type) {
            case COMMENT_TYPES.A:
                return (SATISFIED(type));
            case COMMENT_TYPES.B:
                return (NOTSATISFIED(type));
            case COMMENT_TYPES.C:
                return (ECSTATIC(type));
            case COMMENT_TYPES.D:
                return (DISAPPOINTED(type));
            case COMMENT_TYPES.E:
                return (OVER(type));
            case COMMENT_TYPES.F:
                return (LIVID(type));
            default:
                break;
        };
    }

    return (
        <View style={styles.container}>
            <View style={{ borderColor: 'black', borderWidth: 3, flex: 1, maxHeight: 500 }}>
                <Text> Try to avoid reviews like: </Text>
                {reviewType(commenttype)}
            </View>
            {PAGEACTIONS()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: 50,
    },
    listItem: {
        marginTop: 15,
        backgroundColor: "#FFF",
        width: "90%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
});