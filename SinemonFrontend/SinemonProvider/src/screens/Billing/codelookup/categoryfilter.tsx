import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { icons } from '../../../constants';
import * as API from '../../../constants/API_CALLS';
import SubCategoryFilter from './subcategoryfilter';

const CategoryFilter = ( { route, navigation }: homeProp ) => {

  // const {type} = props;
  //console.log(route.params);

  // const setCode = route.params.function;
  const { pos, type } = route.params;


  const PCATEGORIES = [
    { cat: "radiology" }
    , { cat: "surgery" }
    , { cat: "HCPC" }
    , { cat: "pathology and laboratory" }
    , { cat: "evaluation and management" }
    , { cat: "medicine" }
    , { cat: "unknown" }
  ];
  const DCATEGORIES = [
    { cat: "Mental, Behavioral and Neurodevelopmental Disorders" }
    , { cat: "Neoplasms" }
    , { cat: "Diseases of the Eye and Adnexa" }
    , { cat: "Diseases of the Musculoskeletal System and Connective Tissue" }
    , { cat: "Diseases of the Ear and Mastoid Process" }
    , { cat: "Factors Influencing Health Status and Contact with Health Services" }
    , { cat: "Diseases of the Circulatory System" }
    , { cat: "Diseases of the Genitourinary System" }
    , { cat: "Diseases of the Blood and Blood Forming Organs and Certain Disorders Involving the Immune Mechanism" }
    , { cat: "Diseases of the Nervous System" }
    , { cat: "Unacceptable principal diagnosis (inpatient data) or first-listed diagnosis (outpatient data)" }
    , { cat: "Pregnancy, Childbirth and the Puerperium" }
    , { cat: "Symptoms, Signs and Abnormal Clinical and Laboratory Findings, Not Elsewhere Classified" }
    , { cat: "Endocrine, Nutritional and Metabolic Diseases" }
    , { cat: "Certain Infectious and Parasitic Diseases" }
    , { cat: "Injury, Poisoning and Certain Other Consequences of External Causes" }
    , { cat: "Certain Conditions Originating in the Perinatal Period" }
    , { cat: "Diseases of the Respiratory System" }
    , { cat: "Congenital Malformations, Deformations and Chromosomal Abnormalities" }
    , { cat: "Diseases of the Skin and Subcutaneous Tissue" }
    , { cat: "Diseases of the Digestive System" }
  ];

  const MCATEGORIES = [
    { cat: "A" }
    , { cat: "B" }
    , { cat: "C" }
    , { cat: "E" }
    , { cat: "F" }
    , { cat: "G" }
    , { cat: "H" }
    , { cat: "J" }
    , { cat: "K" }
    , { cat: "L" }
    , { cat: "M" }
    , { cat: "N" }
    , { cat: "P" }
    , { cat: "Q" }
    , { cat: "R" }
    , { cat: "S" }
    , { cat: "T" }
    , { cat: "U" }
    , { cat: "V" }
    , { cat: "X" }
    , { cat: "Z" }
  ];

  const POSCATEGORIES = [
    { cat: "On Campus-Outpatient Hospital" }
    , { cat: "Intermediate Care Facility/ Individuals with Intellectual Disabilities" }
    , { cat: "Group Home *" }
    , { cat: "Prison/Correctional Facility" }
    , { cat: "Mass Immunization Center" }
    , { cat: "Community Mental Health Center" }
    , { cat: "Hospice" }
    , { cat: "Ambulatory Surgical Center" }
    , { cat: "Ambulance - Air or Water" }
    , { cat: "Ambulance - Land" }
    , { cat: "Office" }
    , { cat: "Non-residential Opioid Treatment Facility" }
    , { cat: "Tribal 638 Free-standing Facility" }
    , { cat: "Home" }
    , { cat: "Federally Qualified Health Center" }
    , { cat: "Pharmacy **" }
    , { cat: "Temporary Lodging" }
    , { cat: "Inpatient Hospital" }
    , { cat: "Skilled Nursing Facility" }
    , { cat: "Birthing Center" }
    , { cat: "Non-residential Substance Abuse Treatment Facility" }
    , { cat: "Inpatient Psychiatric Facility" }
    , { cat: "Emergency Room - Hospital" }
    , { cat: "Indian Health Service Free-standing Facility" }
    , { cat: "Custodial Care Facility" }
    , { cat: "Residential Substance Abuse Treatment Facility" }
    , { cat: "Mobile Unit" }
    , { cat: "Telehealth Provided Other than in Patient's Home" }
    , { cat: "End-Stage Renal Disease Treatment Facility" }
    , { cat: "Other Place of Service" }
    , { cat: "Independent Clinic" }
    , { cat: "Assisted Living Facility" }
    , { cat: "Psychiatric Facility-Partial Hospitalization" }
    , { cat: "Telehealth Provided in Patient's Home" }
    , { cat: "Place of Employment-Worksite" }
    , { cat: "Public Health Clinic" }
    , { cat: "Military Treatment Facility" }
    , { cat: "Urgent Care Facility" }
    , { cat: "Homeless Shelter" }
    , { cat: "Unassigned" }
    , { cat: "Independent Laboratory" }
    , { cat: "Rural Health Clinic" }
    , { cat: "Comprehensive Outpatient Rehabilitation Facility" }
    , { cat: "Nursing Facility" }
    , { cat: "Off Campus-Outpatient Hospital" }
    , { cat: "Comprehensive Inpatient Rehabilitation Facility" }
    , { cat: "Walk-in Retail Health Clinic" }
    , { cat: "Psychiatric Residential Treatment Center" }
    , { cat: "School" }
    , { cat: "Tribal 638 Provider-based Facility" }
    , { cat: "Indian Health Service Provider-based Facility" }
  ];


  function getCategories ( type: string ) {
    if ( type === 'procedures' ) {
      return PCATEGORIES;
    } else if ( type === 'diagnoses' ) {
      return DCATEGORIES;
    } else if ( type === 'modifiers' ) {
      return MCATEGORIES;
    } else if ( type === 'placesofservice' ) {
      return POSCATEGORIES;
    }
  }




  const DATA = getCategories( type );


  //   const DATA = [{title: 'lorumn ipsum', key:1}, {title: 'lorumn ispum', key:2}];
  const [ searchText, onChangeSearch ] = useState<string | undefined>( undefined );
  const [ selectedText, SetSelected ] = useState<string | undefined>( undefined );
  const [ filteredData, setFilteredData ] = useState<{
    cat: string;
    cat_desc: string;
  }[] | {
    cat: string;
  }[]>();

  const gotoSubCategoryFilter = async ( item: string ) => {

    // SetSelected(item);
    //console.log(item);
    var filterdata;
    var ind = false;
    if ( type === 'procedures' ) {
      filterdata = await API.getPCatcodes( item );
      ind = true;
    } else if ( type === 'diagnoses' ) {
      filterdata = await API.getDCatcodes( item );
      ind = true;
    } else if ( type === 'modifiers' ) {
      filterdata = await API.getMcodes( item );
    } else if ( type === 'placesofservice' ) {
      filterdata = await API.getPOScodes( item );
    }
    setFilteredData( filterdata?.data );
    //console.log(filterdata?.data);
    if ( ind ) {
      navigation.navigate( "SubCategoryFilter", { filterdata: filterdata?.data, pos: pos, type: type } );

    } else {
      navigation.navigate( "Services", { SERVICES: filterdata?.data, pos: pos, type: type } );

    }

  };

  const Item = ( item: string ) => {
    return ( <View style={ styles.item }>



      <TouchableOpacity onPress={ () => gotoSubCategoryFilter( item ) }>
        {/* <TouchableOpacity onPress={()=> {}}> */ }
        {/* <Text style={{fontSize: 16}}>{item.code}</Text> */ }
        <Text style={ styles.title }>{ item }</Text>
      </TouchableOpacity>
    </View> );
  };

  const renderItem = ( { item } ) => Item( item.cat );
  //console.log(item);
  //  Item(item.cat);


  return (
    <SafeAreaView style={ styles.container }>
      <View style={ { flexDirection: "column", paddingBottom: 30 } }>
        <TouchableOpacity
          style={ { flexDirection: "row", alignItems: "center", flex: 1, marginTop: 80 } }
          onPress={ () => {
            navigation.goBack();
          } }
        >
          <Image
            source={ icons.back }
            style={ {
              width: ( 20 / 375 ) * ScreenWidth,
              height: ( 20 / 375 ) * ScreenWidth,
              // left: "10%",
            } }
          />
        </TouchableOpacity>
      </View>
      <>
        <FlatList

          data={ DATA }
          renderItem={ renderItem }
          keyExtractor={ ( item, index ) => String( index ) }
        />

        {/* <Text>
        {selectedText}
      </Text> */}

      </>
      {/* {SubCategoryFilter(filteredData)} */ }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 75,
  },
  item: {
    backgroundColor: '#ededed',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: ( 20 / 375 ) * ScreenWidth,
  },
} );

export default CategoryFilter;