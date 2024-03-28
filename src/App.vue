<template>
  <div id="app">
    <section class="layout-page-container">
      <ap-header />
      <ap-menu />
      <router-view />
    </section>
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
.layout-page-container {

}
</style>