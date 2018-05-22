<template>
  <div id="app">
    <div class="space-wrapper">
      <three :musicList="musicList"></three>
    </div>
    <controller class="controller-wrapper" ref="audioScoure" @listUpdate="listUpdate"></controller>
  </div>
</template>

<script>
import controller from '@/components/controller/controller';
import three from '@/components/three/three';

export default {
  name: 'App',
  data() {
    return {
      musicList: []
    };
  },
  components: {
    controller,
    three
  },
  methods: {
    listUpdate(list) {
      this.musicList = list;
    }
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
