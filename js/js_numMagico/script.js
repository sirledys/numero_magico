let tabla_datos = [] ;
let historial = [];
let $id = 1; // lleva el conteo de los usuarios que juegan

var max = 1000;
var min = 1;

var intentos=10
var numMagico = Math.random()*(max-min) + min; 
numMagico = parseInt(numMagico);

var NumVal=null;

var bandera = 0;

function listarUsers(){
    /*Obtener fecha actual**/
    const timeTrans = Date.now()
    const hoy = new Date(timeTrans);

    //odtiene el nombre del usuario, y el input
    let $nombre = document.getElementById("register-first-name").value;
    const $input = $('#register-first-name')

    if($nombre != "" && $input[0].value.length >= 4 && $input[0].value.length <= 50){
        //se guarda la hora actual y la fecha
        let $fecha = hoy.toLocaleDateString()
        let $hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

        /*let $hisdatos = "Nombre: "+$nombre+" - Fecha: "+$fecha+" - Hora: "+$hora;
            $hisdatos = document.querySelector("#history").innerHTML = "<br>"+$hisdatos;

        historial.push($hisdatos);
        localStorage.setItem("lisDato",historial);*/

        //toma el historial de los jugadores pasado para ir agregando mas
        if(bandera==0){
            //lee los datos del localstorage para guardarlos en un vector
            let $nom = localStorage.getItem("lisDato");
            historial.push($nom);

            //se captura los datos nuevos
            let $hisdatos = "Nombre: "+$nombre+" - Fecha: "+$fecha+" - Hora: "+$hora;
            $hisdatos = document.querySelector("#history").innerHTML = "<br>"+$hisdatos;    

            // los agg al vector despues de los otros ya guardado
            historial.push($hisdatos);

            localStorage.setItem("lisDato",historial);
            bandera=1;
        }else{
            let $hisdatos = "Nombre: "+$nombre+" - Fecha: "+$fecha+" - Hora: "+$hora;
            $hisdatos = document.querySelector("#history").innerHTML = "<br>"+$hisdatos;

            historial.push($hisdatos);
            localStorage.setItem("lisDato",historial);
        }

        //Se guardan los datos para mostrar en la tabla
        let $fila = '<tr><td>' + $id + '</td><td>' + $nombre + '</td><td>' + $fecha + '</td><td>' + $hora + '</td></tr>';

        tabla_datos.push($fila);

        let lista = [...new Set(tabla_datos)];

        lista.forEach(function(elemento, indice){
            document.querySelector("#listData").innerHTML = lista ;
        });

        $id++;

        document.getElementById("register-first-name").value ="";

        //Habilitar boton de jugar con el input
        const button_desable = document.querySelector('#Btn_validar')
        button_desable.disabled = false
        const input_list_user = document.querySelector("#number");
        input_list_user.disabled = false

        //Muestra el nombre que se registro
        swal("Jugador registrado "+$nombre);

        // desavilita el boton de listar, par que no se vuelva a listar mientras juega
        const buton_list_desable = document.querySelector('#lisUser')
        buton_list_desable.disabled = true
        const input_list_desable = document.querySelector("#register-first-name");
        input_list_desable.disabled = true        
    }else{
        swal("Debe ingresar un nombre")
    }
}

function validar(){

    NumVal = document.getElementById("number").value;
    
    if (intentos != 0) {
        if (NumVal !="") {
            if (NumVal > max) {
                swal("El numero ingresado es muy alto debe ser menor de 1000 ");
            } else {
                intentos -= 1;
                if (NumVal == numMagico) {
                    document.querySelector("#description").classList.replace("alert-danger","alert-info");
                    document.querySelector("#description").classList.replace("alert-info","alert-success");
                    document.querySelector("#description").innerHTML = "Excelente has adivinado el numero magico: "+numMagico+", intentos faltantes: "+intentos;
                    document.querySelector("#number").classList.replace("is-invalid","is-null");
                    document.querySelector("#number").classList.replace("is-null","is-valid");

                    const button_desable = document.querySelector('#Btn_validar')
                    button_desable.disabled = true

                    const input_list_desable = document.querySelector("#number");
                    input_list_desable.disabled = true
                }else{
                    if (NumVal <= numMagico) {
                        document.querySelector("#description").classList.replace("alert-success","alert-info");
                        document.querySelector("#description").classList.replace("alert-info","alert-danger");
                        document.querySelector("#description").innerHTML = "El numero magico es mayor al numero ("+NumVal+") que ingresaste, intentos restante: <span class='badge badge-pill badge-warning'>"+intentos+"</span>";
                        document.querySelector("#number").classList.replace("is-valid","is-null");
                        document.querySelector("#number").classList.replace("is-null","is-invalid");
                    } else {
                        document.querySelector("#description").classList.replace("alert-success","alert-info");
                        document.querySelector("#description").classList.replace("alert-info","alert-danger");
                        document.querySelector("#description").innerHTML = "El numero magico es menor al numero ("+NumVal+") que ingresaste, intentos restante: <span class='badge badge-pill badge-warning'>"+intentos+"</span>";
                        document.querySelector("#number").classList.replace("is-valid","is-null");
                        document.querySelector("#number").classList.replace("is-null","is-invalid");
                    }
                }
            }    
        }else{
            swal("Ingrese un valor");
        }
    }else {
        swal("Has Perdido, superaste el numero de Intentos, el numero magico es: "+numMagico);

        const button_desable = document.querySelector('#Btn_validar')
        button_desable.disabled = true
        const input_list_desable = document.querySelector("#number");
        input_list_desable.disabled = true
    }   
}

function playagain(){

    if(intentos==0 || NumVal==numMagico ||intentos==10){

        if (NumVal == numMagico) {
            document.querySelector("#description").classList.replace("alert-success","alert-info");
            document.querySelector("#description").innerHTML = "Cada vez que hagas un intento te saldra una pista si es mayor o menor asi te podras mas acercar al numero magico, recuerda que solo tienes <span class='badge badge-pill badge-warning'>10</span> oportunidades de adivinar, Buena suerte!.";
            document.querySelector("#number").classList.replace("is-valid","is-null");
        }else{
            document.querySelector("#description").classList.replace("alert-danger","alert-info");
            document.querySelector("#description").innerHTML = "Cada vez que hagas un intento te saldra una pista si es mayor o menor asi te podras mas acercar al numero magico, recuerda que solo tienes <span class='badge badge-pill badge-warning'>10</span> oportunidades de adivinar, Buena suerte!.";
            document.querySelector("#number").classList.replace("is-null","is-valid");
        }
    
        intentos=10
        numMagico = Math.random()*(max-min) + min; 
        numMagico = parseInt(numMagico);
    
    
    
    
        // desavilita el boton de listar, par que no se vuelva a listar mientras juega
        const buton_list_desable = document.querySelector('#lisUser')
        buton_list_desable.disabled = false
    
        const input_list_desable = document.querySelector("#register-first-name");
        input_list_desable.disabled = false

        //Habilitar boton de jugar con el input
        const button_desable = document.querySelector('#Btn_validar')
        button_desable.disabled = true
        const input_list_user = document.querySelector("#number");
        input_list_user.disabled = true
    
        document.getElementById("number").value ="";

        swal("Vuelva a ingresar su nombre o ingrese uno nuevo")
    }else{
        swal({
            title: "Estas seguro?",
            text: "Desea detenerlo y volver a empezar de nuevo ?",
            icon: "warning",
            buttons: ({
                cancel: {
                text: "Cancelar",
                value: null,
                visible: true,
                closeModal: true,
            },
                confirm: {
                text: "Si, detener",
                value: true,
                visible: true,
                closeModal: true
              }
            }),
        }).then((willDelete) => {
            if (willDelete) {
                NumVal = document.getElementById("number").value;
    
                if (NumVal == numMagico) {
                    document.querySelector("#description").classList.replace("alert-success","alert-info");
                    document.querySelector("#description").innerHTML = "Cada vez que hagas un intento te saldra una pista si es mayor o menor asi te podras mas acercar al numero magico, recuerda que solo tienes <span class='badge badge-pill badge-warning'>10</span> oportunidades de adivinar, Buena suerte!.";
                    document.querySelector("#number").classList.replace("is-valid","is-null");
                }else{
                    document.querySelector("#description").classList.replace("alert-danger","alert-info");
                    document.querySelector("#description").innerHTML = "Cada vez que hagas un intento te saldra una pista si es mayor o menor asi te podras mas acercar al numero magico, recuerda que solo tienes <span class='badge badge-pill badge-warning'>10</span> oportunidades de adivinar, Buena suerte!.";
                    document.querySelector("#number").classList.replace("is-null","is-valid");
                }
            
                intentos=10
                numMagico = Math.random()*(max-min) + min; 
                numMagico = parseInt(numMagico);
            
            
            
            
                // desavilita el boton de listar, par que no se vuelva a listar mientras juega
                const buton_list_desable = document.querySelector('#lisUser')
                buton_list_desable.disabled = false
            
                const input_list_desable = document.querySelector("#register-first-name");
                input_list_desable.disabled = false
    
                //Habilitar boton de jugar con el input
                const button_desable = document.querySelector('#Btn_validar')
                button_desable.disabled = true
                const input_list_user = document.querySelector("#number");
                input_list_user.disabled = true
            
                document.getElementById("number").value ="";
                swal("Juego de tenido","para volver a jugar vuelva a ingresar su nombre","success");
            }else {
                swal("Cancelado","Puede Seguir Jugando",{
                    icon: "error",
                });
            }
        });
    }
}

function verdatos(){
    let $nom = localStorage.getItem("lisDato");
    document.querySelector("#history").innerHTML = $nom;
}

setInterval("verdatos()",500);
/*localStorage.setItem("nombre",$NumVal);

        var nom = localStorage.getItem("nombre");
        document.querySelector("#nomLS").innerHTML = nom;*/
//setInterval("datos()",1);