
import React, { useState } from 'react';
import { Header } from '@rneui/themed';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput,
    Modal
} from 'react-native';
import { images, COLORS, SIZES } from '../../../constants';
import { ImageBackground } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import * as APICALLS from "../../../constants/API_CALLS";
import { QueueConfig_styles } from './styles';
export const QueueConfig = ( { route, navigation }: searchProp ) => {

    return (
        <View style={ { height: '85%' } }>
            <ScrollView style={ QueueConfig_styles.scrollView }>
                <View >
                    <SafeAreaView style={ QueueConfig_styles.inputWrapper }>
                        <Text>Status</Text>
                        <TextInput
                            style={ QueueConfig_styles.input }
                            keyboardType='ascii-capable'
                            maxLength={ 5 }
                            editable={ false }
                            // placeholder="XXXXX"
                            value='STATUS'
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ QueueConfig_styles.inputWrapper }>
                        <Text>In Queue</Text>
                        <TextInput
                            style={ QueueConfig_styles.input }
                            keyboardType='ascii-capable'
                            maxLength={ 5 }
                            editable={ false }
                            value={ `${ 4 }` }
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ QueueConfig_styles.inputWrapper }>
                        <Text>Max Capacity</Text>
                        <TextInput
                            style={ QueueConfig_styles.input }
                            keyboardType='number-pad'
                            returnKeyType='done'
                            maxLength={ 5 }
                            placeholder={ `${ 10 }` }
                            autoComplete='off'
                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {

                            }
                            }
                        />
                    </SafeAreaView>
                </View>


                <View >
                    <SafeAreaView style={ QueueConfig_styles.inputWrapper }>
                        <Text>Close queue X minutes before close</Text>
                        <TextInput
                            style={ QueueConfig_styles.input }
                            keyboardType='number-pad'
                            returnKeyType='done'
                            maxLength={ 5 }
                            placeholder={ `${ 10 }` }
                            autoComplete='off'
                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {

                            }
                            }
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ QueueConfig_styles.inputWrapper }>
                        <Text>X minutes before patient is considered a `No-Show`</Text>
                        <TextInput
                            style={ QueueConfig_styles.input }
                            keyboardType='number-pad'
                            returnKeyType='done'
                            maxLength={ 5 }
                            placeholder={ `${ 10 }` }
                            autoComplete='off'
                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {

                            }
                            }
                        />
                    </SafeAreaView>
                </View>


                <View style={ QueueConfig_styles.buttonWrapper }>

                    <TouchableOpacity
                        style={ QueueConfig_styles.button }
                        onPress={ () => { } }
                    >
                        <Text style={ QueueConfig_styles.buttonText }>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};
