
<template>
  <div>
    <web-view :src="activityUrl"></web-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activityUrl: ''
    };
  },

  components: {},

  methods: {

  },
  beforeMount() { },
  onLoad(options) {
    let that = this;
    console.log(options)
    that.activityUrl = options.url;
  },
  onUnload() {
  }
};
</script>
<style scoped>
</style>
