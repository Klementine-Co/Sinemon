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

const VisitList = ( { navigation }: any ) => {
  const claim = useAppSelector( state => state.claim );
  const user = useAppSelector( state => state.user );
  const myid = user.myid;

  const visits = useAppSelector( state => state.user.mydata.Patientvisit );
  //console.log(visits);
  const dispatch = useAppDispatch();

  const [ visible, setVisible ] = useState( true );


  function requestAccess ( member_id: number ) {
    //console.log( member_id );

    const myname = `${ user.mydata.Provider.provider.user.first_name } ${ user.mydata.Provider.provider.user.last_name }`;
    const msg = [
      {
        _id: 1,
        createdAt: new Date(),
        text: "I'm requesting access to your medical records.",
        user: { _id: 1, name: myname },
      },
    ];

    let data = {
      msg: msg[ 0 ],
      sender: myid,
      notification_type: 'R',
      receiver: member_id,
    };

    var threadid = Number( member_id ) + Number( myid );
    let newmessage: Message = {
      msg: msg[ 0 ],
      _id: Number( myid ),
      notification_type: 'R',
      thread_id: String( threadid ),
      read_msg: 'true',
      time: new Date(),
    };

    //console.log( 'DEBUG request access to medical records', newmessage );


    dispatch( ACTIONS.sendMessage( { newmessage: newmessage, data: data } ) );
  }

  useEffect( () => { }, [ 1 ] );

  const [ fName, setFname ] = useState( '' );
  const [ sortby, setSortby ] = useState( 'Visit Date' );
  const [ orderby, setOrderby ] = useState( 0 );
  const [ lName, setLname ] = useState( '' );
  const [ filterOptions, setFilterOptions ] = useState( {
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    // Add more options as needed
  } );

  const [ isModalVisible, setModalVisible ] = useState( false );

  const handleOpenModal = () => {
    setModalVisible( true );
  };

  const handleCloseModal = () => {
    setModalVisible( false );
  };

  const toggleOrder = () => {
    setOrderby( ( orderby + 1 ) % 3 );
  };
  const handleApplyFilters = ( filters: any ) => {
    // Handle the selected filter options here
    //console.log( 'Selected filters:', filters );
  };
  const FilterModal = ( { visible, onClose, onApply } ) => {
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
      <Modal
        visible={ visible }
        style={ {
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        } }>
        <View
          style={ {
            flex: 1,
            padding: 10,
            alignItems: 'flex-start',
            justifyContent: 'center',
          } }>
          <TouchableOpacity onPress={ onClose } style={ { marginBottom: '10%' } }>
            <Text>Close</Text>
          </TouchableOpacity>
          <Text style={ { fontSize: SIZES.h3, marginBottom: 10 } }>Sort By</Text>
          <Picker
            style={ { width: '100%' } }
            selectedValue={ sortby }
            onValueChange={ ( itemValue, itemIndex ) => setSortby( itemValue ) }>
            <Picker.Item label="Visit Date" value="Visit Date" />
            <Picker.Item label="First Name" value="First Name" />
            <Picker.Item label="Last Name" value="Last Name" />
            <Picker.Item
              label="Release Expiration Date"
              value="Release Expiration Date"
            />
          </Picker>
          <View
            style={ {
              borderWidth: 1,
              borderColor: COLORS.neutral,
              width: '100%',
            } }
          />
          <View style={ { marginTop: 10 } }>
            <Text style={ { fontSize: SIZES.h2 } }>Filter</Text>
            <SafeAreaView>
              <TextInput
                style={ styles.name }
                keyboardType="default"
                returnKeyType="done"
                maxLength={ 48 }
                placeholder="First Name"
                autoComplete="given-name"
                placeholderTextColor={ COLORS.neutral }
                onChange={ value => {
                  setFname( value );
                } }
              />
            </SafeAreaView>
            <SafeAreaView>
              <TextInput
                style={ styles.name1 }
                keyboardType="default"
                returnKeyType="done"
                maxLength={ 48 }
                placeholder="Last Name"
                autoComplete="family-name"
                placeholderTextColor={ COLORS.neutral }
                onChangeText={ value => {
                  setLname( value );
                } }
              />
            </SafeAreaView>
          </View>
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
          {/* Add more checkboxes for additional options */ }
          <View
            style={ {
              borderWidth: 1,
              borderColor: COLORS.neutral,
              width: '100%',
            } }
          />
          <TouchableOpacity onPress={ handleApply } style={ { marginTop: '10%' } }>
            <Text style={ { fontSize: SIZES.h2 } }>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const Filter = () => {




    const ordering = () => {
      if ( orderby === 1 ) {
        return (
          <Icon
            name="sort-down"
            color={ COLORS.primary }
            size={ ( 30 / 375 ) * ScreenWidth }
          />
        );
      } else if ( orderby === 2 ) {
        return (
          <Icon
            name="sort-up"
            color={ COLORS.primary }
            size={ ( 30 / 375 ) * ScreenWidth }
          />
        );
      } else {
        return (
          <Icon
            name="sort"
            color={ COLORS.primary }
            size={ ( 30 / 375 ) * ScreenWidth }
          />
        );
      }
    };

    return (
      <View
        style={ {
          //borderWidth:2, borderColor:'red',
          height: '10%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        } }>
        <TouchableOpacity
          onPress={ handleOpenModal }
          style={ { alignSelf: 'flex-end' } }>
          {/* <Text>Open Filter Modal</Text>  */ }
          <Icon
            name="bars"
            color={ COLORS.primary }
            size={ ( 30 / 375 ) * ScreenWidth }
          />
        </TouchableOpacity>
        <View
          style={ {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            //borderWidth:1, borderColor:'pink',
            height: '100%',
            flex: 1,
            alignItems: 'center',
          } }>
          <Text>Sort</Text>
          <Text>{ sortby }</Text>
          <TouchableOpacity style={ { height: '100%' } } onPress={ toggleOrder }>
            {/* <Text>{String(orderby)}</Text> */ }
            { ordering() }
          </TouchableOpacity>
        </View>
        <FilterModal
          visible={ isModalVisible }
          onClose={ handleCloseModal }
          onApply={ handleApplyFilters }
        />
        {/* Display your search results */ }
      </View>
    );
  };

  const getProfile = async ( id: string ) => {
    //console.log(item.member_id);
    var response = undefined;
    try {
      response = await APICALLS.getMember( Number( id ) );
    } catch ( error ) {
      //console.log( error );
    }
    if ( response !== undefined && response !== 'rqa' ) {
      navigation.navigate( 'MProfile', { member: response?.data } );
      return 'success';
    }
    return response;
  };

  function goToBill ( item: any ) {
    //console.log(item, 'ITEM');
    dispatch(
      ACTIONS.setClaim( {
        ref: 1,
        serviceitems: [] as ServiceItem[],
        diagnoses: [
          { ref: 1, code: '', desc: 'dx1' },
          { ref: 2, code: '', desc: 'dx2' },
          { ref: 3, code: '', desc: 'dx3' },
          { ref: 4, code: '', desc: 'dx4' },
          { ref: 5, code: '', desc: 'dx5' },
          { ref: 6, code: '', desc: 'dx6' },
          { ref: 7, code: '', desc: 'dx7' },
          { ref: 8, code: '', desc: 'dx8' },
          { ref: 9, code: '', desc: 'dx9' },
        ] as Diagnosis[],
        patient: {} as object | undefined,
        billing: {} as object | undefined,
        rendering: {} as object | undefined,
      } as Claim ),
    );
    navigation.navigate( 'Billing', { patient: item } );
  }

  async function goToClaim ( item: any ) {
    const claim = await APICALLS.getClaim( item.claim.claimid );
    //console.log(item, 'ITEM', claim);
    dispatch( ACTIONS.setClaim( claim ) );
    navigation.navigate( 'ClaimView' );
  }

  const BillButton = ( { item }: any ) => {
    if ( item?.claim !== null ) {
      return (
        <TouchableOpacity
          style={ {
            flex: 1,
            backgroundColor: COLORS.neutral,
            width: '45%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          } }
          onPress={ () => {
            goToClaim( item );
          } }>
          <Text
            style={ {
              fontSize: ( 16 / 375 ) * ScreenWidth,
              color: COLORS.primary,
              textAlign: 'center',
            } }>
            View Claim
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={ {
            flex: 1,
            backgroundColor: COLORS.primary,
            width: '45%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          } }
          onPress={ () => {
            goToBill( item );
          } }>
          <Text
            style={ {
              fontSize: ( 16 / 375 ) * ScreenWidth,
              color: COLORS.white,
              textAlign: 'center',
            } }>
            Bill Patient
          </Text>
        </TouchableOpacity>
      );
    }
  };
  const ViewButton = ( { item }: any ) => {
    //console.log( 'CLAIM', item );

    if ( item?.released === true ) {
      return (
        <TouchableOpacity
          style={ {
            flexDirection: 'row',
            backgroundColor: COLORS.primary,
            width: '45%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          } }
          onPress={ () => {
            getProfile( item.member );
          } }>

          <Icon
            name="unlock"
            color={ COLORS.white }
            size={ ( 20 / 375 ) * ScreenWidth }
            style={ { marginLeft: 5 } }
          />
          <Text
            style={ {
              fontSize: ( 14 / 375 ) * ScreenWidth,
              color: COLORS.white,
              textAlign: 'center',
              flex: 1,
              flexWrap: 'wrap',
            } }>
            View Patient
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={ {
            flexDirection: 'row',
            backgroundColor: COLORS.primary,
            width: '45%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          } }
          onPress={ () => {
            requestAccess( item.member );
          } }>

          <Icon
            name="lock"
            color={ COLORS.white }
            size={ ( 20 / 375 ) * ScreenWidth }
            style={ { marginLeft: 5 } }
          />
          <Text
            style={ {
              fontSize: ( 14 / 375 ) * ScreenWidth,
              color: COLORS.white,
              textAlign: 'center',
              flex: 1,
              flexWrap: 'wrap',
            } }>
            Request Access to Records
          </Text>
        </TouchableOpacity>
      );
    }
  };

  function Item ( { item }: any ) {
    //console.log(item.claim);

    if ( item.id != undefined ) {
      return (
        <View
          style={ {
            ...styles.listItemContainer,
            backgroundColor: COLORS.lightGray,
          } }>
          <View style={ { flexDirection: 'row' } }>

          </View>
          <View>
            <View style={ styles.listItem }>
              <View
                style={ {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  width: '100%',
                  justifyContent: 'center',
                } }>
                <Text
                  style={ {
                    fontSize: ( 14 / 375 ) * ScreenWidth,
                    color: COLORS.black,
                    fontWeight: 'bold',
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                    marginTop: 5,
                  } }>
                  Name: { item.member_firstname } { item.member_lastname }
                </Text>
                <Text
                  style={ {
                    fontSize: ( 14 / 375 ) * ScreenWidth,
                    color: COLORS.black,
                    fontWeight: 'bold',
                    alignSelf: 'flex-start',
                    textAlign: 'left',
                    marginTop: 5,
                  } }>
                  Visit Date: { String( new Date( item.visit_date ).toDateString() ) }
                </Text>
              </View>
            </View>

            <View
              style={ {
                height: ( 70 / 375 ) * ScreenWidth,
                width: '100%',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
              } }>

              <ViewButton item={ item } />
              <View style={ { borderBottomWidth: 1, paddingVertical: 5 } }></View>
              <BillButton item={ item } />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity>
          <View style={ styles.listItem }></View>
        </TouchableOpacity>
      );
    }
  }

  const Visits = () => {
    return (
      <View style={ styles.container }>
        <View style={ { flex: 1, justifyContent: 'center' } }>
          <TouchableOpacity onPress={ () => { } }>
          </TouchableOpacity>
          <FlatList
            //  ListHeaderComponent={
            //   <>
            //    <View style={{width:'35%', height:55,borderRadius:10, marginTop:15, marginRight:15 , marginLeft:'60%'}}>

            //     </View>
            //   </>}
            style={ { alignSelf: 'center', width: '100%', marginTop: 15 } }
            data={ visits }
            keyExtractor={ ( item, index ) => item.id.toString() }
            renderItem={ ( { item } ) => <Item item={ item } /> }
          // onScrollEndDrag={() => infiniteScroll()}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={ {
          alignSelf: 'center',
          justifyContent: 'center',
          height: ( 40 / 375 ) * ScreenWidth,
          width: '100%',
        } }>
        <Text style={ { fontSize: ( 20 / 375 ) * ScreenWidth, textAlign: 'center' } }>
          Visits
        </Text>
      </View>
      <TouchableOpacity
        onPress={ async () => {
          const mydata = APICALLS.refreshProvider( myid );
          dispatch( ACTIONS.setMyData( ( await mydata ) as UserData ) );
        } }>
        {/* <Text  style={{fontSize:(20/375)*ScreenWidth, textAlign:'right'}}>
        Refresh
      </Text> */}
        <Icon
          style={ { alignSelf: 'center' } }
          name="rotate-right"
          color={ COLORS.primary }
          size={ ( 30 / 375 ) * ScreenWidth }
        />
      </TouchableOpacity>
      <Filter />
      { <Visits /> }
    </>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%',
  },
  name: {
    textAlign: 'center',
    // flex:1,
    marginVertical: 10,
    padding: 10,
    width: '100%',
    height: ( 48 / 375 ) * ScreenWidth,
    borderWidth: 0.5,
    borderRadius: 15,
    fontSize: ( 14 / 375 ) * ScreenWidth,
    backgroundColor: 'white',
    borderColor: COLORS.primary,
  },
  name1: {
    textAlign: 'center',
    // flex:1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
    height: ( 48 / 375 ) * ScreenWidth,
    borderWidth: 0.5,
    borderRadius: 15,
    fontSize: ( 14 / 375 ) * ScreenWidth,
    backgroundColor: 'white',
    borderColor: COLORS.primary,
  },
  listItem: {
    // backgroundColor: COLORS.white,
    alignSelf: 'center',
    flexDirection: 'row',

    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    margin: ( 10 / 375 ) * ScreenWidth,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowOpacity: 0.34,
    shadowRadius: 3.27,
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 0.1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    borderBottomWidth: 1,
  },
} );


export default VisitList;
