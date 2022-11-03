import React from "react";
import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Text,
  StyleSheet,
} from "react-native";

import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
} from "react-hook-form";
import styled from "styled-components/native";

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  name: string;
  defaultValue?: string;
  setFormError: Function;
}
const TextFilterInput = styled.TextInput`
  box-sizing: border-box;
  width: 70px;
  height: 40px;
  background: #ffffff;
  /* Gray/500 */

  border: 1px solid #6783a0;
  /* White BTN */

  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;
export const ControlledInput = (props: TextInputProps) => {
  const { name, label, rules, defaultValue, ...inputProps } = props;
  console.log("rules", rules);

  const { field } = useController({ name, rules, defaultValue });

  return (
    <>
      <TextFilterInput
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
      />
    </>
  );
};
