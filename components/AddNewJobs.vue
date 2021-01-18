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
                  <b-form-select
                    v-model="selected"
                    :options="options"
                  ></b-form-select>
                </div>
              </b-col>
              <b-col cols="8">
                <div>
                  <p>EndPoint</p>
                  <div>
                    <b-form-input
                      v-model="text"
                      placeholder="https://www.google.com"
                    ></b-form-input>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row style="padding-top: 20px">
              <b-col cols="4">
                <div style="">
                  <p>Frequency</p>
                  <b-form-select
                    v-model="selectedFreq"
                    :options="optionsFreq"
                  ></b-form-select>
                </div>
              </b-col>
              <b-col cols="8">
                <div>
                  <p>Location</p>
                  <div>
                    <b-form-select
                      v-model="selectedLoc"
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
                  <b-form-select
                    v-model="selectedAssertions"
                    disabled
                    :options="optionsAssertions"
                  ></b-form-select>
                </div>
              </b-col>
              <b-col cols="2">
                <div style="padding-top: 40px">
                  <b-form-select
                    v-model="selectedAssertionsSecond"
                    disabled
                    :options="optionsAssertionsSecond"
                  ></b-form-select>
                </div>
              </b-col>
              <b-col cols="4">
                <div>
                  <p>Value</p>
                  <div>
                    <b-form-input
                      v-model="text"
                      disabled
                      placeholder="200"
                    ></b-form-input>
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
                    <b-form-select
                      v-model="selectedEmail"
                      :options="optionsEmail"
                    ></b-form-select>
                  </div>
                  <div v-else>
                    <p>Phone numbers</p>
                    <b-form-select
                      v-if="isHidden"
                      v-model="selectedPhone"
                      :options="optionsPhone"
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
          title="Alert preferences"
          sub-title="Failure Tolerance"
          style="text-align: left; min-height: 280px"
        >
          <b-card-text>
            <b-row>
              <b-col>
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-model="selectedFailure"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="A"
                    >Send an alert any time there is a problem</b-form-radio
                  >
                  <b-form-radio
                    v-model="selected"
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
        <b-card
        sub-title="Unique name"
          style="text-align: left;"
        >
          <b-card-text>
            <b-row>
              <b-col>
                <div id="app">
 <b-form-input
                      v-model="name"
                      placeholder="Update content from endpoint"
                    ></b-form-input>

                   <div style="padding-top:10px">
                        <b-button v-on:click="newJob()" squared style="background-color:coral;color:white; padding-left:25px;padding-right:25px;text-decoration:none">Button</b-button>
                   </div>
                </div>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
     &nbsp;&nbsp;
  </div>
</template>
<script>
export default {
  name: "AddNewJobs",
  data() {
    return {
      isHidden: false,
      selected: "GET",
      selectedFreq: "1",
      selectedLoc: "1",
      selectedAssertions: "1",
      selectedAssertionsSecond: "1",
      selectedEmail: "1",
      selectedPhone: "1",
      selectedFailure: "A",
      text: "",
      name : "",
      options: [
        { value: 'GET', text: "GET" },
        { value: 'POST', text: "POST" },
      ],
      optionsFreq: [
        { value: 1, text: "60 seconds" },
        { value: 2, text: "600 seconds" },
      ],
      optionsLoc: [
        { value: 1, text: "Global(default)" },
        { value: 2, text: "Indian Standard Time" },
      ],
      optionsAssertions: [{ value: 1, text: "Response Code" }],
      optionsAssertionsSecond: [{ value: 1, text: "=" }],
      optionsEmail: [{ value: 1, text: "alert@example.com" }],
      optionsPhone: [{ value: 1, text: "9684251779" }],
    };
  },
  methods : {
      newJob () {
         var obj = {
    key1: this.selected,
};
         
         console.log(data);

      }
  }
};
</script>
<style scoped>
.card-body {
  padding-bottom: 35px;
}
</style>