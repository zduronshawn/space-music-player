<!--  -->
<template>
  <Drawer></Drawer>
</template>

<script>
import Drawer from "./drawer";
let currentSong = new Audio();
export default {
  data() {
    return {
      
    };
  },

  methods: {},
  components: {
    Drawer
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/icon.styl';
@import '../../common/stylus/color.styl';
</style>
