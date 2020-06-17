<template>
  <div class="home">
    <nav class="w-25 mx-auto">
      <router-link
        v-if="this.user.RoleId"
        class="a d-block p-4 m-2 shadow d-flex justify-content-between bg-info border-0"
        :to="{path: '/compte/'+ user.id}"
      >
        <div>
          <h5 class="text-light">{{theUser.username}}</h5>
          <small v-if="score" class="font-weight-bold text-dark">Score total: {{score}}</small>
        </div>
        <img class="img" src="../assets/user.png" alt />
      </router-link>
      <router-link
        v-else
        class="d-block p-4 m-2 shadow d-flex justify-content-between bg-info border-0"
        to="/authentication"
      >
        <h5 class="text-light">Connexion</h5>
        <img class="img" src="../assets/security.png" alt />
      </router-link>

      <router-link
        v-if="this.user.RoleId == 2"
        class="d-block p-4 m-2 shadow d-flex justify-content-between bg-warning border-0"
        to="/admin"
      >
        <h5 class="text-light">Admin</h5>
        <img class="img" src="../assets/lock.png" alt />
      </router-link>

      <router-link
        v-if="niveau"
        class="d-block p-4 pb-3 m-2 shadow d-flex justify-content-between bg-danger border-0"
        :to="{path: '/game/' + this.niveau}"
      >
        <div>
          <h5 class="m-0 text-light">Continuer le jeu</h5>
          <small class="font-weight-bold">Niveau {{niveau}}</small>
        </div>
        <img class="img" src="../assets/play-button.png" alt />
      </router-link>
      <router-link
        v-else
        class="d-block p-4 m-2 shadow d-flex justify-content-between bg-danger border-0"
        to="/game/1"
      >
        <div>
          <h5 class="m-0 text-light">Nouvelle partie</h5>
          <small class="text-warning">Niveau 1</small>
        </div>
        <img class="img" src="../assets/play-button.png" alt />
      </router-link>

      <router-link
        class="d-block p-4 m-2 shadow d-flex justify-content-between bg-success border-0"
        to="/niveau"
      >
        <h5 class="text-light">Niveau</h5>
        <img class="img" src="../assets/volume.png" alt />
      </router-link>

      <router-link
        class="d-block p-4 m-2 shadow d-flex justify-content-between bg-primary border-0"
        to="/"
      >
        <h5 class="text-light">Instructions</h5>
        <img class="img" src="../assets/instructions.png" alt />
      </router-link>
      <div
        class="d-block btn btn-light m-2 shadow d-flex justify-content-between bg-light border-0"
      >
        <h6 v-on:click="Display" class="m-3">Préférences</h6>
        <img
          v-on:click="Display"
          v-if="!display"
          class="imgSon m-3"
          src="../assets/speaker.png"
          alt
        />
        <div v-if="display">
          <form>
            <div>
              <small class="d-block text-danger">Music</small>
              <input class="slider" type="range" min="0" max="1" step="0.1" v-model="music" />
            </div>
            <div>
              <small class="d-block text-info">Son</small>
              <input class="slider" type="range" min="0" max="1" step="0.1" v-model="son" />
            </div>
            <button
              type="submit"
              v-on:click="submit()"
              class="btn btn-warning p-0 pr-2 pl-2"
            >confirmer</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data: function() {
    return {
      user: [],
      theUser: [],
      niveau: 0,
      score: 0,
      getToken: localStorage.getItem("token"),
      display: false,
      music: localStorage.getItem("music"),
      son: localStorage.getItem("son")
    };
  },
  computed: {
    totalMusic: function() {
      return this.music * 100;
    },
    totalSon: function() {
      return this.son * 100;
    }
  },
  async mounted() {
    localStorage.setItem("music", this.music);
    localStorage.setItem("son", this.son);
    await axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
    await axios
      .get("http://localhost:5000/user/" + this.user.id)
      .then(response => (this.theUser = response.data));
    await axios
      .get("http://localhost:5000/avancement/max/" + this.user.id)
      .then(response => (this.niveau = response.data));
    localStorage.setItem("niveau", this.niveau);
    await axios
      .get("http://localhost:5000/avancement/sum/" + this.user.id)
      .then(response => (this.score = response.data));
  },
  methods: {
    Display() {
      if (this.display == true) {
        this.display = false;
      } else {
        this.display = true;
      }
    },
    async submit() {
      localStorage.setItem("music", this.music);
      localStorage.setItem("son", this.son);
    }
  }
};
</script>
<style scoped>
.img {
  width: 40px;
  height: 40px;
}
.imgSon {
  width: 25px;
  height: 25px;
}
.home {
  margin-top: 100px;
}
.slider {
  -webkit-appearance: none;
  padding: 0;
  font: inherit;
  outline: none;
  opacity: 0.8;
  background: rgb(230, 230, 230);
  box-sizing: border-box;
  transition: opacity 0.2s;
  cursor: pointer;
}
</style>