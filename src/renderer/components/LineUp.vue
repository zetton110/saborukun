<template>
  <div>
    <img id="logo" src="~@/assets/logo_small.png" alt="electron-vue">
    <div class="version">ver 1.0.0</div>
    <!--
    <div class="title"><router-link to="/">Home</router-link></div>
    <div class="title">LineUp</div>
    <div class="items">
      <div class="item">
        <div class="name">①</div>
        <div class="value"><router-link to="/worktime-input">勤務時間実績入力さぼるくん</router-link></div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
  export default {
    name: 'line-up',
    data () {
      return {
        electron: process.versions['atom-shell'],
        name: this.$route.name,
        node: process.versions.node,
        path: this.$route.path,
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 130px;
  }

  .version{
    text-align: right;
    font-size: 1.1em;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
