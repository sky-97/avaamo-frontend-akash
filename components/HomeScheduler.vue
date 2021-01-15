<template>
  <b-container fluid="lg" class="container">
     <b-jumbotron style="min-width: 80%;
  max-width: 80%;">
   <h3  class="title">
     SCHEDULER
   </h3> 

    <!-- <hr class="my-4"> -->
     <b-row>
    <b-col>
      <b-nav-form style="padding-top:20px">
          <b-form-input size="sm" class="mr-sm-2" type="text" v-model="search"  placeholder="Search"></b-form-input>  
        </b-nav-form>
    </b-col>
    <b-col>
         <NuxtLink to="/add"><img  style="width:12%" src="https://www.freepnglogos.com/uploads/plus-icon/icon-symbol-plus-vector-graphic-pixabay-34.png"/></NuxtLink>
      
    </b-col>
  </b-row>
<div>
        <b-row v-for="item in filteredList" :key="item.id">
    <b-col style="width: 50%; margin: 0 auto; text-align: left">
    <div style="padding-top:20px">
      <!-- <b-image src="https://www.freepnglogos.com/uploads/plus-icon/icon-symbol-plus-vector-graphic-pixabay-34.png" fluid alt="Responsive image"/> -->
       <h6 style="text-aligin:left !important">
        {{ item.name }}
     </h6>
    </div>
    </b-col>
    <b-col style="padding-top:20px">
        <div >
          {{ item.status }}
           <a href="#"  v-on:click="clickHandler">
          <img style="width:5%; margin-left:5px" src="https://www.flaticon.com/svg/vstatic/svg/151/151859.svg?token=exp=1610714704~hmac=6ebd49167f2baf73641caa96dae89f30" />
           </a>
            <a href="#"  v-on:click="clickHandler">
          <img style="width:5%;  margin-left:5px" src="https://www.flaticon.com/svg/vstatic/svg/860/860763.svg?token=exp=1610714807~hmac=6f8ab002387734ce3cca35810a7fe851" />
            </a>
             <a href="#"  v-on:click="clickHandler">

          <img style="width:5%;  margin-left:5px" src="https://www.flaticon.com/svg/vstatic/svg/1345/1345874.svg?token=exp=1610714762~hmac=e9b3c7361b246e80e287018b72ae7e2d" />
             </a>

        </div>
        
    </b-col>
  </b-row>
  </div>
  </b-jumbotron>
</b-container>
 
</template>

<script>
export default {
    name : 'HomeScheduler',
data() {
    return {
      data: [],
       search: '',
    }
  },

    async fetch() {
      this.data = await fetch(
        'http://localhost:5000/api/jobs'
      ).then(res => res.json())
    },
      computed: {
    filteredList() {
      return this.data.filter(post => {
        return post.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
      methods: {
    clickHandler () {
      console.log("You clicked the button!");
    }
  }

    }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
}
.text-center {
  background-color:  #D3D3D3;
}
.title {
  color: skyblue !important;
  text-align: left;
  font-size: 2rem !important;
  font-weight: bold !important;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
