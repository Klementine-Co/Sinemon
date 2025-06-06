import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS } from "../../../constants";
import * as FORMS from "./Forms";

const EditDRXInsur = ({
  drxinsurances,
}: editdrxinsuranceProps) => {
  const [visible, setVisible] = useState(true);

  function Item({item}:{item:RxDiscount[0]}) {
    if (item.id_member != undefined) {
      return (
        <>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ padding: 10 }}>delete</Text>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.listItem}>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "50%",
                }}
              >
                {/* <View style={{position: 'absolute',top: 0,left: 85,right: 0,bottom: 15, backgroundColor:item.color, height:20, width:40, borderRadius:100, justifyContent:'center', alignItems:'center'}}><Text style={{color:"black", position:'absolute', textAlign:'center'}}>20%</Text></View> */}
                <Text
                  style={{
                    color:COLORS.primary,
                    alignSelf: "flex-start",
                    textAlign: "left",
                    marginTop: 5,
                  }}
                >
                  Insurer: {item.insurer}
                </Text>
                <Text
                  style={{
                    color:COLORS.primary,
                    alignSelf: "flex-start",
                    textAlign: "left",
                    marginTop: 5,
                  }}
                >
                  Member ID: {item.id_member}
                </Text>
                {/* <Text style={{color:COLORS.primary, alignSelf:'center', textAlign:'left', marginTop:5}}>Group no: {item.group_no}</Text> */}
              </View>
              <View
                style={{
                  height: 70,
                  width: "50%",
                  justifyContent: "flex-end",
                  alignSelf: "flex-end",
                }}
              >
                {/* <Text style={{color:COLORS.primary}}>Benefit Plan: {item.benefit_plan}</Text> */}
                {/* <Text style={{color:COLORS.primary}}>Exp Date: {item.expiration_date}</Text> */}
                {/* <Text style={{color:COLORS.primary}}>Out of network</Text> */}
                {/* <Text style={{color:"blue"}}>Insurance</Text> */}
                {/* <Text style={{color:COLORS.primary}}>12345</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        </>
      );
    } else {
      return (
        <TouchableOpacity>
          <View style={styles.listItem}></View>
        </TouchableOpacity>
      );
    }
  }

  const EditingDRXInsurances = () => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0, justifyContent: "center" }}>
          <TouchableOpacity onPress={() => setVisible(false)} style={{}}>
            <Text style={{ fontSize: 20, textAlign: "left" }}>
              Add Insurance
            </Text>
          </TouchableOpacity>
          <FlatList
            ListHeaderComponent={
              <>
                <View
                  style={{
                    width: "35%",
                    height: 55,
                    borderRadius: 10,
                    marginTop: 15,
                    marginRight: 15,
                    marginLeft: "60%",
                  }}
                ></View>
              </>
            }
            style={{ alignSelf: "center", width: "100%" }}
            data={drxinsurances}
            keyExtractor={(item, index) => item.id_member.toString()}
            renderItem={({ item }) => <Item item={item} />}
          />
        </View>
      </View>
    );
  };

  return <>{visible === true ? <EditingDRXInsurances /> : <FORMS.DRXInsurance cancel={setVisible}/>}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  listItem: {
    marginTop: 15,
    backgroundColor: "#FFF",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "gold",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
const clubpickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 100,
    color: "black",
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});

export default EditDRXInsur;
