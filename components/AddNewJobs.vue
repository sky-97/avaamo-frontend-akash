<template>
  <div class="container-fluid" style="padding-top: 20px">
    <b-row class="text-center">
      <b-col>
        <b-card
          title="Request details"
          style="text-align: left; min-height: 280px"
        >
          <b-card-text>
            <b-row>
              <b-col cols="4">
                <div style="">
                  <p>Method</p>
                  <ValidationProvider
                    name="Method"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <b-form-select
                      v-model="form.request.method"
                      :options="options"
                    ></b-form-select>
                    <span class="input-invalid-message">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
              </b-col>
              <b-col cols="8">
                <div>
                  <p>EndPoint</p>
                  <div>
                    <ValidationProvider
                      name="Method"
                      v-slot="{ errors }"
                      :rules="{
                        required,
                        url,
                      }"
                    >
                      <b-form-input
                        v-model="form.request.url"
                        placeholder="https://www.google.com"
                      ></b-form-input>
                      <span class="input-invalid-message">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row style="padding-top: 20px">
              <b-col cols="4">
                <div style="">
                  <p>Frequency</p>
                  <b-form-select
                    v-model="form.request_interval_seconds"
                    :options="optionsFreq"
                  ></b-form-select>
                </div>
              </b-col>
              <b-col cols="8">
                <div>
                  <p>Location</p>
                  <div>
                    <b-form-select
                      v-model="form.timezone"
                      :options="optionsLoc"
                    ></b-form-select>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="1"> </b-col>
      <b-col>
        <b-card
          title="Assertions"
          sub-title="We will alert you if your target is unreachable or any assertion fails"
          style="text-align: left; min-height: 280px"
        >
          <b-card-text>
            <b-row>
              <b-col cols="6">
                <div style="">
                  <p>Assertions</p>
                  <b-form-input
                    v-model="form.selectedAssertions"
                    disabled
                  ></b-form-input>
                </div>
              </b-col>
              <b-col cols="2">
                <div style="padding-top: 40px">
                  <b-form-input
                    v-model="form.selectedAssertionsSecond"
                    disabled
                  ></b-form-input>
                </div>
              </b-col>
              <b-col cols="4">
                <div>
                  <p>Value</p>
                  <div>
                    <ValidationProvider
                      name="Status code"
                      v-slot="{ errors }"
                      rules="required"
                    >
                      <b-form-input
                        v-model="form.Value"
                        placeholder="200"
                      ></b-form-input>
                      <span class="input-invalid-message">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    &nbsp;&nbsp;
    <b-row class="text-center">
      <b-col>
        <b-card
          title="Alert recipients"
          style="text-align: left; min-height: 280px"
        >
          <b-card-text>
            <b-row>
              <b-col>
                <div id="app">
                  <div style="cursor: pointer">
                    <p style="float: left" v-on:click="isHidden = false">
                      Email
                    </p>
                    <p
                      style="padding-left: 80px"
                      v-on:click="isHidden = !isHidden"
                    >
                      SMS
                    </p>
                  </div>
                  <div v-if="!isHidden">
                    <p>Email addresses</p>
                    <ValidationProvider
                      name="Status code"
                      v-slot="{ errors }"
                      rules="email"
                    >
                      <b-form-input
                        v-model="form.notifications.emails"
                        placeholder="example@gmail.com"
                      ></b-form-input>
                      <span class="input-invalid-message">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                  <div v-else>
                    <p>Phone numbers</p>
                    <ValidationProvider
                      name="phone number"
                      v-slot="{ errors }"
                      rules="integer"
                    >
                      <b-form-input
                        v-if="isHidden"
                        v-model="form.notifications.phones"
                      ></b-form-input>
                      <span class="input-invalid-message">
                        {{ errors[0] }}
                      </span>
                    </ValidationProvider>
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="1"> </b-col>
      <b-col>
        <b-card
          title="Alert preferences"
          sub-title="Failure Tolerance"
          style="text-align: left; min-height: 280px"
        >
          <b-card-text>
            <b-row>
              <b-col>
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-model="form.alertFirst"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="A"
                    >Send an alert any time there is a problem</b-form-radio
                  >
                  <b-form-radio
                    v-model="form.alertSecond"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="B"
                    >Only send an alert if requests fail
                    continously...</b-form-radio
                  >
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    &nbsp;&nbsp;
    <b-row class="text-center">
      <b-col cols="6">
        <b-card sub-title="Unique name" style="text-align: left">
          <b-card-text>
            <b-row>
              <b-col>
                <div id="app">
                  <ValidationProvider
                    name="name"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <b-form-input
                      v-model="form.name"
                      placeholder="Update content from endpoint"
                    ></b-form-input>
                    <span class="input-invalid-message">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                  <div style="padding-top: 10px">
                    <b-button
                      v-on:click="newJob()"
                      squared
                      style="
                        background-color: coral;
                        color: white;
                        padding-left: 25px;
                        padding-right: 25px;
                        text-decoration: none;
                      "
                      >Save</b-button
                    >
                  </div>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <div v-if="isSuccess">
      <b-alert :max="dismissSecs" show variant="success"
        >{{ message }}
        <a id="close_btn" @click="goBack" href="">
          <img
            v-b-tooltip.hover
            title="go back to home page "
            id="close_btn_img"
            src="~/assets/close.png"
            alt=""
          />
        </a>
      </b-alert>
    </div>
    <div v-if="isError">
      <b-alert :max="dismissSecs" show variant="danger"
        >{{ message }}
        <a id="close_btn" @click="goBack" href="">
          <img
            v-b-tooltip.hover
            title="go back to home page "
            id="close_btn_img"
            src="~/assets/close.png"
            alt=""
          />
        </a>
      </b-alert>
    </div>
    &nbsp;&nbsp;
  </div>
</template>
<script>
import { ValidationProvider } from "vee-validate";
import axios from "axios";
import moment from "moment";

export default {
  name: "AddNewJobs",
  components: {
    ValidationProvider,
  },
  data() {
    return {
            dismissSecs: 10,
      url: "http://localhost:9000/api/jobs/",
      isSuccess: false,
      isError: false,
      message: "",
      form: {
        selectedAssertions: "Response code",
        selectedAssertionsSecond: "=",
        alertFirst: "",
        alertSecond: "",
        status: "",
        name: "",
        timezone: "UTC",
        request: {
          url: "",
          method: "GET",
        },
        notifications: {
          phones: "",
          emails: "",
        },
        request_interval_seconds: "60",
        value: "200",
      },
      isHidden: false,
      options: [
        { value: "GET", text: "GET" },
        { value: "POST", text: "POST" },
      ],
      optionsFreq: [
        { value: "60", text: "60 seconds" },
        { value: "600", text: "600 seconds" },
      ],
      optionsLoc: [
        { value: "UTC", text: "Global(default)" },
        { value: "IST", text: "Indian Standard Time" },
      ],
      optionsAssertions: [{ value: 1, text: "Response Code" }],
      optionsAssertionsSecond: [{ value: 1, text: "=" }],
      optionsEmail: [{ value: 1, text: "alert@example.com" }],
      optionsPhone: [{ value: 1, text: "9684251779" }],
    };
  },
  methods: {
    goBack() {
      return this.$router.back()
    },
    async newJob() {
      let data = {};
      if (this.form.alertFirst.length != null) data["tolerated_failures"] = 1;
      if (this.form.alertFirst.length == null) data["tolerated_failures"] = 10;
      data.enable = true;
      data.status = "status Healthy ";
      data.name = this.form.name;
      data.notifications = this.form.notifications;
      data.timezone = this.form.timezone;
      data.request = this.form.request;
      data.request_interval_seconds = parseInt(
        this.form.request_interval_seconds
      );
      data.created = moment().format();
      const config = { headers: { "Content-Type": "application/json" } };
      let resp = await axios
        .post(this.url, data, config)
        .then((res) => {
          this.message = `created new job ${data.name}`;
          console.log(res);
          this.isSuccess = true;
        })
        .catch(({ response }) => {
          console.log(response);
          if (response.status == 400) {
            this.message = "name already taken";
          } else {
            this.message = response.statusText;
          }

          this.isError = true;
        });
    },
  },
};
</script>
<style scoped>
.card-body {
   font-family: "Oswald";
  padding-bottom: 35px;
}
.input-invalid-message {
  color: red;
}

#close_btn_img {
  width: 5%;
  margin-left: 5px;
  float: right;
}
</style>