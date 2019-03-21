<template>
    <div class="article">
        <div class="up">
            <div class="loading" v-if="complete">
                <img src="../assets/loading.gif" alt="">
            </div>
            <div class="content">
                <div class="title">
                    <span class="sort">{{messages | showSort}}</span>
                    <span class="main_title">{{messages.title}}</span>
                </div>
                <div class="details">
                    <ul>
                        <li>• 发布于{{messages.create_at | showTime}}</li>
                        <li>• 作者{{messages.author.loginname}}</li>
                        <li>• {{messages.visit_count}}次浏览</li>
                        <li>• 最后一次编辑是在{{messages.last_reply_at | showTime}}</li>
                        <li>• 来自 {{messages | showFrom}}</li>
                    </ul>
                </div>
                <div v-html="messages.content" class="main_content" id="content"></div>
                <div class="split"></div>
            </div>
        </div>
        <div class="reply">
            <div class="replyCount">{{messages.replies.length}} 回复</div>
            <ul>
                <li v-for="(reply, index) in messages.replies">
                    <div class="details_reply">
                        <router-link :to="{name: 'user_info',params:{name: reply.author.loginname}}">
                            <div class="avatar"><img :src="reply.author.avatar_url" alt=""></div>
                        </router-link>                                               
                        <div class="name-wrap">
                            <router-link :to="{name: 'user_info',params:{name: reply.author.loginname}}">   
                                <span class="name">{{reply.author.loginname}}</span>
                            </router-link> 
                            <span class="index">{{index + 1}}楼•{{reply.create_at | showTime}}</span>
                        </div>
                    </div>
                    <i class="reply_content" v-html="reply.content"></i>
                    <span class="like" v-if="reply.ups.length > 0">
                        <img src="../assets/点赞.png" alt=""><span>{{reply.ups.length}}</span> 
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Article',
  data(){
      return {
          complete: true,
          messages: {
              replies: [],
              author: {
                  loginname: ""
              }
          }
      }
  },
  methods: {
      fetchData(){
          this.$axios.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
          .then(res=>{
              if (res.data.success) {
                    this.complete = false
                    this.messages = res.data.data
              }
             
          },error=>{
              console.log(error);
          })
      }
  },
  beforeMount(){
      this.fetchData()
  },
  watch: {
      '$route'(){
          this.fetchData()
      }
  }
}
</script>

<style>
@import url('../assets/markdown-github.css');
</style>
<style scoped>
    .loading {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: rgb(225, 225, 225);
        z-index: 1;
    }
    .article {
        background: rgb(225, 225, 225);
        float: left;
        width: 70.5%;
        margin-bottom: 30px;
    }
    .up {
        background: white;
        border-radius: 6px;
    }
    .title {
        padding: 10px 10px 6px;
    }
    .title .sort {
        background: #80bd01;
        padding: 2px 4px;
        border-radius: 3px;
        font-size: 12px;
        color: #ffffff;
        margin-right: 4px;
    }
    .title .main_title {
        font-size: 22px;
        font-weight: 700;
        margin: 8px 0;
        display: inline-block;
    }
    .details {
        border-bottom: 2px solid rgb(240, 240, 240);
    }
    .details ul{
        margin-left: 6px;
        display: flex;
        list-style: none;
        font-size: 12px;
        color: #838383;     
    }
    .details ul li{
        margin: 0px 2px 12px;
    }
    #content{    
        font-size: 15px;
        margin: 18px 20px;
    }
    #content p{    
        white-space: pre-wrap;
    }
    .split {
        height: 15px;
        background: rgb(225, 225, 225);
    }
    .reply {
        overflow: hidden;
        border-radius: 6px;
        background: white;
    }

    .reply .replyCount {
        background: rgb(246,246,246);
        line-height: 40px;
        padding-left: 10px;
    }
    .reply ul li{
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .reply .details_reply {
        display: flex;
    }
    .reply ul li .avatar{
        margin: 10px;
        border-radius: 3px;
        overflow: hidden;
    }
    .reply ul li .avatar img{
        display: block;
        width: 30px;
        height: 30px;
    }
    .reply .name-wrap {
       padding-top: 10px;
    }
    .reply .name {      
        margin-right: 1px;
        color: #666;
        font-size: 12px;
        font-weight: 700;
    }
    .reply .name:hover {
        color: #385f8a;
    }
    .reply .index {
        font-size: 11px;
        color: #08c;
    }
    .reply .reply_content {
        font-style: normal;
        margin-top: -15px;
        padding-bottom: 30px;
        padding-left: 60px;
        border-bottom: 1px solid rgb(225, 225, 225);
        font-size: 15px;
    }

    .reply .reply_content a{
        color: #08c;
    }
    .reply .reply_content a:hover{
        text-decoration: underline;
    }
    .reply .like {
        position: absolute;
        right: 10px;
        top: 10px;
        color: gray;
    }
    .reply .like span{
        line-height: 12px;
        font-size: 15px;
    }
    .reply .like img {
        padding-right: 3px;
        width: 15px;
        height: 15px;
    }
</style>
