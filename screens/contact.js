import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";

const url = "https://h8019u59m4.execute-api.us-east-1.amazonaws.com/dev/get-vehiculos";
const headers = {
  "Content-Type": "application/json"
};

const exampleDrivers = [
  { id: '1', name: 'Pedro Lopez', vehicle: 'Van', cargoType: 'Mudanzas', enterprise: 'Empresa A', image: require('../assets/ConductorTemp.png'), rating: 4.5, plate: 'ABC123', dimensions: '4x2', availability: '9am - 6pm' },
  { id: '2', name: 'Ramiro Tyson', vehicle: 'Camion', cargoType: 'Eventos', enterprise: 'Empresa B', image: require('../assets/ConductorTemp.png'), rating: 4.8, plate: 'XYZ789', dimensions: '6x3', availability: '10am - 5pm' },
  { id: '3', name: 'Carlos Perez', vehicle: 'Camion', cargoType: 'Fragil', enterprise: 'Empresa C', image: require('../assets/ConductorTemp.png'), rating: 4.7, plate: 'LMN456', dimensions: '5x3', availability: '8am - 4pm' },
  { id: '4', name: 'Diego Garcia', vehicle: 'Flete', cargoType: 'Instrumentos', enterprise: 'Empresa D', image: require('../assets/ConductorTemp.png'), rating: 4.6, plate: 'OPQ123', dimensions: '6x2', availability: '7am - 3pm' },
];

const ContactScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState({ vehicle: null, cargoType: null, enterprise: null });
  const [vehiculos, setVehiculos] = useState([]);

  const get_vehiculos = async (parametro, valor) => {
    try {
      const info = {
        parametro: parametro,
        valor: valor.toLowerCase(),
      };
      const json_data = {
        httpMethod: "GET",
        path: "/get-vehiculos",
        body: JSON.stringify(info)
      };
      const method = "POST";
      const response = await axios({
        method,
        url,
        headers,
        data: json_data
      });
      console.log(response);
      const responseData = JSON.parse(response.data.body).response;
      setVehiculos(responseData);
      // Navigate to Drivers screen with vehiculos data
      navigation.navigate('Drivers', { vehiculos: responseData });
    } catch (error) {
      console.log(error);
    }
  };

  const applyFilter = (type, value) => {
    const lowercaseValue = value.toLowerCase();
    setSelectedFilter(prev => ({ ...prev, [type]: lowercaseValue}));

    let parametro;
    if (type === 'vehicle') parametro = 'tipo_transporte';
    else if (type === 'cargoType') parametro = 'tipo_carga';
    else if (type === 'enterprise') parametro = 'empresa';
    get_vehiculos(parametro, value);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Vehiculos Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vehiculos</Text>
          <TouchableOpacity onPress={() => console.log('Vehiculos button pressed')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={[
            { id: '1', name: 'Van', icon: require('../assets/Van.png') },
            { id: '2', name: 'Furgoneta', icon: require('../assets/Furgoneta.png') },
            { id: '3', name: 'Camion', icon: require('../assets/Camion.png') },
            { id: '4', name: 'Flete', icon: require('../assets/Flete.png') },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => applyFilter('vehicle', item.name)}>
              <View style={styles.carouselItem}>
                <Image source={item.icon} style={styles.iconImage} />
                <Text style={styles.carouselText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {/* Carga Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Carga</Text>
          <TouchableOpacity onPress={() => console.log('Carga button pressed')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={[
            { id: '1', name: 'Instrumentos', icon: require('../assets/Instrumentos.png') },
            { id: '2', name: 'Mudanzas', icon: require('../assets/Mudanzas.png') },
            { id: '3', name: 'Eventos', icon: require('../assets/Eventos.png') },
            { id: '4', name: 'Fragil', icon: require('../assets/Fragil.png') },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => applyFilter('cargoType', item.name)}>
              <View style={styles.carouselItem}>
                <Image source={item.icon} style={styles.cargas} />
                <Text style={styles.carouselText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {/* Empresas Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Empresas</Text>
          <TouchableOpacity onPress={() => console.log('Empresas button pressed')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={[
            { id: '1', name: 'Empresa A' },
            { id: '2', name: 'Empresa B' },
            { id: '3', name: 'Empresa C' },
            { id: '4', name: 'Empresa D' },
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => applyFilter('enterprise', item.name)}>
              <View style={styles.carouselItem}>
                <Text style={styles.companyLetter}>{item.name.charAt(item.name.length - 1)}</Text>
                <Text style={styles.carouselText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {/* Drivers Carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Conductores</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Drivers')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={exampleDrivers}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('DriverProfile', { driver: item })}>
              <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.driverImage} />
                <Text style={styles.vehicleType}>{item.vehicle}</Text>
                <Text style={styles.driverName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  container: { padding: 16, flex: 1 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  carouselItem: { alignItems: 'center', marginHorizontal: 15 },
  iconImage: { width: 80, height: 80, marginBottom: 5 },
  cargas: { width: 60, height: 60, marginBottom: 5, marginTop: 20 },
  carouselText: { fontSize: 14, color: '#000' },
  companyLetter: { fontSize: 60, fontWeight: 'bold', color: '#AAC1C8' },
  itemContainer: { alignItems: 'center', marginHorizontal: 15 },
  driverImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 5 },
  driverName: { fontSize: 14, fontWeight: 'bold' },
  vehicleType: { fontSize: 12, color: '#888' },
});

export default ContactScreen;
