<template>
  <div id="app">
    <div class="space-wrapper">
      <three></three>
    </div>
    <controller class="controller-wrapper" ref="audioScoure"></controller>
  </div>
</template>

<script>
import controller from '@/components/controller/controller';
import three from '@/components/three/three';

export default {
  name: 'App',
  components: {
    controller,
    three
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/color.styl';

#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .space-wrapper {
    width: 100%;
    height: 100%;
    background-color: dark-purple;
  }

  .controller-wrapper {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
