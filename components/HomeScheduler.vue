<template>
  <b-container fluid="lg" class="container">
    <b-jumbotron style="min-width: 80%; max-width: 80%">
      <div v-if="success">
        <b-alert max="3" show variant="success"
          >{{ message }} Successfully ran</b-alert
        >
      </div>
      <h3 class="title">SCHEDULER</h3>

      <!-- <hr class="my-4"> -->
      <b-row>
        <b-col>
          <b-nav-form style="padding-top: 20px">
            <b-form-input
              size="sm"
              style="width: 250px"
              class="mr-sm-2"
              type="text"
              v-model="search"
              placeholder="Filter by name or monitor id"
            ></b-form-input>
          </b-nav-form>
        </b-col>
        <b-col>
          <NuxtLink to="/add"
            ><img style="width: 12%; margin-left: 180px" src="~/assets/add.png"
          /></NuxtLink>
        </b-col>
      </b-row>
      <div style="">
        <b-row
          v-for="item in filteredList()"
          :key="item.id"
          style="border-bottom: 0.5px solid lightgrey; padding-bottom: 10px"
        >
          <b-col style="width: 50%; margin: 0 auto; text-align: left">
            <div style="padding-top: 20px">
              <h6
                v-b-tooltip.hover
                title="view this job "
                @click="modalOpensForView(item)"
                style="text-aligin: left !important; cursor: pointer"
              >
                <img
                  v-if="!item.trigger"
                  style="width: 5%; margin-left: 5px"
                  src="~/assets/correct.png"
                />
                <img
                  v-else
                  style="width: 5%; margin-left: 5px"
                  src="https://freepngimg.com/thumb/red_cross_mark/3-2-red-cross-mark-png.png"
                  alt=""
                />
                {{ item.name }}
              </h6>
            </div>
          </b-col>
          <b-col style="padding-top: 20px">
            <div style="padding-top: 20px">
              <span v-if="item.updated">
                {{ moment(item.updated).fromNow(true) }}
              </span>
              <span v-else> {{ moment(item.created).fromNow(true) }} </span>

              <span v-if="item.enable">
                <a href="#" v-on:click="pauseAndplay(item._id, item)">
                  <img
                    v-b-tooltip.hover
                    title="Pause the job"
                    style="width: 5%; margin-left: 5px"
                    src="~/assets/iconfinder_icon-pause_211871.png"
                  />
                </a>
              </span>
              <span v-else>
                <a href="#" v-on:click="pauseAndplay(item._id, item)">
                  <img
                    v-b-tooltip.hover
                    title="Resume the job"
                    style="width: 5%; margin-left: 5px"
                    src="~/assets/play.png"
                  />
                </a>
              </span>

              <a href="#">
                <img
                  @click="modalOpensForEdit(item)"
                  v-b-tooltip.hover
                  title="edit this job "
                  style="width: 5%; margin-left: 5px"
                  src="~/assets/copy.png"
                />
              </a>

              <a href="#" @click="clickHandler(item._id)">
                <img
                  v-b-tooltip.hover
                  title="delete this job"
                  style="width: 5%; margin-left: 5px"
                  src="~/assets/trash-can.png"
                />
              </a>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-jumbotron>
    <ViewSingleJob
      v-if="modalOpen"
      :edit="edit"
      :component="component"
      @close="modalOpen = false"
    />
    <DelteJob
      v-if="modalDeleteOpen"
      :id="id"
      @close="modalDeleteOpen = false"
    />
  </b-container>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
import moment from "moment";
import ViewSingleJob from "./ViewSingleJob";
import DelteJob from "./DeleteJob";
export default {
  name: "HomeScheduler",
  components: {
    ViewSingleJob,
    DelteJob,
  },
  data() {
    return {
      data: [
        {
          tolerated_failures: null,
          enable: true,
          _id: "6009976d713cf80a786c1eb4",
          status: "Healthy 10min ago",
          name: "Update content",
          notifications: {
            phones: ["9686848226"],
            emails: ["akash@gmail.com"],
          },
          timezone: "UTC",
          request: { url: "https://amazon.in", method: "GET" },
          request_interval_seconds: 60,
          created: "2021-01-12T14:55:15.000Z",
          __v: 0,
          updated: "2021-01-23T07:39:54.000Z",
        },
      ],
      search: "",
      enable: true,
      url: "http://localhost:9000",
      moment: moment,
      modalOpen: false,
      component: "",
      edit: false,
      message: "",
      success: false,
      dismissSecs: 10,
      modalDeleteOpen: false,
      id: "",
    };
  },
  // calling socket when page is mounted
  mounted() {
    /* TODO keep all socket in store mutation
     */
    this.socket = io("http://localhost:9000");
    this.socket.on("event", (job) => {
      this.data = job;
    });

    this.socket.on("newJob", (job) => {
      this.data.push(job);
    });
    this.socket.on("updateJob", (job) => {
      this.data = job;
    });
    this.socket.on("sendGoodStatus", (message) => {
      console.log(message);
      this.success = true;
      this.message = message;
    });
    this.socket.on("deleteJob", (job) => {
      this.data = job;
    });
  },

  methods: {
    // when useer search this method is triggered to filter out the desire output
    filteredList() {
      return this.data.filter((post) => {
        return post.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    // opens the view modal on click
    modalOpensForView(item) {
      this.component = item;
      this.modalOpen = true;
      this.edit = false;
    },
    // opens the edit modal on click
    modalOpensForEdit(item) {
      this.component = item;
      this.modalOpen = true;
      this.edit = true;
    },
    // opens the delete modal on click
    clickHandler(id) {
      this.id = id;
      this.modalDeleteOpen = true;
    },
    /* TODO keep this function in store
     */
    // update the document when pause or play is button is clicked
    async pauseAndplay(id, item) {
      item["updated"] = moment().format();
      item["enable"] = !item.enable;
      let data = item;
      const config = { headers: { "Content-Type": "application/json" } };
      let resp = await axios.put(this.url + `/api/jobs/${id}`, data, config);
    },
  },
};
</script>

<style scoped>
.container {
  font-family: "Oswald";
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.text-center {
  background-color: rgb(251, 251, 252);
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
