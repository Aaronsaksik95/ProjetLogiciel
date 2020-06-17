<form>
        <div class="wrapper">
          <input class="form-control-range" type="range" min="2" max="20" step="1" v-model="value" />
          <span v-text="total"></span>
        </div>
      </form>

      computed: {
    total: function() {
      return this.value;
    }
  },