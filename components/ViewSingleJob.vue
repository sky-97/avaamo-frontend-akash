<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-top modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-text">
            <div>
             
               <a id="close_btn" @click.stop="$emit('close')" href="">
                  <img id="close_btn_img"  src="~/assets/close.png" alt="">
              </a>
              <b-jumbotron header="Job description" header-level="5">
                
                <b-container fluid v-if="!edit">
                  <b-card class="text-center">
                    <div class="">
                      <b-row>
                        <b-col md="6">status</b-col>
                        <b-col md="6">{{ component.status }}</b-col>

                        <b-col md="6">name</b-col>
                        <b-col md="6">{{ component.name }}</b-col>

                        <b-col md="6">timezone</b-col>
                        <b-col md="6">{{ component.timezone }}</b-col>

                        <b-col md="6">request interval seconds</b-col>
                        <b-col md="6">{{
                          component.request_interval_seconds
                        }}</b-col>

                        <b-col md="6">created</b-col>
                        <b-col md="6">{{ component.created }}</b-col>

                        <div v-if="component.update">
                          <b-col md="6">updated</b-col>
                          <b-col md="6">{{ component.updated }}</b-col>
                        </div>

                        <b-col md="6">url</b-col>
                        <b-col md="6">{{ component.request.url }}</b-col>

                        <b-col md="6">method</b-col>
                        <b-col md="6">{{ component.request.method }}</b-col>

                        <b-col md="6">enable</b-col>
                        <b-col md="6">{{ component.enable }}</b-col>
                      </b-row>
                    </div>
                  </b-card>
                </b-container>
                  <b-container fluid v-else>
                    <EditJob :data={component} />
                  </b-container>
              </b-jumbotron>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditJob from './EditJob'
export default {
  name: "ViewSingleJob",
  components : {
EditJob
  },
  data(){
      return {
           show: true,
           form: {
          status: '',
          name: '',
          timezone: null,
         request : { 
              url : "",
              method : ""
         },
         request_interval_seconds : ""  

        },
      }
  },
  props: {
    component: {
      type: Object,
      required: true,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>

<style  >
.modal {
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.7);
  display: block;
  font-family: "Oswald";
}

.modal-content {
  background: white;
  color: black;
  text-decoration: none;
  text-transform: none;
}



#close_btn_img{
  margin-top:  50px;
  width: 15%;
   float:  right;
}


</style>
