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
  View,
} from "react-native";

export default function Index() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current; // animação quando abre o app
  const transitionAnim = useRef(new Animated.Value(0)).current; //animação da tela de login/criar conta
  const fadeAnim = useRef(new Animated.Value(0)).current; // animação dos campos extras
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

    // anima o container principal
    Animated.timing(transitionAnim, {
      toValue,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // anima o fade dos campos extras
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: toValue,
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
    outputRange: [0, -25], // sobe um pouco a box cadastro
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E4ECE9" barStyle="dark-content" />

      <Image style={styles.logo} source={require("../assets/images/logo.svg")} />

      <View style={styles.fundoBrancoFix}></View>

      <Animated.View
        style={[
          styles.loginCreate,
          {
            transform: [
              { translateY: slideAnim },
              { translateY: translateY },
            ],
            height: isCreatingAccount ? 580 : 480,
          },
        ]}
      >
        <Text style={styles.loginCreateText}>
          {isCreatingAccount
            ? "Crie sua conta e comece agora"
            : "Entre para acessar suas receitas"}
        </Text>

        <Text style={styles.inputText}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="email@exemplo.com"
          placeholderTextColor="#293C4C"
          keyboardType="email-address"
        />

        <Text style={styles.inputText}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry={!senhaVisivel} />

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: confirmSlide }],
          }}
        >
          {isCreatingAccount && (
            <>
              <Text style={styles.inputText}>Confirmar senha</Text>
              <TextInput style={styles.input} secureTextEntry={!confirmSenhaVisivel} />
          <TouchableOpacity
          style={styles.icon2}
          onPress={() => setConfirmSenhaVisivel(!confirmSenhaVisivel)}
        >
          <Image
            source={
              confirmSenhaVisivel
                ? require("../assets/images/eye.svg")
                : require("../assets/images/eye-off.svg")
            }
            style={styles.iconImg}
          />
        </TouchableOpacity>
            </>
            
          )}
        </Animated.View>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => setSenhaVisivel(!senhaVisivel)}
        >
          <Image
            source={
              senhaVisivel
                ? require("../assets/images/eye.svg")
                : require("../assets/images/eye-off.svg")
            }
            style={styles.iconImg}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/home')}>
          <Text style={styles.btnEnterText}>
            {isCreatingAccount ? "Cadastrar" : "Entrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleForm}>
          <Text style={[styles.btnEnterText, styles.btnCriarConta]}>
            {isCreatingAccount ? "Já tenho uma conta" : "Criar uma conta"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
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
    bottom: 0,
    width: "100%",
    height: 300,
    backgroundColor: "#E4ECE9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loginCreate: {
    width: "100%",
    backgroundColor: "#E4ECE9",
    position: "absolute",
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
    marginLeft: 32,
  },
  inputText: {
    width: "90%",
    marginLeft: 32,
    marginTop: 30,
  },
  input: {
    width: 350,
    height: 56,
    marginLeft: 32,
    marginTop: 12,
    paddingLeft: 16,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
  },
  icon: {
    position: "absolute",
    right: 42,
    top: 257.2,
  },
  icon2: {
    position: "absolute",
    right: 42,
    top: 75,
  },
  iconImg: {
    width: 28,
    height: 28,
  },
  btnEnterText: {
    width: 350,
    height: 56,
    backgroundColor: "#C02636",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 55,
    borderRadius: 999,
    marginTop: 30,
    marginLeft: 32,
    fontSize: 16,
    fontWeight: "700",
  },
  btnCriarConta: {
    backgroundColor: "#E4ECE9",
    color: "#000000",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 16,
  },
});
