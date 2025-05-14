import { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from "react-native";
import { COLORS } from "../../constants";

export default function Assessment(props: reviewprops) {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userOption, setUserOption] = useState<null | string>(null);
    const { pageaction, dispatch, answerQuestion, review } = props;
    const PAGEACTION = (arg: number) => {
        if (pageaction !== undefined) { return (pageaction(arg)) }
    };
    const ANSWERQUESTION = (arg: Question, arg1: number) => {
        if (answerQuestion !== undefined) { return (answerQuestion(arg, arg1)) }
    };
    const questions: Question[] = review?.questions !== undefined ? review?.questions : [] as Question[];

    type answer = {
        value: string,
        key: number
    }
    const data = [
        { value: 'Yes', key: 1 },
        { value: 'No', key: 3 },
    ] as answer[];

    function answer(answer: answer, questiion_answered: Question) {

        setUserOption(answer.value);
        const question = { answer: answer.value, question: questiion_answered.question, id: questiion_answered.id } as Question;

        dispatch(ANSWERQUESTION(question, question.id))
    };

    function RadioButton(arg: Question) {
        return (
            <View style={{ width: '100%' }}>
                <Text style={{ fontSize: 28, textAlign: 'center' }}> {arg.question} </Text>
                <View style={{ borderWidth: 2, }}>
                    {data.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => answer(item, arg)} style={{
                                ...item.value === userOption ? styles.selected : styles.unselected,
                                borderWidth: 2, height: 40, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text style={{ ...styles.option, textAlign: 'center', fontSize: 15 }} > {item.value}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        );
    };

    const finish = () => {
        PAGEACTION(1);
        setUserOption(null);
    };

    function pageactions() {

        if (questionIndex < 1) {
            if (questionIndex < 0) {
                setQuestionIndex(0);
                setUserOption(null);
            };
            return (
                <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, alignSelf: 'center', marginTop: 30, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setQuestionIndex(questionIndex + 1), setUserOption(null) }}>
                    <Text style={{ alignSelf: 'center' }}>
                        Next
                    </Text>
                </TouchableOpacity>
            )
        } else if (questionIndex == 5) {
            return (
                <View style={{ height: 45, width: 300, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setQuestionIndex(questionIndex - 1), setUserOption(null) }}>
                        <Text style={{ alignSelf: 'center' }}>
                            Previous
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={finish}>
                        <Text style={{ alignSelf: 'center' }}>
                            Finish
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {

            return (
                <View style={{ height: 45, width: 300, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setQuestionIndex(questionIndex - 1), setUserOption(null) }}>
                        <Text style={{ alignSelf: 'center' }}>
                            Previous
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setQuestionIndex(questionIndex + 1), setUserOption(null) }}>
                        <Text style={{ alignSelf: 'center' }}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ borderColor: 'black', borderWidth: 3, flex: 1, maxHeight: 300, alignItems: 'center' }}>
                {RadioButton(questions[questionIndex] as Question)}
            </View>
            {
                pageactions()
            }
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
    option: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    unselected: {
        backgroundColor: COLORS.primary,
        margin: 5,
    },
    selected: {
        backgroundColor: COLORS.neutral,
        margin: 6,
        padding: 10,
        borderRadius: 10,
    },
});