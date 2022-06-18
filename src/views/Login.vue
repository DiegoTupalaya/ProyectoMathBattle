<template>
  <div>
    <div class="container">
    <div class="row justify-content-around contenedor_login">
      <div class="col-md-4 mx-3 quienes d-none d-lg-block" >
        <h1 class="titulo1"> <b-icon icon="people-fill"></b-icon> ¿Quiénes somos?</h1>
        <label for="" id="contenido1">El círculo de estudio Smart, cuenta con una amplia experiencia preparando jóvenes para participar en olimpiadas de matemáticas nacionales e internacionales.</label>  
      </div>
      <div class="col-md-5 py-1 mx-3 iniciar" ><h1 class="titulo2">Iniciar Sesión</h1>
        <b-form @submit.prevent="ingresoUsuario({email: form.email, password: form.password})" v-if="show" >
          
          <b-form-group 
            id="input-group-2"
            label= "Correo:"
            label-for="input-2"
            class="py-3"
          >
            <b-form-input
              id="input-2"
              v-model="form.email"
              type="email"
              placeholder="Ingrese su correo"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Contraseña:"
            label-for="input-3"
            class="py-3"
          >
            <b-form-input
              id="input-3"
              v-model="form.password"
              type="password"
              placeholder="Ingrese su contraseña"
              required
            ></b-form-input>
          </b-form-group>
          <div class="text-center pt-3 pb-3">
            <button class="btn btn-primary" type="submit">Iniciar Sesion</button>
          </div>
        </b-form>
        
        <div class=" text-center registro">
          <h4 class="d-inline mx-4 cuenta">¿No tienes cuenta?</h4>
          <router-link to="/registro" class="btn btn-success d-inline py-2 px-3 registrate_login">Registrarse</router-link>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
  export default {
    components:{
      
    },
    data() {
      return {
        form: {
          correo:"",
          password1:"",
          password2:""
        },
        show: true
      }
    },
    methods:{
        ...mapActions(['ingresoUsuario'])
    },
    computed:{
        ...mapState(['error']),
        
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Handlee&family=Montserrat&display=swap');
*{
  font-family: 'Handlee', cursive;
}

.quienes{
  background: #fff;
  padding: 30px!important; /* espacio adentro del contenedor */
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.5);
  height: 300px!important;
  margin-top: 25px!important;
  color: black;
}
.titulo1{
  font-size: 30px;
  font-weight: 600;
  text-align: center;
}
.iniciar{
  background: #fff;
  padding: 40px!important;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.5);
  height: 500px!important;
  color: black;
}
.titulo2{
  text-align: center;
  color: black;
  font-style: bold;
  margin-top: 30px;
  font-weight: 600;
}
#contenido1{
  font-size: 20px;
  text-align: center;
  color: black;
}
#input-group-2{
  color: black;
}
#input-group-3{
  color: black;
}
.cuenta{
  color: black;
  font-size: 20px;
}

.registro{
  margin-top: 35px!important;
}

.home_login{
  background :#132f4e;
}
div.form-group > label{
  font-size: 20px;
}

@media only screen and (max-width: 767px){

.contenedor_login{
  display:flex; 
  /*flex-direction: column-reverse;*/
  justify-content: center;
}

.iniciar{
  padding: 25px!important;
  width: 330px!important;
  height: 470px!important;
}

.registro{
  margin-top: 0px!important;
  display: flex;
  flex-direction: column;
  align-items: center;
}


}

@media only screen and (max-width: 359px){

.contenedor_login{
  display:flex; 
  flex-direction: column-reverse;
  max-width: 100%;

}

.iniciar{
  padding: 25px!important;
  width: 330px!important;
  height: 450px!important;
}

.registro{
  margin-top: 0px!important;
  display: flex;
  flex-direction: column;
  align-items: center;
}


}
</style>