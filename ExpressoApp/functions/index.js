const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.orderNotify = functions.database.ref('users/{userUid}/orderNum').onUpdate(async (change, context) => {

    const userUid = context.params.userUid;
    const user =  admin.database()
        .ref(`/users/${userUid}`).once('value');

    let customer = {
        firstName: user.firstName,
        orderNumber: user.orderNum,
    }
    const token = 'fake token';


    // Check if there are any device tokens.
    if (token == undefined) {
        return functions.logger.log(
            'There is no notification token to send to.'
        );
    }

    // Notification details
    const payload = {
        notification: {
            title: 'Your order is ready!',
            body: `${customer.firstName} your order ${customer.orderNumber} is ready.`
        }
    };

    // Send notifications to all tokens.
    const response = await admin.messaging().sendToDevice(token, payload);

    // For each message check if there was an error.
    response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
            functions.logger.error(
                'Failure sending notification to',
                token,
                error
            );
        }
    });
});


//google code below

/*

exports.sendFollowerNotification = functions.database.ref('/followers/{followedUid}/{followerUid}')
    .onWrite(async (change, context) => {
        const followerUid = context.params.followerUid;
        const followedUid = context.params.followedUid;
        // If un-follow we exit the function.
        if (!change.after.val()) {
            return functions.logger.log(
                'User ',
                followerUid,
                'un-followed user',
                followedUid
            );
        }
        functions.logger.log(
            'We have a new follower UID:',
            followerUid,
            'for user:',
            followedUid
        );

        // Get the list of device notification tokens.
        const getDeviceTokensPromise = admin.database()
            .ref(`/users/${followedUid}/notificationTokens`).once('value');

        // Get the follower profile.
        const getFollowerProfilePromise = admin.auth().getUser(followerUid);

        // The snapshot to the user's tokens.
        let tokensSnapshot;

        // The array containing all the user's tokens.
        let tokens;

        const results = await Promise.all([getDeviceTokensPromise, getFollowerProfilePromise]);
        tokensSnapshot = results[0];
        const follower = results[1];

        // Check if there are any device tokens.
        if (!tokensSnapshot.hasChildren()) {
            return functions.logger.log(
                'There are no notification tokens to send to.'
            );
        }
        functions.logger.log(
            'There are',
            tokensSnapshot.numChildren(),
            'tokens to send notifications to.'
        );
        functions.logger.log('Fetched follower profile', follower);

        // Notification details.
        const payload = {
            notification: {
                title: 'You have a new follower!',
                body: `${follower.displayName} is now following you.`,
                icon: follower.photoURL
            }
        };

        // Listing all tokens as an array.
        tokens = Object.keys(tokensSnapshot.val());
        // Send notifications to all tokens.
        const response = await admin.messaging().sendToDevice(tokens, payload);
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((result, index) => {
            const error = result.error;
            if (error) {
                functions.logger.error(
                    'Failure sending notification to',
                    tokens[index],
                    error
                );
                // Cleanup the tokens who are not registered anymore.
                if (error.code === 'messaging/invalid-registration-token' ||
                    error.code === 'messaging/registration-token-not-registered') {
                    tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
                }
            }
        });
        return Promise.all(tokensToRemove);

 */
   // })
