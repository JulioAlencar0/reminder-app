import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Revenues() {
  const handleDelete = (id: string) => {
  setRevenues(prev => prev.filter(item => item.id !== id));
};

  const [revenues, setRevenues] = useState([
    {
      id: "1",
      name: "Nome do remédio",
      time: "14:00",
      recurrence: "A cada 12 horas",
    }
  ]);

  const params = useLocalSearchParams();

  useEffect(() => {
  if (params?.newRevenue) {
    const newRevenueParam = Array.isArray(params.newRevenue)
      ? params.newRevenue[0]
      : params.newRevenue;

    if (typeof newRevenueParam !== "string") return;

    try {
      const parsed = JSON.parse(newRevenueParam);

      setRevenues(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          name: parsed.name,
          time: parsed.time,
          recurrence: parsed.recurrence,
        }
      ]);
    } catch (e) {
      console.warn("Failed to parse newRevenue:", e);
    }
  }
}, [params?.newRevenue]); 


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => router.replace("/home")}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnPlus}
        onPress={() =>
          router.push("/newRevenues")
        }
      >
        <FontAwesome6 name="circle-plus" size={34} color="#334FDC" />
      </TouchableOpacity>

      <Text style={styles.title}>Minhas receitas</Text>
      <Text style={styles.subtitle}>
        Acompanhe seus medicamentos cadastrados e gerencie lembretes
      </Text>

      <View style={styles.content}>
        <FlatList
          data={revenues}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.textTitle}>{item.name}</Text>

                <TouchableOpacity style={styles.btnTrash} onPress={() => handleDelete(item.id)}>
                  <Feather name="trash-2" size={20} color="#C02636" />
                  
                </TouchableOpacity>
              </View>

              <View style={styles.chipsRow}>
                <View style={styles.subtitleCard}>
                  <Feather name="clock" size={16} color="#4D708F" style={styles.cardIcon} />
                  <Text style={styles.chipText}>{item.time}</Text>
                </View>

                <View style={styles.subtitleCard2}>
                  <FontAwesome6 name="arrow-right-arrow-left" size={16} color="#4D708F" style={styles.cardIcon} />
                  <Text style={styles.chipText}>{item.recurrence}</Text>
                </View>
              </View>
            </View>
          )}
        />
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
    width: 366,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
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
