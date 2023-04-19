<template>
  <div class="header">
    <nuxt-logo></nuxt-logo>
    <PathTabs />
    <div class="right-panel">Tools</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutHeader',
})
</script>

<style lang="scss" scoped>
.header {
  @include flexRsb;
  height: 60px;
  width: 100%;
  z-index: 100;
  padding: 0 20px;
  position: fixed;
  color: $lightGreen;
  background-color: $background;

  .right-panel {
    height: 100%;
    font-size: 40px;
    font-weight: 400;
    line-height: 60px;
  }
}
</style>
