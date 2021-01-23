import axios from "axios";

export const strict = true;

let  url =  "http://localhost:9000"

export const state = () => ({});

export const getters = {};

export const actions = {
    async updateJob({ data} ) {
        const config = { headers: { "Content-Type": "application/json" } };
      

        // let resp = await axios.put(url + `/api/jobs/${id}`, data, config);
       
        // return resp
    }
}

export const mutations = {};