<template>
  <div class="container">
    <input v-model="msg">
    <button @click="socket.emit('msg', msg)">send</button>
    <br/>
    <textarea v-model="resps"></textarea>
  </div>
</template>

<script>
export default {
  head: {
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js'},
    ],
  },
  data () {
    return {
      socket: null,
      msg: 'wwJd',
      resps: '',
    }
  },
  mounted () {
    this.$axios.$get('http://localhost:5000/api/jobs')
      .then(resp => {
        this.socket = io()
      })
  },
}
</script>