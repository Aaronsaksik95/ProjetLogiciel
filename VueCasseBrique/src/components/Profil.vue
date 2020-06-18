<template>
  <div class="w-50 mx-auto">
    <h1 class="mt-5">Mon profil</h1>
    <div class="w-100 bg-light p-5 mx-auto shadow">
      <form>
        <div class="form-group">
          <label>Prénom</label>
          <input type="text" class="form-control" v-model="theUser.firstName" />
        </div>
        <div class="form-group">
          <label>Nom</label>
          <input type="text" class="form-control" v-model="theUser.lastName" />
        </div>
        <div class="form-group">
          <label>Pseudo</label>
          <input type="text" class="form-control" v-model="theUser.username" />
        </div>
        <button type="submit" v-on:click="updateProf()" class="btn btn-info">Modifier</button>
      </form>
    </div>
    <div class="p-4 mx-auto d-flex justify-content-center">
      <button class="btn btn-danger shadow mr-3" v-on:click="DeleteUser(theUser.id)">Supprimer mon profil.</button>
      <router-link class="btn btn-light" to="/logout">Deconnexion</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      theUser: [],
      user: [],
      getToken: localStorage.getItem("token"),
      output: []
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user/" + this.$route.params.id)
      .then(response => (this.theUser = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    async updateProf() {
      await axios.put("http://localhost:5000/user/" + this.$route.params.id, {
        firstName: this.theUser.firstName,
        lastName: this.theUser.lastName,
        username: this.theUser.username,
        RoleId: 1
      });
    },
    async DeleteUser(id) {
      axios.delete("http://localhost:5000/avancement/" + id)
      axios.delete("http://localhost:5000/audio/" + id)
      axios.delete("http://localhost:5000/user/" + id);
      window.location.href = "/logout";
    }
  }
};
</script>
