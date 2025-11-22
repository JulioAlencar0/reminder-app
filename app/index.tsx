import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const slideAnim = useRef(new Animated.Value(300)).current;
  const transitionAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const confirmSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      speed: 1.5,
      bounciness: 18,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleForm = () => {
    const toValue = isCreatingAccount ? 0 : 1;

    Animated.timing(transitionAnim, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(confirmSlide, {
        toValue: toValue ? 0 : 60,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    setIsCreatingAccount(!isCreatingAccount);
  };

  const translateY = transitionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#E4ECE9" barStyle="dark-content" />

      <Image
        style={styles.logo}
        source={require("../assets/images/logo.svg")}
      />

      <View style={styles.fundoBrancoFix}></View>

      <Animated.View
        style={[
          styles.loginCreate,
          {
            transform: [{ translateY: slideAnim }, { translateY }],
            height: isCreatingAccount ? 600 : 480,
          },
        ]}
      >
        <Text style={styles.loginCreateText}>
          {isCreatingAccount
            ? "Crie sua conta e comece agora"
            : "Entre para acessar suas receitas"}
        </Text>

        {/* E-MAIL */}
        <Text style={styles.inputText}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="email@exemplo.com"
          placeholderTextColor="#293C4C"
          keyboardType="email-address"
        />

        {/* SENHA */}
        <Text style={styles.inputText}>Senha</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            secureTextEntry={!senhaVisivel}
            placeholder="••••••••••"
            placeholderTextColor="#293C4C"
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
          >
            <Image
              source={
                senhaVisivel
                  ? require("../assets/images/eye-off.svg")
                  : require("../assets/images/eye.svg")
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* NOME — aparece só no modo criar conta */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: confirmSlide }],
          }}
        >
          {isCreatingAccount && (
            <>
              <Text style={styles.inputText}>Nome</Text>
              <TextInput style={styles.input} keyboardType="default" placeholder="Ex: Júlio César" placeholderTextColor={"#293C4C"} />
            </>
          )}
        </Animated.View>

        {/* BOTÃO PRINCIPAL */}
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Text style={styles.btnEnterText}>
            {isCreatingAccount ? "Cadastrar" : "Entrar"}
          </Text>
        </TouchableOpacity>

        {/* BOTÃO SECUNDÁRIO */}
        <TouchableOpacity onPress={toggleForm}>
          <Text style={[styles.btnEnterText, styles.btnCriarConta]}>
            {isCreatingAccount ? "Já tenho uma conta" : "Criar uma conta"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C02636",
  },
  logo: {
    width: 255,
    height: 60,
    top: -250,
  },
  fundoBrancoFix: {
    position: "absolute",
    marginTop: 600,
    width: "100%",
    height: 500,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginCreate: {
    position: "absolute",
    width: "100%",
    paddingHorizontal: 32,
    backgroundColor: "#ffffff",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  loginCreateText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 48,
  },
  inputText: {
    width: "100%",
    marginTop: 30,
  },

  /* INPUTS */
  inputWrapper: {
    position: "relative",
    width: "100%",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 56,
    marginTop: 12,
    borderColor: "#000000",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 16,
  },

  eyeButton: {
    position: "absolute",
    right: 16,
    top: 26,
    padding: 5,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },

  btnEnterText: {
    height: 56,
    backgroundColor: "#C02636",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 55,
    borderRadius: 999,
    marginTop: 30,
    fontSize: 16,
    fontWeight: "700",
  },
  btnCriarConta: {
    backgroundColor: "#ffffff",
    color: "#000000",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 16,
  },
});
