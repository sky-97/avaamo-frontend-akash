<template>
  <ValidationObserver v-slot="{ invalid }" ref="formObserver">
    <b-card no-body class="text-center">
      <b-form-group>
        <b-row>
          <b-col sm="4">
            <label for="textarea-small">status:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="status"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.status"
                required
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">name:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="name"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.name"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">phone number:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="mobile number"
              v-slot="{ errors }"
              rules="integer"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.notifications.phones[0]"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">Email:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider name="email" v-slot="{ errors }" rules="email">
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.notifications.emails[0]"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">Timezone:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="timezone"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.timezone"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">Request Url:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="url"
              v-slot="{ errors }"
              :rules="{
                required,
                url,
              }"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                required
                v-model="data.component.request.url"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">Request Method:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="method"
              v-slot="{ errors }"
              rules="required"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.request.method"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">Request interval seconds:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="request interval seconds"
              v-slot="{ errors }"
              :rules="{
                required,
                integer,
              }"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.request_interval_seconds"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
          <b-col sm="4">
            <label for="textarea-small">Tolerated failures:</label>
          </b-col>
          <b-col sm="8">
            <ValidationProvider
              name="tolerated failures"
              v-slot="{ errors }"
              rules="integer"
            >
              <b-form-textarea
                id="textarea-small"
                size="sm"
                v-model="data.component.tolerated_failures"
              ></b-form-textarea>
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </ValidationProvider>
          </b-col>
        </b-row>
        <div id="button">
          <b-button
          squared
           style="
                      background-color: coral;
                      color: white;
                      padding-left: 25px;
                      padding-right: 25px;
                      text-decoration: none;
                    "
            @click="saveForm(data.component)"
            :disabled="invalid"
          >
            save
          </b-button>
        </div>
      </b-form-group>
    </b-card>
    <div v-if="showSuccess">
      <b-alert show variant="success"
        >Successfully updated
        <a id="close_btn" @click="goBack" href="">
          <img
            v-b-tooltip.hover
            title="go back to home page "
            id="close_btn_img_edit"
            src="http://clipart-library.com/images_k/x-png-transparent/x-png-transparent-11.png"
            alt=""
          /> </a
      ></b-alert>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import axios from "axios";
import moment from "moment";
export default {
  name: "EditJob",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      url: "http://localhost:9000",
      showSuccess: false,
    };
  },
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
     /* TODO keep this function in store
    */
    async saveForm(data) {
      data["updated"] = moment().format();
      let item = data;
      const config = { headers: { "Content-Type": "application/json" } };
      let resp = await axios.put(
        this.url + `/api/jobs/${item._id}`,
        item,
        config
      );
      if (resp.status == 200) {
        return (this.showSuccess = true);
      } else if (this.showSuccess) {
        return this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>
#app {
  font-family: "Oswald";
}
.input-invalid-message {
  color: red;
}
#button {
  padding-top: 20px;
}
#close_btn_img_edit {
  width: 5%;
  margin-left: 5px;
  float: right;
}
</style>
