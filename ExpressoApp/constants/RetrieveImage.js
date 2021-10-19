import {firebase} from '../firebase/FirebaseConfig';
import storage from '@react-native-firebase/storage';

function retrieveImage(imageURI, image) {
    const imageName = imageURI.substring(imageURI.lastIndexOf('/') + 1);
    let imageRef = firebase.storage().ref('/' + imageName);
    imageRef
        .getDownloadURL()
        .then(url => {
            //from url you can fetch the uploaded image easily
            console.log("url:" + url)
            image(url)
        })
        .catch(e => console.log('getting downloadURL of image error => ', e));
}

export default retrieveImage;
