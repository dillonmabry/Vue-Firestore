<template>
    <div class="container">
    <div class="row">
      <div class="col s12 m12">
        <div class="login card-panel grey lighten-5 center">
          <h4>Login</h4>
          <form action="index.html">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email">
              <label for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password">
              <label for="password">Password</label>
            </div>
            <button v-on:click="login" class="btn btn-extended">Login</button>
            <button v-on:click="register" class="btn grey btn-extended">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'login',
  data: function() {
      return {
          email: '',
          password: ''
      }
  },
  methods: {
      login: function(e) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
              alert(`User logged in as ${user.email}`);
              this.$router.go({ path: this.$router.path });
          }, err => {
              alert(err.message);
          })
          e.preventDefault();
      },
      register: function(e) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
              alert(`Account created for ${user.email}`);
              this.$router.go({ path: this.$router.path });
          }, err => {
              alert(err.message);
          })
          e.preventDefault();
      }
  }
}
</script>

