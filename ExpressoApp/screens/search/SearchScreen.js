import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {firebaseDB} from '../../firebase/FirebaseConfig';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import Header from '../../components/Header';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('A-Z');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('title');
  const [items, setItems] = useState([
    {label: 'name', value: 'title'},
    {label: 'location', value: 'address'}
  ]);

  useEffect(() => {
    firebaseDB.ref('businesses/').on('value', (snapshot)=>{
      var business = [];
      const options = {
        enableHighAccuracy: true,
        timeout: 50000000,
        maximumAge: 0
      };
      const geoError = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }

      snapshot.forEach((child)=>{
        business.push({
              title: child.val().title,
              address: child.val().address,
              averagePrice: child.val().averagePrice,
              latitude: child.val().latitude,
              longitude: child.val().longitude
            })
      })
      Geolocation.watchPosition()
      Geolocation.getCurrentPosition(info => {
            console.log(info)
            business.forEach((item)=> {
              item.distance = getDistance(item.latitude, item.longitude, info.coords.latitude, info.coords.longitude);
              console.log(item.title + ': ' +item.distance +'\n' +item.latitude +',' +item.longitude)
        })
          }, err => geoError(err), options
      );

      setSortedFilteredData(business, sort);
      setMasterDataSource(business);
    })
  }, []);

  const getDistance = (lat, long, userLat, userLong) => {

    if (lat==null || long==null) {
      return 10000000000;
    }

    const R = 6371e3; // metres
    const φ1 = lat * Math.PI/180; // φ, λ in radians
    const φ2 = userLat * Math.PI/180;
    const Δφ = (userLat-lat) * Math.PI/180;
    const Δλ = (userLong-long) * Math.PI/180;

    const a =
        Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = (R * c)/1000; // in kilometres

    return distance;
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(
          function (item) {
            const itemData = item[value]
                ? item[value].toUpperCase()
                : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
      setSortedFilteredData(newData, sort);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setSortedFilteredData(masterDataSource, sort);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
        // Flat List Item
        <TouchableOpacity  style={styles.itemStyle}  onPress={() => getItem(item)}>
          <Image style={styles.imageThumbnail} source={require('../../assets/thumbnail.png')} />
          <Text style={styles.itemText} >{item.title}</Text>
        </TouchableOpacity>
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Title : ' + item.title + '\nAddress : ' + item.address + '\nAverage Price: ' + item.averagePrice + '\nDistance: ' + item.distance + ' km');
  };

  const setSortedFilteredData = (data, sortInput) => {
    if (sortInput == 'A-Z') {
      setFilteredDataSource(data.sort((a, b) => (a.title > b.title) ? 1 : -1))
    }
    else if (sortInput == 'Z-A') {
      setFilteredDataSource(data.sort((a, b) => (a.title < b.title) ? 1 : -1))
    }
    else if (sortInput == 'Cheapest') {
      setFilteredDataSource(data.sort((a, b) => (a.averagePrice > b.averagePrice) ? 1 : -1))
    }
    else if (sortInput == 'Nearest') {
      setFilteredDataSource(data.sort((a, b) => (a.distance > b.distance) ? 1 : -1))
    }
  }

  const updateSort= (sortInput) => {
    setSort(sortInput)
    setSortedFilteredData(filteredDataSource, sortInput)
  }

  const updateSearch = () => {
    searchFilterFunction(search)
  }

  return (
    <View style={styles.mainView} testID={'Search_Screen'}>
      <Header/>
      <View style={styles.searchView}>
        <ImageBackground source={require('../../assets/restaurantImage.png')} style={styles.backgroundImage} >
          <View style={styles.overlay}>
          <Image
            source={require('../../assets/magnifyingGlass.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={searchFilterFunction}
            value={search}
            autoCapitalize="none"
            placeholder = "find your favourite restaurant..."
            underlineColorAndroid="transparent"
          />
          <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={updateSearch}
              style={styles.dropDownPicker}
              dropDownStyle={styles.dropDownItem}
              dropDownContainerStyle={{width: 95}}
              containerStyle={{width: 95}}
              textStyle={{fontSize: 12}}
              labelStyle={{fontSize: 12, fontWeight: "bold"}}
              maxHeight={75}
          />
          </View>
        </ImageBackground>
      </View>
      <View style={styles.sort}>
        <Text style={styles.sortText} >Sort: </Text>
        <RadioButton
            value='A-Z'
            color={'#25a2af'}
            status={ sort === 'A-Z' ? 'checked' : 'unchecked' }
            onPress={() => updateSort('A-Z')}
        />
        <Text style={styles.sortText} >A-Z </Text>
        <RadioButton
            value='Z-A'
            color={'#25a2af'}
            status={ sort === 'Z-A' ? 'checked' : 'unchecked' }
            onPress={() => updateSort('Z-A')}
        />
        <Text style={styles.sortText} >Z-A </Text>
        <RadioButton
            value='Cheapest'
            color={'#25a2af'}
            status={ sort === 'Cheapest' ? 'checked' : 'unchecked' }
            onPress={() => updateSort('Cheapest')}
        />
        <Text style={styles.sortText} >Cheapest </Text>
        <RadioButton
            value='Nearest'
            color={'#25a2af'}
            status={ sort === 'Nearest' ? 'checked' : 'unchecked' }
            onPress={() => updateSort('Nearest')}
        />
        <Text style={styles.sortText} >Nearest </Text>
      </View>
    <ScrollView>
      <FlatList
          data={filteredDataSource}
          renderItem={ItemView}
          numColumns={2}
          keyExtractor={(item, index) => index}
      />
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView : {
    height: '100%',
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25a2af',
    height: 190,
    width: '100%',
  },
  searchIcon: {
    width: 40,
    height: 40,
  },
  textInput: {
    fontFamily: 'Monserrat-Regular',
    margin: 10,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#ffffff',
    color: '#25a2af',
  },
  backgroundImage : {
    flex: 1,
    height: 190,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 162, 175,.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  dropDownPicker: {
    fontFamily: 'Monserrat-Regular',
    backgroundColor: '#fafafa',
    width: 95,
    height: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  dropDownItem: {
    fontFamily: 'Monserrat-Regular',
    backgroundColor: '#fafafa',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageThumbnail: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  itemText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Monserrat-Regular',
  },
  sort: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: '100%',
  },
  sortText: {
    fontFamily: 'Monserrat-Regular',
    color: '#444',
    fontWeight: 'bold',
    padding: 1,
  },
});

export default SearchScreen;


