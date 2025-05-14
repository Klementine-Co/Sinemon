import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import haversine, { Coordinate } from 'haversine';
import { View, Button, Platform, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const SinemonDirectionsAPI = () => {
  // const navigation = useNavigation();

  const openDirections = () => {
    const address = '1 w wilson'; // Street address
    const city = 'Madison';
    const state = 'Wisconsin';

    const destinationAddress = `${ address }, ${ city }, ${ state }`;

    const scheme = Platform.select( { ios: 'maps://0,0?q=', android: 'geo:0,0?q=' } );
    const url = Platform.select( {
      ios: `${ scheme }${ destinationAddress }`,
      android: `${ scheme }${ destinationAddress }`
    } ) ?? '';

    Linking.canOpenURL( url )
      .then( ( supported ) => {
        if ( supported ) {
          return Linking.openURL( url );
        } else {
          console.error( 'Cannot open directions: URL not supported' );
        }
      } )
      .catch( ( error ) => {
        console.error( 'Error opening directions:', error );
        // Handle the error as needed
      } );
  };


  const geocodeAddress = async ( street: string, city: string, state: string ) => {
    try {
      const encodedAddress = `${ street }, ${ city }, ${ state }`;
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${ encodedAddress }`
      );

      if ( response.data.length > 0 ) {
        const { lat, lon } = response.data[ 0 ];
        return { latitude: parseFloat( lat ), longitude: parseFloat( lon ) };
      } else {
        throw new Error( 'Location not found' );
      }
    } catch ( error ) {
      console.error( 'Error geocoding address:', error );
      throw error;
    }
  };


  const calculateDistance = async ( street: string, city: string, state: string ) => {
    try {
      const destination = await geocodeAddress( street, city, state );

      // Get the user's current location
      const getCurrentLocation = () => {
        return new Promise( ( resolve, reject ) => {
          Geolocation.getCurrentPosition(
            ( position: { coords: unknown; } ) => resolve( position.coords ),
            ( error: any ) => reject( error ),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        } );
      };

      const currentLocation: any = await getCurrentLocation();
      //console.log(currentLocation, 'my loc');

      const distanceInKilometers = haversine( currentLocation, destination, { unit: 'km' } );
      const distanceInMiles = distanceInKilometers * 0.621371; // 1 kilometer = 0.621371 miles
      const distanceInFeet = distanceInMiles * 5280; // 1 mile = 5280 feet
      //console.log(distanceInKilometers,distanceInMiles);

      //console.log(`Distance to ${street}, ${city}, ${state}: ${distanceInMiles.toFixed(2)} miles (${distanceInFeet.toFixed(2)} feet)`);

      if ( distanceInMiles < .5 ) {
        return distanceInFeet;
      } else {
        return distanceInMiles;
      }
    } catch ( error ) {
      console.error( 'Error calculating distance:', error );
      throw error;
    }
  };

  const handleCalculateDistance = async () => {
    const street = '1 w wilson st';
    const city = 'Madison';
    const state = 'Wisconsin';

    try {
      const distance = await calculateDistance( street, city, state );
      //console.log(distance);
      return distance;
    } catch ( error ) {
      console.error( 'Error:', error );
    }
  };

  return {
    openDirections,
    handleCalculateDistance

    // <Button title="Open Directions" onPress={openDirections} />
    // <Button title="Calculate Distance" onPress={handleCalculateDistance} />
  };
};

export default SinemonDirectionsAPI;
