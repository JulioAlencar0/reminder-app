import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useUser } from "../context/UserContext";

import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NovaReceita() {
  const [tomarAgora, setTomarAgora] = useState(false);
  const { user } = useUser();


  // Nome do Remédio
  const [name, setName] = useState("");

  // Horário
  const [time, setTime] = useState("");
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirmTime = (date: Date) => {
    const hour = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    setTime(`${hour}:${min}`);
    hideTimePicker();
  };

  // Recorrência
  const [recurrence, setRecurrence] = useState("");
  const [openRecurrencePicker, setOpenRecurrencePicker] = useState(false);

  // ENVIO PARA TELA REVENUES
  const handleAdd = async () => {
  if (!name || !time || !recurrence) {
    Alert.alert("Ops!", "Preencha todos os campos.");
    return;
  }

  if (!user) {
    Alert.alert("Erro", "Usuário não encontrado.");
    return;
  }

  try {
    await axios.post("http://10.0.0.11:3000/lembretes", {
      nome_remedio: name,
      horario: time,
      recorrencia: recurrence,
      tomarAgora: tomarAgora,
      user_id: user.id, // 🔥 chave estrangeira do usuário logado
    });

    Alert.alert("Sucesso!", "Receita adicionada com sucesso.");

    router.push("/revenues");

  } catch (err) {
    console.log(err);
    Alert.alert("Erro", "Não foi possível salvar a receita.");
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <TouchableOpacity style={styles.btnBack} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Nova receita</Text>
      <Text style={styles.subtitle}>
        Adicione a sua prescrição médica para receber lembretes de quando tomar
        seu medicamento
      </Text>

      {/* Remédio */}
      <Text style={styles.label}>Remédio</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do medicamento"
        placeholderTextColor={"#293C4C"}
        value={name}
        onChangeText={setName}
      />

      {/* Horário */}
      <Text style={styles.label}>Horário</Text>

      <TouchableOpacity style={styles.input} onPress={showTimePicker}>
        <Text style={{ color: time ? "#000" : "#293C4C", fontSize: 16 }}>
          {time || "00:00"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        locale="pt-BR"
        is24Hour
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />

      <Text style={styles.label}>Recorrência</Text>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setOpenRecurrencePicker(true)}
      >
        <Text style={{ color: recurrence ? "#000" : "#293C4C", fontSize: 16 }}>
          {recurrence || "Selecione"}
        </Text>
      </TouchableOpacity>

      {/* MODAL DO PICKER */}
      <Modal visible={openRecurrencePicker} transparent animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => setOpenRecurrencePicker(false)}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={recurrence}
            onValueChange={(value) => {
              setRecurrence(value);
              setOpenRecurrencePicker(false);
            }}
          >
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="A cada 6 horas" value="A cada 6 horas" />
            <Picker.Item label="A cada 8 horas" value="A cada 8 horas" />
            <Picker.Item label="A cada 12 horas" value="A cada 12 horas" />
            <Picker.Item label="A cada 24 horas" value="A cada 24 horas" />
          </Picker>
        </View>
      </Modal>

      {/* Switch */}
      <View style={styles.switchRow}>
        <Switch
          value={tomarAgora}
          onValueChange={setTomarAgora}
          trackColor={{ false: "#767577", true: "#C02636" }}
          thumbColor="#fff"
        />
        <Text style={styles.switchText}>Tomar agora</Text>
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
        <Text style={styles.btnAddText}>+ Adicionar</Text>
      </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
  },
  btnBack: {
    marginTop: 20,
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
    marginLeft: 0,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A2B9CD",
    width: "100%",
    height: 56,
    paddingLeft: 16,
    justifyContent: "center",
    marginTop: 10,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  pickerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 30,
  },

  switchRow: {
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
  },
  btnAdd: {
    backgroundColor: "#C02636",
    borderRadius: 999,
    marginTop: 80,
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 30,
    width: 366,
    alignSelf: "center",
  
  },
  btnAddText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
