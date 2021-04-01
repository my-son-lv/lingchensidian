<template>
  <div>

  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
    }
  },
  created() {
    let code = this.$route.query.code;
    if (code) {
      this.$router.replace({
        path: '/register',
        query: {
          code: code
        }
      })
    };
  },
  computed: {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
