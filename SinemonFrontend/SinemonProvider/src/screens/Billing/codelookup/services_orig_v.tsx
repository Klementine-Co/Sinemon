import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View, Text} from 'react-native';
import { Icon, Input } from '@rneui/themed';
// import RNPickerSelect from 'react-native-picker-select';

const ServiceForm = (props:any) => {


    const [ service, setservice] = useState<string>('')
    const [ fromdate, setfromdate] = useState<string>('')
    const [ todate, settodate] = useState<string>('')
    const [ dx, setdx] = useState<string>('')
    const [ status, setstatus] = useState<string>('')

    // let {label, value, errorMessage, placeholder, secure} = props;


    const secure = false;
    const [visible, setVisibility] = useState(secure);


    const MX_DATA = [
        {
          id: '1',
          desc: 'mx1',
        },
        {
          id: '2',
          desc: 'mx2',
        },
        {
          id: '3',
          desc: 'mx3',
        },
        {
          id: '4',
          desc: 'mx4',
        },
    ]

    const DX_DATA = [
        {
          id: '1',
          desc: 'dx1',
        },
        {
          id: '2',
          desc: 'dx2',
        },
        {
          id: '3',
          desc: 'dx3',
        },
        {
          id: '4',
          desc: 'dx4',
        },
        {
          id: '5',
          desc: 'dx5',
        },
        {
          id: '6',
          desc: 'dx6',
        },
        {
          id: '7',
          desc: 'dx7',
        },
        {
          id: '8',
          desc: 'dx8',
        },
        {
          id: '9',
          desc: 'dx9',
        },
      ];
    const CODES = [
        {
          item: '1',
          label: '1',
          value: 'dx1',
          name: 'dx1',
        },
        {
          item: '2',
          label: '2',
          value: 'dx2',
          name: 'dx2',
        },
        {
          item: '3',
          label: '3',
          value: 'dx3',
          name: 'dx3',
        },
        {
          item: '4',
          label: '4',
          value: 'dx4',
          name: 'dx4',
        },
        {
          item: '5',
          label: '5',
          value: 'dx5',
          name: 'dx5',
        },
        {
          item: '6',
          label: '6',
          value: 'dx6',
          name: 'dx6',
        },
        {
          item: '7',
          label: '7',
          value: 'dx7',
          name: 'dx7',
        },
        {
          item: '8',
          label: '8',
          value: 'dx8',
          name: 'dx8',
        },
        {
          item: '9',
          label: '9',
          value: 'dx9',
          name: 'dx9',
        },
      ];
      


    function onChangeText(type:string, value:string){

        switch (type) {
            case 'service':
                setservice(value);
                break;
            case 'fromdate':
                setfromdate(value);
                break;
            case 'todate':
                settodate(value);
                break;
            case 'dx':
                setdx(value);
                break;
            case 'status':
                setstatus(value);
                break;
            default:
                break;
        }

    }


    const toggleVisibility = () => setVisibility(!visible);

    const renderItem = ({ item }:any) => (
        <View style={styles.item}>
            {/* <Text>{item.desc}</Text> */}
            <Text style={[styles.label, styles.labelStyle]}>{item.desc}</Text>
                {/* <RNPickerSelect  items={CODES} 
                 onValueChange={value => {
                    if(value == 0){
                    // setClubs(soccer.filter(x => x.country === country).map( obj=> obj.club));
                    } 
                    else{
                    // setLeague(getLeagues(leagues, value)[0]);
                    }
                    }}
                value={0}
                //  onValueChange={onValueChange}
                 /> */}
          </View>
          
      )

    return (
        <>
        <View style={{flex:1}}>
        <View style={{...styles.container}}>
            <Input
                label={'Service'}
                value={service}
                placeholder={'Service Code'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('service', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"grey"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
           
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingVertical:10}}>
            <>
        <Input
                label={'Units'}
                value={service}
                placeholder={'Units'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('service', value)}
                containerStyle={{...styles.blockcontainerStyle, paddingRight:15}}
                // containerStyle={styles.containerStyle}
                labelStyle={styles.blocklabelStyle} 
                autoCompleteType={undefined}            />
                </>
                <>
        <Input
                label={'Minutes'}
                value={service}
                placeholder={'Minutes'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('service', value)}
                containerStyle={styles.blockcontainerStyle}
                // containerStyle={styles.containerStyle}
                labelStyle={styles.blocklabelStyle} 
                autoCompleteType={undefined}            />
            
                </>
           
        </View>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingVertical:10}}>
        <>
            <Input
                label={'From'}
                value={fromdate}
                placeholder={'From'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('fromdate', value)}
                containerStyle={{...styles.blockcontainerStyle, paddingRight:15}}
                // containerStyle={styles.containerStyle}
                labelStyle={styles.blocklabelStyle}
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"#222222"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
            </>
                <>
            <Input
                label={'To'}
                value={todate}
                placeholder={'To'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('todate', value)}
                containerStyle={styles.blockcontainerStyle}
                // containerStyle={styles.containerStyle}
                labelStyle={styles.blocklabelStyle}
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"#222222"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
            </>
        </View>
        <View style={{...styles.container, margin:0}}>
        <Input
                label={'Place of Service'}
                value={service}
                placeholder={'Place of Service Code'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('service', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"grey"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
           
        </View>
        
        </View>
        <View style={{...styles.container, marginBottom:30}}>
                    <FlatList
                    ListHeaderComponent={
                        <>
                         <View style={{marginTop:0}}>
                            <Text style={{...styles.labelStyle, fontSize:18, color:'grey'}}> Modifier Codes</Text>
                         </View>
                        </>}
                    numColumns={4}
                    data={MX_DATA}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
        {/* </View>
        <View style={styles.container}> */}
                    <FlatList
                    ListHeaderComponent={
                        <>
                         <View style={{marginTop:0}}>
                            <Text style={{...styles.labelStyle, fontSize:18, color:'grey'}}>ICD-10-CM Diagnosis Codes</Text>
                         </View>
                        </>}
                    numColumns={3}
                    data={DX_DATA}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
        </View>
        </>
    )
};




const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        marginTop: 14
    },

    containerStyle: {
        paddingHorizontal: 0,
        // flex:.5
    },
    blockcontainerStyle: {
        paddingHorizontal: 0,
        flex:1,
        
    },

    labelStyle: {
        fontWeight: "400",
    },
    blocklabelStyle: {
        fontWeight: "400",
        // paddingVertical:0,
        // marginVertical:0,
        // minHeight:10
    },

    icon: {
        position: 'absolute',
        paddingHorizontal: 8,
        paddingVertical: 4,
        top: 25,
        right: 0
    },
    item: {
        backgroundColor: '#fff000',
        padding: 10,
        flex:1,
        margin: 5,
      },
      label:{color:"#86939e", fontSize: 16},
});

export default ServiceForm;

