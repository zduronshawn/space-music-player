<template>
  <div class="hello">
    <div class="add" @click="ifshowSetting=!ifshowSetting">
      <i class="icon-add_circle"></i>
    </div>
    <div class="add-content-wrapper" v-show="ifshowSetting" @click="ifshowSetting=!ifshowSetting">
      <div class="add-content" @click.stop="ifshowSetting=ifshowSetting">
        <div class="map-container"></div>
        <div class="setting">
          <input type="number" name="positionX" v-model="newSoundX">
          <input type="number" name="positionZ" v-model="newSoundZ">
           <select v-model="selected" v-if="musicList">
            <option disabled value="">请选择</option>
            <option v-for="(soundItem,index) of musicList">{{index}}. {{soundItem.name}}</option>
          </select>
          <span @click="createAudioModel">submit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
import FirstPersonControls from '../../common/js/FirstPersonControls';
import dat from 'dat.gui/build/dat.gui.js'

var camera,
  control,
  scene,
  light,
  renderer,
  clock,
  listener;

var sphere = new THREE.SphereBufferGeometry(20, 32, 16),
  material1 = new THREE.MeshPhongMaterial({ color: 0xffaa00, flatShading: true, shininess: 0 }),
  material2 = new THREE.MeshPhongMaterial({ color: 0xff2200, flatShading: true, shininess: 0 }),
  material3 = new THREE.MeshPhongMaterial({ color: 0x6622aa, flatShading: true, shininess: 0 }),
  audioLoader = new THREE.AudioLoader();

var gui = new dat.GUI();
document.querySelector('.dg.a').style="float:left";

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
      selected: "",
      newSoundX:30,
      newSoundZ:30
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
    soundControlInit(sound,mesh){
      var soundControl = new SoundControl();

      var soundFolder = gui.addFolder(this.musicList[this.selected.substring(0,1)].name);
      soundFolder.add(soundControl, 'volume').min(0.0).max(1.0).step(0.01).onChange(function() {
        sound.setVolume(soundControl.volume);
      });
      soundFolder.add(soundControl,'positionX').min(-1000).max(1000).step(1).onChange(function() {
        mesh.position.x =soundControl.positionX;
      });
      soundFolder.add(soundControl,'positionZ').min(-1000).max(1000).step(1).onChange(function() {
        mesh.position.z =soundControl.positionZ;
      });
    },
    createAudioModel(positonX, positionZ) {
      if (this.musicList.length !== 0) {
        // create an object for the sound to play from
        positionX = this.newSoundX;
        positionZ = this.newSoundZ;
        var sphere = new THREE.SphereGeometry(20, 32, 16);
        var mesh = new THREE.Mesh(sphere, material2);
        mesh.position.set(positionX, 0, positionZ);
        scene.add(mesh);

        var sound = new THREE.PositionalAudio(listener);
        audioLoader.load(this.musicList[this.selected.substring(0,1)].url, function(buffer) {
          sound.setBuffer(buffer);
          sound.setRefDistance(20);
          sound.play();
        });
        this.soundControlInit(sound,mesh);
        // finally add the sound to the mesh
        mesh.add(sound);
      } else {
        alert('this playList is empty');
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
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);

    // opacity: 1;

    // &.fade-enter-active, .fade-leave-active {
    // transition: opacity 2s;
    // }

    // &.fade-enter, .fade-leave-to {
    // opacity: 0;
    // }
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
        wdith: 400px;
        height: 400px;
        background-color: dark-yellow;
      }

      .setting {
        flex: 1;
      }
    }
  }
}
</style>
