import { StyleSheet, Modal,TouchableOpacity, TextInput,Text, Dimensions, KeyboardAvoidingView, ScrollView, View, Pressable } from 'react-native'
import React, {useEffect,useState} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';
import { Entypo } from '@expo/vector-icons';

export default function Map({navigation}) {

  const [data, setData] = useState([]);
  const [pesq, setPesq] = useState('');
  const [showPesq, setShowPesq] = useState(false);
  const [infoAdd, setInfoAdd] = useState(false);
  const [infoPesq, setInfoPesq] = useState(false);

  useFocusEffect(React.useCallback(() => {
      async function getData(){
        const token = "vv7oTsHdw0X9g5e7QbniP58j3iJY4h6AoOSxMIw2X8xjokSHjF"
        const headerOptions = {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        const response = await fetch('https://mobile.ect.ufrn.br:3003/markers', headerOptions);
        const data = await response.json();
        setData(data);
        
      }
      getData();
  }, []));

  const funcPesq = (FT) => {
    if(FT === false){
    return <Animatable.View animation='bounceInRight'  style={styles.pesquisarBox}><TextInput placeholder='Pesquise marcadores' onChangeText={setPesq}/></Animatable.View>
    }
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.container}>
        <MapView style={styles.map}>
          {
            data.map((marker, id) =>
            {
              if(((marker.title.toUpperCase().indexOf(pesq.toUpperCase()) !== -1) || (marker.description.toUpperCase().indexOf(pesq.toUpperCase()) !== -1)) || pesq === '' )
            return <Marker
                key={id}
                coordinate = {{latitude: marker.latitude, longitude: marker.longitude}}
                title = {marker.title}
                description={marker.description}
              />
            }
            )
          }
        </MapView>
        <View style={styles.pesquisarView}>
          <TouchableOpacity style={styles.btnPesq} onLongPress={()=> setInfoPesq(true)} onPress={()=> showPesq ? setShowPesq(false): [setShowPesq(true), setPesq('')]}>
            <Entypo name={showPesq ? "magnifying-glass" : 'minus'} size={30} color="white" />
          </TouchableOpacity>
          {funcPesq(showPesq)}
        </View>
        <TouchableOpacity style={styles.addBtn} onLongPress={()=> setInfoAdd(true)} onPress={() => { navigation.navigate('AddMark', {dados: data})}}>
          <Text style={styles.addIcon}>Adicionar</Text>
        </TouchableOpacity>
        <Modal
        animationType="fade"
        transparent={true}
        visible={infoAdd}
      >
        <Pressable style={styles.modalInfoSM} onPress={()=> setInfoAdd(false)}>
          <View style={styles.modalInfoSMBox}>
            <Text style={styles.modalText}>Clique em Adicionar para inserir marcadores no mapa.</Text>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoPesq}
      >
        <Pressable style={styles.modalInfoSM2} onPress={()=> setInfoPesq(false)}>
          <View style={styles.modalInfoSMBox2}>
            <Text style={styles.modalText}>Faça pesquisas de marcadores. Insira o título ou descrição.</Text>
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      addBtn: {
        position: 'absolute',
        height: 48,
        width: 115,
        borderRadius: 15,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        bottom: 25,
      },
      addIcon: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold'
      },
      pesquisarView: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: Dimensions.get('window').height,
      },
      pesquisarBox: {
        justifyContent: 'center',
        position: 'absolute',
        height: 50,
        width: Dimensions.get('window').width - 100,
        top: 67,
        left: -235,
        backgroundColor: 'rgb(245,245,245)',
        borderRadius: 10,
        paddingHorizontal: 5,
        borderColor: 'rgb(80, 175, 95)',
        borderWidth: 0.7,
      },
      btnPesq: {
        position: 'absolute',
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        top: 65,
        left: 180
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      modalInfoSM: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems: 'center',
      },
      modalInfoSM2: {
        flex: 1,
        justifyContent:'flex-start',
        alignItems: 'flex-end',
      },
      modalInfoSMBox: {
        width: 200,
        bottom: 100,
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 9,
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
      },
      modalInfoSMBox2: {
        width: 200,
        top: 100,
        right: 40,
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 9,
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
      },
})