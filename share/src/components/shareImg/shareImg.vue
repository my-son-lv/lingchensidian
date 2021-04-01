<template>
  <div>
    <img :src="haibaoUrl" class="img" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      haibaoUrl: ''
    }
  },
  created() {
    this.haibaoUrl = sessionStorage.getItem('CODEIMG');
  },
  computed: {
  },
  methods: {
  },
}
</script>
<style scoped>
.img {
  width: 100%;
  height: auto;
}
</style>
