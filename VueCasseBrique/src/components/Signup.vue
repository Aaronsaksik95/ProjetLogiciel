<template>
  <div class="w-50">
    <h1 class="mt-5">Inscription</h1>
    <div class="w-75 mx-auto bg-light p-5 shadow" id="signup">
      <form @submit="formSubmit">
        <div class="form-group">
          <label>Prénom</label>
          <input type="text" class="form-control" v-model="firstName" placeholder="Aaron" />
        </div>
        <div class="form-group">
          <label>Nom</label>
          <input type="text" class="form-control" v-model="lastName" placeholder="Saksik" />
        </div>
        <div class="form-group">
          <label>Pseudo</label>
          <input type="text" class="form-control" v-model="username" placeholder="Aaron99" />
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" class="form-control" v-model="password" placeholder="*********" />
        </div>
        <button type="submit" class="btn btn-info h-25">Inscription</button>
      </form>
      <h6 class="text-info mt-4">{{output}}</h6>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Signup",
  el: "#signup",
  data: function() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      output: "",
      users: []
    };
  },
  mounted(){
    // axios
    //   .get("http://localhost:5000/user/all")
    //   .then(response => (this.users = response.data));
  },
  methods: {
    formSubmit(e) {
      e.preventDefault();
      let currentObj = this;
      axios
        .post("http://localhost:5000/signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          currentObj.output = response.data;
        })
        .catch(function(error) {
          currentObj.output = error;
        });
    }
  }
};
</script>

<style scoped>
</style>
