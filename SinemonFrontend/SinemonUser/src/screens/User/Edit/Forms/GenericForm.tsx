import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { COLORS } from '../../../../constants';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';






// Define TypeScript interfaces
export interface FieldConfig {
  name: string;
  type: 'text' | 'number' | 'file';
  label: string;
  placeholder?: string;
  required:boolean;
}

interface FormProps {
  fields: FieldConfig[];
  onSubmit: (formState: FormState) => void;
  cancel: Dispatch<SetStateAction<boolean>>;
  formName:string;
}

interface FormState {
  [key: string]: string | number | boolean | File; // Adjust the File type based on your implementation
}

const GenericForm: React.FC<FormProps> = ({ fields, onSubmit, cancel, formName }) => {
  const [formState, setFormState] = useState<FormState>({});

  const handleInputChange = (name: string, value: string | number | boolean | File) => {
    setFormState({ ...formState, [name]: value });
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return (
          <Input
            placeholder={field.placeholder}
            onChangeText={(text) => handleInputChange(field.name, text)}
            value={formState[field.name] as string}
            keyboardType={field.type === 'number' ? 'numeric' : 'default'}
            style={styles.input_box}
          />
        );
      case 'file':
        // Replace with your ImagePicker or file input component
        return (
          <TouchableOpacity onPress={() => {}}>
            <Text>Select File</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    onSubmit(formState);
  };
  const goBack = () => {
    cancel(true);
  };
console.log(formName);

  return (
    <ScrollView>
      {!(formName === 'Profile') && <TouchableOpacity  onPress={goBack}>
      <Icon name='backspace' color={COLORS.tertiary} size={(25/375)*ScreenWidth} style={{marginBottom:20}}/>
      </TouchableOpacity> }
      
      {fields.map((field, index) => (
        <View key={index}>
          <Text>{field.label}</Text>
          {renderField(field)}
        </View>
      ))}
      <TouchableOpacity onPress={handleSubmit} style={styles.submit_button}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default GenericForm;

const styles = StyleSheet.create({
 input_box:{
  borderWidth:1,
  borderColor:COLORS.neutral
 },
 submit_button:{
  borderWidth:1,
  borderRadius:100,
  justifyContent:'center',
  alignItems:'center',
  fontSize:(16/375)*ScreenWidth,
  backgroundColor:COLORS.secondary,
  marginBottom:20
 }
});
