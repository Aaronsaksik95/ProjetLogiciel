<template>
  <div class="w-50 mx-auto p-5">
    <h2 class="text-info">Modifier le compte de {{theUser.username}}</h2>

    <div v-if="this.user.RoleId == 2">
      <div class="mt-5">
        <router-link class="btn btn-light m-2" to="/">Menu</router-link>
        <router-link class="btn btn-light m-2" to="/addNiveau">Ajouter un niveau</router-link>
        <router-link class="btn btn-light m-2" to="/users">Liste des users</router-link>
        <router-link class="btn btn-light m-2" to="/admin">Liste des niveaux</router-link>
      </div>
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
        <div class="form-group">
          <label>Role</label>
          <input type="number" class="form-control" v-model="theUser.RoleId" />
        </div>
        <button type="submit" v-on:click="updateProf()" class="btn btn-info">Modifier</button>
      </form>
    </div>
    <div v-else>
      <h3 class="mt-5">Accès interdit :</h3>
      <router-link class="nav-link h4 mt-5" to="/">Home ></router-link>
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
    async updateProd() {
      await axios.put("http://localhost:5000/user/" + this.$route.params.id, {
        firstName: this.theUser.firstName,
        lastName: this.theUser.lastName,
        username: this.theUser.username,
        RoleId: this.theUser.RoleId
      });
      window.location.href = "/users";
    }
  }
};
</script>