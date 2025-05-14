
import { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";
import Ratings from "./Ratings";
import Reviews_Guide from "./Reviews_Guide";
import Review_Guide from "./Review_Guide";
import Rate from "./Rate";
import Review from "./Review";
import Assessment from "./Assessment";
import { useAppDispatch, useAppSelector } from "../../state/App/hooks";
import * as actions from '../../state/App/actions';

export default function Reviews(props: any) {

    const [pageIndex, setPageIndex] = useState(0);
    const [commenttype, setCommentType] = useState<string | undefined>(undefined);
    const dispatch = useAppDispatch();
    const myvisit = useAppSelector((state) => state.myvisit);
    const user = useAppSelector((state) => state.user);
    const review = myvisit.review;

    function setStars(type: string, stars: number) {
        dispatch(actions.rateVisit({ type: type, rating: stars } as Rate));
    };

    function setComment(text: string, type: string) {
        dispatch(actions.commentVisit({ comment: text, comment_type: type } as VisitComment));
    };

    function submitreview() {
        dispatch(actions.review(user.myid, myvisit.prov, user.crsf, myvisit.review));
    };

    const pages = [
        <Assessment pageaction={setPageIndex} dispatch={dispatch} answerQuestion={actions.answerQuestion} review={review} />
        , <Ratings pageactions={pageactions} setStars={setStars} review={review} />
        , <Reviews_Guide pageactions={pageactions} />
        , <Review_Guide pageaction={setPageIndex} pageactions={pageactions} leaveComment={setCommentType} />
        , <Review pageactions={pageactions} pageaction={setPageIndex} commenttype={commenttype} setComment={setComment} />
        , <Rate leaveComment={setCommentType} pageactions={pageactions} setStars={setStars} commenttype={commenttype} review={review} />]

    function pageactions() {
        if (pageIndex < 1) {
            if (pageIndex < 0) {
                setPageIndex(0);
            };
            return (
                <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, alignSelf: 'center', marginTop: 30, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setPageIndex(pageIndex + 1) }}>
                    <Text style={{ alignSelf: 'center' }}>
                        Next
                    </Text>
                </TouchableOpacity>
            )
        } else if (pageIndex == 5) {
            return (
                <View style={{ height: 45, width: 300, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setPageIndex(pageIndex - 2) }}>
                        <Text style={{ alignSelf: 'center' }}>
                            Previous
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={submitreview}>
                        <Text style={{ alignSelf: 'center' }}>
                            Finish
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{ height: 45, width: 300, marginTop: 30, flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setPageIndex(pageIndex - 1) }}>
                        <Text style={{ alignSelf: 'center' }}>
                            Previous
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ borderWidth: 3, height: 45, width: 120, backgroundColor: 'lightblue', justifyContent: 'center' }} onPress={() => { setPageIndex(pageIndex + 1) }}>
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
            {pages[pageIndex]}
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