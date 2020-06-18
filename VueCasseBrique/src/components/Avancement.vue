<template>
  <div class="mt-5">
    <div v-if="this.niveauMax == this.param">
      <h2 class="text-info">Félicitation vous venez de remporter le dernier niveau.</h2>
      <h3 class="text-warning">Félicitation vous venez de remporter le dernier niveau.</h3>
      <h4 class="text-success">Félicitation vous venez de remporter le dernier niveau.</h4>
      <h5 class="text-danger">Félicitation vous venez de remporter le dernier niveau.</h5>
      <h6 class="text-primary mb-0">Félicitation vous venez de remporter le dernier niveau.</h6>
      <img class="img-fluid w-50 d-block mx-auto" :src="require(`../assets/Image/victory.jpg`)" alt />
      <router-link class="btn btn-info" to="/">Menu</router-link>
    </div>
    <div v-else>
      <div v-if="getNiveau == this.$route.params.id">
        <div v-if="avancementMax < this.$route.params.id">
          <h2
            class="text-info"
          >Félicitation vous venez de terminer le Niveau {{$route.params.id-1}}</h2>
          <audio id="gameOver" src="../assets/Son/gameOver.mp3"></audio>
          <img
            class="img-fluid w-50 d-block mx-auto mt-5"
            :src="require(`../assets/Image/${$route.params.id}.png`)"
            alt
          />
          <router-link
            class="btn btn-info mt-5"
            :to="{path: '/game/' + this.$route.params.id}"
          >Niveau suivant ></router-link>
        </div>
        <div v-else>
          <h2
            class="text-info"
          >Félicitation vous venez à nouveau de terminer le Niveau {{$route.params.id-1}}</h2>
          <img
            class="img-fluid w-50 d-block mx-auto mt-5"
            :src="require(`../assets/Image/${$route.params.id}.png`)"
            alt
          />
          <router-link
            class="btn btn-info mt-5"
            :to="{path: '/game/' + this.$route.params.id}"
          >Essayez le Niveau {{$route.params.id}}</router-link>
        </div>
      </div>
      <div v-else class="h3 text-danger mt-5">
        Page NotFound Revenir à l'
        <router-link class="h3" to="/niveau">Accueil</router-link>.
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: [],
      avancement: [],
      niveauId: [],
      niveau: [],
      niveauMax: 0,
      param: parseInt(this.$route.params.id) - 1,
      avancementMax: 0,
      getToken: localStorage.getItem("token"),
      getNiveau: localStorage.getItem("niveau")
    };
  },
  async mounted() {
    await axios
      .get("http://localhost:5000/profile?secret_token=" + this.getToken)
      .then(response => (this.user = response.data.user));
    await axios
      .get("http://localhost:5000/avancement/max/" + this.user.id)
      .then(response => (this.avancementMax = response.data));
    await axios
      .get("http://localhost:5000/niveau/" + this.$route.params.id)
      .then(response => (this.niveau = response.data));
    await axios
      .get("http://localhost:5000/niveau/" + this.param)
      .then(response => (this.niveau = response.data));
    if (this.getNiveau == this.$route.params.id) {
      await axios.post("http://localhost:5000/avancement/", {
        NiveauId: this.$route.params.id - 1,
        UserId: this.user.id,
        score: this.niveau.rowBlock * this.niveau.columnBlock
      });
    }
  }
};
</script>