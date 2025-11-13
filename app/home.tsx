import Feather from '@expo/vector-icons/Feather';
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
    <Ionicons name="exit-outline" size={27} color="#C02636" />
    </TouchableOpacity>
        <View style={styles.content}>
        <TouchableOpacity style={styles.btnRevenues}>
            <View style={styles.boxIcon}>
            <Image style={styles.logoRevenues}
            source={require("../assets/images/newspaper.svg")}
            />
            </View>
            <Text style={styles.title}>Minhas receitas </Text>
            <Text style={styles.subtitle}>Acompanhe os medicamentos e gerencie lembretes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRevenues}>
            <View style={styles.boxIcon}>
            <Image style={styles.logoRevenues}
            source={require("../assets/images/medicine.svg")}
            />
            </View>
            <Text style={styles.title}>Nova receita </Text>
            <Text style={styles.subtitle}>Cadastre novos lembretes de receitas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRate}>
            <View style={styles.rateContent}>
            <Feather style={styles.rateIcon} name="star" size={24} color="white" />
            <Text style={styles.rateText}>Avaliar </Text>
            </View>
        </TouchableOpacity>
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
    },
    btnRevenues:{
        width: 326,
        height: 112,
        marginTop: 40,
        borderRadius: 12,
        backgroundColor: '#E8EEF3',
        borderColor: '#D7E1EA',
        borderWidth: 1,
        
    },
    boxIcon:{
        width: 80,
        height: 80,
        backgroundColor: '#D7E1EA',
        borderRadius: 12,
        marginTop: 16,
        marginLeft: 16,
    },
    logoRevenues:{
        width: 46,
        height: 46, 
        marginTop: 16.5,
        marginLeft: 16.5,
    },
    title:{
        position: 'absolute',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 110,
    },
    subtitle:{
        position: 'absolute',
        fontSize: 14,
        marginTop: 50,
        marginLeft: 110,
        color: '#606F7B',
    },
    btnRate:{
        backgroundColor: '#17222B',
        borderRadius: 999,
        marginTop: 230,
        width: 326,
        height: 56,
    },
    rateContent:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    rateText:{
        color: '#FFFFFF',
        lineHeight: 56,
        fontSize: 16,
        fontWeight: '700',
        left: 20,
    },
    rateIcon:{
        position: 'absolute',
        left: 120,
        top: 16,
    },
})