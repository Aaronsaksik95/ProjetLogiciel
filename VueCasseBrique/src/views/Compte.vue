<template>
  <div class="compte">
    <div class="">
      <div class="m-5 w-25 mx-auto">
        <router-link class="btn btn-light m-2 d-block" to="/">
          <h4 class="m-0">
            <span class="text-info">M</span>ENU
          </h4>
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
