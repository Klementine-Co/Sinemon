import { useState } from "react";
import { View, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Text, Button } from "react-native";
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import * as actions from "../../../state/App/actions";
import { useAppDispatch, useAppSelector } from "../../../state/App/hooks";
import { COLORS } from "../../../constants";
export const SignIn = () => {

    const dispatch = useAppDispatch();
    const user = useAppSelector( ( state ) => state.user );
    const navigation = useNavigation<signInProp>();
    const [ loginState, setLoginState ] = useState( {
        success: {
            status: false,
            color: 'grey',
            placeholder: '',
            show: false,
            passwordSet: false
        },
        password: '',
        email: '',
        loading: false
    } );
    const yourInputProps = {
        darkPrimaryColor: true,
        headline: true,
        semibold: true,
    };
    const titleProps = {
        darkPrimaryColor: true,
        bold: true,
        title1: true,
    };

    return (
        <SafeAreaView
            { ...{ forceInset: { top: "always" } } }
        >

            <View style={ styles.contain }>
                <Text { ...{ darkPrimaryColor: true, bold: true, title1: true, } } style={ styles.welcome }>
                    Welcome
                </Text>
                <View style={ {
                    flex: 1,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    height: 100
                } }>
                    <Text style={ { marginTop: 65 } } { ...yourInputProps }>
                        Your Email
                    </Text>
                    <View style={ styles.input }>
                        <TextInput
                            style={ styles.textInput }
                            onChangeText={ text => setLoginState( { ...loginState, email: text } ) }
                            autoCorrect={ false }
                            value={ loginState.email }
                            selectionColor={ 'black' }
                            placeholder="Email"
                        />
                    </View>
                    <Text style={ { marginTop: 15 } } { ...yourInputProps }>
                        Password
                    </Text>
                    <View style={ styles.input }>
                        <TextInput
                            style={ styles.textInput }
                            onChangeText={ text => setLoginState( { ...loginState, password: text } ) }
                            onFocus={ () => {
                                setLoginState( {
                                    ...loginState,
                                    success: {
                                        ...loginState.success,
                                        passwordSet: true
                                    }
                                } );
                            } }
                            autoCorrect={ false }
                            secureTextEntry={ true }
                            value={ loginState.password }
                            selectionColor={ 'black' }
                            placeholder="Password"
                        />
                    </View>

                    {
                        user.show &&
                        <View >
                            <Text style={ { marginTop: 15, color: user.color } } { ...yourInputProps }>
                                invalid email/password
                            </Text>
                        </View>
                    }

                    <View style={ { width: "100%", marginTop: 35 } }>

                        <View

                            style={ {
                                shadowRadius: 4,
                                borderRadius: 40,
                                backgroundColor: COLORS.LOGOCOLOR,
                                height: '40%',
                                width: '100%',
                                // height: 120,
                                justifyContent: 'center',
                                alignItems: 'center',

                            } }

                        >
                            <Button
                                { ...{ full: true, title: "Sign in", loading: loginState.loading, style: { marginTop: 0 } } } color={ COLORS.primary }
                                onPress={ () => { dispatch( actions.login( loginState.email, loginState.password ) ); } }
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={ { alignSelf: 'center' } }>
                        <Text { ...{ body1: true, grayColor: true } } style={ { marginTop: 25 } }>
                            <Text>
                                Don't Have an Account ?
                            </Text>
                            <Text style={ { textDecorationLine: 'underline' } } { ...{ primaryColor: true } }>
                                Sign up
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default SignIn;
