
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { COLORS } from "../../constants";
import StarReview from "./Stars";

export default function Ratings(props: reviewprops) {

    const { pageactions, setStars } = props;
    const review = props.review ?? {} as Review;
    const ratings = ["Bedside Manner", "Office", "Staff"]
    const SETSTARS = (arg1: string, arg2: number) => {
        if (setStars !== undefined) { return (setStars(arg1, arg2)) }
    };
    const PAGEACTIONS = () => {
        if (pageactions !== undefined) { return (pageactions()) }
    };

    return (
        <View style={styles.container}>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 120 }}>
                <Text>
                    Because we strive to omit bedside manner reviews, doctors office reviews, and staff reviews
                    from the reviews relating to the doctors ability to dispense care.
                </Text>
                <Text>
                    We recognize their
                    importance and the part they play in deciding care.
                </Text>
                <Text>
                    Please rate these items on this screen only.
                </Text>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 30 }}>
                <Text>
                    1 star - not recommended / negative
                </Text>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 30 }}>
                <Text>
                    2 star - satisfied / neutral
                </Text>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 30 }}>
                <Text>
                    3 star - recommended / positive
                </Text>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 30, flex: .2 }}>
                <Text>
                    Thank you for you cooperation in supporting quality healthcare.
                </Text>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    Dr Blank's
                </Text>
                <Text style={{ width: 120, textAlign: 'center' }}>
                    {ratings[2]}
                </Text>
                <TouchableOpacity onPress={() => { SETSTARS('staffstars', ((review?.staff_stars + 1) % 4)) }}>
                    <StarReview rate={review?.staff_stars} />
                </TouchableOpacity>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    Dr Blank's
                </Text>
                <Text style={{ width: 120, textAlign: 'center' }}>
                    {ratings[1]}
                </Text>
                <TouchableOpacity onPress={() => { SETSTARS('officestars', ((review?.office_stars + 1) % 4)) }}>
                    <StarReview rate={review?.office_stars} />
                </TouchableOpacity>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 3, height: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    Dr Blank's
                </Text>
                <Text style={{ width: 120, textAlign: 'center' }}>
                    {ratings[0]}
                </Text>
                <TouchableOpacity onPress={() => { SETSTARS('bedsidestars', ((review?.bedside_stars + 1) % 4)) }}>
                    <StarReview rate={review?.bedside_stars} />
                </TouchableOpacity>
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