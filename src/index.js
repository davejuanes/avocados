/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app'

const appNode = document.querySelector('#app')

// Patron de delegación de eventos
appNode.addEventListener('click', (evento) => {
    if(evento.target.nodeName === 'H2') {
        window.alert('Hola')
    }
})

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price)
    return newPrice
}

// web api
// Conectarnos al Server
// promise -> async/await
window
    .fetch(`${baseUrl}/api/avo`)
    // procesar la respuesta, y convertirla en JSON
    .then((respuesta) => respuesta.json())
    // JSON -> Data ->Renderizar info browser
    .then((responseJson) => {
        const todosLosItems = []
        responseJson.data.forEach((item) => {

            // crear imagen
            const imagen = document.createElement('img')
            // URL de la imagen
            imagen.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6"
            imagen.src = `${baseUrl}${item.image}`

            // crear titulo
            const title = document. createElement('h2')
            title.className = "text-lg";
            title.textContent = item.name
    
            // crear precio
            const price = document.createElement('div')
            price.className = 'text-gray-600'
            price.textContent = formatPrice(item.price)

            const priceAndTitle = document.createElement('div')
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title)
            priceAndTitle.appendChild(price)
    
            const container = document.createElement('div')
            container.append(imagen, priceAndTitle)
            container.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300'
    
            todosLosItems.push(container)
        })
        appNode.append(...todosLosItems)
        appNode.className = 'mt-10 grid grid-cols-2 gap2'
    })
