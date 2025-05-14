import { useState, useEffect, useMemo } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import FilterModal from './FilterModal';
import { VisitList_styles } from './styles';

const VisitList = ( { navigation }: any ) => {
  const claim = useAppSelector( state => state.claim );
  const user = useAppSelector( state => state.user );
  const myid = user.myid;

  const visits = useAppSelector( state => state.user.mydata.Patientvisit );
  console.log( visits );

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

    console.log( 'DEBUG request access to medical records', newmessage );


    dispatch( ACTIONS.sendMessage( { newmessage: newmessage, data: data } ) );
  }

  useEffect( () => { }, [] );

  const [ sortedVisits, setSortedVisits ] = useState<object[] | undefined>( undefined );
  const [ fName, setFname ] = useState( '' );
  const [ sortby, setSortby ] = useState( 'Visit Date' );
  const [ orderby, setOrderby ] = useState( 0 );
  const [ lName, setLname ] = useState( '' );
  type FilterOptions = {
    option1: boolean;
    option2: boolean;
    option3: boolean;
    option4: boolean;
  };

  type FilterCriteria = {
    billed?: boolean;
    released?: boolean;
  };
  const [ filterOptions, setFilterOptions ] = useState<FilterOptions>( {
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    // Add more options as needed
  } );

  const [ isModalVisible, setModalVisible ] = useState( false );

  const handleOpenModal = () => {
    setModalVisible( !isModalVisible );
  };

  const handleCloseModal = () => {
    setModalVisible( false );
  };

  type PV = {
    billed: boolean;
    claim: null | any; // Adjust based on actual claim structure
    counter: number;
    id: number;
    member: string;
    member_firstname: string;
    member_lastname: string;
    prov: string;
    released: boolean;
    visit_date: string;
    release_expiration_date: string;
    // Assuming Release Expiration Date is another date string field, add it here if it exists
  };


  const sortKeyMap: { [ key: string ]: keyof PatientVisit; } = {
    'Visit Date': 'visit_date',
    'First Name': 'member_firstname',
    'Last Name': 'member_lastname',
    'Release Expiration Date': 'release_expiration_date'

  };
  function determineFilter (): FilterCriteria {
    const criteria: FilterCriteria = {};


    if ( filterOptions.option1 ) criteria.billed = true;
    else if ( filterOptions.option2 ) criteria.billed = false;
    else criteria.billed = undefined;


    if ( filterOptions.option3 ) criteria.released = true;
    else if ( filterOptions.option4 ) criteria.released = false;
    else criteria.released = undefined;

    return criteria;
  };

  const filteredVisits = useMemo( () => {
    const criteria = determineFilter();

    const _visits = visits.filter( visit => {
      // Checking each criterion. If not defined, it passes automatically.
      const filterBilled = criteria.billed !== undefined ? criteria.billed === visit.billed : true;
      const filterReleased = criteria.released !== undefined ? criteria.released === visit.released : true;
      return filterBilled && filterReleased;
    } ) as PatientVisit[];

    const sortKey = sortKeyMap[ sortby ];
    const sorted = [ ..._visits ].sort( ( a, b ) => {
      let valA = a[ sortKey ];
      let valB = b[ sortKey ];
      // For dates, convert to Date object for comparison
      if ( sortKey.includes( 'date' ) ) {
        valA = new Date( valA );
        valB = new Date( valB );
      }
      if ( orderby === 1 ) {
        // Ascending
        return valA < valB ? -1 : valA > valB ? 1 : 0;
      } else if ( orderby === 2 ) {
        // Descending
        return valA > valB ? -1 : valA < valB ? 1 : 0;
      }
    } );
    return sorted;

  }, [ filterOptions, sortby, orderby ] );

  const toggleOrder = ( visits ) => {
    const orderBY = ( orderby + 1 ) % 3;

    // setSortedVisits( sorted );
    setOrderby( orderBY );
  };
  const handleApplyFilters = ( filters: any ) => {
    // Handle the selected filter options here
    //console.log( 'Selected filters:', filters );
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
          style={ VisitList_styles.bill_button_container_claim_present }
          onPress={ () => {
            goToClaim( item );
          } }>
          <Text
            style={ VisitList_styles.bill_button_text_claim_present }>
            View Claim
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={ VisitList_styles.bill_button_container_claim_not_present }
          onPress={ () => {
            goToBill( item );
          } }>
          <Text
            style={ VisitList_styles.bill_button_text_claim_not_present }>
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
          style={ VisitList_styles.view_button_container }
          onPress={ () => {
            getProfile( item.member );
          } }>

          <Icon
            name="unlock"
            style={ VisitList_styles.view_button_icon }
          />
          <Text
            style={ VisitList_styles.view_button_text }>
            View Patient
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={ VisitList_styles.view_button_container }
          onPress={ () => {
            requestAccess( item.member );
          } }>

          <Icon
            name="lock"
            style={ VisitList_styles.view_button_icon }
          />
          <Text
            style={ VisitList_styles.view_button_text }>
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
          style={ VisitList_styles.listItemContainer }>


          <View style={ VisitList_styles.listItem }>
            <Text
              style={ VisitList_styles.listItem_text }>
              Name: { item.member_firstname } { item.member_lastname }
            </Text>
            <Text
              style={ VisitList_styles.listItem_text }>
              Visit Date: { String( new Date( item.visit_date ).toDateString() ) }
            </Text>
          </View>

          <View
            style={ VisitList_styles.buttons_container }>
            <ViewButton item={ item } />
            <BillButton item={ item } />
          </View>

        </View>
      );
    } else {
      return (
        <TouchableOpacity>
          <View style={ VisitList_styles.listItem }></View>
        </TouchableOpacity>
      );
    }
  }

  const Visits = () => {
    return (
      <View style={ VisitList_styles.container }>
        <FlatList
          ListHeaderComponent={
            <>
              <View
                style={ VisitList_styles.VisitList_header_container }>
                <Text style={ VisitList_styles.VisitList_header_text }>
                  Visits
                </Text>
              </View>
              <TouchableOpacity
                onPress={ async () => {
                  const mydata = APICALLS.refreshProvider( myid );
                  dispatch( ACTIONS.setMyData( ( await mydata ) as UserData ) );
                } }>
                <Icon
                  style={ VisitList_styles.refresh_button }
                  name="rotate-right"
                />
              </TouchableOpacity>

              <View
                style={ VisitList_styles.sort_container }>
                <Text style={ VisitList_styles.sort_text }>Sort by</Text>
                <Text style={ VisitList_styles.sort_text }>{ sortby }</Text>
                <TouchableOpacity style={ { height: '100%' } } onPress={ toggleOrder }>
                  { ordering() }
                </TouchableOpacity>
              </View>

            </> }
          style={ VisitList_styles.visitsContainer }
          contentContainerStyle={ VisitList_styles.visits_contentContainerStyle }
          data={ filteredVisits }
          keyExtractor={ ( item, index ) => item.id.toString() }
          renderItem={ ( { item } ) => <Item item={ item } /> }
        // onScrollEndDrag={() => infiniteScroll()}
        />
        {/* //   </View> */ }
      </View>
    );
  };
  const ordering = () => {
    if ( orderby === 1 ) {
      return (
        <Icon
          name="sort-down"
          style={ VisitList_styles.sort_icons }
        />
      );
    } else if ( orderby === 2 ) {
      return (
        <Icon
          name="sort-up"
          style={ VisitList_styles.sort_icons }
        />
      );
    } else {
      return (
        <Icon
          name="sort"
          style={ VisitList_styles.sort_icons }
        />
      );
    }
  };
  return (
    <>
      <View
        style={ VisitList_styles.filterButtonContainer }>
        <TouchableOpacity
          onPress={ handleOpenModal }
        >
          {/* <Text>Open Filter Modal</Text>  */ }
          <Icon
            name="bars"
            style={ VisitList_styles.filterButton }
          />
        </TouchableOpacity>
      </View>
      { ( isModalVisible ? < FilterModal
        onClose={ handleCloseModal }
        onApply={ handleApplyFilters }
        sortby={ sortby }
        setSortby={ setSortby }
        setFname={ setFname }
        fName={ fName }
        setLname={ setLname }
        lName={ lName }
        filterOptions={ filterOptions }
        setFilterOptions={ setFilterOptions }
      /> : <Visits />

      ) }

      {/* { <Visits /> } */ }
    </>
  );
};



export default VisitList;
