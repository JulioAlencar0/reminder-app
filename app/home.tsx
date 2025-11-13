import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function home() {
  return (
    <View style={styles.container}>
        <Image style={styles.icon}
        source={require("../assets/images/icon.png")}
      />
      <Text style={styles.welcome}> Boas vindas</Text>
      <Text style={styles.subWelcome}> Nome do usuário</Text>
      <TouchableOpacity style={styles.btnExit} onPress={() => {
        Alert.alert(
        "Sair da sua conta",
        "Tem certeza que deseja sair?",
        [
            {
            text: "Cancelar",
            style: "cancel",
            },
            {
            text: "Sair",
            onPress: () => router.push("/"),
            style: "destructive",
            },
        ],
        { cancelable: true }
        );
    }}
    >
    <Ionicons name="exit-outline" size={27} color="red" />
    </TouchableOpacity>
        <View style={styles.content}>
      <Text>Home Screen</Text>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#D7E1EA"
    },
    icon:{
        width: 70,
        height: 70,
        borderRadius: 90,
        marginLeft: 30,
        marginTop: 100,
        borderColor: '#334FDC',
        borderWidth: 1,
    },
    welcome:{
        fontSize: 14,
        marginTop: 10,
        marginLeft: 25,
    },
    subWelcome:{
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 24,
    },
    btnExit:{
        position: 'absolute',
        right: 30,
        top: 95,
    },
    content:{
        position: 'absolute',
        marginTop: 260,
        backgroundColor: "#fff",
        width: 415,
        height: 635,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
    }
})

