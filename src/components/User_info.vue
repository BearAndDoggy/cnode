<template>
    <div>
        <div class="loading" v-if="complete">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div class="userinfo">
            <div class="title">主页 /</div>
            <section class="mainPage">
                <div class="wrap">
                    <div>
                        <img :src="userInfo.avatar_url" alt="" class="avatar">
                        <span class="name">{{userInfo.loginname}}</span>
                    </div>
                    <div class="score">{{userInfo.score}} 积分</div>
                    <div class="loginTime">注册时间{{userInfo.create_at | showTime}}</div> 
                </div>               
            </section>
            <div class="title">最近创建的话题</div>
            <section id="latestTopicBuilt" class="topic">
                <ul v-if="all">
                    <li v-for="recent in userInfo.recent_topics">
                        <img :src="recent.author.avatar_url" class="avatar">
                        <router-link :to="{name:'content', params: {id: recent.id,name: recent.author.loginname}}" class="ContentTitle">
                            <span class="topicTitle">{{recent.title}}</span>
                        </router-link>                       
                        <span class="last_reply">{{recent.last_reply_at | showTime}}</span>
                    </li>
                </ul>        
                <ul v-else>
                    <li v-for="recent in currentTopic">
                        <img :src="recent.author.avatar_url" class="avatar">
                        <router-link :to="{name:'content', params: {id: recent.id,name: recent.author.loginname}}" class="ContentTitle">
                            <span class="topicTitle">{{recent.title}}</span>
                        </router-link>                       
                        <span class="last_reply">{{recent.last_reply_at | showTime}}</span>
                    </li>
                </ul>
                <div v-if="showMore" class="showMore"
                @click="showMoreLi()"><span>{{showString?'展示全部':'展示部分'}}»</span></div>
            </section>
            <div class="title">最近参与的话题</div>
            <section id="latestTopicIn" class="topic">         
                <ul>
                    <li v-for="recent in userInfo.recent_replies">
                        <img :src="recent.author.avatar_url" class="avatar">
                        <router-link :to="{name:'content', params: {id: recent.id,name: recent.author.loginname}}" class="ContentTitle">
                            <span class="topicTitle">{{recent.title}}</span>
                        </router-link>
                        <span class="last_reply">{{recent.last_reply_at | showTime}}</span>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>
<script>
export default {
  name: 'User_info',
  data(){
      return {
          complete:true,
          userInfo: {
              recent_topics: [],
          },
          showMore: false,
          showString: true,
          all: false
      }
  },
  methods: {
      fetchData(){
          this.$axios.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(res=>{
              if(res.data.success) {
                this.complete = false
                this.userInfo = res.data.data
              }
          })
      },
      showMoreLi(){
          this.showString = !this.showString
          this.all = !this.all
      }
  },
  computed: {
      currentTopic(){
          if (this.userInfo.recent_topics.length > 5) {
              this.showMore = true
              return this.userInfo.recent_topics.slice(0,5)
          } else {
              return this.userInfo.recent_topics
          }
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
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.userinfo {
    display: flex;
    flex-direction: column;
    background: rgb(225, 225, 225);
}
.mainPage, .topic {
    background: white;
}
.title:first-child {
    color: #80bd01;
}
.title {
    padding: 10px;   
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    overflow: hidden;
    font-size: 14px;
}
.title:not(:first-child) {
    margin-top: 12px;
}
.mainPage .wrap{
    position: relative;
    margin: 12px 10px;
    font-size: 14px;
}
.mainPage .avatar {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 10px;
}
.mainPage span {
    position: absolute;
    color: #778087;
    font-weight: 400;
    top: 6px;
}
.mainPage .score {
    margin: 10px 0;
}
.mainPage .loginTime {
    color: #ababab;
}
.showMore {
    padding: 10px;
    font-size: 14px;
}
.showMore span:hover{
    color: #08c;
    cursor: pointer;
}
.topic li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    border-bottom: 0.1px solid rgb(225, 225, 225);
    
}
.topic li a {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.topic .avatar {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.topic .ContentTitle {
    font-size: 16px;
    flex: 1;
    padding-left: 22px;
    text-decoration: none;
    color: #08c;
}
.topic .ContentTitle:hover {
    text-decoration: underline;
    color: #005580;
}
.topic .last_reply {
    color: #777;
    font-size: 11px;
}
</style>
