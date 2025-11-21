import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function home() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => router.push("/home")}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnPlus} onPress={() => router.push("/newRevenues")}>
        <FontAwesome6 name="circle-plus" size={34} color="#334FDC" />
      </TouchableOpacity>

      <Text style={styles.title}>Minhas receitas</Text>
      <Text style={styles.subtitle}>
        Acompanhe seus medicamentos cadastrados e gerencie lembretes
      </Text>

     <View style={styles.content}>
      <View style={styles.card}>
        <Text style={styles.textTitle}>Nome do remedio</Text>
        <TouchableOpacity style={styles.btnTrash}>
          <Feather name="trash-2" size={20} color="#C02636" />
        </TouchableOpacity>
        <View>
          
        </View>
      </View>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D7E1EA",
  },
  btnBack: {
    position: 'absolute',
    top: 80,
    left: 20,
  },
  btnPlus: {
    position: 'absolute',
    top: 80,
    right: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 24,
    marginTop: 140,
    color: '#334FDC',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
    marginLeft: 25,
  },
  content: {
    position: 'absolute',
    marginTop: 260,
    backgroundColor: "#fff",
    width: "100%",
    height: 635,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#E8EEF3",
    width: "85%",
    borderRadius: 16,
    height: 90,
  },
  textTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  btnTrash: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  
});
