import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
const url = "https://mj8h12vo9d.execute-api.us-east-1.amazonaws.com/dev/reserva";
const headers = {
	"Content-Type":"application/json"
}
import { useFocusEffect } from '@react-navigation/native';
import { getUser,getToken } from "../utils/Auth";
import axios from "axios";

const AdvReservation = ({ navigation, route }) => {
  const { driverData } = route.params

	const [placa, setPlaca] = useState(); //
	const [telefono_driver,setTelefono_driver] = useState(); //
	const [user,setUser] = useState(); //
	const [token,setToken] = useState(); //
	const [correo_driver,setCorreo_driver] = useState(); //
	const [inicio,setInicio] = useState(); //
	const [llegada,setLlegada] = useState(); //
	const [metodo_de_pago,setMetodo_de_pago] = useState(); //
	const [fecha,setFecha] = useState(); //
	const [hora,setHora] = useState(); //
	const [precio,setPrecio] = useState(); //
	const [comentarios,setComentarios] = useState(); //
	const [duracion,setDuracion] = useState();
	const [horario,setHorario] = useState();

	const test = () => {
		(async () => {
			const useR = await getUser();
			const tokeN = await getToken();
			setUser(useR);
			setToken(tokeN);
		})();
	}
	useEffect(() => {test();},[]);

  const obtenerDireccionesGoogleMaps = async () => {
  	const baseURL = 'https://proyecto-is-google-api.vercel.app/google-maps/directions';
    try {
			const response = await axios.get(baseURL, {
      	params: {
        	origin: inicio,
          destination: llegada
        }
      });
			const distancia = response.data.routes[0]?.legs[0]?.distance?.value || 0; 
      const duracion  = response.data.routes[0]?.legs[0]?.duration?.value || 0;
			
			const tipo_transporte = 10;
			const tipo_carga = 20;

			const dur = duracion/60
			const precioCalculado = (distancia/1000 * 2) + tipo_transporte + tipo_carga;
			console.log(precioCalculado);
      setPrecio(precioCalculado.toFixed(1));
			setDuracion(dur.toFixed(1));
    } catch (error) {
			console.log("Error obteniendo direcciones:", error.message);
		}
  };


	const obtenerHorario = async () => {
		const urlcito = "https://mj8h12vo9d.execute-api.us-east-1.amazonaws.com/dev/day-schedule";
		try {
			const info = {
				fecha:fecha,
				correo_driver:driverData.mail, //esto se debe pasar por route params
				estado: "solicitada"//cambiar a "acpetada"
			};
			const json_data = {
				httpMethod:"GET",
				path:"/day-schedule",
				body: JSON.stringify(info)
			}
			const method = "POST";
			const response = await axios({
				url:urlcito,
				headers:headers,
				method:method,
				data:json_data
			});
			console.log("HORARIO")
			console.log(JSON.parse(response.data.body).response);
			setHorario(JSON.parse(response.data.body).response);
		} catch (error) {console.log(error);}
	}

	useEffect(() => {
		if (fecha){ obtenerHorario(); }
	},[fecha]);

  useEffect(() => {
  	if (inicio && llegada) {
			obtenerDireccionesGoogleMaps();
		}
  }, [inicio, llegada]);


	const create_reservaHandler = async () => {
		if (!esHoraValida()) {
			console.log("Error La hora seleccionada está dentro de un intervalo de tiempo ya reservado.");
			return false;
		}
		try {
			const info = {
				correo_user:user,
				correo_driver:driverData.mail, //se debe pasar por route params
				telefono_driver:driverData.phone, //esto tambien 
				inicio:inicio,
				llegada:llegada,
				metodo_de_pago:"yape", //el json con las opciones disponibles se debe pasar por route params
				placa:driverData.plate,  //route params
				fecha:fecha,
				hora:hora,
				precio:precio,
				comentarios:comentarios,
				token:token,
				duracion:duracion
			}
			console.log(duracion);
			const json_data = {
				httpMethod:"POST",
				path:"/reserva",
				body: JSON.stringify(info)
			}
			const method = "POST"
			const response =  await axios({
				url:url,
				method:method,
				data:json_data,
				headers:headers
			});
			const reservadita = response;
			console.log(reservadita);
			return true;
		} catch (error) { console.log(error); }

	};



  const calcularHoraFinal = (hora, duracion) => {
    	const [horaInicial, minutosIniciales] = hora.split(':').map(Number);
    	const minutosTotales = horaInicial * 60 + minutosIniciales + duracion;
    	const horasFinales = Math.floor(minutosTotales / 60);
    	const minutosFinales = minutosTotales % 60;
    	return `${horasFinales.toString().padStart(2, '0')}:${minutosFinales.toString().padStart(2, '0')}`;
  };

	const esHoraValida = () => {
    const [horaReserva, minutosReserva] = hora.split(':').map(Number);
    const minutosReservaTotales = horaReserva * 60 + minutosReserva;
    const duracionReserva = parseInt(duracion, 10) || 0;

    for (let item of horario) {
      const horaInicio = item.hora.S;
      const duracionItem = parseInt(item.duracion?.S, 10) || 0;
      const horaFinal = calcularHoraFinal(horaInicio, duracionItem);

      const [inicioHora, inicioMinutos] = horaInicio.split(':').map(Number);
      const minutosInicioTotales = inicioHora * 60 + inicioMinutos;

      const [finHora, finMinutos] = horaFinal.split(':').map(Number);
      const minutosFinTotales = finHora * 60 + finMinutos;

      if (
        (minutosReservaTotales >= minutosInicioTotales && minutosReservaTotales < minutosFinTotales) ||
        (minutosReservaTotales + duracionReserva > minutosInicioTotales && minutosReservaTotales + duracionReserva <= minutosFinTotales)
      ) {
        return false; // Hora en conflicto con el intervalo de tiempo existente
      }
    }
    return true; // Hora válida
  };






  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Datos de reserva</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <Ionicons name="search" size={18} color="#A5A5A5" />
            <TextInput
              placeholder="Partida"
              style={styles.input}
              value={inicio}
              onChangeText={setInicio}
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="search" size={18} color="#A5A5A5" />
            <TextInput
              placeholder="Destino"
              style={styles.input}
              value={llegada}
              onChangeText={setLlegada}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputRow, styles.smallInput]}>
              <Ionicons name="calendar" size={18} color="#A5A5A5" />
              <TextInput
                placeholder="Fecha"
                style={styles.input}
                value={fecha}
                onChangeText={setFecha}
              />
            </View>
            <View style={[styles.inputRow, styles.smallInput]}>
              <Ionicons name="alarm" size={18} color="#A5A5A5" />
              <TextInput
                placeholder="Hora"
                style={styles.input}
                value={hora}
                onChangeText={setHora}
              />
            </View>
          </View>

    			<View style={styles.container}>
      			<Text style={styles.title}>Horas y Duraciones Disponibles</Text>
      			<FlatList
        			data={horario}
        			keyExtractor={(item, index) => index.toString()}
							renderItem={({ item }) => {
								const hora = item.hora?.S || "Hora no disponible";
								const duracion = parseInt(item.duracion?.S, 10) || 0;
								const horaFinal = calcularHoraFinal(hora, duracion);
								return (
									<View style={styles.itemContainer}>
										<Text style={styles.text}>{`${hora} - ${horaFinal}`}</Text>
									</View>
								)
							}}
      			/>
    			</View>

          <View style={styles.notesContainer}>
            <Ionicons name="document-text" size={18} color="#A5A5A5" style={styles.notesIcon} />
            <TextInput
							onChangeText={setComentarios}
							value={comentarios}
              placeholder="Notas"
              style={[styles.input, styles.notesInput]}
              multiline
            />
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio Sugerido</Text>
          <Text style={styles.price}>S/. {precio}</Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={async () => {
            const reserva_valida = await create_reservaHandler();
						if(reserva_valida){
							navigation.navigate('AdvConfirmation', {
              	originAddress: inicio,
              	destinationAddress: llegada,
              	date: fecha,
              	time: hora,
            	});
						}
          }}
        >
          <Text style={styles.submitButtonText}>Solicitar Reserva</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: '#E5E5E5',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 97,
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  notesIcon: {
    marginTop: 5,
  },
  notesInput: {
    height: 180,
    textAlignVertical: 'top',
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#6B9AC4',
    marginTop: 20,
  },
  priceLabel: {
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B9AC4',
  },
  submitButton: {
    backgroundColor: '#6B9AC4',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});



export default AdvReservation;