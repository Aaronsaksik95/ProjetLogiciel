// localStorage.getItem('YourItem')
// localStorage.removeItem('YourItem')
<template>
  <div class="w-50">
    <h1 class="mt-5">Connexion</h1>
    <div class="w-75 mx-auto bg-light p-5 shadow" id="login">
      <form @submit="formSubmit">
        <div class="form-group">
          <label>Pseudo</label>
          <input type="text" class="form-control" v-model="username" placeholder="Aaron99" />
        </div>
        <div class="form-group">
          <label>Mot de passe</label>
          <input type="password" class="form-control" v-model="password" placeholder="*********" />
        </div>
        <button type="submit" class="btn btn-info h-25">Connexion</button>
      </form>
      <h6 class="text-info mt-4">{{info}}</h6>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  el: "#login",
  data: function() {
    return {
      username: "",
      password: "",
      token: "",
      info: "",
      theUser: [],
      user: [],
      getToken: localStorage.getItem("token")
    };
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
  watch: {
    token(newToken) {
      localStorage.token = newToken;
    }
  },
  methods: {
    async formSubmit(e) {
      localStorage.removeItem("token");
      e.preventDefault();
      let currentObj = this;
      await axios
        .post("http://localhost:5000/login/", {
          username: this.username,
          password: this.password
        })
        .then(function(response) {
          (currentObj.token = response.data[0].token),
            (currentObj.info = response.data[1].info);
        })
        .catch(function(error) {
          currentObj.token = error;
        });
      axios
        .get("http://localhost:5000/profile?secret_token=" + this.getToken)
        .then(response => (this.user = response.data.user));

      window.location.href = "/";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
