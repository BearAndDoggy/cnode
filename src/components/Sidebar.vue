<template>
  <div class="sideBar">
    <div class="title">作者</div>
    <section class="author">
      <div class="mainMessage">
        <router-link :to="{name: 'user_info',params: {name:userInfo.loginname}}">
          <img :src="userInfo.avatar_url" alt class="avatar">
        </router-link>
        <router-link :to="{name: 'user_info',params: {name:userInfo.loginname}}">
          <span class="name">{{userInfo.loginname}}</span>
        </router-link>
      </div>
      <div class="score">积分：{{userInfo.score}}</div>
    </section>
    <div class="title">作者最近主题</div>
    <section class="topic" id="createTopic">
      <ul>
        <li v-for="topic in createLimitFive">
          <router-link :to="{name:'content', params: {id:topic.id,name:topic.author.loginname}}">
            <span class="topicTitle">{{topic.title}}</span>
          </router-link>
        </li>
      </ul>
    </section>
    <div class="title">作者最近回复</div>
    <section class="topic" id="replyTopic">
      <ul>
        <li v-for="topic in replyLimitFive">
          <router-link :to="{name:'content', params: {id:topic.id,name:topic.author.loginname}}">
            <span class="topicTitle">{{topic.title}}</span>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    fetchData() {
      this.$axios
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          if (res.data.success) {
            this.userInfo = res.data.data
          }
        })
    }
  },
  computed: {
    createLimitFive() {
      if (this.userInfo.recent_topics) {
        return this.userInfo.recent_topics.slice(0, 5)
      }
    },
    replyLimitFive() {
      if (this.userInfo.recent_replies) {
        return this.userInfo.recent_replies.slice(0, 5)
      }
    }
  },
  beforeMount() {
    this.fetchData()
  }
}
</script>
<style scoped>
.title {
  padding: 10px 8px;
  background: rgb(246, 246, 246);
  color: #51585c;
  font-size: 13px;
}
.sideBar {
  float: right;
  width: 28%;
  border-radius: 3px;
  overflow: hidden;
}
section {
  background: white;
}
.author {
  padding: 12px 12px;
}
.mainMessage {
  display: flex;
  align-items: center;
}
.author .avatar {
  display: block;
  width: 48px;
  height: 48px;
  margin-right: 8px;
  border-radius: 3px;
}
.author .name {
  color: #778087;
}
.author .score {
  margin-top: 10px;
  font-size: 14px;
}

.topic li {
  font-size: 14px;
  color: #778087;
  padding: 5px 20px 5px 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
