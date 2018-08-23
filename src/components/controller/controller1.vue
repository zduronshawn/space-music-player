<!--  -->
<template>
  <div class="controller-content">
    <i class="icon-menu" @click="toggleDrawer"></i>
    <Drawer :visible.sync="showDrawer"></Drawer>
    
  </div>
</template>

<script>
import Drawer from "./drawer";
import { mapGetters, mapMutations } from "vuex";
let currentSong = new Audio();
export default {
  data() {
    return {};
  },

  computed: {
    showDrawer: {
      get() {
        return this.$store.state.showDrawer;
      },
      set() {
        this.toggleDrawer();
      }
    }
  },

  methods: {
    ...mapMutations({
      toggleDrawer: "toggleDrawer"
    })
  },
  components: {
    Drawer
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/icon.styl';
@import '../../common/stylus/color.styl';

.controller-content {
  .icon-menu {
    position: absolute;
    right: 0;
    top: 0;
    margin: 20px;
    font-size: 40px;
    color: light-green;
  }
}
</style>
