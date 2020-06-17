<script>
export default {
  mounted() {
    window.location.href = "/game/" + this.$route.params.id;
  }
};
</script>