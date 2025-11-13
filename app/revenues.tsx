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
        {/* Exemplo de card */}
        <View style={styles.card}>
          <Text style={styles.medName}>Paracetamol</Text>
          <View style={styles.infoRow}>
            <Feather name="clock" size={16} color="#334FDC" />
            <Text style={styles.infoText}>14:00</Text>
            <Feather name="refresh-cw" size={16} color="#334FDC" style={{ marginLeft: 10 }} />
            <Text style={styles.infoText}>A cada 12 horas</Text>
          </View>
          <TouchableOpacity style={styles.trashBtn}>
            <Feather name="trash-2" size={20} color="red" />
          </TouchableOpacity>
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
    backgroundColor: "#E9EFF5",
    width: "85%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  medName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 13,
    marginLeft: 4,
  },
  trashBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
