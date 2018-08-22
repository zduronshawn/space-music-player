<template>
  <transition name="drawer">
    
    <div 
      v-if="show"
      class="drawer-wrapper" 
      :style="{ width:width+'px',backgroundColor:color }">
      <div class="toggler">
        
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
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 350
    },
    color: {
      type: String,
      default: "#42b983"
    }
  }
};
</script>

<style lang="stylus" scoped>
.drawer-enter-active, .drawer-leave-active {
  transition: opacity 0.5s;
}

.drawer-enter, .drawer-leave-to {
  opacity: 0;
}

.drawer-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
}
</style>
