import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';

const MapDetails = () => {
  const route = useRoute();
  const { inicio, llegada } = route.params;
  console.log(inicio)
  console.log(llegada)

  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [Maproute, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null); // Referencia al mapa

  // Función para obtener coordenadas de una dirección
  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://proyecto-is-google-api.vercel.app/google-maps/coordinates?address=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      return { latitude: data.lat, longitude: data.lng };
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      Alert.alert('Error', 'No se pudieron obtener las coordenadas.');
      return null;
    }
  };

  // Función para obtener la ruta entre coordenadas
  const fetchRoute = async () => {
    if (!originCoords || !destinationCoords) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://proyecto-is-google-api.vercel.app/google-maps/directions?origin=${originCoords.latitude},${originCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.routes.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRoute(points);

        // Ajusta la cámara para que enfoque la ruta
        if (mapRef.current) {
          mapRef.current.fitToCoordinates(points, {
            edgePadding: { top: 25, right: 50, bottom: 400, left: 50 },
            animated: true,
          });
        }
      } else {
        console.error('No se encontró una ruta válida.');
        Alert.alert('Error', 'No se encontró una ruta válida.');
      }
    } catch (error) {
      console.error('Error al obtener la ruta:', error);
      Alert.alert('Error', 'No se pudo obtener la ruta.');
    } finally {
      setLoading(false);
    }
  };

  // Decodificador de polyline
  const decodePolyline = (t) => {
    let points = [];
    let index = 0,
      len = t.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  // Efecto para obtener las coordenadas y la ruta
  useEffect(() => {
    const fetchCoordinatesAndRoute = async () => {
      setLoading(true);
      const origin = await fetchCoordinates(inicio);
      const destination = await fetchCoordinates(llegada);

      if (origin && destination) {
        setOriginCoords(origin);
        setDestinationCoords(destination);
      }
      setLoading(false);
    };

    fetchCoordinatesAndRoute();
  }, [inicio, llegada]);

  useEffect(() => {
    if (originCoords && destinationCoords) {
      fetchRoute();
    }
  }, [originCoords, destinationCoords]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <MapView
        ref={mapRef} // Asigna la referencia al mapa
        style={styles.map}
        initialRegion={{
          latitude: originCoords?.latitude || -12.05677,
          longitude: originCoords?.longitude || -77.0269,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marcador de inicio */}
        {originCoords && (
          <Marker coordinate={originCoords} title="Origen" />
        )}
        {/* Marcador de destino */}
        {destinationCoords && (
          <Marker coordinate={destinationCoords} title="Destino" />
        )}
        {/* Renderización de la ruta */}
        {Maproute && <Polyline coordinates={Maproute} strokeWidth={4} strokeColor="#007AFF" />}
      </MapView>
    </View>
  );
};

export default MapDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});