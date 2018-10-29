<template>
  <div class="upload-contanier">
    <div class="upload-box">
      <span class="text"></span>
      <input type="file" name="audio" id="audioInput">      
    </div>
    <!-- <div class="upload-status">status</div> -->
  </div>
</template>

<script>
export default {
  date() {
    return {
      isHighlight: false,
      showProgress: false,
      progress: 0
    };
  }
};
</script>

<style lang="stylus" scoped>
.upload-box {
  height :30px
}
</style>



