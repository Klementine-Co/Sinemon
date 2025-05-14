import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import { Icon, Input } from '@rneui/themed';

const PrescriptionForm = (props:any) => {

    // const prescriptionfields = [
    //     [{name: 'ndc', label: 'NDC', required: true, type: TYPES.Number}],
    //     {name: 'lot_no', label: 'Lot No', required: true, type: TYPES.Number},
    //     {name: 'prescriber', label: 'Prescriber', required: true, type: TYPES.Number},
    //     {name: 'prescribed_date', label: 'Prescribed Date', required: true, type: TYPES.Date},
    //     {name: 'expiration_date', label: 'Expiration Date', required: true, type: TYPES.Date}
    // ];

    const [ ndc, setndc] = useState<string>('')
    const [ lot_no, setlot_no] = useState<string>('')
    const [ prescriber, setprescriber] = useState<string>('')
    const [ prescribed_date, setprescribed_date] = useState<string>('')
    const [ expiration_date, setexpiration_date] = useState<string>('')

    // let {label, value, errorMessage, placeholder, secure} = props;


    const secure = false;
    const [visible, setVisibility] = useState(secure);


    function onChangeText(type:string, value:string){

        switch (type) {
            case 'ndc':
                setndc(value);
                break;
            case 'lot_no':
                setlot_no(value);
                break;
            case 'prescriber':
                setprescriber(value);
                break;
            case 'prescribed_date':
                setprescribed_date(value);
                break;
            case 'expiration_date':
                setexpiration_date(value);
                break;
            default:
                break;
        }

    }


    const toggleVisibility = () => setVisibility(!visible);

    return (
        <>
        <ScrollView>
        <View style={styles.container}>
            <Input
                label={'National Drug Code'}
                value={ndc}
                placeholder={'NDC'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('ndc', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"#222222"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
        </View>
        <View style={styles.container}>
            <Input
                label={'Lot Number'}
                value={lot_no}
                placeholder={'Lot No'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('lot_no', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"#222222"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
        </View>
        <View style={styles.container}>
            <Input
                label={'Prescriber NPI'}
                value={prescriber}
                placeholder={'Prescriber NPI'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('prescriber', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"#222222"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
        </View>
        <View style={styles.container}>
            <Input
                label={'Prescribed Date'}
                value={prescribed_date}
                placeholder={'Prescribed Date'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('prescribed_date', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"#222222"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
        </View>
        <View style={styles.container}>
            <Input
                label={'Expiration Date'}
                value={expiration_date}
                placeholder={'Expiration Date'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('expiration_date', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"#222222"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            }
        </View>
        </ScrollView>
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
    },

    labelStyle: {
        fontWeight: "400"
    },

    icon: {
        position: 'absolute',
        paddingHorizontal: 8,
        paddingVertical: 4,
        top: 25,
        right: 0
    }
});

export default PrescriptionForm;

