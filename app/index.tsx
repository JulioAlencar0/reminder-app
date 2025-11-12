import { Image } from "expo-image";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#E4ECE9" barStyle="dark-content" />
      <Image style={styles.logo}
        source={require("../assets/images/logo.svg")}
        />
        <View style={styles.loginCreate}>
            <Text style={styles.loginCreateText}>Entre para acessar suas receitas</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C02636"
  },
  logo:{
    width: 255,
    height: 60,
    top: -220,
  },
  loginCreate:{
    width: '100%',
    height: 480,
    backgroundColor: '#E4ECE9',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  loginCreateText:{
    fontSize: 16,
    fontWeight: '600',
    marginTop: 48,
    marginLeft: 32,
  }
})