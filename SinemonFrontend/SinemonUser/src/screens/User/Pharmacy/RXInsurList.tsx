
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Image
} from 'react-native';
// import _, { } from 'lodash';
import { COLORS, icons } from '../../../constants';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

export const RXInsurList = ({ route, navigation }: accountProp) => {

    const rxinsurances = route.params.rxinsurances
    const [visible, setVisible] = useState(true);

    function Item({ item }: UserDataItem | any) {
        if (item.id_member != undefined) {
            return (
                <>
                    <TouchableOpacity onPress={() => navigation.navigate("RXCard", { screen: 'RXC', item })} >
                        <View style={styles.listItem}>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
                                <Text style={{fontSize: (14/375)*ScreenWidth, color:COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5 }}>Insurer: {item.insurer}</Text>
                                <Text style={{ fontSize: (14/375)*ScreenWidth, color:COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5 }}>Member ID: {item.id_member}</Text>
                                <Text style={{fontSize: (14/375)*ScreenWidth, color:COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5 }}>Group no: {item.group_no}</Text>
                            </View>
                            <View style={{ height: (70/375)*ScreenWidth, width: '50%', justifyContent: "flex-end", alignSelf: 'flex-end' }}>
                                <Text style={{ fontSize: (14/375)*ScreenWidth, color:COLORS.primary }}>Benefit Plan: {item.benefit_plan}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            );
        } else {
            return (
                <TouchableOpacity  >
                    <View style={styles.listItem}> </View>
                </TouchableOpacity>
            );
        }
    }
    const RXList = () => {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity style={{  flex: 0 }}
          onPress={() => {
              navigation.goBack()
          }}>
                <Image
                                source={icons.back}
                                style={{
                                    width: (20/375)*ScreenWidth,
                                    height: (20/375)*ScreenWidth,
                                    top:(50/375)*ScreenWidth,
                                    marginBottom: (30/375)*ScreenWidth,
                                    
                                }}
                            />
                </TouchableOpacity>
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <View style={{ width: '35%', height: (55/375)*ScreenWidth, borderRadius: 10, marginTop: 15, marginRight: 15, marginLeft: '60%' }}>
                                </View>
                            </>}
                        style={{ alignSelf: 'center', width: '90%',marginTop: 15,  }}
                        data={rxinsurances}
                        keyExtractor={(item, index) => item.id_member.toString()}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                </View>
            </View>
        );
    }

    return (
        <>
            {
                (visible === true) ? (<RXList />) : (rxinsurance)
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%'
    },
    listItem: {
        marginTop: 15,
        backgroundColor: "#FFF",
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'gold',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});
const clubpickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 100,
        color: 'black',
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});

