<template>
  <nav>
      <div class="nav-wrapper teal">
          <div class="container">
              <router-link to="/" class="brand-logo">Employee Manager</router-link>
              <ul class="right">
                  <li v-if="isLogin"><span class="email">{{currentUser}}</span></li>
                  <li v-if="isLogin"><router-link to="/">Dashboard</router-link></li>
                  <li v-if="!isLogin"><router-link to="/login">Login</router-link></li>
                  <li v-if="isLogin"><a v-on:click="logout">Logout</a></li>
                  <!-- <li v-if="isLogin"><button v-on:click="logout" class="btn">Logout</button></li> -->
              </ul>
          </div>
      </div>
  </nav>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'navbar',
  data() {
      return {
          isLogin: false,
          currentUser: false
      }
  },
  created() {
      if(firebase.auth().currentUser) {
          this.isLogin = true;
          this.currentUser = firebase.auth().currentUser.email;
      }
  },
  methods: {
      logout: function() {
          firebase.auth().signOut().then(() => {
              this.$router.go({path: this.$router.path});
          })
      }
  }
}
</script>

<style scoped>
.email {
    padding-right:10px;
}
</style>

