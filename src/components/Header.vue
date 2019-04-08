<template>
  <div class="header">
      <router-link :to="{name:'root'}" class="img" >
          <img src="../assets/cnodejs_light.svg" @click="backFirst">
      </router-link>
  </div>
</template>
<script>
export default {
  name: 'cnode_header',
  methods: {
    backFirst(){
      this.$root.bus.$emit('backfirst')
    }
  }
}
</script>
<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    background: #444;
    align-items: center;
  }
  img {
    height: 30px;
    margin-left: 78px;
    margin-top: 8px;
    margin-bottom: 10px;
  }
  ul {
    display: flex;
    list-style: none;
    color: rgb(204, 204, 204);
    margin-right: 85px;
  }
  li {
    font-size: 13px;
    padding: 0 15px;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
