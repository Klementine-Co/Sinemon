import { Component } from "react";

import { View, ScrollView, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { BaseStyle, BaseColor } from "../../config";
import CheckBox from '@react-native-community/checkbox';
import { Icon, Text, Button } from "../../../state";
import styles from "./styles";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            loading: false,
            success: {
                id: true,
                password: true
            }
        };
    }

    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView
                style={BaseStyle.safeAreaView}
                forceInset={{ top: "always" }}
            >
                <ScrollView>

                    <View style={styles.contain}>
                        <Text title1 bold darkPrimaryColor style={{ marginTop: 25 }}>
                            Create
                        </Text>
                        <Text title1 bold darkPrimaryColor style={{ marginTop: 14 }}>
                            Account
                        </Text>
                        <Text style={{ marginTop: 65 }} darkPrimaryColor headline semibold>
                            Your Email
                        </Text>
                        <View style={styles.searchSection}>
                            <Icon name="envelope" size={20} color={BaseColor.primaryColor} />
                            <TextInput
                                style={[BaseStyle.textInput]}
                                onChangeText={text => this.setState({ id: text })}
                                onFocus={() => {
                                    this.setState({
                                        success: {
                                            ...this.state.success,
                                            id: true
                                        }
                                    });
                                }}
                                autoCorrect={false}
                                placeholder=""
                                placeholderTextColor={
                                    this.state.success.id
                                        ? BaseColor.grayColor
                                        : BaseColor.primaryColor
                                }
                                value={this.state.id}
                                selectionColor={BaseColor.primaryColor}
                            />
                        </View>
                        <Text style={{ marginTop: 15 }} darkPrimaryColor headline semibold>
                            Password
                        </Text>
                        <View style={styles.searchSection}>
                            <Icon name="lock" size={20} color={BaseColor.primaryColor} />
                            <TextInput
                                style={[BaseStyle.textInput, { marginTop: 1 }]}
                                onChangeText={text => this.setState({ password: text })}
                                onFocus={() => {
                                    this.setState({
                                        success: {
                                            ...this.state.success,
                                            password: true
                                        }
                                    });
                                }}
                                autoCorrect={false}
                                secureTextEntry={true}
                                placeholderTextColor={
                                    this.state.success.password
                                        ? BaseColor.grayColor
                                        : BaseColor.primaryColor
                                }
                                value={this.state.password}
                                selectionColor={BaseColor.primaryColor}
                            />
                        </View>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                boxType={'square'}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}> <Text style={styles.label}>I agree to the </Text> <Text primaryColor> Terms & Conditions</Text></Text>
                        </View>
                        <View style={{ width: "100%" }}>
                            <Button
                                full
                                loading={this.state.loading}
                                style={{ marginTop: 20 }}
                                onPress={() => navigation.navigate("SignIn")}
                            >
                                Create Account
                            </Button>
                            <Button
                                outline
                                loading={this.state.loading}
                                style={{ marginTop: 20, }}
                                onPress={() => navigation.navigate("SignIn")}
                            >
                                Sign Up with Google
                            </Button>
                        </View>
                        <TouchableOpacity
                            style={{ alignSelf: 'center' }}
                            onPress={() => navigation.navigate("SignIn")}
                        >
                            <Text body1 grayColor style={{ marginTop: 25 }}>
                                <Text> Already Have an Account ?  </Text><Text primaryColor>Login</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default SignIn;
