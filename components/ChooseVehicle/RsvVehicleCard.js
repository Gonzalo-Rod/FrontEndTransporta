import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const vehicles = [
  {
    id: '1',
    name: 'Van',
    time: '30 min - 40 min',
    dimension: '2.5 × 1.7 × 1.5',
    price: 40,
    image: require('../../assets/Van.png'), 
  },
  {
    id: '2',
    name: 'Furgoneta',
    time: '20 min - 40 min',
    dimension: '3.5 × 2.0 × 2.0',
    price: 70,
    image: require('../../assets/Furgoneta.png'), 
  },
  {
    id: '3',
    name: 'Camion',
    time: '1h - 1:30h',
    dimension: '6.5 × 2.5 × 2.5',
    price: 100,
    image: require('../../assets/Camion.png'), 
  },
  {
    id: '4',
    name: 'Flete',
    time: '1h - 1:30h',
    dimension: '6.5 × 2.5 × 2.5',
    price: 300,
    image: require('../../assets/Flete.png'), 
  },
];

const RsvVehicleList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { inicio , llegada, fecha, hora } = route.params;
  console.log(hora)
  console.log(fecha)

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle.id === selectedVehicle ? null : vehicle.id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.id === selectedVehicle && styles.selectedCard,
      ]}
      onPress={() => handleSelectVehicle(item)}
    >
      <View style={styles.leftContainer}>
        <Image source={item.image} style={styles.vehicleImage} />
        <View>
          <Text style={styles.vehicleName}>{item.name}</Text>
          <Text style={styles.vehicleInfo}>{item.time}</Text>
          <Text style={styles.vehicleInfo}>Dimensión: {item.dimension}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.priceText}>S/. {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      {/* Continue Button */}
      {selectedVehicle && (
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('AdvConfirmation', {originAddress: inicio, destinationAddress: llegada, date: fecha, time: hora}) }
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    marginTop: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 9,
    marginHorizontal: 10,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#6B9AC4',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#6B9AC4',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
  },
  rightContainer: {
    borderLeftWidth: 1,
    borderLeftColor: '#6B9AC4',
    paddingLeft: 15,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#6B9AC4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
    marginHorizontal: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RsvVehicleList;
