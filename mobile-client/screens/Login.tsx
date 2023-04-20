import { StatusBar } from "expo-status-bar";
import React, { useState, FormEvent, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useLoginMutation } from "../gql/generated/schema";
import client from "../gql/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const Login = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("partner@gmail.com");
  const [password, setPassword] = useState("testtest");
  const [errCredentials, setErrCredentials] = useState(false);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const isUserLoggedIn = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@userToken");
  //     setIsLoggedIn(true);
  //     return value;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => async () => {
  //     const isUserLogged = await isUserLoggedIn();
  //     if (isUserLogged) {
  //       navigation.navigate("Home");
  //     }
  //   }, [isLoggedIn])
  // );

  const [loginUser] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      setErrCredentials(false);
      const user = await loginUser({
        variables: { loginData: { email: email.toLowerCase(), password } },
      });

      await AsyncStorage.setItem(
        "@userToken",
        JSON.stringify(user?.data?.login)
      );

      navigation.navigate("Home");
    } catch (err) {
      setErrCredentials(true);
      console.error("err", err);
    } finally {
      client.resetStore();
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.connexion}>Se connecter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          keyboardType="email-address"
          placeholder="Votre email..."
          placeholderTextColor="#003f5c"
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Votre mot de passe..."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
        <Text style={styles.loginBtnTxt}>Se connecter</Text>
      </TouchableOpacity>
      {errCredentials && (
        <Text style={styles.errCredentials}>Identifiants incorrects.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
    gap: 20,
  },
  connexion: {
    fontSize: 30,
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
  },
  inputText: {
    fontSize: 20,
    padding: 10,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  loginBtnTxt: {
    fontSize: 20,
    color: "white",
  },
  errCredentials: {
    color: "red",
  },
});

export default Login;
