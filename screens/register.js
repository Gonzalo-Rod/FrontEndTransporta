import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const Register = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const url_register = "https://z9i523elr0.execute-api.us-east-1.amazonaws.com/dev/register";
  const headers = { "Content-Type": "application/json" };

  const validateInputs = () => {
    if (!nombre || !apellido || !correo || !password || !telefono) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      Alert.alert("Error", "Por favor, ingresa un correo válido.");
      return false;
    }
    if (telefono.length !== 9 || isNaN(telefono)) {
      Alert.alert("Error", "El número de teléfono debe tener 9 dígitos.");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    const info = {
      nombre,
      apellido,
      correo,
      password,
      telefono,
    };

    const json_data = {
      httpMethod: "POST",
      path: "/register-user",
      body: JSON.stringify(info),
    };

    try {
      const response = await axios({
        method: "POST",
        url: url_register,
        headers: headers,
        data: json_data,
      });
      console.log("Registro exitoso:", response);
      Alert.alert("Registro exitoso", "Te has registrado con éxito.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error en el registro:", error);
      setErrorMessage("Error al registrarse. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Registrate en <Text style={{ color: "#6B9AC4" }}>Transporta</Text>
      </Text>
      <Text style={styles.subtitle}>Moviliza carga rápido y seguro</Text>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
        <Text style={styles.continueText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.registerText}>
          ¿Ya tienes cuenta? <Text style={{ color: "#6B9AC4" }}>Inicia sesión</Text>
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Al hacer clic en registrar, acepta nuestros Términos de servicio y
        Política de privacidad.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  continueButton: {
    backgroundColor: "#6B9AC4",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  continueText: {
    color: "white",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "gray",
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    marginHorizontal: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  registerText: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
    marginTop: 10,
  },
});

export default Register;
