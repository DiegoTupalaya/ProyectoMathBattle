<template>
  <div>
      <div class="container">
          <div class="row">
            <div class="d-flex flex-column a-i panel_contenerdor_botones">
                    <div class="text-center" id="botones1">
                        
                        <div class="p-1"><router-link class="btn btn-outline-dark px-5" to="/userPanel">Ver como Usuario</router-link></div>
                        
                        <div class="p-1"><router-link class="btn btn-outline-dark px-5" to="/editUser">Editar usuario</router-link></div>
                        <div class="p-1"><button class="btn btn-outline-dark px-5" @click="cerrarSesion">Cerrar Sesión</button></div>
                    </div>
                     </div>
              <div class="col-12">
                <h1 class="panel_admin_titulo">Panel de Administrador</h1>
              </div>
              <div class="col-3 contenedor_pregunta_admin">
                <button v-b-modal.modal-lg class="img_pregunta" >Añadir Pregunta</button>
              </div>
              <div class="col-3 lista_preguntas contenedor_pregunta_admin" v-for="pregunta in ListaPreguntas" :key="pregunta.id">
                <div class="div_num_question">
                    {{pregunta.id}}
                    <button v-b-modal.img-modal-lg @click="VisualizarPregunta(pregunta.pregunta.imgUrl)" class="btn float-end "><b-icon icon="eye-fill" scale="2" variant="info"></b-icon></button>
                    <button @click="eliminarPregunta(pregunta.id)" class="btn float-end "><b-icon icon="trash-fill" scale="2" variant="danger"></b-icon></button>
                    
                    
                    </div>
              </div>
          </div>

      </div>
      
      <b-modal id="img-modal-lg" size="lg" title="Pregunta de Examen">
        <img class="imagen-modal" :src="linkImg" alt="">
      </b-modal>


      <b-modal id="modal-lg" size="lg" centered  title="Añadir Pregunta" hide-footer>
          <div class="container">
              <div class="row ">
                <div class="mb-3  d-flex justify-content-center row">
                    <div class="col-6 my-3">
                        <div>
                            <img @click="$refs.subirImagen.click()" src="../assets/LOGO1.png" :class='"img-thumbnail"+" "+img1' alt="">
                            <img @click="$refs.subirImagen.click()" :src="urlTemporal" :class='"img-thumbnail"+" "+img2' alt="">
                        </div>
                        <div class="my-3">
                            <!--<button class="btn btn-success mx-2" @click="$refs.subirImagen.click()">Buscar Imagen</button>-->
                            <input class="d-none" type="file" id="formFile" ref="subirImagen" @change="buscarImagen($event)"> 
                        </div>
                           
                    </div>
                    <div class="col-12">
                        <div class="input-group my-3">
                        <input type="text" class="form-control mx-2" placeholder="A" v-model="AlterA.enunciado" required>
                        <input type="text" class="form-control mx-2" placeholder="B" v-model="AlterB.enunciado" required>
                        <input type="text" class="form-control mx-2" placeholder="C" v-model="AlterC.enunciado" required>
                        </div>
                        <div class="input-group my-3">
                        <input type="text" class="form-control mx-2" placeholder="D" v-model="AlterD.enunciado" required>
                        <input type="text" class="form-control mx-2" placeholder="E" v-model="AlterE.enunciado" required>
                        </div>
                        
                        
                    </div>
                   
                    <div class="col-12 text-center"> <h4>Elija la opcion correcta</h4>
                      <b-form-group  v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="plain-inline"
        plain
      ></b-form-radio-group>
    </b-form-group>
                        
                    </div>
                    <div class="mt-3">Seleccionado: <strong>{{ selected }}</strong></div>
                    
                </div>    
              </div>
          </div>
          <div class="d-flex justify-content-center">
              <button @click="crearPregunta" class="btn btn-success mx-2"  >Publicar Pregunta</button>
          </div>
        
                            
      </b-modal>
  </div>
</template>

<script>
import { storage,db } from '../api/database';
import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        file: null,
        urlTemporal:'',
        UrlDowload:'',
        img1:'',
        img2:'d-none',
        tempName:'',
        linkImg:"",
        altenativa:['','','','','',''],
        selected: '',
        options: [
          { text: 'A', value:'A'  },
          { text: 'B', value:'B'  },
          { text: 'C', value:'C'  },
          { text: 'D', value:'D'  },
          { text: 'E', value:'E' }
        ],
        ListaPreguntas:[],
        AlterA:{
          enunciado:"",
          opcion:"A"
        },
        AlterB:{
          enunciado:"",
          opcion:"B"
        },
        AlterC:{
          enunciado:"",
          opcion:"C"
        },
        AlterD:{
          enunciado:"",
          opcion:"D"
        },
        AlterE:{
          enunciado:"",
          opcion:"E"
        },
        validacion:false
      }
    },
    methods:{
        buscarImagen(seleccion){
            this.file=seleccion.target.files[0];
            console.log(seleccion.target.files[0])
            var name = seleccion.target.files[0].name
            this.tempName = name.slice(0,-4)
            console.log(name.slice(0,-4))

            const reader = new FileReader();
            reader.readAsDataURL(this.file);
            reader.onload = (e) =>{
                this.urlTemporal = e.target.result;
                this.img1="d-none"
                this.img2=""
            }
        },
        async subirImagen(){
            try {
                const refImagen = storage.ref().child(this.tempName);
                const res = await refImagen.put(this.file); 
                this.UrlDowload = await refImagen.getDownloadURL(); 
            } catch (error) {
                console.log(error)
            }
        },
        async crearPregunta(){

          try {
                const refImagen = storage.ref().child(this.tempName);
                const res = await refImagen.put(this.file); 
                this.UrlDowload = await refImagen.getDownloadURL(); 
                console.log(this.UrlDowload)
           var pregunta={
             Id:this.tempName,
             url:this.UrlDowload,
             AlterA:this.AlterA,
             AlterB:this.AlterB,
             AlterC:this.AlterC,
             AlterD:this.AlterD,
             AlterE:this.AlterE,
             AlterCorrecta:this.selected
           };
           if(this.selected!=""){ 
            this.ListaPreguntas.push({
            id:this.tempName
          })
          this.subirPregunta(pregunta)
          
          }
          else{
            alert("Selecione la alternativa correcta")
            return 0
          }

            } catch (error) {
                console.log(error)
                alert("error al subir la pregunta")
            }
           var UrlImage= this.UrlDowload;
           
/*
PreguntaId:pregunta.Id,
        imgUrl:pregunta.url,
        AlterA:{
          enunciado:"",
          valor:false
        },
        AlterB:{
          enunciado:"",
          valor:false
        },
        AlterC:{
          enunciado:"",
          valor:false
        },
        AlterD:{
          enunciado:"",
          valor:false
        },
        AlterE:{
          enunciado:"",
          valor:false
        },

*/
            
        },
        eliminarPregunta(idPregunta){
          db.collection("preguntas").doc(idPregunta).delete().then(() => {
              console.log("Document successfully deleted!");
              alert("se elimino la pregunta con id: "+idPregunta)
          }).catch((error) => {
              console.error("Error removing document: ", error);
              alert("no elimino la pregunta con id: "+idPregunta)
          });

          let AuxListaPreguntas=this.ListaPreguntas.filter(pregunta => pregunta.id != idPregunta)
          this.ListaPreguntas = AuxListaPreguntas
        },
        VisualizarPregunta(url){
          console.log(url)
          this.linkImg = url
        },
      ...mapActions(['subirPregunta','cerrarSesion'])

    },
    computed:{
       validarSubirImagen(){
           let valName=false
            if (this.tempName!=''){
                valName=true;
            } 
            var valAlternativas=0
            this.altenativa.forEach(element => {
                if(element==''){
                    valAlternativas+=1
                }
                
            });
            if(valName && valAlternativas==0){
                this.validacion=true
            }
            
            
        } 
    },
    created(){

        //var cursosRef = db.doc('preguntas');
        const cursosRef = db.collection('preguntas');

        cursosRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                this.ListaPreguntas.push({
                  id:doc.id,
                  pregunta:doc.data()  
                })
            });
        });

        /*const snapshot = cursosRef.get();
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
});

cursosRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());

              
              aux.forEach(element => {
                this.CursosMatriculados.push({
                  titulo:element,
                  NumeroTemas:doc.data().cursos[element].numeroTemas
                })
              });
              
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });*/

    }
  }
</script>

<style>
.panel_admin_titulo{
  font-weight: 900!important;
  text-align: center;
  color: black;
  font-size: 45px!important;
}
.img_pregunta{
    height: 150px;
    width: 150px;
    background-color: white;
    color: black;
}
.div_num_question{
    height: 150px;
    width: 150px;
    background-color: white;
    border: 1px solid black;
    color: black;
    text-align: center;
    margin-bottom: 22px;
}
.img_pregunta{
  background: #585a5c;
  border-radius: 10px;
  color: black;
  font-weight: bold;
  border: 2px solid white;
  
}

.img_pregunta:hover{

  background: #333435;
  color: white;
  font-weight: bold;
  

}

.a-i{
  align-items: flex-end;
}

@media only screen and (max-width: 767px){
.a-i{
  align-items: center;
}

.panel_admin_titulo{
  margin-top: 15px;
}

.contenedor_pregunta_admin{
  width:  45%!important;
}

.imagen-modal{

  width: 100%;
}
}

@media only screen and (max-width: 359px){
.a-i{
  align-items: center;
}

.panel_admin_titulo{
  margin-top: 15px;
}

.contenedor_pregunta_admin{
  width:  45%!important;
}
}

  
</style>