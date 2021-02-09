console.log('Service Worker Loaded')

self.addEventListener('push', e => {
    const data = e.data.json()
    console.log('Push Recieved...')
    self.registration.showNotification(data.title, {
        body: 'Something do...',
        icon: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
    })
})