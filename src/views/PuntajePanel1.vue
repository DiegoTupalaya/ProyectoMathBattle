<template>
  <div class="container">
    <div class="row tablapuntaje1">
        <div>
            <h1 class="titulo_menu">Tabla de Puntaje de Juego 1</h1>
        </div>
        <div id="tablapuntaje" class="my-5">
            <table class="table_puntaje1" >
                <thead>
                    <tr>
                        <th scope="col">Jugador</th>
                        <th scope="col">Puntaje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="jugador in ListaMejoresJugadores" :key="jugador.id">
                        <td>{{jugador.usuario}}</td>
                        <td>{{jugador.puntaje}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <router-link to="/userPanel" class="btn btn-outline-dark px-5">Volver</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import { storage,db } from '../api/database';
export default { 

    data(){
        return{

            ListaMejoresJugadores:[
            ]
        }
    },
    methods:{

    },
    created(){
        //var cursosRef = db.doc('preguntas');
        const ListaMejoresJugadoresGameOneRef = db.collection('puntajeGameOne').orderBy("puntaje", "desc").limit(5);

        ListaMejoresJugadoresGameOneRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                let request = doc.data()
                this.ListaMejoresJugadores.push({
                  id:doc.id,
                  usuario: request.nombres + " " + request.apellidos,
                  puntaje: request.puntaje 
                })
            });
        });

      var  auxPuntaje = this.ListaMejoresJugadores
auxPuntaje.sort((a, b) => {
             return    b.puntaje - a.puntaje;
            })
            console.log(auxPuntaje)
    }

}
</script>

<style>

#tablapuntaje{

    text-align: center;
    background: #414345;
    width: 600px;
    padding: 40px;

}
.tablapuntaje1{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.table_puntaje1{
    color: #fff;
    width: 100%;
}
.table_puntaje1 thead{
    background: #00c985;
}

.table_puntaje1 tbody tr{
   border-bottom: 1px solid #fff;

}
.table_puntaje1 tbody tr:hover{
    background: #51daac;
    color: #292929;
}
.table_puntaje1 th,td {
    padding: 10px;
} 
</style>