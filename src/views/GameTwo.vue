<template>
  <div class="game_two_box">
      <div class="gamenav  text-center">
          <div class="container">
              <div class="row ">
                
                
                  <div class="col-4"><h3 class="cabecera_juego2"> <b-icon icon="card-heading"></b-icon>  {{cantidadPrueba}}  / 20</h3></div>
                  <div class="col-4 text-light"><h3 class="cabecera_juego2"> <b-icon icon="alarm-fill"></b-icon>  {{ countup }}</h3></div>
                  <div class="col-4 text-light" ><h3 class="cabecera_juego2"> <b-icon icon="graph-up"></b-icon> Puntaje: {{PuntajeLocalActual}} puntos</h3></div>
              </div>
          </div>

          <Pregunta v-for="(pregunta,index) in ListaLocalPreguntas" 
                    :key="pregunta.id" 
                    :urlImagen="pregunta.imgUrl" 
                    :indicePregunta="index+1"
                    :funcCantidad="EvaluarPreguntaJ2"
                    :AlternativaC="pregunta.AlterCorrecta"
                    :quizzBoxVisible="pregunta.boxVisible"></Pregunta>
          
      </div>

      <b-modal ref="modalGameTwo" id="modal-lg" size="lg" title="Resultados de Examen"  hide-footer>
        <div>Tu puntaje es: {{PuntajeLocalActual}}</div>
        <div>Examen terminado en : {{record}}</div>
        <!--<div>Examen terminado en : {{NumbRecord}}</div>-->
        <div class="row">
          <div></div>
         <!--<router-link to="/userPanel" class="btn btn-danger btn-change-quizz col align-self-end">Salir</router-link>
          --><button @click="guardarPartidaJuegoDos({puntaje:PuntajeLocalActual,tiempo:record,segundos:NumbRecord})" class="btn btn-danger btn-change-quizz col align-self-end">Finalizar Examen</button>
        </div>
      </b-modal>

      <router-link to="/userPanel" class="btn btn-primary px-5" style="margin-left:110px;">Salir</router-link>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Pregunta from '../components/Pregunta.vue'
import CountUp from '../components/CountUp.vue'
import moment from 'moment';
export default {
 components:{
     Pregunta,
     CountUp
 },
 data(){
    return{
      ListaPosPregustas:[],
      ListaLocalPreguntas:[],
      PreguntaActualIzquierda:null,
      PreguntaActualDerecha:null,

      btnSiguienteVisible:true,
      btnSiguienteDisable:true,

      FormPreguntaVisibleIzquierda:true,
      formMensajeVisibleIzquierda:false,
      animacionTextoIzquierda:'incorrecta',
      animacionPuntosIzquierda:0,

      FormPreguntaVisibleDerecha:true,
      formMensajeVisibleDerecha:false,
      animacionTextoDerecha:'incorrecta',
      animacionPuntosDerecha:0,
      
      posPregunta:1,
      PuntajeLocalActual:0,
      countup: null,
      expires_in: null,
      interval: null,
      seconds:0,
      cantidadPrueba:0,
      record:"00:00:00",
      NumbRecord:0
      
    }
},
methods:{
  EvaluarPreguntaJ2(opcion,AlterCorrecta){
    if(opcion == AlterCorrecta){
     this.PuntajeLocalActual +=200
     console.log("correcta: ",opcion,this.PreguntaActualIzquierda.AlterCorrecta)
     
   }
   else{
     console.log("incorrecta: ",opcion,this.PreguntaActualIzquierda.AlterCorrecta)
     
   }
   this.cantidadPrueba+=1
   if(this.cantidadPrueba==20){
     this.record=this.countup
     this.NumbRecord=this.expires_in
     console.log(this.record)
     this.$refs['modalGameTwo'].show()
   }
  },
 Siguente(){
   this.posPregunta++
   this.PreguntaActual=this.ListaLocalPreguntas[this.posPregunta]
   if(this.posPregunta==10){
     this.btnSiguienteVisible=false
   }
 },
 EvaluarPreguntaIzquierda(opcion){
   if(opcion == this.PreguntaActualIzquierda.AlterCorrecta){
     this.PuntajeLocalActual +=200
     console.log("correcta: ",opcion,this.PreguntaActualIzquierda.AlterCorrecta)
     this.animacionTextoIzquierda="Correcta"
     this.animacionPuntosIzquierda=200
   }
   else{
     console.log("incorrecta: ",opcion,this.PreguntaActualIzquierda.AlterCorrecta)
     this.animacionTextoIzquierda="Incorrecta"
     this.animacionPuntosIzquierda=0
   }
   this.btnSiguienteDisable=false
   this.formMensajeVisibleIzquierda=true
   this.FormPreguntaVisibleIzquierda=false
   setTimeout(() => {
       this.posPregunta++
   this.PreguntaActualIzquierda=this.ListaLocalPreguntas[this.posPregunta]
    this.formMensajeVisibleIzquierda=false
   this.FormPreguntaVisibleIzquierda=true
   }, 3000);
 },
 EvaluarPreguntaDerecha(opcion){
   if(opcion == this.PreguntaActualDerecha.AlterCorrecta){
     this.PuntajeLocalActual +=200
     console.log("correcta: ",opcion,this.PreguntaActualDerecha.AlterCorrecta)
     this.animacionTextoDerecha="Correcta"
     this.animacionPuntosDerecha=200
   }
   else{
     console.log("incorrecta: ",opcion,this.PreguntaActualDerecha.AlterCorrecta)
     this.animacionTextoDerecha="Incorrecta"
     this.animacionPuntosDerecha=0
   }
   this.btnSiguienteDisable=false

   this.FormPreguntaVisibleDerecha=false
   this.formMensajeVisibleDerecha=true
   setTimeout(() => {
       this.posPregunta++
   this.PreguntaActualDerecha=this.ListaLocalPreguntas[this.posPregunta] 
   this.formMensajeVisibleDerecha=false
   this.FormPreguntaVisibleDerecha=true
   }, 3000);
  
 },
 _setInterval: function() {
                this.interval = setInterval(() => {
                    if (this.expires_in === 7200) {
                        this.$refs['modalGameTwo'].show()
                        clearInterval(this.interval);
                    } else {
                        this.expires_in += 1;
                        this.countup = moment.utc(this.expires_in * 1000).add(1, 'seconds').format('HH:mm:ss');
                    }
                }, 1000);
            },
            ...mapActions(['guardarPartidaJuegoDos'])
},
computed:{
...mapState(['ListaPreguntas'])
},
created(){
  var lista = this.ListaPosPregustas
  while (lista.length<20) {
    var numeroAleatorio=Math.floor(Math.random()*(39))
    var norepeticion=true
    while (norepeticion){
      lista.forEach(function(item){  
      if(numeroAleatorio==item){  
       norepeticion=false;   
      };  
      
     });
     if (norepeticion){
       lista.push(numeroAleatorio)
      // console.log("longitud:"+lista.length,"lista: ",lista); 
     }
    }
  }
  lista.forEach(item =>{
    this.ListaLocalPreguntas.push(this.ListaPreguntas[item].pregunta) 
  })
  this.PreguntaActualIzquierda = this.ListaLocalPreguntas[0]
  this.PreguntaActualDerecha = this.ListaLocalPreguntas[1]
  
},
mounted () {
            this.countup = moment.utc(this.seconds).format('mm:ss');
            this.expires_in = this.seconds;
            this._setInterval();
        },
        destroyed () {
            clearInterval(this.interval);
        },
}
</script>

<style>

.quizzBox{
  margin: 0 10px 0 10px;
}
.img_quizz{
    width: 38vw;
}

.img_g2{
  width: 485px;
  
}

.contenedorpuntaje2{
  display:flex;
  flex-direction: column;
  align-items: center;
}

.cabecera_juego2{
  color: black;
}
</style>