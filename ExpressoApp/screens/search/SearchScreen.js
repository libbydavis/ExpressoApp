import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  Text,
  Picker,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import {firebaseDB} from '../../firebase/FirebaseConfig';
import DropDownPicker from 'react-native-dropdown-picker';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
const SearchScreen = () => {
  const [search, setSearch] = useState('');
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
      snapshot.forEach((child)=>{
        business.push({
              key: child.key,
              title: child.val().title,
              address: child.val().address
            })
      })
      setFilteredDataSource(business);
      setMasterDataSource(business);
    })
  }, []);

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
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
        // Flat List Item
        <View  style={styles.itemStyle} >
          <Image style={styles.imageThumbnail} source={require('../../assets/thumbnail.png')} />
          <Text style={styles.itemText} onPress={() => getItem(item)}>{item.title}</Text>
        </View>

    );
  };


  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.key + '\nTitle : ' + item.title + '\nAddress : ' + item.address);
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Image
          source={require('../../assets/ExpressoLogo.png')}
          style={styles.logoIcon}
        />
        <Image
            source={require('../../assets/profileIcon.png')}
            style={styles.profileIcon}
        />
      </View>

      <View style={styles.searchView}>
        <ImageBackground source={require('../../assets/restaurantImage.png')} style={styles.backgroundImage} >
          <View style={styles.overlay}>
          <Image
            source={require('../../assets/magnifyingGlass.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => searchFilterFunction(text)}
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
              style={styles.dropDownPicker}
              dropDownStyle={styles.dropDownItem}
              textStyle={{fontSize: 12}}
              labelStyle={{fontSize: 12, fontWeight: "bold"}}
              maxHeight={75}
              maxWidth={75}
          />
          </View>
        </ImageBackground>
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
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25a2af',
    height: 190,
  },
  logoIcon: {
    width: 200,
    height: 50,
    marginTop: 5,
    marginBottom: 20,
  },
  searchIcon: {
    width: 40,
    height: 40,
    margin: 2,
  },
  profileIcon: {
    width: 40,
    height: 40,
    margin: 15,
  },
  textInput: {
    fontFamily: 'Monserrat-Regular',
    margin: 20,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#ffffff',
    color: '#25a2af',
  },
  backgroundImage : {
    flex: 1,
    height: 190,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37, 162, 175,.5)',
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownPicker: {
    fontFamily: 'Monserrat-Regular',
    backgroundColor: '#fafafa',
    width: 100,
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
  },
  itemText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Monserrat-Regular',
  }
});

export default SearchScreen;


