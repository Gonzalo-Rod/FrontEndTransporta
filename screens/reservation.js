import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Reservations = ({ navigation }) => {
  const routes = [
    { id: '1', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024', status: 'accepted' },
    { id: '2', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024', status: 'pending' },
    { id: '3', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024', status: 'pending' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tus Reservas</Text>

      <TouchableOpacity style={styles.reservaButton} onPress={() => navigation.navigate('ReservationRoute')}>
        <Image source={require('../assets/Reserva.png')} style={styles.reservaIcon} />
        <View style={styles.reservaTextContainer}>
          <Text style={styles.reservaTitle}>Reserva</Text>
          <Text style={styles.reservaDescription}>Realiza una reserva, si necesitas un servicio a una hora específica</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.reservationsList}>
        {routes.map((route) => (
          <ReservationItem
            key={route.id}
            address={route.address}
            date={route.date}
            status={route.status}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const ReservationItem = ({ address, date, status }) => (
  <TouchableOpacity style={styles.reservationItem}>
    <Ionicons name="calendar-outline" size={24} color="#4A90E2" />
    <View style={styles.reservationTextContainer}>
      <Text style={styles.reservationText}>{address}</Text>
      <Text style={styles.reservationDate}>{date}</Text>
    </View>
    {status === 'accepted' ? (
      <Ionicons name="checkmark" size={24} color="#4CAF50" />
    ) : (
      <Ionicons name="hourglass-outline" size={24} color="#D3A53A" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
  },
  reservaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#E0E0E0',
    padding: 16,
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reservaIcon: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  reservaTextContainer: {
    marginVertical: 30,
    flex: 1,
  },
  reservaTitle: {
    fontSize: 28,
    fontWeight: '500',
    color: '#6B9AC4',
  },
  reservaDescription: {
    fontSize: 16,
    color: '#666',
  },
  reservationsList: {
    marginBottom: 20,
  },
  reservationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reservationTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  reservationText: {
    fontSize: 16,
    color: '#333',
  },
  reservationDate: {
    fontSize: 14,
    color: '#888',
  },
});

export default Reservations;