// importo las preguntas y respuestas
import { preguntasYRespuestas } from "./preguntas-y-respuestas.js";


// declaro una variable con un arreglo vacio inicial 
let preguntasSeleccionadas = [];

// declaro la variable puntaje que va a empezar en 0 y va a ir aumentando en medida que la respuesta sea correcta
let puntaje = 0;

// declaro las constantes, una para preguntas y otra para opciones, seleccionando los elementos del dom donde se va a mostrar
const contenedorPregunta = document.querySelector('#pregunta')

const contenedorOpciones = document.querySelector('#opciones')
const contenedorResultado = document.querySelector('#resultado')


// selecciono el boton iniciar para detectar el click del usuario
const btnIniciar = document.querySelector('#btnIniciar');
const btnReiniciar = document.querySelector('#btnReiniciar');

contenedorPregunta.textContent = "¿Listo para comenzar?";
// Contenedor opciones queda vacio al iniciar 
contenedorOpciones.innerHTML = "";



// Cuando el usuario hace click, se ejecuta la función iniciarJuego
btnReiniciar.addEventListener('click', iniciarJuego);
// Cuando el usuario hace click, se ejecuta la función iniciarJuego
btnIniciar.addEventListener('click', iniciarJuego);


// defino la funcion 
function iniciarJuego() {
    puntaje = 0; // importante reiniciar puntaje
    contenedorPregunta.textContent = "Elegí un tema:"; // cambio el contenido del texto de html por elegi una categoria
    contenedorOpciones.innerHTML = ""; // limpio por si apretan iniciar 2 veces
    btnIniciar.classList.add("d-none"); // opcional
    btnReiniciar.classList.add("d-none"); 
    contenedorResultado.innerHTML = "";


    // este es el arreglo con las dos opciones(claves) que arme en preguntasyrespuestas. El metodo forEach recorre todas las opciones y con la funcion flecha vamos a decir que hacer con cada una de estas opciones
    Object.keys(preguntasYRespuestas).forEach((opcion) => {

        // y aca al contenedor opciones agrego al html agrego botones dinamicamente segun la opcion
        contenedorOpciones.innerHTML += `
    <button class="btn btn-parvati opcion" type="button" data-tema="${opcion}">
      ${opcion}
    </button>
  `;

    });


    // declaro otra constante que va a contener el contenedorOpciones y mostrar todas las opciones 
    const opciones = contenedorOpciones.querySelectorAll('.opcion')


    
    opciones.forEach((opcion) => {// recorro las opciones y por cada una de estas opciones voy a hacer una accion
        
        opcion.addEventListener('click', () => {//cuando el usuario haga click en alguna de estas opciones se ejecuta la funcion flecha
           
            const tema = opcion.textContent.trim();  //Muestra los temas agregando opcion en el html 
            
            seleccionarTema(tema)// cuando haga click en alguna de las opcioknes llamo a la funcion seleccionar tema


        })
    })
}




function seleccionarTema(tema) {// esta es la funcion que va a mostrar la pregunta del indice 0, accedo a la primera
    preguntasSeleccionadas = preguntasYRespuestas[tema]
    mostrarPregunta(0)


}


// invoco esta funciona va a mnostrar la pregunta 0 del indice, accedo a la primer pregunta de la clave pregunta
function mostrarPregunta(indice) {

    // pregunto si el indice es igual o mayor a preguntas selecionnadas y con el lenght reccorro todo la longitud de preguntasSeleccionadas, para que me tome el indice 4 tambien
    if (indice >= preguntasSeleccionadas.length) {
        mostrarResultado();
        return;

    }
    //Desestructuro el objeto al que accedemos, digamos que solo dejo la pregunta
    const { pregunta, respuestaCorrecta, respuestas } = preguntasSeleccionadas[indice]
    //De las preguntas seleccionadas, agarrá la pregunta número indice y devolveme su texto
    const textoPregunta = preguntasSeleccionadas[indice].pregunta;

    contenedorPregunta.innerHTML = textoPregunta;


    mostrarOpciones(respuestas, respuestaCorrecta, indice);
}





// declaro la funcion que muestra las opciones de cada pregunta, con las valores respuestas, los valores respuesta correcta y el indice para continuar a la proxima pregunta 
function mostrarOpciones(respuestas, respuestaCorrecta, indice) {
    //antes de hacer el recorrido , borro el contenido y luego escribe las opciones
    contenedorOpciones.innerHTML = '';
    respuestas.forEach((respuesta) => {
        contenedorOpciones.innerHTML += `<p class="opcion">${respuesta}</p>`;

    })


    const opciones = contenedorOpciones.querySelectorAll('.opcion');
    opciones.forEach((opcion) => {

        opcion.addEventListener('click', () => {

            //comparamos lo que el usuario haya hecho click con la respuesta correcta, con el texto que esta dentro de la etiqueta opcion y verifica si opcion es estrictamente correcta a respuestaCorrecta
            if (opcion.textContent === respuestaCorrecta) {

                // la variable puntaje : 
                puntaje++

                //Al elemento opcion le agrego una clase que se llama correcta a traves del metoodo classlist hago lo mismo cuando sea incorrecto(else)
                opcion.classList.add('correcta')

            } else {
                opcion.classList.add('incorrecta')

            }
            //como el codigo se ejecuta inmeditamente le agrego un letardo con el metodo propio de javascript settimeout con dos parametros una funcion flecha que ejectuta el codigo y despues de 500milisegundos pase a la pregunta uno
            setTimeout(() => {
                mostrarPregunta(indice + 1)
            }, 500)
        })
    });

}

function mostrarResultado() {
    // reseteo los contenedores, para que no lo muestre y se vea solo el contenedorResultado
    contenedorPregunta.innerHTML='';
    contenedorOpciones.innerHTML='';

    // aca muestro el resultado, colocandole al h2 la variable de puntaje y la variable de preguntasSeleccionadas
    contenedorResultado.innerHTML = `<h2> Acertaste: ${puntaje} de ${preguntasSeleccionadas.length} </h2>
    `;


     // remuevo la clase de boostrap d none para que lo vuelva a mostrar el boton reiniciar
btnReiniciar.classList.remove("d-none");

}




