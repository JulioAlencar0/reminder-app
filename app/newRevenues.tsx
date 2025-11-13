import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert, StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function NovaReceita() {
  const [tomarAgora, setTomarAgora] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Nova receita</Text>
      <Text style={styles.subtitle}>
        Adicione a sua prescrição médica para receber lembretes de quando tomar
        seu medicamento
      </Text>

      <Text style={styles.label}>Remédio</Text>
      <TextInput style={styles.input} placeholder="Nome do medicamento" placeholderTextColor={'#293C4C'}/>

      <Text style={styles.label}>Horário</Text>
      <TextInput style={styles.input} placeholder="00:00" placeholderTextColor={'#293C4C'} />

      <Text style={styles.label}>Recorrência</Text>
      <TextInput style={styles.input} placeholder="Selecione" placeholderTextColor={'#293C4C'} />

      <View style={styles.switchRow}>
        <Switch
            value={tomarAgora}
            onValueChange={setTomarAgora}
            trackColor={{ false: "#767577", true: "#C02636" }}
            thumbColor="#fff"
        />

        <Text style={styles.switchText}>Tomar agora</Text>
      </View>

      <TouchableOpacity style={styles.btnAdd} onPress={() => {
            Alert.alert("Sucesso!", "Receita adicionada com sucesso.");
            router.back();
        }}>
        <Text style={styles.btnAddText}>+ Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
  },
  btnBack: {
    marginTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#C02636",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
  },
  label: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A2B9CD",
    width: 366,
    height: 56,
    paddingLeft: 16,
    marginTop: 10,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  btnAdd: {
  backgroundColor: "#C02636",
  borderRadius: 999,
  marginTop: "auto",
  alignItems: "center",
  paddingVertical: 14,
  marginBottom: 30,
},
  btnAddText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
