<template>
  <b-container>
    
   <AddNewJobs />
  </b-container>
</template>

<script>
import AddNewJobs from "../../components/AddNewJobs"
export default {
  components : {
    AddNewJobs,
  }
  // head: {
  //   script: [
  //     {src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js'},
  //   ],
  // },
  // data () {
  //   return {
  //     socket: null,
  //     msg: 'wwJd',
  //     resps: '',
  //   }
  // },
  // mounted () {
  //   this.$axios.$get('http://localhost:5000/api/jobs')
  //     .then(resp => {
  //       this.socket = io()
  //     })
  // },
}
</script>