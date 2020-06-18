<template>
  <div class="m-2 mt-5">
    <h2 class="text-info">Liste des Utilisateurs</h2>

    <div v-if="this.user.RoleId == 2">
      <div class="mt-5">
        <router-link class="btn btn-light m-2" to="/">Menu</router-link>
        <router-link class="btn btn-light m-2" to="/addNiveau">Ajouter un niveau</router-link>
        <router-link class="btn btn-light m-2" to="/admin">Liste des niveaux</router-link>
      </div>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">UserName</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Role</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">UpdatedAt</th>
            <th scope="col">Supprimer</th>
            <th scope="col">Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{user.id}}</th>
            <td>{{user.username}}</td>
            <td>{{user.firstName}}</td>
            <td>{{user.lastName}}</td>
            <td>{{user.RoleId}}</td>
            <td>{{user.createdAt}}</td>
            <td>{{user.updatedAt}}</td>
            <td>
              <Button v-on:click="DeleteUser(user.id)" class="btn btn-danger">Supprimer</Button>
            </td>
            <td>
              <router-link class="btn btn-warning" :to="{path: '/updateUser/'+ user.id}">Modifier</router-link>
            </td>
          </tr>
        </tbody>
      </table>
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
  name: "Produits",
  el: "#produits",
  data: function() {
    return {
      users: [],
      user: [],
      getToken: localStorage.getItem("token")
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/user/all")
      .then(response => (this.users = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    async DeleteUser(id) {
      axios.delete("http://localhost:5000/avancement/" + id)
      axios.delete("http://localhost:5000/audio/" + id)
      axios.delete("http://localhost:5000/user/" + id);
      document.location.reload(true);
    }
  }
};
</script>
