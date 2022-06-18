<template>
  <div id="app" >
    <div class="contenedor_logo">
      <img src="../src/assets/LOGO1.png" alt="" id="logo1">
    
    </div>
    <router-view/>
  </div>
</template>


<style>
#logo1 {
  width: 250px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: linear-gradient(90deg, #f12711, #f5af19);
  min-height: 100vh;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;

}

@media only screen and (max-width: 767px){

.contenedor_logo{
  display:flex; 
  justify-content: center;
}
}

@media only screen and (max-width: 359px){

.contenedor_logo{
  display:flex; 
  justify-content: center;
  
}
#logo1{
  width: 180px;
}
}

</style>
