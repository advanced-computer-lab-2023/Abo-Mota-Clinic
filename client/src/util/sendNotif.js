import { useCreateSubscriptionMutation } from "../store";
import axios from "axios";

const vapidPublicKey = "BOkFc10oR-p3Nh74kmPc8coKg-oiF62Xk0eNS4rHX3PRusKTwjDm5wJa51bqqiqMKqtSpmEnNkRKNuRqoCJxeNk";

//check for service worker
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

//register the service worker, register our push api, send the notification
async function send({message}){

    // const [createSubscription, results] = useCreateSubscriptionMutation();
    //register service worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    //register push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,

        //public vapid key
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });

    // await createSubscription({
    //     subscription: JSON.stringify(subscription),
    //     message
    // })
   
    //Send push notification
    // await fetch("api/serviceWorker/subscribe", {
    //     method: "POST",
    //     body: { 
    //         subscription: JSON.stringify(subscription),
    //         message: message
    //     },
    //     headers: {
    //         "content-type": "application/json"
    //     }
    // });

    axios.post("http://localhost:5000/api/serviceWorker/subscribe", {
        subscription: JSON.stringify(subscription),
        message: message
    })
}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
} 

export default send;