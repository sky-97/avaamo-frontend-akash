<template>
  <div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-top modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-text">
            <div>
              <h3>Are you sure you want to delete this job?</h3>

             <b-button
                    v-on:click="deleteJob(id)"
                    squared
                    style="
                      background-color: coral;
                      color: white;
                      padding-left: 25px;
                      padding-right: 25px;
                      text-decoration: none;
                    "
                    >Delete</b-button
                  >

                  <b-button
                    @click.stop="$emit('close')"
                    squared
                    style="
                      color: white;
                      padding-left: 25px;
                      padding-right: 25px;
                      text-decoration: none;
                    "
                    >Cancel</b-button
                  >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showSuccess">
      <b-alert show   fade variant="success" style=""
        ><a href="#" class="alert-link">Successfully deleted the job</a>
        <a id="close_btn" @click="goBack" href="">
          <img
            v-b-tooltip.hover
            title="go back to home page "
            id="close_btn_img_delete"
             src="~/assets/close.png"
            alt=""
          /> </a
      ></b-alert>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DelteJob",

  data() {
    return {
      show: true,
      showSuccess: false,
      url: "http://localhost:9000",
    };
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    async deleteJob(id) {
      const config = { headers: { "Content-Type": "application/json" } };
      let resp = await axios.delete(this.url + `/api/jobs/${id}`, config)
      .then((res) => {
         this.showSuccess = true
          console.log(res);
        })
    },

    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.modal {
   font-family: "Oswald";
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.7);
  display: block;
  
}

.modal-dialog  {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-content {
  background: white;
  color: black;
  text-decoration: none;
  text-transform: none;
}

#close_btn_img_delete {
  width: 5%;
  float: right;
}
</style>
