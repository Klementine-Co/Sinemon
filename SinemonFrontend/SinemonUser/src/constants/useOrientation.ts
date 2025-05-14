import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  );

  useEffect(() => {
    const handler = ({ window: { width, height } }) => {
      setOrientation(width > height ? 'landscape' : 'portrait');
    };

    // Add event listener and receive a subscription object
    const subscription = Dimensions.addEventListener('change', handler);

    // Remove the event listener by calling remove on the subscription object
    return () => subscription.remove();
  }, []);

  return orientation;
};
