<!-- sound point in the map -->
<template>
  <div class="point" ref="point" :data-name="songName"></div>
</template>

<script>
export default {
  data() {
    return {
    };
  },

  props: {
    positionX: {
      type: Number
    },
    positionZ: {
      type: Number
    },
    songName: {
      type: String
    }
  },
  computed: {
    pTop: function () {
      return (1000 - this.positionX) / 5;
    },
    pLeft: function () {
      return (1000 + this.positionZ) / 5;
    }
  },

  methods: {},

  mounted() {
    this.$refs.point.style.top = `${this.pTop}px`;
    this.$refs.point.style.left = `${this.pLeft}px`;
    console.log(this.pTop);
    console.log(this.pLeft);
  }
};

</script>
<style lang='stylus' scoped>
.point {
  display: inline-block;
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ee5229;
  transform: translate(-50%, -50%);
}

.point:hover {
  background-color: #ee5000;
}

.point:hover:after {
  position: absolute;
  top: 50%;
  left: 120%;
  width:50px;
  content: attr(data-name);
  font-size:10px;
  white-space:nowrap;
}
</style>
