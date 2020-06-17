<template>
  <div class="m-2 mt-5">
    <h2 class="text-info">Liste des niveaux</h2>

    <div v-if="this.user.RoleId == 2">
      <router-link class="btn btn-light m-2" to="/">Menu</router-link>
      <router-link class="btn btn-light m-2" to="/addNiveau">Ajouter un niveau</router-link>
      <router-link class="btn btn-light m-2" to="/users">Liste des users</router-link>
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Niveau</th>
            <th scope="col">ColorMain</th>
            <th scope="col">Color1</th>
            <th scope="col">Color2</th>
            <th scope="col">Color3</th>
            <th scope="col">Vitesse</th>
            <th scope="col">Paddle</th>
            <th scope="col">RowBlock</th>
            <th scope="col">ColumnBlock</th>
            <th scope="col">Balle</th>
            <th scope="col">StrongBlock</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">UpdatedAt</th>
            <th scope="col">Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{{niveau1.id}}</th>
            <td
              class="font-weight-bold"
              :style="{color: niveau1.colorMain, width: '20px'} "
            >{{niveau1.colorMain}}</td>
            <td
              class="font-weight-bold"
              :style="{color: niveau1.color1, width: '20px'} "
            >{{niveau1.color1}}</td>
            <td
              class="font-weight-bold"
              :style="{color: niveau1.color2, width: '20px'} "
            >{{niveau1.color2}}</td>
            <td
              class="font-weight-bold"
              :style="{color: niveau1.color3, width: '20px'} "
            >{{niveau1.color3}}</td>
            <td>{{niveau1.vitesse}}</td>
            <td>{{niveau1.paddle}}</td>
            <td>{{niveau1.rowBlock}}</td>
            <td>{{niveau1.columnBlock}}</td>
            <td>{{niveau1.balle}}</td>
            <td>{{niveau1.strongBlock}}</td>
            <td>{{niveau1.createdAt}}</td>
            <td>{{niveau1.updatedAt}}</td>
            <td>
              <router-link
                class="btn btn-warning"
                :to="{path: '/updateNiveau/'+ niveau1.id}"
              >Modifier</router-link>
            </td>
          </tr>
          <tr v-for="niveau in niveaux" :key="niveau.id">
            <th scope="row">{{niveau.id}}</th>
            <td
              class="font-weight-bold"
              :style="{color: niveau.colorMain, width: '20px'} "
            >{{niveau.colorMain}}</td>
            <td
              class="font-weight-bold"
              :style="{color: niveau.color1, width: '20px'} "
            >{{niveau.color1}}</td>
            <td
              class="font-weight-bold"
              :style="{color: niveau.color2, width: '20px'} "
            >{{niveau.color2}}</td>
            <td
              class="font-weight-bold"
              :style="{color: niveau.color3, width: '20px'} "
            >{{niveau.color3}}</td>
            <td>{{niveau.vitesse}}</td>
            <td>{{niveau.paddle}}</td>
            <td>{{niveau.rowBlock}}</td>
            <td>{{niveau.columnBlock}}</td>
            <td>{{niveau.balle}}</td>
            <td>{{niveau.strongBlock}}</td>
            <td>{{niveau.createdAt}}</td>
            <td>{{niveau.updatedAt}}</td>
            <td>
              <router-link
                class="btn btn-warning"
                :to="{path: '/updateNiveau/'+ niveau.id}"
              >Modifier</router-link>
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
      niveaux: [],
      niveau1: [],
      user: [],
      getToken: localStorage.getItem("token")
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/niveau/all")
      .then(response => (this.niveaux = response.data));
    axios
      .get("http://localhost:5000/niveau/1")
      .then(response => (this.niveau1 = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  }
};
</script>
