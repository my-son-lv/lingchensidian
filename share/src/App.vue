<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import Share from './components/share/share.vue'
import Shareinfo from './components/shareinfo/shareinfo.vue'

export default {
  name: 'App',
  components: {
    Share,
    Shareinfo
  }
}
</script>

<style>

</style>
