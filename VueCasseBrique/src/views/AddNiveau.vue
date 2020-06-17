<template>
  <div class="w-50 mx-auto p-5">
    <h2 class="text-info">Ajouter un niveau</h2>
    <div class="mt-5">
      <router-link class="btn btn-light m-2" to="/">Menu</router-link>
      <router-link class="btn btn-light m-2" to="/users">Liste des users</router-link>
      <router-link class="btn btn-light m-2" to="/admin">Liste des niveaux</router-link>
    </div>
    <div class="d-flex justify-content-around">
      <div class="w-50" v-if="this.user.RoleId == 2">
        <form>
          Couleur
          <div class="d-flex justify-content-around">
            <div class="form-group">
              <label for="exampleInputEmail1">Principal</label>
              <input
                class="form-control"
                type="color"
                v-model="colorMain"
                id="favcolor"
                name="favcolor"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">{{color1}}</label>
              <input
                class="form-control"
                type="color"
                v-model="color1"
                id="favcolor"
                name="favcolor"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">{{color2}}</label>
              <input
                class="form-control"
                type="color"
                v-model="color2"
                id="favcolor"
                name="favcolor"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">{{color3}}</label>
              <input
                class="form-control"
                type="color"
                v-model="color3"
                id="favcolor"
                name="favcolor"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">Vitesse</label>
            <input type="number" v-model="vitesse" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Paddle</label>
            <input type="number" v-model="paddle" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Ligne</label>
            <input type="number" v-model="rowBlock" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Colonne</label>
            <input type="number" v-model="columnBlock" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Balle</label>
            <input type="number" v-model="balle" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">force des blocks</label>
            <input type="number" v-model="strongBlock" class="form-control" />
          </div>
          <button type="submit" v-on:click="submit()" class="btn btn-primary">Ajouter</button>
        </form>
      </div>
      <div v-else>
        <h3 class="mt-5">Accès interdit :</h3>
        <router-link class="nav-link h4 mt-5" to="/">Home ></router-link>
      </div>
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
      colorMain: "",
      color1: "#ffffff",
      color2: "#7d7d7d",
      color3: "#000000",
      vitesse: 3,
      balle: 10,
      paddle: 100,
      rowBlock: 2,
      columnBlock: 11,
      strongBlock: 1,
      getToken: localStorage.getItem("token"),
      output: [],
      user: [],
      prodAdd: []
    };
  },
  async mounted() {
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    async submit() {
      await axios.post("http://localhost:5000/niveau/", {
        colorMain: this.colorMain,
        color1: this.color1,
        color2: this.color2,
        color3: this.color3,
        vitesse: this.vitesse,
        paddle: this.paddle,
        rowBlock: this.rowBlock,
        columnBlock: this.columnBlock,
        balle: this.balle,
        strongBlock: this.strongBlock
      });
    }
  }
};
</script>