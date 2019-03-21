<template>
    <div class="wrap">
        <div class="loading" v-show="beforeComplete">
            <img src="../assets/loading.gif" >
        </div>
        <div class="postLists">
            <ul>
                <li>
                    <span v-for="sort in sorts">{{sort}}</span>
                </li>
                <li v-for="post in posts">
                    <div class="start">
                        <div class="avatar"><img :src="post.author.avatar_url" alt=""></div>
                        <div class="numbers">
                            <span class="reply">{{post.reply_count}}/</span><span class="visit">{{post.visit_count}}</span>
                        </div>
                        <span :class="[{sort_top:(post.top === true),sort_good:(post.good === true),
                        sort_othersList:(post.top === !true && post.good === !true)},]">{{post | showSort}}
                        </span>

                        <router-link :to="{name:'content',params:{id:post.id,name:post.author.loginname}}">
                            <span class="title">{{post.title}}</span>   
                        </router-link>                       
                    </div>
                    <div class="end">
                        <span class="time">{{post.last_reply_at | showTime}}</span>
                    </div>
                    
                </li>
            </ul>           
        </div>
        <pagination @change="changePage"></pagination>
    </div>
</template>
<script>
import pagination from './Pagination'
export default {
  name: 'cnode_postlist',
  components: {
      pagination
  },
  data(){
      return {
          beforeComplete: true,
          posts: [],
          sorts: ["全部", "精华", "分享", "问答", "招聘", "客户端测试"],
          needPaga: 1,
      }
  },
  methods: {
      fetchData(){
        this.$axios.get('https://cnodejs.org/api/v1/topics', {
            params: {
                page: this.needPaga,
                limit: 30
            }
        }).then((res)=>{
            this.posts = res.data.data
            this.beforeComplete = false
        },(error)=>{
        })
      },
      changePage(value){
          this.needPaga = value
          this.fetchData()
      }
  },
  beforeMount(){
    this.fetchData()
  }
}


</script>
<style scoped>
.loading {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.wrap {
    background: white;
}
a {
    color: inherit;
    text-decoration: none;
}
ul li:not(:first-child) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 12px;
}
ul li:not(:last-child) {
    border-bottom: 1px solid rgb(240, 240, 240); 
}
ul li:not(:first-child):hover{
    background: rgb(245, 245, 245);
}
ul li:not(:first-child) a:hover{
    text-decoration: underline;
}
ul li:first-child {
    list-style: none;
    background: rgb(246, 246, 246);
}
ul li:first-child > span {
    font-size: 14px;
    color: #80bd01;
    display: inline-block;
    margin: 10px 15px;
}
ul li:first-child > span:first-child {
    padding: 3px 4px;
    border-radius: 3px;
    background: #80bd01;
    color: white;
}
.start{
    display: flex;
    align-items: center;
}

.avatar img{
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
}

.numbers .reply {
    text-align: right;
    display: inline-block;
    width: 35px;
    font-size: 14px;
    color: #9e78c0;
}
.numbers .visit {
    display: inline-block;
    font-size: 10px;
    color: #b4b4b4;
    width: 40px;
}

.sort_top,.sort_good,.sort_othersList{
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 12px;
    color: #ffffff;
    margin-right: 4px;
}
.sort_othersList {
    background: #e5e5e5;
    color: #999;
}
.time {
    text-align: right;
    min-width: 50px;
    color: #778087;
    font-size: 11px;
}
</style>
