<template>
  <div class="Pagination">
    <div class="wrap">
      <button id="home" class="pageButton" @click="firstButton()">首页</button> 
      <button id="previous"  @click="perviousButton">上一页</button>
      <button v-if="beforeButton">.....</button>
      <button v-for="button in allButtons" @click="changeButton(button)"
      :class="[{currentButton: button === currentButton}]">
      {{button}}</button>
      <button>.....</button>
      <button id="next" @click="nextButton" class="pageButton">下一页</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  data(){
    return {
      allButtons:[1, 2, 3, 4, 5],
      currentButton: 1,
      beforeButton: false
    }
  },
  methods: {
    changeButton(value){
      this.currentButton = value
      if (value > 4) {
        this.beforeButton = true
      } else {
        this.beforeButton = false
      }

      if (value === this.allButtons[4]) {
        this.allButtons.shift()
        this.allButtons.push(this.allButtons[3] + 1)
      } else if (value === this.allButtons[0] && value > 1) {
        this.allButtons.pop()
        this.allButtons.unshift(this.allButtons[0] - 1)
      }
      let newValue = {page:value}
      this.$emit('change', newValue)
    },
    perviousButton(){
      let value = this.currentButton - 1
      if (value >= 1) {
        this.changeButton(value)
      }
    },
    nextButton(){
      let value = this.currentButton + 1
      this.changeButton(value)
    },
    firstButton(){
      this.allButtons = [1, 2, 3, 4, 5]
      this.currentButton = 1
      this.beforeButton = false
      let value = {page:1,tab: 'all',selected: 0}
      this.$emit('change', value)
    }
  },
  created(){
    this.$root.bus.$on('backfirst', ()=>{
      this.firstButton()
    })
    this.$root.bus.$on('changeCurrentButton', (value)=>{
      this.currentButton = value
    })
  }
}
</script>
<style scoped>
.Pagination {
  padding: 8px 10px;
}
.wrap {
  display: flex;
}
button {
  border: 1px solid rgb(221, 221, 221);
  padding: 5px 10px;
  background: white;
  color: #778087;
  outline: none;
}
button:hover {
  cursor: pointer;
}

.currentButton {
  background: rgb(103, 160, 224);
  color: white;
}
</style>
