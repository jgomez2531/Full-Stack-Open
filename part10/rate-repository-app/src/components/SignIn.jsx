import React from 'react';
import { Pressable, View, StyleSheet } from "react-native";
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from "../theme";
import * as yup from "yup";
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    backgroundColor: "white",
  },
  signInButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  signInText: {
    color: "white",
  },
});

// const initialValues = {
//   username: "",
//   password: "",
// };

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.inputContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.signInButton}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.signInText}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

// const validationSchema = yup.object().shape({
//   username: yup
//     .string()
//     .min(3, "Username must be at least 3 characters long.")
//     .required("Username is required"),
//   password: yup
//     .string()
//     .min(3, "Password must be at least 3 characters long.")
//     .required("Password is required"),
// });

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .required("Username is required"),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters long.")
      .required("Password is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );

};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      if (data.authorize.accessToken) {
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // <Formik
    //   initialValues={initialValues}
    //   onSubmit={onSubmit}
    //   validationSchema={validationSchema}
    // >
    //   {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    // </Formik>

    <SignInContainer onSubmit={onSubmit} />
  );
};

export default SignIn;