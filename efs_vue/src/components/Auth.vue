<template>

  <v-container grid-list-md>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12 sm8 lg4 md5>
        <v-card class="login-card">
          <v-card-title>
            <span class="headline">Login</span>
          </v-card-title>
            <v-alert v-if="showMsg === 'error'"
                dismissible
        :value="true"
        type="error"
      >
       Invalid username or password. Please Try again.
      </v-alert>

          <v-spacer/>

          <v-card-text>

            <v-layout
              row
              fill-height
              justify-center
              align-center
              v-if="loading"
            >
              <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              />
 </v-layout>


            <v-form v-else ref="form" v-model="valid" lazy-validation>
              <v-container>

                <v-text-field
                  v-model="credentials.username"
                  :counter="70"
                  label="username"
                  :rules="rules.username"
                  maxlength="70"
                  required
                />

                <v-text-field
                  type="password"
                  v-model="credentials.password"
                  :counter="20"
                  label="password"
                  :rules="rules.password"
                  maxlength="20"
                  required
                />

              </v-container>
              <v-btn class="blue white--text" :disabled="!valid" @click="login">Login</v-btn>

            </v-form>


          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: 'Auth',

    data: () => ({
      credentials: {},
      valid: true,
      showMsg: '',
      loading: false,
      rules: {
        username: [
          v => !!v || "Username is required",
          v => (v && v.length > 3) || "A username must be more than 3 characters long",
          v => /^[a-z0-9_]+$/.test(v) || "A username can only contain letters and digits"
        ],
        password: [
          v => !!v || "Password is required",
          v => (v && v.length > 7) || "The password must be longer than 7 characters"
        ]
      }
    }),
    methods: {
      login() {
        // checking if the input is valid
        if (this.$refs.form.validate()) {
          this.loading = true;
            apiService.authenticateLogin(this.credentials).then((res)=>{
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('isAuthenticates', JSON.stringify(true));
            localStorage.setItem('log_user', JSON.stringify(this.credentials.username));
            //router.push("/");
            //router.go(-1);
             window.location = "/"
          }).catch(e => {
            this.loading = false;
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
           // router.go(-1);
            this.showMsg = 'error';
          })
        }
      }
    }
  }
</script>
