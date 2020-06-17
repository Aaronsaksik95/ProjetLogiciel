<template>
  <div class="compte">
    <div class="d-flex justify-content-around">
      <Login />
      <div class="mt-5">
        <router-link class="btn btn-light m-5" to="/">
          <h1 class="m-0 text-info">M</h1>
          <h1 class="m-0">E</h1>
          <h1 class="m-0">N</h1>
          <h1 class="m-0">U</h1>
        </router-link>
      </div>
      <Signup />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Login from "../components/Login";
import Signup from "../components/Signup";
export default {
  name: "Compte",
  components: {
    Login,
    Signup
  },
  data: function() {
    return {};
  },
  mounted() {
    axios.post("http://localhost:5000/roles", {
      id: 1,
      status: "user"
    });
    axios.post("http://localhost:5000/roles", {
      id: 2,
      status: "admin"
    });
  }
};
</script>
