<template>
    
    <h3> <b-icon icon="alarm-fill"></b-icon>  {{ countup }}</h3>

</template>

<script>
    import moment from 'moment';
    export default {
        name: 'CountUp',
        props: {
            seconds: {
                type: Number,
                required: true,
            }
        },
        data () {
            return {
                countup: null,
                expires_in: null,
                interval: null,
            }
        },
        mounted () {
            this.countup = moment.utc(this.seconds).format('mm:ss');
            this.expires_in = this.seconds;
            this._setInterval();
        },
        destroyed () {
            clearInterval(this.interval);
        },
        methods: {
            _setInterval: function() {
                this.interval = setInterval(() => {
                    if (this.expires_in === 7200) {
                        clearInterval(this.interval);
                    } else {
                        this.expires_in += 1;
                        this.countup = moment.utc(this.expires_in * 1000).add(1, 'seconds').format('mm:ss');
                    }
                }, 1000);
            },
        }
    }
</script>