import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { db ,auth} from "@/api/database"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:null, 
    error: null,
    datosUsuario:null,
    ListaPreguntas:[],
    Juego2CantRespondidas:0
  },
  mutations: {
    setUsuario(state, payload){
      state.usuario = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setDatosUsuario(state, payload){
      state.datosUsuario = payload
    },
    setListaPreguntas(state, payload){
      state.ListaPreguntas = payload
    },
    setJuego2CantRespondidas(state, payload){
      state.Juego2CantRespondidas = payload
    }
  },
  actions: {
    // Registrar Usuario
    crearUsuario({commit}, usuario){
      auth.createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          var user = auth.currentUser;
          user.sendEmailVerification().then(() => {
          console.log("email enviado");
                
          }).catch((error)=>{

            console.log("error")
          });
          //console.log(res)
          const usuarioCreado = {
            email: res.user.email,
            uid: res.user.uid,
          }

    
    var usuarioDetallesRef = db.doc('usuarios/'+res.user.uid);
    usuarioDetallesRef.set({
      userUid:res.user.uid,
      correo:res.user.email,
      nombres:"",
      apellidos:"",
      edad:"",
      status:"estudiante"
    }).then(() => {
      console.log("Detalles del usuario guardados correctamente");
      commit('setUsuario', usuarioCreado)
      router.push('/')
  })
  .catch((error) => {
      console.error("Error en guardarlos datos: ", error);
  });

        })
        .catch(error => {
          console.log(error)
          commit('setError', error)
        })
    },

// login Usuario
  ingresoUsuario({commit,state}, usuario){
      auth.signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(res => {
          console.log(res)
          const usuarioLogeado = {
            email: res.user.email,
            uid: res.user.uid
          }
          commit('setUsuario', usuarioLogeado)
          
          var usuarioDetallesRef = db.doc('usuarios/'+usuarioLogeado.uid);
          usuarioDetallesRef.get()
          .then(doc => {
              let statusUsuario = doc.data().status
              if(statusUsuario == 'admin'){
                router.push('/adminPanel')}
              else{
                if(res.user.emailVerified){
                  router.push('/userPanel')
                }
                else{
                  alert("Verifique su email")
                }
              }
          })
          .catch(error => console.log(error))
          
          
        })
        .catch(error => {
          console.log(error)
          alert("Error en correo o contraseña")
          commit('setError', error)
        })
    },
    editarDatosUsuario({commit, state},datos){
      var usuarioDetallesRef = db.doc('usuarios/'+state.usuario.uid);
      usuarioDetallesRef.update({

        "nombres":datos.nombres,
        "apellidos":datos.apellidos,
        "edad":datos.edad

      })
      .then(() => {
          alert("datos modificados")
      })
      .catch(error => console.log(error))
    },

// login Usuario
CambiarContra({commit}, newPassword){
  var user = auth.currentUser;

user.updatePassword(newPassword).then(() => {
    console.log("nueva contraseña",newPassword)
    alert("Se ha actualizado su contraseña ")
  }).catch((error) => {
    
    console.log(error)
  });
},

getDatosUsuario({commit, state}){
  var usuarioDetallesRef = db.doc('usuarios/'+state.usuario.uid);
  usuarioDetallesRef.get()
  .then(doc => {
      let DatosUsuario = doc.data()
      let datosUser={
        nombres:DatosUsuario.nombres,
        apellidos:DatosUsuario.apellidos,
        edad:DatosUsuario.edad,
        status:DatosUsuario.status,
      }
      commit('setDatosUsuario', datosUser)
  })
  .catch(error => console.log(error))
},
/*
getListaPreguntas({commit}){
  var cursosRef = db.doc('usuarios/'+112233+'/cursosM/matematica');

        cursosRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
              var aux= Object.keys(doc.data().cursos)

              
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
        });
},*/

// Cerrar Sesion
    cerrarSesion({commit,state}){
      auth.signOut()
        .then(() => {
          state.datosUsuario=null
          router.push('/')
        })
    },
    detectarUsuario({commit}, usuario){
      commit('setUsuario', usuario)
    },

// admin-preguntas
    subirPregunta({commit}, pregunta){
      var preguntaRef = db.doc('preguntas/'+pregunta.Id);
      preguntaRef.set({
        PreguntaId:pregunta.Id,
        imgUrl:pregunta.url,
        AlterA:pregunta.AlterA,
        AlterB:pregunta.AlterB,
        AlterC:pregunta.AlterC,
        AlterD:pregunta.AlterD,
        AlterE:pregunta.AlterE,
        AlterCorrecta:pregunta.AlterCorrecta
      }).then(() => {
        console.log("Pregunta guardada correctamente");
        alert("pregunta guardada satisfactoriamente")
    })
    .catch((error) => {
        console.error("Error en guardarlos datos: ", error);
    });
    },

//Obtener Lista de Preguntas
getListaPreguntas({commit}){
  const cursosRef = db.collection('preguntas');
  var ListaPreguntas = []
  cursosRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          
          ListaPreguntas.push({
            pregunta:doc.data()  
          })
      });
  });
  commit('setListaPreguntas', ListaPreguntas)
},

guardarPartidaJuegoUno({commit,state},puntaje){
  var PartidasJuegoUno = db.doc('puntajeGameOne/'+state.usuario.uid);
  PartidasJuegoUno.set({
    Id:state.usuario.uid,
    nombres:state.datosUsuario.nombres,
    apellidos:state.datosUsuario.apellidos,
    puntaje:puntaje

  }).then(() => {
    console.log("Puntaje1 guardado correctamente");
    alert("Puntaje Juego1 guardado satisfactoriamente")
    router.push('/userPanel')
})
.catch((error) => {
    console.error("Error en guardarlos datos: ", error);
});
},
guardarPartidaJuegoDos({commit,state},data){
 
  var PartidasJuegoDos = db.doc('puntajeGameTwo/'+state.usuario.uid);
  
  PartidasJuegoDos.set({
    Id:state.usuario.uid,
    nombres:state.datosUsuario.nombres,
    apellidos:state.datosUsuario.apellidos,
    tiempo:data.tiempo,
    segundos:data.segundos+1,
    puntaje:data.puntaje,
    division:(data.puntaje/(data.segundos+1))

  }).then(() => {
    console.log("Puntaje2 guardado correctamente" );
    alert("Puntaje Juego2 guardado satisfactoriamente ")
    router.push('/userPanel')
    
})
.catch((error) => {
    console.error("Error en guardarlos datos: ", error);
});
},
SumarPreguntaJuego2({commit,state}){
  
  commit('setJuego2CantRespondidas',state.Juego2CantRespondidas+1)
}

  },
  modules: {
  },
  getters:{
    existeUsuario(state){
      if(state.usuario === null){
        return false
      }else{
        return true
      }
    }
  }
})
