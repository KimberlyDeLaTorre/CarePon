const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador =document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('selecciona-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo') 

const spanvidasJugador = document.getElementById('vidas-jugador')
const spanvidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa') 

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputCheer 
let inputOopsy 
let inputGrumpy 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonCariño 
let botonEnojo 
let botonRevoltoso 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = 'Ositosciudad.jpg'

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10) {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let grumpy = new Mokepon ('Grumpy', 'azuloso.png', 5, 'azuloso.png')

let oopsy = new Mokepon ('Oopsy', 'verdeoso.png', 5, 'verdeoso.png')

let cheer = new Mokepon ('Cheer', 'rosaoso.png', 5, 'rosaoso.png')




let grumpyEnemigo = new Mokepon ('Grumpy', 'azuloso.png', 5, 'azuloso.png', 100, 320)

let oopsyEnemigo = new Mokepon ('Oopsy', 'verdeoso.png', 5, 'verdeoso.png', 350, 270)

let cheerEnemigo = new Mokepon ('Cheer', 'rosaoso.png', 5, 'rosaoso.png', 470, 120)




cheer.ataques.push (
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌟', id: 'boton-revoltoso'},
)
cheerEnemigo.ataques.push (
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌟', id: 'boton-revoltoso'},
)

oopsy.ataques.push (
    { nombre: '🌟', id: 'boton-revoltoso'},
    { nombre: '🌟', id: 'boton-revoltoso'},
    { nombre: '🌟', id: 'boton-revoltoso'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌈', id: 'boton-cariño'},
)
oopsyEnemigo.ataques.push (
    { nombre: '🌟', id: 'boton-revoltoso'},
    { nombre: '🌟', id: 'boton-revoltoso'},
    { nombre: '🌟', id: 'boton-revoltoso'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌈', id: 'boton-cariño'},
)

grumpy.ataques.push (
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌟', id: 'boton-revoltoso'},
)
grumpyEnemigo.ataques.push (
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌈', id: 'boton-cariño'},
    { nombre: '🌧️', id: 'boton-enojo'},
    { nombre: '🌟', id: 'boton-revoltoso'},
)

mokepones.push(cheer, oopsy, grumpy) 

function inicarJuego(){ 
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre} >
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones

        inputCheer = document.getElementById('Cheer')
        inputOopsy = document.getElementById('Oopsy')
        inputGrumpy = document.getElementById('Grumpy')
    })


    sectionReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
     
    
    botonReiniciar.addEventListener('click', reiniciarJuego)
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarMascota.style.display = 'none'

    
    //sectionSeleccionarAtaque.style.display = 'flex'
    

    
    if (inputCheer.checked) {
       spanMascotaJugador.innerHTML = inputCheer.id
       mascotaJugador = inputCheer.id
    } else if (inputOopsy.checked) {
        spanMascotaJugador.innerHTML = inputOopsy.id
        mascotaJugador = inputOopsy.id
    } else if (inputGrumpy.checked) {
        spanMascotaJugador.innerHTML = inputGrumpy.id
        mascotaJugador = inputGrumpy.id
    } else {
        alert("SELECCIONA UNA MASCOTA")
    }
    extraerAtaques (mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function extraerAtaques (mascotaJugador) {
    let ataques 
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques 
        }
        
    }
    mostrarAtaques(ataques) 
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonCariño = document.getElementById('boton-cariño')
    botonEnojo = document.getElementById('boton-enojo')
    botonRevoltoso = document.getElementById('boton-revoltoso')
    botones = document.querySelectorAll('.BAtaque')
    

}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
          if(e.target.nextContent === '🌈') {
             ataqueJugador.push('Cariño')
             boton.style.background = '#112f58'
             boton.disabled = true
          } else if (e.target.nextContent === '🌧️'){
             ataqueJugador.push('Enojo')
             boton.style.background = '#112f58'
             boton.disabled = true
          } else {
            ataqueJugador.push('Revoltoso')
             boton.style.background = '#112f58'
             boton.disabled = true
          }
          ataqueAleatorioEnemigo()
        })
    })
    
}

function seleccionarMascotaEnemigo(enemigo) {
    let mascotaAleatorio = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    
    secuenciaAtaque()
}



function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

    if ( ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push ('Cariño')
    } else if ( ataqueAleatorio == 3 || ataqueAleatorio == 4 ) {
        ataqueEnemigo.push ('Enojo')
    } else {
        ataqueEnemigo.push ('Revoltoso')
    }

    iniciarPelea()

}

function iniciarPelea() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador [jugador]
    indexAtaqueEnemigo = ataqueEnemigo [enemigo]
}

function combate() {

    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === 'Cariño' && ataqueEnemigo[index] === 'Revoltoso') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanvidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] ==='Enojo' && ataqueEnemigo[index] === 'Cariño') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanvidasJugador.innerHTML = victoriasJugador;
        } else if (ataqueJugador[index] === 'Revoltoso' && ataqueEnemigo[index] === 'Enojo') {
            indexAmbosOponente(index, index);
            crearMensaje("GANASTE");
            victoriasJugador++;
            spanvidasJugador.innerHTML = victoriasJugador;
        } else {
            indexAmbosOponente(index, index);
            crearMensaje("PERDISTE");
            victoriasEnemigo++;
            spanvidasEnemigo.innerHTML = victoriasEnemigo;
        }
        
    }

    revisarVidas()
}

function revisarVidas() {
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    } else {
        crearMensajeFinal('Lo siento, perdiste :(')
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    

    
    sectionMensajes.innerHTML = resultadoFinal 

    

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload() 
}

function aleatorio(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min)
 }

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    cheerEnemigo.pintarMokepon()
    oopsyEnemigo.pintarMokepon()
    grumpyEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(cheerEnemigo)
        revisarColision(oopsyEnemigo)
        revisarColision(grumpyEnemigo)
    }
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break
    }
}

function iniciarMapa() {
    mapa.width = 600
    mapa.height = 400
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
     
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}



window.addEventListener('load', inicarJuego)