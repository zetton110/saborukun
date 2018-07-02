<template>
  <div id="wrapper">
    <main>
      <div class="left-side"> 
        <line-up></line-up>
      </div>
      <div class="right-side">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import LineUp from './components/LineUp'

  export default {
    name: 'overtime-apply-automation',
    components: { LineUp }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(134, 131, 131, 0.9) 100%
      );
    height: 100vh;
    padding: 40px 40px;
    width: 100vw;
  }

  main {
    display: flex;
    height: 100%;
  }

  .left-side {
    display: flex;
    justify-content: left;
    align-items: center;
    width: 180px;
  }

  .right-side {
    flex-grow: 9;
    justify-content: center;
    align-items: center;
  }
</style>
