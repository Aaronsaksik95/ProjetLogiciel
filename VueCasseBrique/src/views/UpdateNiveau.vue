<template>
  <div class="w-50 mx-auto p-5">
    <h2 class="text-info">Modifier le niveau {{niveau.id}}</h2>
    <div class="">
      <div class="mt-5">
        <div class="mt-5">
        <router-link class="btn btn-light m-2" to="/">Menu</router-link>
        <router-link class="btn btn-light m-2" to="/addNiveau">Ajouter un niveau</router-link>
        <router-link class="btn btn-light m-2" to="/users">Liste des users</router-link>
        <router-link class="btn btn-light m-2" to="/admin">Liste des niveaux</router-link>
      </div>
      </div>
      <div class="w-75 mx-auto" v-if="this.user.RoleId == 2">
        <form>
          Couleur
          <div class="d-flex justify-content-around">
            <div class="form-group">
              <label for="exampleInputEmail1">Principal</label>
              <input
                class="form-control"
                type="color"
                v-model="niveau.colorMain"
                id="favcolor"
                name="favcolor"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">color1</label>
              <input
                class="form-control"
                type="color"
                v-model="niveau.color1"
                id="favcolor"
                name="favcolor"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">color2</label>
              <input
                class="form-control"
                type="color"
                v-model="niveau.color2"
                id="favcolor"
                name="favcolor"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">color3</label>
              <input
                class="form-control"
                type="color"
                v-model="niveau.color3"
                id="favcolor"
                name="favcolor"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">Vitesse</label>
            <input type="number" v-model="niveau.vitesse" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Paddle</label>
            <input type="number" v-model="niveau.paddle" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Ligne</label>
            <input type="number" v-model="niveau.rowBlock" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Colonne</label>
            <input type="number" v-model="niveau.columnBlock" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Balle</label>
            <input type="number" v-model="niveau.balle" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">force des blocks</label>
            <input type="number" v-model="niveau.strongBlock" class="form-control" />
          </div>
          <button type="submit" v-on:click="submit()" class="btn btn-primary">Modifier</button>
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
      niveau: [],
      getToken: localStorage.getItem("token"),
      output: [],
      user: []
    };
  },
  async mounted() {
    axios
      .get("http://localhost:5000/niveau/" + this.$route.params.id)
      .then(response => (this.niveau = response.data));
    axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
  },
  methods: {
    async submit() {
      await axios.put("http://localhost:5000/niveau/" + this.$route.params.id, {
        colorMain: this.niveau.colorMain,
        color1: this.niveau.color1,
        color2: this.niveau.color2,
        color3: this.niveau.color3,
        vitesse: this.niveau.vitesse,
        paddle: this.niveau.paddle,
        rowBlock: this.niveau.rowBlock,
        columnBlock: this.niveau.columnBlock,
        balle: this.niveau.balle,
        strongBlock: this.niveau.strongBlock
      });
      window.location.href = "/admin";
    }
  }
};
</script>