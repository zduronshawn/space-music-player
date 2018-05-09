<template>
  <div class="hello">
  </div>
</template>

<script>
import * as THREE from 'three';
import FirstPersonControls from '../../common/js/FirstPersonControls';
var camera,
  control,
  scene,
  renderer,
  clock,
  listener;

export default {
  name: 'HelloWorld',
  data() {
    return {
    };
  },
  props: {
    musicList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      control.handleResize();
    }
  },
  mounted() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x181029, 0.0025);

    listener = new THREE.AudioListener();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 25, 0);
    camera.lookAt(scene.position);
    camera.add(listener);

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor('#181029', 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.querySelector('.hello').appendChild(renderer.domElement);

    var helper = new THREE.GridHelper(2000, 80, 0xc5d5f5, 0xc5d5f5);
    helper.position.y = 0.5;
    scene.add(helper);

    control = new FirstPersonControls(camera, renderer.domElement);
    control.movementSpeed = 70;
    control.lookSpeed = 0.05;
    control.noFly = true;
    control.lookVertical = false;

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
</style>
