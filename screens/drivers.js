import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const defaultRating = 5;

const DriversList = ({ navigation, route }) => {
  const { vehiculos } = route.params;
  console.log(vehiculos)

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);

  useEffect(() => {
    const drivers = vehiculos ? vehiculos.map((driver) => ({
      id: driver.placa.S,
      name: driver.nombre_conductor.S,
      mail: driver.correo_conductor.S,
      lastname: driver.apellido_conductor.S,
      phone: driver.telefono.S,
      vehicle: driver.tipo_transporte.S,
      plate: driver.placa.S,
      ancho: driver.dimensiones.M.ancho.S,
      largo: driver.dimensiones.M.largo.S,
      altura: driver.dimensiones.M.altura.S,
      rating: defaultRating,
      image: require('../assets/ConductorTemp.png'),
    })) : driversData;

    setFilteredDrivers(drivers);
  }, [vehiculos]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = filteredDrivers.filter(driver =>
      driver.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };

  const navigateToProfile = (driver) => {
    navigation.navigate('DriverProfile', { driver });
  };

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToProfile(item)}>
      <View style={styles.driverCard}>
        <Image source={item.image} style={styles.driverImage} />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{item.name} {item.lastname}</Text>
          <Text style={styles.driverDetails}>Vehiculo: {item.vehicle}</Text>
          <Text style={styles.driverDetails}>Dimensiones: {item.ancho} x {item.largo} x {item.altura}</Text>
          <View style={styles.driverRating}>
            <Ionicons name="star" size={16} color="#6B9AC4" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conductores</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Busca"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredDrivers}
        keyExtractor={item => item.id}
        renderItem={renderDriverItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 115,
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '91%',
    marginTop: 10,
    marginHorizontal: 19,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'gray',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  driverCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    width: width - 40, 
    alignSelf: 'center',
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  driverInfo: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  driverDetails: {
    fontSize: 14,
    color: '#555',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
});

export default DriversList;
