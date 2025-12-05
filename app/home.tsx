import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from "axios";
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {

  const { userId } = useLocalSearchParams(); 
  const [userName, setUserName] = useState("");

  useEffect(() => {
  if (!userId) return; 
  async function loadUser() {
    try {
      const response = await axios.get(`http://10.113.12.38:3000/users/${userId}`);
      setUserName(response.data.nome);
    } catch (error) {
      console.log("Erro ao carregar usuário:", error);
    }
  }
  loadUser();
}, [userId]);


  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("modal")}>
          <Image 
            style={styles.icon}
            source={require("../assets/images/icon.png")}
          />
        </TouchableOpacity>

        <Text style={styles.welcome}> Boas vindas</Text>
        <Text style={styles.subWelcome}>{userName || "..."}</Text>

        <TouchableOpacity
          style={styles.btnExit}
          onPress={() => {
            Alert.alert(
              "Sair da sua conta",
              "Tem certeza que deseja sair?",
              [
                { text: "Cancelar", style: "cancel" },
                { text: "Sair", onPress: () => router.replace("/"), style: "destructive" }
              ],
              { cancelable: true }
            );
          }}
        >
          <FontAwesome6 name="arrow-right-from-bracket" size={24} color="#C02636" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>

        <TouchableOpacity 
          style={styles.btnRevenues} 
          onPress={() => router.push("/revenues")}
        >
          <View style={styles.boxIcon}>
            <Image style={styles.logoRevenues} source={require("../assets/images/newspaper.svg")} />
          </View>

          <Text style={styles.title}>Minhas receitas</Text>
          <Text style={styles.subtitle}>Acompanhe os medicamentos e gerencie lembretes</Text>
          <MaterialIcons style={styles.arrowIcon} name="arrow-forward-ios" size={20} color="#A2B9CD" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btnRevenues} 
          onPress={() => router.push("/newRevenues")}
        >
          <View style={styles.boxIcon}>
            <Image style={styles.logoRevenues} source={require("../assets/images/medicine.svg")} />
          </View>

          <Text style={styles.title}>Nova receita</Text>
          <Text style={styles.subtitle}>Cadastre novos lembretes de receitas</Text>
          <MaterialIcons style={styles.arrowIcon} name="arrow-forward-ios" size={20} color="#A2B9CD" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnRate}>
          <View style={styles.rateContent}>
            <Feather style={styles.rateIcon} name="star" size={24} color="white" />
            <Text style={styles.rateText}>Avaliar</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#D7E1EA",
    },
    header:{
        alignItems: 'flex-start',
        marginTop: -40,
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
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 28,
    },
    btnExit:{
        position: 'absolute',
        right: 30,
        top: 95,
    },
    content:{
        marginTop: 20,
        backgroundColor: "#fff",
        width: 415,
        height: 650,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignSelf: 'center',

    },
    btnRevenues:{
        width: 326,
        height: 112,
        marginTop: 40,
        borderRadius: 12,
        backgroundColor: '#E8EEF3',
        borderColor: '#D7E1EA',
        borderWidth: 1,
        alignSelf: 'center',
        
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
        marginRight: 16,
    },
    arrowIcon:{
        position: 'absolute',
        right: 10,
        top: 18,
    },
    btnRate:{
        backgroundColor: '#17222B',
        borderRadius: 999,
        marginTop: 230,
        width: 326,
        height: 56,
        alignSelf: 'center',
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
});
