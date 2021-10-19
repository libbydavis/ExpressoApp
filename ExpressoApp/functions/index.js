const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.orderNotify = functions.database.ref('users/{userUid}/orderNum').onUpdate(async (change, context) => {

    const userUid = context.auth.uid;

    functions.logger.log("id " + userUid)


    // Get a database reference
    let db = admin.database();
    let ref = db.ref(`/users/${userUid}`);

    // Attach an asynchronous callback to read the data
    ref.on("value", async function (snapshot) {
        functions.logger.log(snapshot.val());

        const user = snapshot.val();
        let firstName = user.firstName;
        let orderNumber = user.orderNum;
        let token = user.token;


        // Check if there is a device token
        if (token == undefined) {
            return functions.logger.log(
                'There is no notification token to send to.'
            );
        }

        // Notification details
        let payload = {
            notification: {
                title: 'Your order is ready!',
                body: `${firstName} your order ${orderNumber} is ready.`,
                tag: `${orderNumber}`
            }
        };

        // Send notification
        const response = await admin.messaging().sendToDevice(token, payload);

    }, function (errorObject) {
        functions.logger.log("The read failed: " + errorObject.code);
    });


});


