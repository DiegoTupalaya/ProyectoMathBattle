<template>
  <div class="userPanel">
      <div class="nav_userPanel container">
          <div class="row">
            <div><h1 class="titulo_menu">MENU PRINCIPAL</h1></div>
              <div class="col-md-6 d-none d-sm-none d-md-block"></div>
              <div class="col-md-6 col-sm-12">
                <div class="d-flex flex-column align-items-end d-none d-sm-none 	d-md-block">
                    <div class="text-center" id="botones1">
                        
                        <div class="p-1"><router-link class="btn btn-outline-dark px-5" to="/editUser"> <b-icon icon="clipboard-check"></b-icon> Editar usuario</router-link></div>
                        <div class="p-1"><button class="btn btn-outline-dark px-5" @click="cerrarSesion"> <b-icon icon="box-arrow-right"></b-icon> Cerrar Sesión</button></div>
                    </div>
                </div>
                <div inline class="d-flex justify-content-center		  d-sm-block d-md-none ">
                    <div class="text-center" id="botones1">
                        <div class="row mt-2 mb-3">
                          <div class="col-6"><div class="p-1"><router-link class="btn btn-outline-dark px-5" to="/editUser"> <b-icon icon="clipboard-check"></b-icon> Editar usuario 2</router-link></div></div>
                          <div class="col-6"><div class="p-1"><button class="btn btn-outline-dark px-5" @click="cerrarSesion"> <b-icon icon="box-arrow-right"></b-icon> Cerrar Sesión 2</button></div></div>
                        </div>
                        
                        
                        
                    </div>
                </div>
              </div>
          </div>
          
          <div class="col-12 d-flex justify-content-center px-auto mb-5" id="botones2">
            <div class="row">
              <div class="col-md-6 col-sm-12"><div class="mx-5"><router-link class=" btn_1 btn btn-outline-dark px-5 py-5" to="/gameone"> <b-icon icon="file-play-fill"></b-icon> Empezar Juego 1</router-link></div></div>
              <div class="col-md-6 col-sm-12"><div class="mx-5"><router-link class="btn_1 btn btn-outline-dark px-5 py-5" to="/gametwo"> <b-icon icon="file-play-fill"></b-icon> Empezar Juego 2</router-link></div></div>
            </div>
            
              
          </div>
          <div class="col-12 d-flex justify-content-center px-auto mt-5" id="botones3">
            <div class="row">
              <div class="col-md-6 col-sm-12"><div class="mx-5"><router-link class="btn_1 btn btn-outline-dark px-5 py-5 text-justify" to="/puntajePanel1"> <b-icon icon="clipboard-data"></b-icon> Tabla de puntaje Juego 1</router-link></div></div>
              <div class="col-md-6 col-sm-12"><div class="mx-5"><router-link class="btn_1 btn btn-outline-dark px-5 py-5 text-justify" to="/puntajePanel2"><b-icon icon="clipboard-data"></b-icon> Tabla de puntaje Juego 2</router-link></div> </div>
            </div>
            
             
          </div>

      </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
methods:{
  ...mapActions(['cerrarSesion'])
}
}
</script>

<style>

.titulo_menu{
  font-weight: 900!important;
  text-align: center;
  color: black;
  font-size: 45px;
}
#botones1,#botones2,#botones3{
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.btn_1{
  font-weight: 600!important;
  font-size: 30px!important;
}
.btn_juego{
  background-color: transparent;
  color: black;
  text-decoration: none;
  font-size: 20px;
}

@media  (max-width: 600px) {
.titulo_menu{
  font-size: 22px;
  
}
}

@media  (min-width: 600px){
.titulo_menu{
  font-size: 22px;
  
}

}

@media  (min-width: 768px){
.titulo_menu{
  font-size: 40px;
}

}
</style>


titulo_menu