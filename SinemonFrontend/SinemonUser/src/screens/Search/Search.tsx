import React, {useState} from 'react';
import { Header } from '@rneui/themed';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput
} from 'react-native';
import { images, icons, COLORS} from '../../constants';
import { ImageBackground } from 'react-native';
import * as APICALLS from "../../constants/API_CALLS";
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export const Search = ({route,  navigation }:searchProp) => {

    const [destinations, setDestinations] = React.useState([
        [{
        id: 0,
        name: "mdSense",
        headline: "",
        media: images.orlandoFC_player,
        info: "mdSense is a democratic platform where you can review, be informed, and make decisions based on your preferences",
        footnote: "mdSense",
        sc: 23,
        tag:'article',
        HeaderCard:true,
        header:'Club',
        category: 'club',
        },]
    ]);

    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zc, setZc] = useState('95678');

    const getResults = async () => {
        try {
            // const location = await APICALLS.getLocation(zc); //Used for production
            const location = await APICALLS.getLocation();//Used for debug
            navigation.navigate("SearchResults", { location });
        } catch (error) {
            console.error("Failed to fetch location:", error);
            // Handle error appropriately
        }
    };

    return (
        <View style={styles.container}>
            <Header
            containerStyle = {{
                height: '6%',
                width:'100%',
                backgroundColor: 'grey',
                justifyContent: 'space-around',
            }}
            placement="left"
            />    
            <ScrollView style = {{ height:'100%'}}>
                <View style = {{ 
                    marginBottom:50, 
                    flex:1, 
                    marginTop:20,
                    marginLeft:8,
                    marginRight:8,
                    borderWidth:0.1,
                    height:(400/375)*ScreenWidth,
                    borderRadius:25,
                    backgroundColor:COLORS.white,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 10,
                }}>
                    <View style = {{
                        height:120, 
                        marginTop:20,
                        marginLeft:5,
                        marginRight:5
                    }}>
                        <View style = {styles.view1}>
                            <Text style = {{ 
                                color:'black', 
                                fontSize:(16/375)*ScreenWidth
                            }}>
                                Making healthcare more
                            </Text>
                            <Text style = {{ fontSize:(16/375)*ScreenWidth }}>
                                equitable and virtuous
                            </Text>
                        </View>
                        <View style = {{
                            width:'25%', 
                            height:'90%', 
                            justifyContent:'center', 
                            alignSelf:'flex-end', 
                            marginRight:15
                        }}>
                            <ImageBackground
                                source={images.logo}
                                borderRadius={100}
                                resizeMode="cover"
                                style = {{ 
                                    height:'100%', 
                                    width:'100%', 
                                    borderRadius:12, 
                                    flex:1, 
                                    justifyContent:'center',
                                    alignSelf:'center',
                                    marginTop:8
                            }}>  
                            </ImageBackground>
                        </View>
                    </View>
                    <View>
                        <SafeAreaView style={{ flex:1 }}>
                            <TextInput
                                style={styles.zipcode}
                                keyboardType='number-pad'
                                maxLength={5}
                                placeholder="XXXXX"
                                onChangeText={(value) =>
                                    {
                                        if (value.length == 5) {
                                            setZc(value)
                                        }
                                    }
                                }
                            />
                        </SafeAreaView>  
                    </View>
                    {/* <View style={{
                        width:'90%', 
                        height:'15%',
                        alignSelf:'center', 
                        marginTop:10
                    }}>
                    </View> */}
                    <TouchableOpacity 
                        style={styles.button}  
                        onPress={getResults}
                    >
                        <Text style={styles.buttonText}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listItem:{
        marginTop: 25,
        backgroundColor:"#FFF",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5,
        marginBottom:10
        
    },
    zipcode:{
        textAlign:'center',
        // flex:1,
        margin: 10,
        padding: 20,
        height: (60/375)*ScreenWidth,
        borderWidth: 0.2,
        borderRadius: 15,
        fontSize: (22/375)*ScreenWidth,
        backgroundColor: 'white',
        marginTop:'20%',
    },
    button:{
        backgroundColor:COLORS.primary, 
        width:'40%', 
        alignSelf:'center', 
        marginTop:'20%', 
        borderRadius:25,
        marginBottom:15,
        top:'20%'
    },
    buttonText:{
        fontSize:(24/375)*ScreenWidth, 
        textAlign:'center', 
        marginVertical:5,
        color: 'white'
    },
    view1:{
        position:'absolute', 
        height:'70%', 
        width:'60%', 
        top:10, 
        left:15, 
        justifyContent:'center' 
    }
});

const clubpickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 1,
        color: 'black',
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        height:'100%',
        width:'100%'
    },
    inputAndroid: {
        fontSize: (16/375)*ScreenWidth,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});
