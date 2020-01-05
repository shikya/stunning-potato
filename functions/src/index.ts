import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const addToClass = functions.https.onCall((data: any, context: CallableContext) => {
    if(context && context.auth && context.auth.uid === 'UulJpxZwhnYkw2LefialrQykieC3') {
        return {
            error: "Something went wrong."
        };
    }
    return {
        result: [data, context]
    }
    // return addEmailToClass(email, className).then(() => {
    //     return {
    //         result: `Request fulfilled! ${email} is now a
    //             moderator.`
    //     };
    // });
});

// async function addEmailToClass(email: string, className: string) {
//     const user = await admin.auth().getUserByEmail(email); // 1
//     return admin.auth().setCustomUserClaims(user.uid, {
//         authClass: true
//     }); // 3
// }