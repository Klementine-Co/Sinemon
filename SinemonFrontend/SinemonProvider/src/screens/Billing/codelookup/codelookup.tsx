import React, {useState, useEffect} from 'react';
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
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const CodeLookup = (props:any) => {

  const {type} = props;

  
const PROCCODES = [
    {key:0, 	code:'99213',	desc:'Office/outpatient visit, est'},
    {key:1, 	code:'99214',	desc:'Office/outpatient visit, est'},
    {key:2, 	code:'78465',	desc:'Heart image (3d), multiple'},
    {key:3, 	code:'99232',	desc:'Subsequent hospital care'},
    {key:4, 	code:'66984',	desc:'Cataract surg w/iol, 1 stage'},
    {key:5, 	code:'92014',	desc:'Eye exam & treatment'},
    {key:6, 	code:'99212',	desc:'Office/outpatient visit, est'},
    {key:7, 	code:'77418',	desc:'Radiation tx delivery, imrt'},
    {key:8, 	code:'93307',	desc:'Echo exam of heart'},
    {key:9, 	code:'88305',	desc:'Tissue exam by pathologist'},
]
//   const DATA = [{title: 'lorumn ipsum', key:1}, {title: 'lorumn ispum', key:2}];
  const [searchText, onChangeSearch] = useState<string | undefined>(undefined);
  const [selectedText, SetSelected] = useState<string | undefined>(undefined);
  const [filteredData, setFilteredData] = useState<{
    code: string;
    desc: string;
    key:number
}[]>();

  useEffect(() => {
    const filtered = PROCCODES.filter(item =>
      (item.desc.toLowerCase().replace(/\W+/g, '').includes(String(searchText?.toLowerCase().replace(/\W+/g, ''))) || item.code.toLowerCase().replace(/\W+/g, '').includes(String(searchText?.toLowerCase().replace(/\W+/g, '')))) ,
    );
    if (searchText === undefined) {
      return setFilteredData(PROCCODES);
    }

    setFilteredData(filtered);
  }, [searchText]);

  const Item = (item:any) => (
    <View style={styles.item}>
        <TouchableOpacity onPress={()=> SetSelected(item.code)}>
      <Text style={{fontSize: (16/375)*ScreenWidth}}>{item.code}</Text>
      <Text style={styles.title}>{item.desc}</Text>
        </TouchableOpacity>
    </View>
  );

  const renderItem = ({item}:any) => <Item {...item} />;

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={{
          height: (50/375)*ScreenWidth,
          borderColor: '#919191',
          borderWidth: 1,
          margin: 10,
          paddingLeft: 15,
          borderRadius: 10,
        }}
        onChangeText={newText => onChangeSearch(newText)}
        placeholder= {selectedText ?? "Axtaris..."}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={({key}) => String(key)}
      />

      <Text style={{fontSize:(16/375)*ScreenWidth}}>
        {selectedText}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontSize: (20/375)*ScreenWidth,
  },
});

export default CodeLookup;