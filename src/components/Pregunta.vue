<template>
  <div class="quizzBox py-3" v-show="BoxVisible">
      
          <div class="container " >
              
              <div class="row row1">
                <div class="mb-3  d-flex justify-content-center row">
                    <div class="col-md-8 my-3">

                        <div>
                            <h3 class="my-1 titulopregunta"> Pregunta {{indicePregunta}} </h3>
                            <img  :src="urlImagen" class="imagen1 " alt="">
                        </div>
                        
                    </div>
                        <div class="col-lg-4 col-md-12 col-sm-12">
                            <div class="mt-5  " >
                            <button @click="EvaluarPregunta('A',AlternativaC)" class=" btn_option_quizz" >A</button>
                            <button @click="EvaluarPregunta('B',AlternativaC)" class=" btn_option_quizz" >B</button>
                            <button @click="EvaluarPregunta('C',AlternativaC)" class=" btn_option_quizz" >C</button>
                            <button @click="EvaluarPregunta('D',AlternativaC)" class=" btn_option_quizz" >D</button>
                            <button @click="EvaluarPregunta('E',AlternativaC)" class=" btn_option_quizz" >E</button>
                        </div>
                    </div>
                </div>    
              </div>
          </div>
      </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    props:{
        urlImagen:{
            type:String
        },
        indicePregunta:{
            type:Number
        },
        funcCantidad:{
            type:Function
        },
        cantidad:{
            type:Number
        },
        AlternativaC:{
            type:String
        },
        quizzBoxVisible:{
            type:Boolean
        }

    },
    data(){
        return{
           cantidadResponidas:0,
           BoxVisible:true
        }
    },
methods:{
    EvaluarPregunta(opcion,altertiva){
   this.funcCantidad(opcion,altertiva)
   this.BoxVisible=false
 },
 
},
computed:{
...mapState(['Juego2CantRespondidas'])
},
}
</script>

<style scoped>

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


@media  (max-width: 600px) {
.imagen1{
    width: 85vw;
}
}

@media  (min-width: 600px){
.imagen1{
    width: 75vw;
}

}

@media  (min-width: 768px){
.imagen1{
    width: 50vw;
}

}
</style>