
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { useAppSelector, useAppDispatch } from "../../state/App/hooks";
import * as ACTIONS from "../../state/App/actions";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { useEffect } from "react";
import { COLORS } from "../../constants";

export const RQA = ( item: any, answerAccess: ( arg0: string ) => void ) => {

    console.log( '\n\n\n\nDEBUG', item, '\n\n\n\n\n' );
    return (
        item.currentMessage?.notification_type === 'R' && item.currentMessage?.user._id === 1 &&
        <View style={ { height: ( 100 / 375 ) * ScreenWidth, width: '100%', borderWidth: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'center' } }>

            <View style={ { height: '100%', width: '50%', borderWidth: 0, borderRightWidth: 1, backgroundColor: COLORS.gray, flexDirection: 'column' } }>
                <Text style={ { fontSize: ( 12 / 375 ) * ScreenWidth, color: COLORS.white, fontWeight: 'bold' } }>
                    Approve access
                </Text>
                <View style={ { justifyContent: 'flex-end', flex: 1 } }>
                    <TouchableOpacity onPress={ () => {
                        answerAccess( 'B' );
                    } } style={ { height: '32%', width: '100%', borderTopWidth: 1, backgroundColor: 'aquamarine', alignItems: 'center', justifyContent: 'center' } }>
                        <Text style={ { textAlign: 'center', fontSize: ( 12 / 375 ) * ScreenWidth, color: COLORS.black, fontWeight: 'bold' } }>30 days</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => {
                        answerAccess( 'C' );
                    } } style={ { height: '32%', width: '100%', borderTopWidth: 1, backgroundColor: 'aquamarine', alignItems: 'center', justifyContent: 'center' } }>
                        <Text style={ { textAlign: 'center', fontSize: ( 12 / 375 ) * ScreenWidth, color: COLORS.black, fontWeight: 'bold' } }>90 days</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => {
                        answerAccess( 'D' );
                    } } style={ { height: '32%', width: '100%', borderTopWidth: 1, backgroundColor: 'aquamarine', alignItems: 'center', justifyContent: 'center' } }>
                        <Text style={ { textAlign: 'center', fontSize: ( 12 / 375 ) * ScreenWidth, color: COLORS.black, fontWeight: 'bold' } }>Indefinitely</Text>
                    </TouchableOpacity>

                </View>
            </View>


            <View style={ { height: '100%', width: '50%', borderWidth: 0, borderLeftWidth: 0, backgroundColor: COLORS.gray, flexDirection: 'column' } }>
                {/* <Text style={{fontSize:(12/375)*ScreenWidth}}>
            Approve access
          </Text> */}
                <View style={ { justifyContent: 'center', alignItems: 'center', flex: 1 } }>
                    {/* <View style={{height:'25%', width:'100%', borderWidth:0, backgroundColor:'gold'}}>
            </View> */}
                    <TouchableOpacity onPress={ () => {
                        answerAccess( 'N' );
                    } } style={ { height: '45%', width: '100%', borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: 'tomato', alignItems: 'center', justifyContent: 'center' } }>
                        <Text style={ { textAlign: 'center', fontSize: ( 12 / 375 ) * ScreenWidth, color: COLORS.black, fontWeight: 'bold' } }>Do not approve</Text>
                    </TouchableOpacity>
                    {/* <View style={{height:'25%', width:'100%', borderWidth:0, backgroundColor:'gold'}}>
            </View> */}

                </View>
            </View>
        </View> );
};
