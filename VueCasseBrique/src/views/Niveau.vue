<template>
  <div>
    <div v-if="this.user.RoleId" class="w-75 mx-auto">
      <h1 class="mt-5">Les Niveaux</h1>
      <div class="d-flex">
        <div class="mt-5">
          <router-link class="btn btn-light m-5" to="/">
            <h1 class="m-0 text-info">M</h1>
            <h1 class="m-0">E</h1>
            <h1 class="m-0">N</h1>
            <h1 class="m-0">U</h1>
          </router-link>
        </div>
        <div class="flex-wrap d-flex mx-auto justify-content-around m-5">
          <div class="card p-0 m-2 col-3 shadow mt-5 mb-2 rounded">
            <router-link :to="{path: '/game/1'}">
              <img src="../assets/Image/1.png" class="card-img-top" alt="..." />
            </router-link>

            <div class="card-body">
              <h5 class="card-title">
                <router-link class="text-info" :to="{path: '/game/1'}">Niveau 1</router-link>
              </h5>
            </div>
          </div>
          <div
            v-for="niveau in niveaux"
            :key="niveau.id"
            class="card p-0 m-2 col-3 shadow mt-5 mb-2 rounded"
          >
            <router-link v-if="niveauId.includes(niveau.id - 1)" :to="{path: '/game/' + niveau.id}">
              <img
                :src="require(`../assets/Image/${niveau.id}.png`)"
                class="card-img-top"
                alt="..."
              />
            </router-link>
            <img
              v-else
              :src="require(`../assets/Image/${niveau.id}.png`)"
              class="card-img-top"
              alt="..."
            />

            <div class="card-body">
              <h5 v-if="niveauId.includes(niveau.id - 1)" class="card-title">
                <router-link
                  class="text-info"
                  :to="{path: '/game/' + niveau.id}"
                >Niveau {{niveau.id}}</router-link>
              </h5>
              <div v-else>
                <h5 class="text-danger">Niveau {{niveau.id}}</h5>
                <img class="img" src="../assets/lock.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="w-75 mx-auto">
      <h1 class="mt-5">Les Niveaux</h1>
      <router-link class="btn btn-light m-5" to="/authentication">
        <h3 class="m-0">
          <span class="text-info">C</span>ONNEXION
        </h3>
      </router-link>
      <router-link class="btn btn-light m-5" to="/">
        <h3 class="m-0">
          <span class="text-info">M</span>ENU
        </h3>
      </router-link>
      <div class="d-flex">
        <div class="mt-5"></div>
        <div class="flex-wrap d-flex mx-auto justify-content-around m-5">
          <div class="card p-0 m-2 col-3 shadow mt-5 mb-2 rounded">
            <img src="../assets/Image/1.png" class="card-img-top" alt="..." />

            <div class="card-body">
              <h5 class="card-title">Niveau 1</h5>
            </div>
          </div>
          <div
            v-for="niveau in niveaux"
            :key="niveau.id"
            class="card p-0 m-2 col-3 shadow mt-5 mb-2 rounded"
          >
            <img :src="require(`../assets/Image/${niveau.id}.png`)" class="card-img-top" alt="..." />

            <div class="card-body">
              <h5 class="card-title">Niveau {{niveau.id}}</h5>
            </div>
          </div>
        </div>
      </div>
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
      output: [],
      niveaux: [],
      avancement: [],
      niveauId: [],
      niveau1: []
    };
  },
  computed: {},
  async mounted() {
    await axios
      .get("http://localhost:5000/niveau/all")
      .then(response => (this.niveaux = response.data));
    await axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
      console.log('role', this.user.RoleId)
    await axios
      .get("http://localhost:5000/niveau/1")
      .then(response => (this.niveau1 = response.data));
    await axios
      .get("http://localhost:5000/avancement/" + this.user.id)
      .then(response => (this.avancement = response.data));
    console.log(this.avancement[0]);
    for (var i = 0; i < this.avancement.length; i++) {
      this.niveauId.push(this.avancement[i].NiveauId);
    }
  },
  methods: {}
};
</script>
<style scoped>
.img {
  width: 20px;
}
</style>