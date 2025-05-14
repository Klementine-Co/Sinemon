
import React, { } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";
import StarReview from "./Stars";

export default function Rate(props: reviewprops) {
    const { pageactions, setStars } = props;
    const review = props.review ?? {} as Review;
    const SETSTARS = (arg1: string, arg2: number) => {
        if (setStars !== undefined) { return (setStars(arg1, arg2)) }
    };
    const PAGEACTIONS = () => {
        if (pageactions !== undefined) { return (pageactions()) }
    };

    return (
        <View style={styles.container}>
            <View style={{ borderColor: 'black', borderWidth: 3, flex: 1, maxHeight: 300 }}>
                <Text>
                    Rating Dr. blank
                </Text>
                <View style={{ borderColor: 'black', height: 20 }}>
                    <Text>
                        1 star - not recommended / negative
                    </Text>
                </View>
                <View style={{ borderColor: 'black', height: 20 }}>
                    <Text>
                        2 star - satisfied / neutral
                    </Text>
                </View>
                <View style={{ borderColor: 'black', height: 20 }}>
                    <Text>
                        3 star - recommended / positive
                    </Text>
                </View>
                <View style={{ borderColor: 'black', borderWidth: 3, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ width: 120, textAlign: 'center' }}>
                        Dr Blank
                    </Text>
                    <TouchableOpacity onPress={() => { SETSTARS('drstars', ((review?.dr_stars + 1) % 4)) }}>
                        <StarReview rate={review?.dr_stars} />
                    </TouchableOpacity>
                </View>
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
});