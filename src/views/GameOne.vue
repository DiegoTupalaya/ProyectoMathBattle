<template>
  <div class="gameBox">
      <div class="gamenav  text-center">
          <div class="container">
              <div class="row ">
                  <div class="col-lg-4 col-sm-1">.</div>
                  <div class="col-lg-4 col-sm-12 text-black"><CountDown  :puntaje="PuntajeLocalActual" :seconds="1802" /></div>
                  <div class="col-lg-4 col-sm-12 text-black" ><h3> <b-icon icon="graph-up"></b-icon> Puntaje: {{PuntajeLocalActual}} puntos</h3></div>
              </div>
          </div>
          
          
      </div>
      
      <div class="quizzBox ">
          <div class="container ">
              <div class="row row1">
                <div class="mb-3  d-flex justify-content-center row">
                    <div class="col-lg-8 my-3 col-md-12 col-sm-12">
                        <div >
                            <h2 class="my-1 titulopregunta"> Pregunta {{posPregunta}}/10 </h2> 
                            <img  :src="PreguntaActual.imgUrl" class="imagen1" alt="">
                        </div>
                        
                           
                    </div>
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <div class="mt-5  " >
                        <button @click="EvaluarPregunta('A')" class=" btn_option_quizz" :disabled="presionado">A</button>
                        <button @click="EvaluarPregunta('B')" class=" btn_option_quizz" :disabled="presionado">B</button>
                        <button @click="EvaluarPregunta('C')" class=" btn_option_quizz" :disabled="presionado">C</button>
                        <button @click="EvaluarPregunta('D')" class=" btn_option_quizz" :disabled="presionado">D</button>
                        <button @click="EvaluarPregunta('E')" class=" btn_option_quizz" :disabled="presionado">E</button>
                    </div>
                        
                        
                    </div>
                    <div class="button_select_box">
                      <router-link to="/userPanel" class="btn btn-danger btn-change-quizz">Salir</router-link>
                      <button @click="Siguente()" v-show="btnSiguienteVisible" :disabled="btnSiguienteDisable" class="btn btn-primary btn-change-quizz">Siguiente Pregunta</button>
                      <button v-b-modal.modal-lg v-show="btnFinalizarVisible" class="btn btn-primary btn-change-quizz">Finalizar</button>
                    </div>
                </div>    
              </div>
          </div>
      </div>
      <b-modal ref="modalGameOne" id="modal-lg" size="lg" title="Resultados de Examen"  hide-footer>
        <div>Tu puntaje es: {{PuntajeLocalActual}}</div>
        <div class="row">
          <div></div>
         <!--<router-link to="/userPanel" class="btn btn-danger btn-change-quizz col align-self-end">Salir</router-link>
          --><button @click="guardarPartidaJuegoUno(PuntajeLocalActual)" class="btn btn-danger btn-change-quizz col align-self-end">Salir</button>
        </div>
      </b-modal>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import CountDown from '@/components/CountDown.vue'
export default {

  components: {
    CountDown
  },
data(){
    return{
      ListaPosPregustas:[],
      ListaLocalPreguntas:[],
      PreguntaActual:null,
      btnSiguienteVisible:true,
      btnSiguienteDisable:true,
      btnFinalizarVisible:false,

      posPregunta:1,
      PuntajeLocalActual:0,

      presionado:false
   
    }
},
methods:{
 Siguente(){
   this.presionado=false
   this.btnSiguienteDisable=true
   this.posPregunta++
   this.PreguntaActual=this.ListaLocalPreguntas[this.posPregunta]
   if(this.posPregunta==10){
     this.btnSiguienteVisible=false
     this.btnFinalizarVisible=true
   }
 },
 EvaluarPregunta(opcion){
   if(opcion == this.PreguntaActual.AlterCorrecta){
     this.PuntajeLocalActual +=200
     console.log("correcta: ",opcion,this.PreguntaActual.AlterCorrecta)
   }
   else{
     console.log("incorrecta: ",opcion,this.PreguntaActual.AlterCorrecta)
   }
   this.btnSiguienteDisable=false,
   this.presionado=true
 },
 ...mapActions(['guardarPartidaJuegoUno'])
},
computed:{
...mapState(['ListaPreguntas'])
},
created(){
  var lista = this.ListaPosPregustas
  while (lista.length<=10) {
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
  this.PreguntaActual = this.ListaLocalPreguntas[0]
}
}

</script>

<style>

.row1{
  background: #414345;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.5);
}
.btn_option_quizz{
    width: 15em;
    height: 2.5em;
    margin: 8px 20px 8px 0;
    border-radius:  8px ;
    font-weight: 700;
    color: white;
    box-shadow: 0 4px 0 0 #00a06a;
    background-color: #00c985;
}

.btn_option_quizz:hover{
  background: #51daac;
  box-shadow: 0 4px 0 0 #51daac;
  color: black;

}

.option_quizz{
  margin-top: 30px;
}
.titulopregunta{
  color: white;
  font-weight: 700;
}

.imagen1{
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.5);
  border: 10px double black;
  width: 690px;
}
.btn-change-quizz{
    width: 15em;
    height: 2.5em;
    margin: 8px 20px 8px 0;
    border-radius:  8px ;
    font-weight: 700;
}



@media only screen and (max-width: 768px){
.imagen1{

  width: 85vw!important;
}

}
</style>
