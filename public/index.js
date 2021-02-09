console.log('notifcations')

const Public_Key = 'BADK6PW8_cDnvEWIW_s8WYi2naw7waCkDtfi95jW3k9CV0aydoeTVw9eg0o9DW0dNMZGDlXmsxROyARXb41bSvA'

function funcAct() {
    // alert('ok')

    // Check for service worker
    if ('serviceWorker' in navigator) {
        send().catch(err => console.error(err))
    }

    // Register SW, Register push, Send push
    async function send() {
        console.log('Registering service worker...')
        const register = await navigator.serviceWorker.register('/worker.js', {
            scope: '/'
        })
        console.log('Service worker Register....')


        // Register Push 
        console.log('Registering push...')
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(Public_Key)
        })
        console.log('Push Registered...')

        // Send push Notifications
        console.log('Sending push...')
        await fetch('subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        })
        console.log('Push sent...')
    }

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

}