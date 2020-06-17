<template>
  <div class="compte">
    <div class="d-flex justify-content-center">
      <div class="mt-5">
        <router-link class="btn btn-light m-5" to="/">
          <h1 class="m-0 text-info">M</h1>
          <h1 class="m-0">E</h1>
          <h1 class="m-0">N</h1>
          <h1 class="m-0">U</h1>
        </router-link>
      </div>

      <Profil />
    </div>
  </div>
</template>

<script>
import Profil from "../components/Profil";

export default {
  name: "Compte",
  components: {
    Profil
  },
  data: function() {
    return {};
  },
  mounted() {}
};
</script>
