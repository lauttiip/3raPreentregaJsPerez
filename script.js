
let preguntas = [
    {
        pregunta: "¿Cual es la capital de Argentina?",
        opciones: ["A: Mendoza", "B: Cordoba", "C: Buenos Aires", "D: Ninguna de las anteriores"],
        correcta: "C"
    },
    {
        pregunta: "¿Cual fue el ECMAScript mas importante hasta la fecha?",
        opciones: ["A: ES8", "B: ES6", "C: ES12", "D: ES5"],
        correcta: "B"
    },
    {
        pregunta: "¿Quien se dice que es el PIONERO de la programacion?",
        opciones: ["A: Ada Lovelace", "B: Grace Hopper", "C: Bill Gates", "D: Alan Turing"],
        correcta: "A"
    }
];

let preguntasMath = [
    {
        pregunta: "Juan tiene 5 pelotas. Su amigo Nacho le da 3 pelotas más. Luego, Juan le da 2 pelotas a su amiga Ana. ¿Cuántas pelotas tiene Juan ahora?",
        opciones: ["A: 2", "B: 6", "C: 4", "D: 5"],
        correcta: "B"
    },
    {
        pregunta: "Ana tiene 12 galletas. Ella decide dar 3 galletas a cada uno de sus 4 amigos. Después, recibe 8 galletas más de su mamá. Luego, decide dividir todas sus galletas restantes en partes iguales entre ella y su hermana. ¿Cuántas galletas recibe cada una al final?",
        opciones: ["A: 3", "B: 2", "C: 4", "D: 6"],
        correcta: "C"
    }
];

function validarRespuesta(respuesta, correcta) {
    return respuesta.toUpperCase() === correcta;
}

function obtenerOpcionesConFiltro(pregunta) {
    return pregunta.opciones.filter(opcion => !opcion.includes('Ninguna'));
}

function obtenerPreguntaPorIndice(preguntas, indice) {
    return preguntas.find((pregunta, idx) => idx === indice);
}

function questions() {
    for (let i = 0; i < preguntas.length; i++) {
        let pregunta = obtenerPreguntaPorIndice(preguntas, i);
        alert(pregunta.pregunta);
        let opciones = obtenerOpcionesConFiltro(pregunta);

        for (let j = 0; j < 4; j++) {
            const respuesta = prompt(opciones.join("\n"));
            if (validarRespuesta(respuesta, pregunta.correcta)) {
                alert("Felicidades respondiste correctamente");
                break;
            } else if (j < 3) {
                alert(`Incorrecto, te quedan ${2 - j} intentos`);
            } else {
                alert("Has perdido en la pregunta, se reiniciará solo, tocar enter");
                return false;
            }
        }
    }
    return true;
}

function questionsMath() {
    for (let i = 0; i < preguntasMath.length; i++) {
        let pregunta = obtenerPreguntaPorIndice(preguntasMath, i);
        alert(pregunta.pregunta);
        let opciones = obtenerOpcionesConFiltro(pregunta);

        for (let j = 0; j < 3; j++) {
            const respuesta = prompt(opciones.join("\n"));
            if (validarRespuesta(respuesta, pregunta.correcta)) {
                alert("Felicidades respondiste correctamente");
                break;
            } else if (j < 2) {
                alert(`Incorrecto, te quedan ${2 - j} intentos`);
                usarCalculadora();
            } else {
                alert("Has perdido en la pregunta, se reiniciará solo, tocar enter");
                return false;
            }
        }
    }
    return true;
}

function calculadora(num1, num2, operacion) {
    switch (operacion) {
        case 1:
            return num1 + num2;
        case 2:
            return num1 - num2;
        case 3:
            return num1 * num2;
        case 4:
            return num1 / num2;
        default:
            alert("No introdujo ninguna operación");
            break;
    }
}

function usarCalculadora() {
    let operacion = Number(prompt("¿Qué desea?\n 1: sumar 2: restar 3: multiplicar 4: dividir 5: salir"));
    while (operacion !== 5) {
        let numero1 = Number(prompt("Ingresar primer número"));
        let numero2 = Number(prompt("Ingresar segundo número"));
        let resultado = calculadora(numero1, numero2, operacion);
        alert("El resultado es " + resultado);
        operacion = Number(prompt("¿Qué desea?\n 1: sumar 2: restar 3: multiplicar 4: dividir 5: salir"));
    }
}

function contenedorProgramaPreguntas(preguntas, preguntaIndice) {
    let contenedorPreguntas = document.getElementById("preguntas")

    preguntas.forEach(pregunta => {

        let nodoPregunta = document.createElement("h3")
        nodoPregunta.className = "pregunta"
        nodoPregunta.innerText = pregunta.pregunta
        contenedorPreguntas.appendChild(nodoPregunta)

        let contenedorOpciones = document.createElement("div")
        contenedorOpciones.className = "cajaOpciones"
        contenedorPreguntas.appendChild(contenedorOpciones)
        
        pregunta.opciones.forEach((opcionPregunta, opcionIndice) => {
            let opcion = document.createElement("button")
            opcion.className = "opcion"
            opcion.innerText = opcionPregunta
            contenedorOpciones.appendChild(opcion)
            let click = false

            opcion.onclick = () => {
                let seleccion = {
                    pregunta: preguntaIndice,
                    opcion: opcionIndice,
                    texto: opcionPregunta
                }
                localStorage.setItem(`pregunta-${preguntaIndice}-seleccion`, JSON.stringify(seleccion))
                if (opcionPregunta.charAt(0) === pregunta.correcta) {
                    opcion.className = "verde"
                    click = true
                } else {
                    opcion.className = "rojo"

                }
            }
        })
    })
}

function contenedorProgramaPreguntasMath(preguntasMath, preguntaIndice) {
    let contenedorPreguntasMath = document.getElementById("preguntasMath")

    preguntasMath.forEach(preguntaMath => {
        let nodoPreguntaMath = document.createElement("h3")
        nodoPreguntaMath.className = "preguntaMath"
        nodoPreguntaMath.innerText = preguntaMath.pregunta
        contenedorPreguntasMath.appendChild(nodoPreguntaMath)


        let contenedorOpcionesMath = document.createElement("div")
        contenedorOpcionesMath.className = "cajaOpciones"
        contenedorPreguntasMath.appendChild(contenedorOpcionesMath)

        preguntaMath.opciones.forEach((opcionPreguntaMath, opcionIndice) => {
            let opcion = document.createElement("button")
            opcion.className = "opcion"
            opcion.innerText = opcionPreguntaMath
            let click = false
            contenedorOpcionesMath.appendChild(opcion)

            opcion.onmouseup = () => {
                let seleccion = {
                    pregunta: preguntaIndice,
                    opcion: opcionIndice,
                    texto: opcionPreguntaMath
                }

                localStorage.setItem(`preguntaMath-${preguntaIndice}-seleccion`, JSON.stringify(seleccion))

                if (opcionPreguntaMath.charAt(0) === preguntaMath.correcta) {
                    opcion.className = "verde"
                    click = true

                } else {
                    opcion.className = "rojo"

                }
            }
        })

    })
}


contenedorProgramaPreguntas(preguntas)
contenedorProgramaPreguntasMath(preguntasMath)

document.getElementById("startButton").addEventListener("click", () => {
    seccionBienvenida = document.getElementById("seccion-bienvenida")
    seccionBienvenida.remove()
})


localStorage.setItem("nombre", "Lautaro")
localStorage.setItem("edad", 17)
localStorage.setItem("claveWifi", "donUbaldo523")

let seleccion = JSON.parse(localStorage.getItem('pregunta-undefined-seleccion'));
console.log(seleccion)