// import firebase from "firebase/app";
// import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBM0y9gR1JP_JNR3byXXCutJmUFIKleFkI",
    authDomain: "datos-de-formulario-83365.firebaseapp.com",
    projectId: "datos-de-formulario-83365",
    storageBucket: "datos-de-formulario-83365.appspot.com",
    messagingSenderId: "256282697701",
    appId: "1:256282697701:web:7339e08c9fb0f2b3ff990c",
    measurementId: "G-4HGVQLN22B"
};
// console.log("Llegamos");
//Inicializa Firebase
firebase.initializeApp(firebaseConfig);

//Inicializa el cloud Firestore and get a reference to the service
const db = firebase.firestore();

document
    .getElementById("formulario")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        //Validar el campo nombre
        let entradaNombre = document.getElementById("name");
        let errorNombre = document.getElementById("nameError");

        if (entradaNombre.value.trim() === "") {
            errorNombre.textContent = "Por favor, introducí tu nombre";
            errorNombre.classList.add("error-message");
        } else {
            errorNombre.textContent = "";
            errorNombre.classList.remove("error-message");
        }

        //Validar correo electrónico
        let emailEntrada = document.getElementById("email");
        let emailError = document.getElementById("emailError");
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Patrón de validación básico

        if (!emailPattern.test(emailEntrada.value)) {
            emailError.textContent = "Por favor, introducí un mail válido";
            emailError.classList.add("error-message");
        } else {
            emailError.textContent = "";
            emailError.classList.remove("error-message");
        }
        //Validar la contraseña
        let contrasenaEntrada = document.getElementById('password');
        let contrasenaError = document.getElementById('passwordError');
        let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

        if (!contrasenaPattern.test(contrasenaEntrada.value)) {
            contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
            contrasenaError.classList.add('error-message');
        } else {
            contrasenaError.textContent = '';
            contrasenaError.classList.remove('error-message');
        }
        //Si todos los campos so válidos enviar formulario
        if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
            db.collection("users").add({
                nombre: entradaNombre.value,
                email: emailEntrada.value,
                password: contrasenaEntrada.value
            })
                .then((docRef) => {
                    alert('El formulario se ha enviado con éxito', docRef.id);
                    document.getElementById('formulario').reset();
                })
                .catch((error) => {
                    alert(error);
                });
            // alert("El formulario se ha enviado con éxito");
            // document.getElementById("formulario").reset();
        }
    });
