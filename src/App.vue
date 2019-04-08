<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="main" class="left"></router-view>
      <router-view name="sideBar" class="right"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components: {
    Header,
  }
}
</script>

<style>
  *{margin: 0; padding: 0;box-sizing: border-box;}
  a {
    text-decoration: none;
    color: inherit;
  }
  ul,ol {
    list-style: none;
  }
  /* .clearfix::after {
    content: '';
    display: block;
    clear: both;
  } */
  body {
    background: rgb(225, 225, 225);
    font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
  }
  .main {
    width: 80%;
    margin: 15px auto;
    background: rgb(225, 225, 225);
  }
</style>
