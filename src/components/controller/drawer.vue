<template>
  <transition name="drawer">
    
    <div 
      v-if="visible"
      class="drawer-wrapper" 
      :style="{ width:width+'px',backgroundColor:color }">
      <div class="header">
        <i class="icon-close" @click="toggleDrawer"></i>
        <h1 class="text">Menu</h1>
      </div>
    </div>
    
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 350
    },
    color: {
      type: String,
      default: "#42b983"
    },
    title: {
      type: String
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit("update:visible", !this.visible);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/icon.styl';
@import '../../common/stylus/color.styl';

.drawer-enter-active, .drawer-leave-active {
  transition: transform 0.5s;
}

.drawer-enter, .drawer-leave-to {
  transform: translateX(350px);
}

.drawer-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;

  .header {
    display: flex;
    width: 100%;
    height: 70px;
    background-color: l1-title;

    .icon-close {
      flex: 0;
      line-height: 70px;
      vertical-align: top;
      margin-left: 15px;
      font-size: 45px;
      color: light-green;
      font-weight: 700;
    }

    .text {
      flex: 1;
      line-height: 70px;
      vertical-align: top;
      margin-right: 15px;
      font-size: 34px;
      font-weight: 700;
      color: dark-purple;
      text-align: right;
    }
  }
}
</style>
