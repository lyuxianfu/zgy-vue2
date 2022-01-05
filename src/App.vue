<template>
  <div id="app">
    <ZTable></ZTable>
    <img alt="Vue logo" src="./assets/logo.png" />
    {{ $store.getters.test }}
  </div>
</template>

<script>
import List from "@/utils/List";
export default {
  name: "App",
  created() {
    const a = new List();
    console.log(a);
    setInterval(() => {
      this.$store.dispatch("setTestSync", Math.random());
    }, 2000);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
