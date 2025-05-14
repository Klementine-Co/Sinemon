import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { COLORS, icons } from '../../../constants';

export const DRXInsurList = ({ route, navigation }: accountProp) => {

    const drxinsurances = route.params.rxdiscounts;

    function Item({ item }: UserDataItem | any) {
        if (item.id_member != undefined) {
            return (
                <>
                    <TouchableOpacity onPress={() => navigation.navigate("RXDiscCard", { screen: 'RXDiscCard', item })}>
                        <View style={styles.listItem}>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: '50%' }}>
                                <Text style={{fontSize: (14/375)*ScreenWidth, color:COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5 }}>Insurer: {item.insurer}</Text>
                                <Text style={{fontSize: (14/375)*ScreenWidth, color:COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5 }}>Member ID: {item.id_member}</Text>
                            </View>

                            <View style={{ height: (70/375)*ScreenWidth, width: '50%', justifyContent: "flex-end", alignSelf: 'flex-end' }}>
                            </View>
                        </View>
                    </TouchableOpacity>
                </>
            );
        } else {
            return (
                <TouchableOpacity  >
                    <View style={styles.listItem}></View>
                </TouchableOpacity>
            );
        }
    }

    const DRXList = () => {
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
                                <View style={{ 
                                    width: '35%', 
                                    height: (55/375)*ScreenWidth, 
                                    borderRadius: 10, 
                                    marginTop: 15, 
                                    marginRight: 15, 
                                    marginLeft: '60%' 
                                }}>
                                </View>
                            </>}
                        style={{ alignSelf: 'center', width: '90%',marginTop: 15, }}
                        data={drxinsurances}
                        keyExtractor={(item) => item.id_member.toString()}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                </View>
            </View>
        );
    }

    return (
        <>
            {
                (<DRXList />)
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

export default DRXInsurList;
