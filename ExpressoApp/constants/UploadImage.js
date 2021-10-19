import storage from "@react-native-firebase/storage";

const uploadImage = async (itemData) => {
    const fileName = itemData.image.substring(itemData.image.lastIndexOf('/') + 1);
    console.log(fileName)
    const task = storage().ref(fileName).putFile(itemData.image)

    try {
        await task
    } catch (e) {
        console.error(e)
    }
}

export default uploadImage;
