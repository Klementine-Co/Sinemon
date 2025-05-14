
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import { COLORS } from "../../constants";

export default function Reviews_Guide(props: reviewprops) {
    const { pageactions } = props;
    const PAGEACTIONS = () => {
        if (pageactions !== undefined) { return (pageactions()) }
    };
    return (
        <View style={styles.container}>
            <View style={{ borderColor: 'black', borderWidth: 3, flex: 1, maxHeight: 300 }}>
                <Text>
                    Although we recognize other factors in dispensing care are important,
                    please review only the care received pertaining
                    to the reason for visting and/or the health outcome
                    on the next few screens.

                    Bedside manner, the doctors office, and staff were rated on previous screen;
                    these factors can also be edited at the end before submitting.

                    if your comment is not made public you will
                    receive an in app message explaining why with sugestive edits.
                </Text>
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