<template>
  <div class="doc">
    <div class="title">Change before you have to.</div>
    <p>
      変革せよ。変革を迫られる前に。
      <br>
      <br>
      Jack Welch　（ジャック・ウェルチ）
      <br>
      （米国の経営者 / 1935～） 
    </p>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

 
</style>
