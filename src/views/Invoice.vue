<template>
<div class="wrap">
  <div class="box">
    <router-view/>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrap {
  /* margin: 0 auto; */
  position: absolute;
  right: 0;
  width: calc(100% - 200px);
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  background: #f1f1f1;
  max-width: 1200px;
  width: 100%;
  max-height: 80vh;
  height: 100%;
  border-radius: 4px;
}
</style>