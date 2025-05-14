import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SubCategoryFilter from './subcategoryfilter';

const CategoryFilter = ( { route, navigation }: homeProp ) => {

  // const {type} = props;
  const setPCode = route.params;

  const CATEGORIES = [
    { SUBCATEGORY: 'Critical care services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Hospital observation services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Prolonged services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Emergency department services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Domiciliary, rest home (boarding home) or custodial care services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Home health services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Nursing facility services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Office/other outpatient services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Consultations', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'Hospital inpatient services', CATEGORY: 'evaluation and management' }
    , { SUBCATEGORY: 'HCPC', CATEGORY: 'HCPC' }
    , { SUBCATEGORY: 'biofeedback', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'endocrinology', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'chiropractic manipulative treatment', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'photodynamic therapy', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'medical nutrition therapy', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'health and behavior assessment/intervention', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'dialysis', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'immunization administration for vaccines/toxoids', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'osteopathic manipulative treatment', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'special dermatological procedures', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'central nervous system assessments/tests (neuro-cognitive, mental status, speech testing)', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'gastroenterology', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'hydration, therapeutic, prophylactic, diagnostic injections and infusions, and chemotherapy and other highly complex drug or highly complex biologic agent administration', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'noninvasive vascular diagnostic studies', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'allergy and clinical immunology', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'psychiatry', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'pulmonary', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'physical medicine and rehabilitation', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'ophthalmology', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'special otorhinolaryngologic services', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'neurology and neuromuscular procedures', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'cardiovascular', CATEGORY: 'medicine' }
    , { SUBCATEGORY: 'cytogenetic studies', CATEGORY: 'pathology and laboratory' }
    , { SUBCATEGORY: 'consultations (clinical pathology)', CATEGORY: 'pathology and laboratory' }
    , { SUBCATEGORY: 'hematology and coagulation', CATEGORY: 'pathology and laboratory' }
    , { SUBCATEGORY: 'immunology', CATEGORY: 'pathology and laboratory' }
    , { SUBCATEGORY: 'other procedures', CATEGORY: 'pathology and laboratory' }
    , { SUBCATEGORY: 'cytopathology', CATEGORY: 'pathology and laboratory' }
    , { SUBCATEGORY: 'surgical pathology', CATEGORY: 'pathology and laboratory' }
    , { SUBCATEGORY: 'radiation oncology', CATEGORY: 'radiology' }
    , { SUBCATEGORY: 'diagnostic ultrasound', CATEGORY: 'radiology' }
    , { SUBCATEGORY: 'nuclear medicine', CATEGORY: 'radiology' }
    , { SUBCATEGORY: 'diagnostic radiology', CATEGORY: 'radiology' }
    , { SUBCATEGORY: 'general', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'mediastinum and diaphragm', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'endocrine system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'hemic and lymphatic systems', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'maternity care and delivery', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'auditory system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'male genital system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'female genital system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'eye and ocular adnexa', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'respiratory system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'urinary system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'integumentary system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'nervous system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'cardiovascular system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'digestive system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'musculoskeletal system', CATEGORY: 'surgery' }
    , { SUBCATEGORY: 'other services and procedures', CATEGORY: 'unknown' }
  ];

  const DATA = [ ...new Set( CATEGORIES.map( x => x.CATEGORY ) ) ];


  //   const DATA = [{title: 'lorumn ipsum', key:1}, {title: 'lorumn ispum', key:2}];
  const [ searchText, onChangeSearch ] = useState<string | undefined>( undefined );
  const [ selectedText, SetSelected ] = useState<string | undefined>( undefined );
  const [ filteredData, setFilteredData ] = useState<{
    CATEGORY: string;
    SUBCATEGORY: string;
  }[]>();
  //console.log(filteredData);

  // useEffect(() => {
  //     const filtered = CATEGORIES.filter(item =>
  //       (item.CATEGORY.toLowerCase().replace(/\W+/g, '').includes(String(selectedText?.toLowerCase().replace(/\W+/g, ''))) || item.CATEGORY.toLowerCase().replace(/\W+/g, '').includes(String(selectedText?.toLowerCase().replace(/\W+/g, '')))) ,
  //     );
  //     if (selectedText === undefined) {
  //       return setFilteredData(CATEGORIES);
  //     }

  //     setFilteredData(filtered);
  //   }, [selectedText]);


  const gotoSubCategoryFilter = ( item: string ) => {

    // SetSelected(item);
    const filterdata = CATEGORIES.filter( x =>
      ( x.CATEGORY.toLowerCase().replace( /\W+/g, '' ).includes( String( item?.toLowerCase().replace( /\W+/g, '' ) ) ) || x.CATEGORY.toLowerCase().replace( /\W+/g, '' ).includes( String( item?.toLowerCase().replace( /\W+/g, '' ) ) ) ),
    );
    setFilteredData( filterdata );
    navigation.navigate( "SubCategoryFilter", { filterdata: filterdata, setPCode: setPCode } );
  };

  const Item = ( item: string ) => {
    return ( <View style={ styles.item }>
      <TouchableOpacity onPress={ () => gotoSubCategoryFilter( item ) }>
        {/* <Text style={{fontSize: 16}}>{item.code}</Text> */ }
        <Text style={ styles.title }>{ item }</Text>
      </TouchableOpacity>
    </View> );
  };

  const renderItem = ( { item } ) => Item( item );

  return (
    <SafeAreaView style={ styles.container }>
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
    fontSize: 20,
  },
} );

export default CategoryFilter;