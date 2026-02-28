document.addEventListener('DOMContentLoaded', () => {
    // despues de que carga la pagina describo la funcion, lo primero que hago es tomo el elemento del dom por su id, en este caso tome el form con la el id formpropuesta y tambien declaro la constante que va a tomar el id mensaje de exito
    const form = document.getElementById('formPropuesta');
    const msjOk = document.getElementById('mensajeExito');



    // si esta condicion no se cumple la funcion no se ejecuta
    if (!form || !msjOk) return;


    // addEventListener este metodo "escucha" la accion submit del formulario y  cuando esto pase ejecuta la funcion evento 
    form.addEventListener('submit', (event) => {


        // oculta el mensaje de exito por si estaba visible de algun envio anterior 
        msjOk.classList.add('d-none');


        // Primero verifico si el formulario tiene todos los datos validos, pregunto si el formulario NO es valido  
        if (!form.checkValidity()) {

            // este objeto (del metodo addEventListener) deshabilita la recarga automatica de la pagina despues del submit
            event.preventDefault();

            //stopPropagation() frena la propagación del evento (submit) hacia elementos padres(div que contiene al form).
            event.stopPropagation();
            //Clase de boostrapt que toma el elemento form y muestra las clases si el formulario se valido. 
            form.classList.add('was-validated');

            //se deja de ejectura la funcion si se cumple la condicion
            return;
        }

         form.classList.add('was-validated');
    });
});


