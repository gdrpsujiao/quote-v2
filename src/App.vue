<template>
  <div id="app">
    <ap-header />
    <ap-menu />
    <router-view />
  </div>
</template>

<script>
import ApHeader from '@/components/ap-header'
import ApMenu from '@/components/ap-menu'

export default {
  name: 'App',
  components: {
    ApHeader,
    ApMenu
  }
}
</script>

<style lang="scss" scoped>

</style>