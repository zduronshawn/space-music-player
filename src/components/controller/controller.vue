<!--  -->
<template>
  <div class="controller-content">
    <i class="icon-menu" @click="menuDisplay"></i>
    <div class="menu-wrapper">
      <transition name="fade">
        <div class="menu-content" v-show="menuShow">
          <div class="header">
            <i class="icon-close" @click="menuDisplay"></i>
            <h1 class="text">Menu</h1>
          </div>
          <div class="dropbox" ref="dropbox" :class="{highlight:ishighlight}">
            <h1 class="text">Please drag your audio files here</h1>
          </div>
          <ul class="music-list">
            <li class="song-info" v-for="(musicItem,index) in musicList" :key="musicItem.name" @dblclick="play(index)" :class="{'highlight':currentIndex===index}">
              <i class="icon-close"></i>
              <span class="song-name">{{musicItem.name}}</span>
              <audio :src="musicItem.url"></audio>
            </li>
          </ul>
          <div class="play-control">
            <div class="song-change">
              <i class="icon-backward2" @click="backward"></i>
              <i :class="{'icon-pause':currentState,'icon-play':!currentState}" @click="playControl"></i>
              <i class="icon-forward3" @click="forward"></i>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
let currentSong = new Audio();
export default {
  data() {
    return {
      menuShow: false,
      ishighlight: false,
      musicList: [],
      currentIndex: 0,
      currentState: 0
    };
  },

  components: {},

  computed: {},

  methods: {
    menuDisplay() {
      this.menuShow = !this.menuShow;
    },
    backward() {
      if (this.musicList.length !== 0) {
        if (this.currentIndex === 0) {
          this.currentIndex = this.musicList.length - 1;
        } else {
          this.currentIndex--;
        }
        this.play(this.currentIndex);
      } else {
        console.log('the playlist is empty');
      }
    },
    forward() {
      if (this.musicList.length !== 0) {
        if (this.currentIndex === this.musicList.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++;
        }
        this.play(this.currentIndex);
      } else {
        console.log('the playlist is empty');
      }
    },
    playControl() {
      if (this.musicList.length === 0) {
        console.log('the playlist is empty');
      } else {
        if (this.currentState) {
          currentSong.pause();
          this.currentState = 0;
        } else if (this.currentState === 0 && currentSong.paused) {
          currentSong.play();
          this.currentState = 1;
        }
      }
    },
    play(index) {
      this.currentIndex = index;
      this.$nextTick(() => {
        currentSong.src = this.musicList[this.currentIndex].url;
        currentSong.play();
      });
      this.currentState = 1;
    }
  },
  mounted() {
    let that = this;
    let firstupload = true;
    (function dragAudioEvent() {
      // this function can create is URL for a local resource
      let getBoldURL = window.URL.createObjectURL.bind(URL);
      // dragEvent listener
      that.$refs.dropbox.ondragenter = (e) => {
        e.preventDefault();
        that.ishighlight = true;
      };
      that.$refs.dropbox.ondragover = (e) => {
        e.preventDefault();
      };
      that.$refs.dropbox.ondrop = (e) => {
        e.preventDefault();
        const data = e.dataTransfer.files;
        if (data.length < 1) {
          return;
        }
        for (let i = 0; i < data.length; i++) {
          if (data[i].type.indexOf('audio') !== -1) {
            that.musicList.push({
              name: data[i].name,
              url: getBoldURL(data[i])
            });
          } else {
            alert(`${data[i].name} is not an Audio file`);
          }
        }
        that.ishighlight = false;
        if (firstupload) {
          // avoid The play() request was interrupted by a call to pause()
          currentSong.src = that.musicList[0].url;
          firstupload = false;
        }
      };
      that.$refs.dropbox.ondragleave = (e) => {
        e.preventDefault();
        that.ishighlight = false;
      };
    })();
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

  .menu-wrapper {
    position: relative;
    width: 100%;

    // overflow: hidden;
    .fade-enter-active, .fade-leave-active {
      transition: transform 0.4s ease;
    }

    .fade-enter, .fade-leave-to { /* .fade-leave-active in below version 2.1.8 */
      transform: translateX(340px);
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
          line-height: 70px;
          vertical-align: top;
          margin-left: 15px;
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

      .dropbox {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
        margin: 15px;
        background-color: light-green;

        &.highlight {
          opacity: 0.5;
        }

        .text {
          font-size: 16px;
          font-weight: 700;
          color: rgba(0, 0, 0, 0.5);
        }
      }

      .music-list {
        margin: 30px 15px 15px 15px;
        position: absolute;
        top: 220px;
        right: 0;
        left: 0;
        bottom: 80px;

        .song-info {
          height: 30px;
          width: 290px;
          padding: 10px;
          margin-bottom: 10px;
          background-color: light-orange;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;

          &.highlight {
            background-color: highlight;
            transition: 0.5s all ease;
            transform: scale(1.05);
          }

          > .icon-close {
            line-height: 30px;
            padding: 5px;
            background-color: light-green;
            border-radius: 50%;
            font-size: 20px;
            font-weight: 700px;
            color: dark-purple;
          }

          .song-name {
            line-height: 30px;
            vertical-align: top;
            margin-left: 8px;
            font-size: 14px;
            font-weight: 700px;
            color: dark-purple;
          }
        }
      }

      .play-control {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80px;
        font-size: 0;
        background-color: light-orange;

        .song-change {
          .icon-backward2, .icon-forward3 {
            font-size: 32px;
            color: light-green;
            border-radius: 50%;
          }

          .icon-pause {
            margin: 0 10px 0 12px;
            padding: 10px;
            background-color: light-red;
            border-radius: 50%;
            color: light-green;
            font-size: 30px;
          }

          .icon-play {
            margin: 0 10px 0 12px;
            padding: 10px;
            background-color: light-red;
            border-radius: 50%;
            color: light-green;
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
