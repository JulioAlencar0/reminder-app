import { Feather, FontAwesome6 } from '@expo/vector-icons';
import axios from "axios";
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Revenue {
  id: number;
  nome_remedio: string;
  horario: string;
  recorrencia: string;
}

export default function Revenues() {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const { id } = useLocalSearchParams();

  const fetchData = async (idParam: string | number) => {
    try {
      const res = await axios.get(`http://10.113.12.38:3000/lembretes/user/${idParam}`);
      setRevenues(res.data);
    } catch (e) {
      console.log("Erro ao buscar receitas:", e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (id) {
        const idString = Array.isArray(id) ? id[0] : id;

        setUserId(idString);

        setRevenues([]);
        console.log("ID RECEBIDO NA TELA:", id);

        fetchData(idString);
      }
    }, [id])
  );

  const handleDelete = (id: number) => {
  Alert.alert(
    "Deletar lembrete",
    "Tem certeza que deseja apagar esse lembrete?",
    [
      { text: "Cancelar", style: "cancel" },
      { text: "Deletar", style: "destructive", onPress: async () => {
        try {
          await axios.delete(`http://10.113.12.38:3000/lembretes/${id}`);
          setRevenues(prev => prev.filter(item => item.id !== id));
        } catch (error) {
          console.log(error);
          Alert.alert("Erro", "Não foi possível deletar.");
        }
      }}
    ]
  );
};
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => router.replace("/home")}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnPlus}
        onPress={() =>
          router.push({
            pathname: "/newRevenues",
            params: { id: userId },
          })
        }
      >
        <FontAwesome6 name="circle-plus" size={34} color="#334FDC" />
      </TouchableOpacity>

      <Text style={styles.title}>Minhas receitas</Text>
      <Text style={styles.subtitle}>
        Acompanhe seus medicamentos cadastrados e gerencie lembretes
      </Text>

      <View style={styles.content}>

        {revenues.length === 0 ? (
          <Text style={{ marginTop: 20, color: '#4D708F' }}>Nenhuma receita cadastrada.</Text>
        ):(
          <Text></Text>
        )
        }
          <FlatList
            data={revenues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.textTitle}>{item.nome_remedio}</Text>

                <TouchableOpacity style={styles.btnTrash} onPress={() => handleDelete(item.id)}>
                  <Feather name="trash-2" size={20} color="#C02636" />
                </TouchableOpacity>
              </View>

              <View style={styles.chipsRow}>
                <View style={styles.subtitleCard}>
                  <Feather name="clock" size={16} color="#4D708F" style={styles.cardIcon} />
                  <Text style={styles.chipText}>{item.horario}</Text>
                </View>

                <View style={styles.subtitleCard2}>
                  <FontAwesome6 name="arrow-right-arrow-left" size={16} color="#4D708F" style={styles.cardIcon} />
                  <Text style={styles.chipText}>{item.recorrencia}</Text>
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
