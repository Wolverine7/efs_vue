<template>

  <v-app>
    <v-toolbar class="blue">
      <v-toolbar-title>Eagle Finance Service</v-toolbar-title>
      <v-toolbar-items>
        <v-btn flat dark @click="goHome">Home</v-btn>
        <v-btn flat dark @click="viewCustomers">Customers</v-btn>
         <v-btn flat dark @click="viewStocks">Stocks</v-btn>
         <v-btn flat dark @click="viewInvestments">Investments</v-btn>
        <v-btn flat dark v-if="!authenticated"
               @click="login">Log in
        </v-btn>
        <v-btn flat dark v-if="authenticated"
               @click="logout">Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>

      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
  import router from './router';
  import {APIService} from './http/APIService';
  const apiService = new APIService();

  export default {
    name: 'App',
    data: () => ({
      authenticated: false,
    }),

    mounted() {
        apiService.getCustomerList().then(response => {
          this.authenticated = true;
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            this.authenticated = false;
          }
        });
        console.log('this.authenticated--'+this.authenticated);
    },

    methods: {
      logout() {
        localStorage.removeItem('isAuthenticates');
        localStorage.removeItem('log_user');
        localStorage.removeItem('token');
        this.authenticated = false;
       // router.push('/');
         window.location = "/"
      },
      viewCustomers() {
        router.push('/customer-list');
      },
      viewInvestments() {
        router.push('/investment-list');
      },
      login() {
        router.push("/auth");
      },

      goHome() {
        router.push('/');
      },

      viewStocks() {
        router.push('/stock-list');
      },
    }
  };
</script>

