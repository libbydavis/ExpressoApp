import {firebase} from "../../firebase/FirebaseConfig";

export const SubmitMenu = firebase.https.onCall(async (data, context) => {
    const {newMenu} = data;
    const ownerID = context.auth.uid;
    const {
        title,
        menuItems
    } = newMenu;

    const store = admin.firestore();
    await store.collection('menus')
        .add({
            title,
            menuItems,
            ownerID
        });
})
