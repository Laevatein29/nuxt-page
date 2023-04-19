<template>
  <div class="path-bar">
    <nuxt-link
      v-for="(path, index) in tabs"
      :key="index"
      class="path-item"
      :class="{
        active: $helpers.equalRoute($route, path.name),
      }"
      :to="localePath(path.path)"
    >
      <div class="text">{{ path.display }}</div>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PathBar',
  data() {
    return {
      tabs: [
        {
          name: 'index',
          path: '/',
          display: 'Home',
        },
        {
          name: 'tools',
          path: '/tools',
          display: 'Tools',
        },
      ],
    }
  },
})
</script>

<style scoped lang="scss">
.path-bar {
  @include flexR;
  display: inline-flex;
  overflow: hidden;

  .path-item {
    width: 120px;
    height: 40px;
    color: $lightText;

    &.active {
      color: $lightGreen;
    }

    .text {
      text-align: center;
      font-size: 14px;
      font-weight: 400;
      line-height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>
