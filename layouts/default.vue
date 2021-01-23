<template>
  <div>
    <Navbar />
    <Nuxt />
      <Footer />
  
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { mapMutations } from 'vuex'
export default {
  components : {
    Navbar,
    Footer,
  },
  computed : {
      ...mapMutations([
      'SOCKET_CONNECT', // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      'SOCKET_MESSAGECHANNEL' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
  }
}
</script>
<style>
html {
   font-family: "Oswald";
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}


</style>
