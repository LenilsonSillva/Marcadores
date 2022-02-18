import { StyleSheet, Text, View, Dimensions, TextInput, Modal, TouchableOpacity, Pressable } from 'react-native'
import React, {useState} from 'react'
import MapView, { Marker} from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';

export default function AddMark({route}) {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoShowMarkers, setInfoSM] = useState(false);
  const [resposta, setResposta] = useState('');

  const adicionar = async() => {
        const token = "vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF"
        const headerOptions = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: title,
            description: description,
            latitude: latitude,
            longitude: longitude
            
          })
        }
        await fetch("https://mobile.ect.ufrn.br:3003/markers", headerOptions)
        .then((resp) => {
            if( resp.status === 200){
              return setModalVisible(true),
                setResposta(`Marcador inserido com sucesso!`)
            }
            else{
              return setModalVisible(true),
                setResposta(`Não foi possível adicionar o marcador. Erro: ${resp.status}`)
            }
          }
        )
      }

      const showMarkers = (show) => {
        if(show){
          return route.params.dados.map((marker, id) =>
          <Marker
            key={id}
            coordinate = {{latitude: marker.latitude, longitude: marker.longitude}}
            title = {marker.title}
            description={marker.description}
            opacity = {0.4}
          />
        )
        }
      }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{resposta}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <MapView style={styles.map}
        onPress={(event) => {
          setLatitude(event.nativeEvent.coordinate.latitude)
          setLongitude(event.nativeEvent.coordinate.longitude)
        }}>
          <Marker 
          coordinate={{ latitude : latitude , longitude : longitude }}
          title = {title}
          description = {description}/>
          {showMarkers(show)}
      </MapView>
      <View style={styles.viewAdd}>
        <TextInput style={styles.input} placeholder="Digite o título" onChangeText={setTitle}/>
        <TextInput style={styles.input} placeholder="Descreva o local" onChangeText={setDescription}/>
        <TouchableOpacity style={styles.btnAdd} onPress={adicionar}>
          <Text style={styles.textAdd}>Adicionar</Text>
        </TouchableOpacity>
      </View>
     <View style={styles.showBtn}> 
      <TouchableOpacity  
      onPress={() => show ? setShow(false) : setShow(true)}
      onLongPress={()=> infoShowMarkers ? setInfoSM(false) : setInfoSM(true)}
      >
        <FontAwesome name={show ? 'eye' : 'eye-slash'} size={27} color={show ? 'rgb(15,115,25)' : 'rgb(155,25,15)'} />
      </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoShowMarkers}
      >
        <Pressable style={styles.modalInfoSM} onPress={()=> setInfoSM(false)}>
          <View style={styles.modalInfoSMBox}>
            <Text style={styles.modalText}>Clique aqui para mostrar marcadores previamente adicionados.</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  map: {
    flex: 6,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  viewAdd: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150
  },
  input: {
    backgroundColor: 'rgb(245,245,245)',
    height: 40,
    width: Dimensions.get('window').width - 70,
    borderRadius: 10,
    paddingHorizontal: 5,
    borderColor: 'rgb(80, 175, 95)',
    borderWidth: 0.7,
  }, 
  btnAdd: {
    backgroundColor: 'green',
    height: 35,
    width: 90,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAdd: {
    color: 'white',
    fontWeight: "bold",
  },
  showBtn: {
    position: 'absolute',
        alignSelf: 'flex-end',
        bottom: 190,
        left: 20
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 17,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "green",
    marginTop: 10
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalInfoSM: {
    flex: 1,
    justifyContent:'flex-end',
  },
  modalInfoSMBox: {
    width: 200,
    bottom: 200,
    left: 55,
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})