<template>
  <div id="app">
    <div class="space-wrapper">
      <three :musicList="musicList" @click.native="toggleDrawer(false)" @touchstart.native="toggleDrawer(false)"></three>
    </div>
    <controller ref="audioScoure" @listUpdate="listUpdate"></controller>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import controller from "@/components/controller/controller1";
import three from "@/components/three/three";
import upload from "@/components/controller/upload";

export default {
  name: "App",
  data() {
    return {
      musicList: []
    };
  },
  components: {
    controller,
    three,
    upload
  },
  methods: {
    ...mapMutations({
      toggleDrawer:"toggleDrawer"
    }),
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
    // background-color: dark-purple;
  }

  .controller-wrapper {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
