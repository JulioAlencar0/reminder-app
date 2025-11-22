import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => router.replace("/home")}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnPlus} onPress={() => router.replace("/newRevenues")}>
        <FontAwesome6 name="circle-plus" size={34} color="#334FDC" />
      </TouchableOpacity>

      <Text style={styles.title}>Minhas receitas</Text>
      <Text style={styles.subtitle}>
        Acompanhe seus medicamentos cadastrados e gerencie lembretes
      </Text>

     <View style={styles.content}>
      <View style={styles.card}>
        {/* topo: título + lixeira em linha */}
        <View style={styles.cardTop}>
          <Text style={styles.textTitle}>Nome do remédio</Text>
          <TouchableOpacity style={styles.btnTrash}>
            <Feather name="trash-2" size={20} color="#C02636" />
          </TouchableOpacity>
        </View>

        {/* linha das badges (lado a lado) */}
        <View style={styles.chipsRow}>
          <View style={styles.subtitleCard}>
            <Feather name="clock" size={16} color="#4D708F" style={styles.cardIcon} />
            <Text style={styles.chipText}>14:00</Text>
          </View>

          <View style={styles.subtitleCard2}>
            <FontAwesome6 name="arrow-right-arrow-left" size={16} color="#4D708F" style={styles.cardIcon} />
            <Text style={styles.chipText}>A cada 12 horas</Text>
          </View>
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
    paddingRight: 30
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
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTitle:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnTrash: {
    padding: 6,
  },
  chipsRow: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  subtitleCard:{
    paddingHorizontal: 10,
    height: 32,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#CAD7E2",
    marginRight: 10, 
  },
  subtitleCard2:{
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#CAD7E2",
  },
  cardIcon:{
    marginRight: 6
  },
  chipText: {
    fontSize: 13
  }
});
