<template>
    <div>
      <h3> <b-icon icon="alarm-fill"></b-icon>  {{ countdown }}</h3>
    <b-modal ref="modalGameOne" id="modal-lg" size="lg" title="Resultados de Examen"  hide-footer>
        <div>Tu puntaje es: {{puntaje}}</div>
        <div class="row">
          <div></div>
         <!--<router-link to="/userPanel" class="btn btn-danger btn-change-quizz col align-self-end">Salir</router-link>
          --><button @click="guardarPartidaJuegoUno(puntaje)" class="btn btn-danger btn-change-quizz col align-self-end">Salir</button>
        </div>
      </b-modal>  
    </div>
    
</template>

<script>
    import moment from 'moment';
    import {mapActions, mapState} from 'vuex'
    export default {
        name: 'CountDown',
        props: {
            seconds: {
                type: Number,
                required: true,
            },
            puntaje:{
                type:Number
            },
            
        },
        data () {
            return {
                countdown: null,
                expires_in: null,
                interval: null,
            }
        },
        mounted () {
            this.countdown = moment.utc(this.seconds).format('mm:ss');
            this.expires_in = this.seconds;
            this._setInterval();
        },
        destroyed () {
            
            clearInterval(this.interval);
        },
        methods: {
            _setInterval: function() {
                this.interval = setInterval(() => {
                    if (this.expires_in === 0) {
                        this.$refs['modalGameOne'].show()
                        clearInterval(this.interval);
                    } else {
                        this.expires_in -= 1;
                        this.countdown = moment.utc(this.expires_in * 1000).subtract(1, 'seconds').format('mm:ss');
                    }
                }, 1000);
            },
            ...mapActions(['guardarPartidaJuegoUno'])
        }
    }
</script>