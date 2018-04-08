<template>
  <div id="app">
    <div class="space-wrapper"></div>
    <div class="controller-wrapper">
        <controller></controller>
    </div>
  </div>
</template>

<script>
import controller from '@/components/controller/controller';
export default {
  name: 'App',
  components: {
    controller
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/color.styl';

#app {
  width: 100%;
  height: 100%;

  .space-wrapper {
    width :100%;
    height :100%;
    background-color: dark-purple;
  }
  .controller-wrapper{
      position: absolute;
      top:0;
      right:0;
  }
}
</style>
