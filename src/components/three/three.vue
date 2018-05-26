<template>
  <div class="hello">
    <div class="add" @click="ifshowSetting=!ifshowSetting">
      <i class="icon-add_circle"></i>
    </div>
    <div class="add-content-wrapper" v-show="ifshowSetting" @click="ifshowSetting=!ifshowSetting">
      <div class="add-content" @click.stop="ifshowSetting=ifshowSetting" ref="locatingParent">
        <div class="map-container" ref ="area">
          <div class="locate-point" ref="locatingPoint"></div>
          <div class="playing-point" v-if="isPlaying">
            <soundpoint v-for="(musicItem,index) in isPlaying" :key="index" :positionX="musicItem.positionX" :positionZ="musicItem.positionZ" :songName="musicItem.songName"></soundpoint>
          </div>
        </div>
        <div class="setting">
          <input type="number" name="positionX" v-model="newSoundX" class="position-x">
          <input type="number" name="positionZ" v-model="newSoundZ" class="position-z">
           <select v-model="selected" v-if="musicList">
            <option disabled value="">请选择</option>
            <option v-for="(soundItem,index) of musicList" :key="index">{{index}}. {{soundItem.name}}</option>
          </select>
          <span @click="createAudioModel" class="submit">submit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import FirstPersonControls from '../../common/js/FirstPersonControls';
import dat from 'dat.gui/build/dat.gui.js';
import soundpoint from '@/components/soundpoint/soundpoint';

var camera,
  control,
  scene,
  light,
  renderer,
  clock,
  listener;

var material1 = new THREE.MeshPhongMaterial({ color: 0xffaa00, flatShading: true, shininess: 0 }),
  material2 = new THREE.MeshPhongMaterial({ color: 0xff2200, flatShading: true, shininess: 0 }),
  material3 = new THREE.MeshPhongMaterial({ color: 0x6622aa, flatShading: true, shininess: 0 }),
  audioLoader = new THREE.AudioLoader();

var gui = new dat.GUI();
document.querySelector('.dg.a').style = 'float:left';

var SoundControl = function () {
  this.volume = 0.8;
  this.positionX = 50;
  this.positionZ = 50;
};

export default {
  name: 'Three',
  data() {
    return {
      isPlaying: [],
      ifshowSetting: false,
      gridWidth: 2000,
      selected: '',
      newSoundX: 0,
      newSoundZ: 0
    };
  },
  props: {
    musicList: {
      type: Array,
      default: function ar() {
        return [];
      }
    }
  },
  components: {
    soundpoint
  },
  methods: {
    _visionControlInit() {
      control = new FirstPersonControls(camera, renderer.domElement);
      control.movementSpeed = 70;
      control.lookSpeed = 0.05;
      control.noFly = true;
      control.lookVertical = false;
    },
    onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      control.handleResize();
    },
    mapInit() {
    },
    soundControlInit(sound, mesh) {
      var soundControl = new SoundControl();

      var soundFolder = gui.addFolder(this.musicList[this.selected.substring(0, 1)].name);
      soundFolder.add(soundControl, 'volume').min(0.0).max(1.0).step(0.01).onChange(function () {
        sound.setVolume(soundControl.volume);
      });
      soundFolder.add(soundControl, 'positionX').min(-1000).max(1000).step(1).onChange(function () {
        mesh.position.x = soundControl.positionX;
      });
      soundFolder.add(soundControl, 'positionZ').min(-1000).max(1000).step(1).onChange(function () {
        mesh.position.z = soundControl.positionZ;
      });
    },
    createAudioModel(positionX, positionZ) {
      if (this.musicList.length !== 0) {
        // create an object for the sound to play from
        positionX = +this.newSoundX;
        positionZ = +this.newSoundZ;
        var sphere = new THREE.SphereGeometry(20, 32, 16);
        var mesh = new THREE.Mesh(sphere, material2);
        mesh.position.set(positionX, 0, positionZ);
        scene.add(mesh);
        var songIndex = this.selected.substring(0, 1);
        var songName = this.musicList[songIndex].name;
        var sound = new THREE.PositionalAudio(listener);
        audioLoader.load(this.musicList[songIndex].url, function (buffer) {
          sound.setBuffer(buffer);
          sound.setLoop(true);
          sound.setRefDistance(20);
          sound.play();
        });
        this.soundControlInit(sound, mesh);
        this.isPlaying.push({
          sound,
          positionX,
          positionZ,
          songName
        });
        console.log(this.isPlaying);
        // finally add the sound to the mesh
        mesh.add(sound);
      } else {
        alert('this playList is empty');
      }
    },
    pointLocating() {
      var point = this.$refs.locatingPoint;
      var pointParent = this.$refs.locatingParent;
      var area = this.$refs.area;
      var diffX = 0;
      var diffY = 0;
      var isdown = false;
      var that = this;
      point.style.left = '200px';
      point.style.top = '200px';
      // pointParent.addEventListener('mouse')
      point.onmousedown = function (e) {
        isdown = true;
      }
      area.onmousemove = function (e) {
        if (isdown) {
          diffX = e.clientX - (pointParent.offsetLeft - pointParent.clientWidth / 2) - 20;
          diffY = e.clientY - (pointParent.offsetTop - pointParent.clientHeight / 2) - 20;
          point.style.left = `${diffX}px`;
          point.style.top = `${diffY}px`;
          that.newSoundX = (200 - diffY) * 5;
          that.newSoundZ = -(200 - diffX) * 5;
        }
      }
      point.onmouseup = function (e) {
        isdown = false;
        diffX = 0;
        diffY = 0;
      }
    }
  },
  mounted() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x181029, 0.0025);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 25, 0);
    camera.lookAt(scene.position);
    listener = new THREE.AudioListener();
    camera.add(listener);

    clock = new THREE.Clock();

    // setup the render
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('#181029', 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.querySelector('.hello').appendChild(renderer.domElement);

    // setup the light
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0.5, 1).normalize();
    scene.add(light);

    // setup the grid helper
    var helper = new THREE.GridHelper(this.gridWidth, 80, 0xc5d5f5, 0xc5d5f5);
    helper.position.y = 0.5;
    scene.add(helper);

    // setup the first person control
    this._visionControlInit();
    this.pointLocating();
    window.addEventListener('resize', this.onResize, false);

    render();

    function render() {
      var delta = clock.getDelta();
      control.update(delta);
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import '../../common/stylus/icon.styl';
@import '../../common/stylus/color.styl';

.hello {
  position: relative;

  .add {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 20px;
    border-radius: 50%;

    .icon-add_circle {
      font-size: 40px;
      color: dark-yellow;
    }
  }

  .add-content-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);

    .add-content {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      padding: 20px;
      transform: translate(-50%, -50%);
      background-color: light-green;
      border-radius: 30px;

      .map-container {
        flex: 0 0 400px;
        position: relative;
        wdith: 400px;
        height: 400px;
        background-color: dark-yellow;

        .locate-point {
          display: inline-block;
          position: absolute;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: #181029;
          transform: translate(-50%, -50%);
        }
      }

      .setting {
        flex: 1;
        margin: 0px 20px;

        input, select {
          display: block;
          width: 80%;
          height: 40px;
          margin-bottom: 20px;
          padding-left: 10px;
          font-size: 16px;
          font-weight: 700;
          background-color: light-green;
          border-bottom: 2px solid #ededed;
          border-top: none;
          border-left: none;
          border-right: none;
        }

        option {
          padding: 5px;
          font-size: 14px;
        }

        .submit {
          display: inline-block;
          line-height: 20px;
          padding: 15px;
          font-size: 16px;
          font-weight: bold;
          background-color: highlight;
          border-radius: 20px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
