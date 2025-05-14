import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Modal,
  SafeAreaView,
  TextInput,
} from 'react-native';

// import _, {  } from 'lodash';
import { COLORS, SIZES, icons } from '../../constants';

import { useAppSelector, useAppDispatch } from '../../state/App/hooks';

import * as ACTIONS from '../../state/App/actions';

import * as APICALLS from '../../constants/API_CALLS';

import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { FilterModal_styles } from './styles';


const FilterModal = ( { navigation, onClose, onApply, sortby, setSortby, setFname, fName, setLname, lName, filterOptions, setFilterOptions }: any ) => {

  useEffect( () => { }, [] );
  const Filter = ( { onClose, onApply } ) => {
    const handleOptionChange = ( option: string ) => {
      if ( option === 'option1' && filterOptions.option2 === false ) {
        setFilterOptions( prevState => ( {
          ...prevState,
          [ 'option1' ]: !prevState[ 'option1' ],
        } ) );
      } else if ( option === 'option2' && filterOptions.option1 === false ) {
        setFilterOptions( prevState => ( {
          ...prevState,
          [ 'option2' ]: !prevState[ 'option2' ],
        } ) );
      } else if ( option === 'option1' || option === 'option2' ) {
        setFilterOptions( prevState => ( {
          ...prevState,
          [ 'option1' ]: false,
          [ 'option2' ]: false,
        } ) );
      }

      if ( option === 'option3' && filterOptions.option4 === false ) {
        setFilterOptions( prevState => ( {
          ...prevState,
          [ option ]: !prevState[ option ],
        } ) );
      } else if ( option === 'option4' && filterOptions.option3 === false ) {
        setFilterOptions( prevState => ( {
          ...prevState,
          [ option ]: !prevState[ option ],
        } ) );
      } else if ( option === 'option3' || option === 'option4' ) {
        setFilterOptions( prevState => ( {
          ...prevState,
          [ 'option3' ]: false,
          [ 'option4' ]: false,
        } ) );
      }
    };

    const handleApply = () => {
      onApply( filterOptions );
      onClose();
    };

    return (
      <ScrollView style={ { flex: 1 } }>


        <View style={ FilterModal_styles.modalStyle }>
          <Text style={ FilterModal_styles.sortByText }>Sort By</Text>
          <Picker
            style={ FilterModal_styles.pickerStyle }
            selectedValue={ sortby }
            onValueChange={ ( itemValue ) => setSortby( itemValue ) }
          >
            <Picker.Item label="Visit Date" value="Visit Date" />
            <Picker.Item label="First Name" value="First Name" />
            <Picker.Item label="Last Name" value="Last Name" />
            <Picker.Item label="Release Expiration Date" value="Release Expiration Date" />
          </Picker>
          <View style={ FilterModal_styles.divider } />
          <Text style={ FilterModal_styles.filterText }>Filter</Text>
          <SafeAreaView>
            <TextInput
              style={ FilterModal_styles.input }
              keyboardType="default"
              returnKeyType="done"
              value={ fName }
              maxLength={ 48 }
              placeholder="First Name"
              autoComplete="given-name"
              placeholderTextColor={ COLORS.neutral }
              onChange={ ( value ) => setFname( value ) }
            />
            <TextInput
              style={ FilterModal_styles.input }
              keyboardType="default"
              returnKeyType="done"
              value={ lName }
              maxLength={ 48 }
              placeholder="Last Name"
              autoComplete="family-name"
              placeholderTextColor={ COLORS.neutral }
              onChange={ ( value ) => setLname( value ) }
            />
          </SafeAreaView>
          <Checkbox
            label="Billed"
            checked={ filterOptions.option1 }
            onChange={ () => handleOptionChange( 'option1' ) }
          />
          <Checkbox
            label="Not Billed"
            checked={ filterOptions.option2 }
            onChange={ () => handleOptionChange( 'option2' ) }
          />
          <Checkbox
            label="Released"
            checked={ filterOptions.option3 }
            onChange={ () => handleOptionChange( 'option3' ) }
          />
          <Checkbox
            label="Not Released"
            checked={ filterOptions.option4 }
            onChange={ () => handleOptionChange( 'option4' ) }
          />
          <View style={ FilterModal_styles.divider } />
          <TouchableOpacity onPress={ handleApply } style={ FilterModal_styles.applyButton }>
            <Text style={ FilterModal_styles.applyText }>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    );
  };

  return (
    <>
      <Filter
        onClose={ onClose }
        onApply={ onApply }
      />
    </>
  );
};

export default FilterModal;
