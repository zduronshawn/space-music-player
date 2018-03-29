<!--  -->
<template>
  <div class="controller-content">
    <div class="menu-wrapper">
      <i class="icon-menu" @click="menuDisplay"></i>
      <!-- <transition name="slide"> -->
        <div class="menu-content" v-show="menuShow">
          <div class="header">
            <i class="icon-close" @click="menuDisplay"></i>
            <h1 class="text">Menu</h1>
          </div>
          <div class="dropbox"></div>
          <ul class="music-list">
            <li class="song-info">
              <i class="icon-close"></i>
              <span class="song-name">We Belong Together</span>
            </li>
          </ul>
        </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuShow: false
    };
  },

  components: {},

  computed: {},

  methods: {
    menuDisplay() {
      this.menuShow = !this.menuShow;
    }
  }
};

</script>
<style lang='stylus' scoped>
@import '../../common/stylus/icon.styl';
@import '../../common/stylus/color.styl';

.controller-content {
  .menu-wrapper {
    position: relative;
    width: 100%;

    .icon-menu {
      position: absolute;
      right: 0;
      top: 0;
      margin: 20px;
      font-size: 40px;
      color: light-green;
    }

    .menu-content {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 340px;
      height: 100vh;
      background-color: dark-yellow;

      .header {
        display: flex;
        width: 100%;
        height: 70px;
        background-color: light-red;

        .icon-close {
          flex: 0;
          line-height:70px;
          vertical-align :top;
          margin-left:15px;
          font-size: 45px;
          color: dark-purple;
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
      .dropbox{
        height:150px;
        margin:15px;
        background-color :light-green;
      }
      .music-list{
        margin:30px 15px 15px 15px;
        .song-info{
          height:30px;
          padding:10px;
          background-color :light-orange;
          > .icon-close{
          line-height:30px;
          padding:5px;
          background-color:light-green;
          border-radius:50%;
          font-size:20px;
          font-weight:700px; 
          color:dark-purple;
          }
          .song-name{
            line-height:30px;
            vertical-align :top;
            margin-left:8px;
            font-size:16px;
            font-weight:700px; 
            color:dark-purple;
          }
        }
      }
    }
  }
}
</style>
