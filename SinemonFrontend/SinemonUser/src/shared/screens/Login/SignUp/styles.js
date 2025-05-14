import React from "react";
import { StyleSheet } from "react-native";
import { BaseColor } from "@config";

export default StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    width: "100%"
  },
  contain: {
    alignItems: "flex-start",
    padding: 20,
    marginTop:60,
    width: "100%"
  },
  containStart: {
    alignItems: "flex-start",
    padding: 20,
    paddingTop:100,
    width: "100%"
  },
  searchSection: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F5FF',
    paddingLeft:20,
    paddingRight:20,
    marginTop:10
},
searchIcon: {
    padding: 10,
},
input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
},
checkboxContainer: {
  flexDirection: "row",
  justifyContent:'center',
  alignItems:'center',
  marginBottom: 20,
  marginTop: 10,
},
checkbox: {
  alignSelf: "center",
  height:15,
  width:15
},
label: {
  margin: 8,
},
});
