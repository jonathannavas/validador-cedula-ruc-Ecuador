const cedulaInput = document.querySelector('#cedula');
const rucInput = document.querySelector('#ruc');

cedulaInput.addEventListener('change',()=>{

    const cedula = cedulaInput.value;
    let dni = cedula.split('');
    if(cedula.length==10){
        const cod = Number(cedula.substr(0,2));
        // Validación: que los dos primeros digitos correspondan al numero de provincias del Ecuador
        if(cod>0 && cod<=24 || cod==30){

            let sumaPar=0; let sumaImpar=0;let sumaTotal = 0;let decenaSuperior=0; let ultimoDigito = 0;
            
            for(let i=0;i<9;i++){

                if( i % 2 == 0){
                    dni[i]*=2;
                    if(dni[i]>=10){
                        dni[i]-=9;
                    }
                    sumaPar+=Number(dni[i]);
                }else{
                   sumaImpar+=Number(dni[i]);
                }
            }

            sumaTotal = sumaPar + sumaImpar;

            if( sumaTotal%10==0 ){
                ultimoDigito=0;
            }else{
                decenaSuperior = sumaTotal - (sumaTotal%10) + 10;
                ultimoDigito = decenaSuperior - sumaTotal;
            }

            if( ultimoDigito === Number(dni[9])){
                console.log('Cedula valida');
            }else{
                console.error('Cedula Invalida');
            }      


        }else{
            console.error('Dni Erroneo');
        }
    }else{
        console.error('Identificador Erroneo');
    }

});


rucInput.addEventListener('change',()=>{

    const ruc                   = rucInput.value;
    const valorRuc              = ruc.split('');
    const tercerDigito          = Number(valorRuc[2]);
    const provinciaValidadora   = Number(valorRuc[0]+''+valorRuc[1]);
    const arrTercerDigitoNueve  = [4,3,2,7,6,5,4,3,2];
    const arrTercerDigitoSeis   = [3,2,7,6,5,4,3,2];
    let   suma                  = 0;
    let   digitoVerificador     = 0;
    let   sumaPar               = 0;
    let   sumaImpar             = 0;

    if( valorRuc.length == 13 ){

        // validar la provincia de emicion del ruc
        if( (provinciaValidadora>=1) && (provinciaValidadora<=24) || (provinciaValidadora==30) ){

            if( ( tercerDigito >= 1) && ( tercerDigito < 6 ) ){

                /*
                    RUC PERSONA NATURAL
                */

                console.log('RUC Natural');
                
                for(let i=0;i<9;i++){
                    if( i % 2 == 0){
                        valorRuc[i]*=2;
                        if(valorRuc[i]>=10){
                            valorRuc[i]-=9;
                        }
                        sumaPar+=Number(valorRuc[i]);
                    }else{
                       sumaImpar+=Number(valorRuc[i]);
                    }
                }

                suma = sumaImpar + sumaPar;

                if( suma%10 == 0 ){
                    digitoVerificador = 0;
                }else{
                    digitoVerificador = 10 - (suma%10);
                }

                if( digitoVerificador == Number(valorRuc[9]) ){
                    console.log('Todo OK PASA');
                }else{
                    console.error('No pasa');
                }


            }else if( tercerDigito == 6 ){
                
                console.log('RUC Publico');

                /*
                    RUC PÚBLICO
                */
                
                for(let i=0;i<8;i++){
                    suma+=Number(valorRuc[i])*Number(arrTercerDigitoSeis[i]);
                }

                digitoVerificador = 11 - ( suma % 11 );

                if( digitoVerificador == Number(valorRuc[8] ) ){
                    console.log('Todo OK PASA');
                }else{
                    console.error('ERROR NO PASA');
                }
                
            }else if( tercerDigito == 9 ){

                console.log('RUC Juridico');
                
                /*
                    RUC JURÍDICO
                */
                
                for( let i=0; i<9;i++ ){
                    suma+=Number(valorRuc[i])*Number(arrTercerDigitoNueve[i]);
                }

                digitoVerificador = 11 - ( suma % 11 );

                if( digitoVerificador === Number(valorRuc[9]) ){
                    console.log('Todo OK PASA');
                }else{
                    console.error('ERROR NO PASA');
                }
                  
            }

        }else{
            console.error('Ruc incorrecto');
        }

    }else{
        console.error('Error de RUC');
    }

});