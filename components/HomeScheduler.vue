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
          <b-form-input size="sm" style="width:250px" class="mr-sm-2" type="text" v-model="search"  placeholder="Filter by name or monitor id"></b-form-input>  
        </b-nav-form>
    </b-col>
    <b-col>
         <NuxtLink to="/add"><img  style="width:12%; margin-left:180px" src="~/assets/add.png"/></NuxtLink>
      
    </b-col>
  </b-row>
<div style="">
        <b-row v-for="item in filteredList" :key="item.id" style="border-bottom: 0.5px solid lightgrey; padding-bottom:10px">
    <b-col style="width: 50%; margin: 0 auto; text-align: left">
    <div style="padding-top:20px">
      
       <h6 style="text-aligin:left !important">
      <img style="width:5%; margin-left:5px" src="~/assets/correct.png" />  {{ item.name }}
     </h6>
    </div>
    </b-col>
    <b-col style="padding-top:20px">
        <div >
          {{ item.status }}
          <!-- <div v-if="enable">
 <a href="#"  v-on:click="pauseAndplay">
          <img style="width:5%; margin-left:5px" src="~/assets/iconfinder_icon-pause_211871.png" />
           </a>
</div>
<div v-else>
 <a href="#"  v-on:click="pauseAndplay">
          <img style="width:5%; margin-left:5px" src="~/assets/play.png" />
           </a>
</div> -->
           
            <a href="#"  v-on:click="clickHandler">
          <img style="width:5%;  margin-left:5px" src="~/assets/copy.png" />
            </a>
             <a href="#"  v-on:click="clickHandler">

          <img style="width:5%;  margin-left:5px" src="~/assets/trash-can.png" />
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
       enable : true,
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
    },
    pauseAndplay (){
      this.enable = !this.enable
      console.log(`"You clicked the pauseandplay!${this.enable}`);
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
  background-color:  rgb(251, 251, 252);
}
.title {
  color: rgb(37, 150, 190) !important;
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
