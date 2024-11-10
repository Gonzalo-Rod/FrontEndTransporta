import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const driversData = [
  { id: '1', name: 'Pedro Lopez Alvarez', plate: 'AEZ037', vehicle: 'HYUNDAI Negro', rating: 4.5, image: require('../../assets/ConductorTemp.png') },
];

const DetailsCard = () => {
  const navigation = useNavigation();
  const driver = driversData[0]; // Using the first driver as an example

  return (
    <SafeAreaView style={styles.container}>
      {/* Driver Info Button */}
      <TouchableOpacity style={styles.driverCard} onPress={() => navigation.navigate('DriverProfile', { driver })}>
        <Image source={driver.image} style={styles.driverImage} />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverDetails}>{driver.plate}</Text>
          <Text style={styles.driverDetails}>{driver.vehicle}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#4A90E2" />
          <Text style={styles.ratingText}>{driver.rating}</Text>
        </View>
      </TouchableOpacity>

      {/* Route Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ruta</Text>
        <View style={styles.routeContainer}>
          <Text style={styles.routePoint}>Origen</Text>
          <Text style={styles.routeAddress}>Jiron Medrano Silva, 165</Text>
        </View>
        <View style={styles.routeContainer}>
          <Text style={styles.routePoint}>Destino</Text>
          <Text style={styles.routeAddress}>Jiron Medrano Silva, 165</Text>
        </View>
      </View>

      {/* Payment Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pago</Text>
        <View style={styles.paymentContainer}>
          <Image source={require('../../assets/Visa.png')} style={styles.paymentIcon} />
          <Text style={styles.paymentDetails}>**** 1234</Text>
          <Text style={styles.paymentAmount}>S/. 100</Text>
        </View>
      </View>

      {/* Date Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fecha</Text>
        <Text style={styles.dateText}>Lunes, Agosto 17 20:00h GMT-5</Text>
      </View>

      {/* Cancel Button */}
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  driverDetails: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    padding: 5,
    borderRadius: 15,
  },
  ratingText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 5,
  },
  section: {
    borderTopWidth: 1,
    borderTopColor: '#DADADA',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  routePoint: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  routeAddress: {
    fontSize: 14,
    color: '#333',
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  paymentDetails: {
    fontSize: 16,
    color: '#333',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: '#D9534F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default DetailsCard;
