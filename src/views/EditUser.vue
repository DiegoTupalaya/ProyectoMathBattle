<template>
    <div class="editUser">
        <div class="container">
            <div class="row datos_usuario">
                <div><h1 class="titulo_datos"><b-icon icon="clipboard-check"></b-icon> Editar Datos</h1></div>
                <div><h3 class="subtitulo_datos"> <b-icon icon="person-circle"></b-icon> Datos del usuario</h3></div>
                <div class="row" id="modificar">
                    <div class="d-flex flex-column align-items-end py-3">
                        <div class="form-check form-switch" id="editar">
                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="presionado">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Editar</label>
                        </div>    
                    </div>
                    <b-form class="row formulario_datos_usuario" @submit.prevent="editarDatosUsuario({nombres:datosUsuario.nombres,apellidos:datosUsuario.apellidos,edad:datosUsuario.edad})">
                        <b-form-group
                            id="input-group-2"
                            label="Nombres:"
                            label-for="input-2"
                            class="py-3 col-md-4 mx-5"
                                
                        >
                            <b-form-input
                                id="input-2"
                                v-model="datosUsuario.nombres"
                                type="text"
                                placeholder="Ingrese sus nombres"
                                required
                                :disabled="presionado==false"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-3"
                            label="Apellidos:"
                            label-for="input-3"
                            class="py-3 col-md-4 mx-5"
                                
                        >
                            <b-form-input
                                id="input-3"
                                v-model="datosUsuario.apellidos"
                                type="text"
                                placeholder="Ingrese sus apellidos"
                                required
                                :disabled="presionado==false"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-4"
                            label="Edad:"
                            label-for="input-4"
                            class="py-3 col-md-4 mx-5"
                                
                        >
                            <b-form-input
                                id="input-4"
                                v-model="datosUsuario.edad"
                                type="text"
                                placeholder="Ingrese su edad"
                                required
                                :disabled="presionado==false"
                            ></b-form-input>
                        </b-form-group>
                        <div class="d-flex flex-column align-items-end py-3">
                        <button class="btn btn-outline-dark px-5" type="submit">Actualizar</button>
                    </div>
                    </b-form>
                    
                </div>
                <div class="py-3 "><h3 class="subtitulo2_contraseña"> <b-icon icon="unlock-fill"></b-icon> Cambiar contraseña</h3></div>
                <div class="row" id="modificar">
                    <b-form @submit.prevent="CambiarContra(form.password2)" >
                        <b-form-group
                            id="input-group-5"
                            label="Contraseña:"
                            label-for="input-5"
                            class="py-3 col-md-4 mx-5"
                                
                        >
                            <b-form-input
                                id="input-5"
                                v-model="form.password1"
                                type="password"
                                placeholder="Ingrese su Contrseña"
                                required
                                :disabled="presionado==false"
                            ></b-form-input>
                        </b-form-group>
                        <b-form-group
                            id="input-group-6"
                            label="Nueva contraseña:"
                            label-for="input-6"
                            class="py-3 col-md-4 mx-5"
                                
                        >
                            <b-form-input
                                id="input-6"
                                v-model="form.password2"
                                type="password"
                                placeholder="Ingrese su nueva contraseña"
                                required
                                :disabled="presionado==false"
                            ></b-form-input>
                        </b-form-group>
                    <div class="d-flex flex-column align-items-end py-3">
                        <button type="submit" class="btn btn-outline-dark px-5">Actualizar</button>
                    </div>    
                    </b-form>
                    
                </div>
            <div class="py-3">
                <router-link to="/adminPanel" v-show="datosUsuario.status =='admin'" class="btn btn-outline-dark px-5">Volver</router-link>
                <router-link to="/userPanel" v-show="datosUsuario.status !='admin'" class="btn btn-outline-dark px-5">Volver</router-link>
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
          nombres:"",
          apellidos:"",
          edad:"",
          password1:"",
          password2:"",
          
        },
        mostrarBtnAdmin:null,
        presionado:"",
        show: true
      }
    },
    methods:{
        ...mapActions(['CambiarContra','editarDatosUsuario'])
        
        
    },
    computed:{
        ...mapState(['error','datosUsuario'])
        
        
    }
  }

</script>
    
<style>
.titulo_datos{
  font-weight: 900!important;
  text-align: center;
  color: black;
  font-size: 45px!important;
}
.datos_usuario{
    color: black;
}
.subtitulo_datos{
    font-weight: 900!important;
}

.subtitulo2_contraseña{
    font-weight: 900!important;
}
#modificar{
    border: 2px solid black;
    background:white;
    border-radius: 8px;
    
}

#editar{

    font-size: 20px;
}
    
</style>