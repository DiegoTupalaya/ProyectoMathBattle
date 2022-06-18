<template>
  <div>
    <div class="container">
    <div class="row justify-content-around">
      <div class="col-md-4 mx-3 quienes d-none d-lg-block">
        <h1 class="titulo1"> <b-icon icon="people-fill"></b-icon> ¿Quiénes somos?</h1>
        <label for="" id="contenido1">El circulo de estudio Smart, cuenta con una amplia experiencia preparando jóvenes para participar en olimpiadas de matemáticas nacionales e internacionales.</label>
      </div>
      <div class="col-md-5 py-1 mx-3 registrobox"><h1 class="titulo2">Registro</h1>
        <b-form @submit.prevent="crearUsuario({email: form.email, password: form.password1})"  v-if="show" >
      
          <b-form-group 
            id="input-group-2"
            label="Correo:"
            label-for="input-2"
            class="py-1"
          >
            <b-form-input
              id="input-2"
              v-model="form.email"
              type="email"
              placeholder="Ingrese su correo"
              required
            ></b-form-input>
            <div class="text-center text-danger">
              <p>{{validarCorreo()}}</p>
            </div>
            
          </b-form-group>
          

          <b-form-group
            id="input-group-3"
            label="Contraseña:"
            label-for="input-3"
            class="py-1"
          >
            <b-form-input
              id="input-3"
              v-model="form.password1"
              type="password"
              placeholder="Ingrese su contraseña"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Repetir Contraseña:"
            label-for="input-4"
            class="py-1"
          >
            <b-form-input
              id="input-4"
              v-model="form.password2"
              type="password"
              placeholder="Repita su contraseña"
              required
            ></b-form-input>
          </b-form-group>
          <div class="text-center pt-3 pb-3">
          <button class="btn btn-primary" type="submit">Registrarse</button>
        </div>
        </b-form>
        
        <div class="mt-3 text-center registrobox2">
          <h4 class="d-inline mx-4 cuenta2">¿Ya tienes una cuenta?</h4>
          <router-link to="/" class="btn btn-success d-inline py-2 px-3">Iniciar Sesion</router-link>
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
          email:"",
          password1:"",
          password2:""
        },
        mensajeErrorCorreo:"",
        show: true
      }
    },
    methods:{
        ...mapActions(['crearUsuario'])
        ,validarCorreo: function (){
          let terminacion_pe = this.form.email.slice(-2)
          let terminacion_com = this.form.email.slice(-3)
          if(this.form.email !=""){ 
          if (terminacion_pe=='pe' || terminacion_com=='com'){
            return "Correo Permitido"
          }
          else{
            return "Recuerde que solo se aceptan correos con terminacion .pe y .com"

          }}
          else{
            return ""
          }
          
        }
    },
    computed:{
        ...mapState(['error']),
        
        
    }
  }
</script>

<style>

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
.titulo2{
  text-align: center;
  color: black;
  font-style: bold;
  margin-top: 30px;
  font-weight: 600;
}
.registrobox{
  background: #fff;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.5);
  height: 510px!important;
  color: black;
}
#contenido1{
  font-size: 20px;
  text-align: center;
  color: black;
}
.cuenta2{
  color: black;
  font-size: 20px;
}
.home_login{
  background :#132f4e;
}
div.form-group > label{
  font-size: 20px;
}

@media only screen and (max-width: 768px){

.registrobox{
  padding: 25px!important;
  width: 330px!important;
  height: 490px!important;
  
}

.registrobox2{
  margin: 0px!important;
  display: flex;
  flex-direction: column;
  align-items: center;

}
}
</style>