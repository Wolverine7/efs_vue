<template>
  <main>
    <br/>
    <v-container fluid ma-0 pa-0 fill-height>
      <v-layout column align-center>
        <blockquote>
          &#8220;Welcome {{validUserName}}!&#8221;
          <footer>
            <small>
              <em>&mdash;Eagle Financial Services, your Midwest Financial Services Partner.</em>
            </small>
          </footer>
        </blockquote>

      </v-layout>
    </v-container>
    <br/> <br/> <br/>

    <v-container fluid fill-height>
      <v-layout justify-center row>
        <v-flex xs12 sm6>
          <v-card>
            <v-container
              fluid
              grid-list-md
            >
              <v-layout row>
                <v-flex xs4>
                  <v-card>
                    <v-img
                      :src="require('@/assets/images/customer.jpg')" height="200px">
                    </v-img>

                    <v-card-actions>
                      <v-btn flat color="orange" @click="viewCustomers">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>

                <v-flex xs4>
                  <v-card>
                    <v-img
                      :src="require('@/assets/images/nonstock.jpg')" height="200px">
                    </v-img>

                    <v-card-actions>
                      <v-btn flat color="orange" @click="viewInvestments">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex xs4>
                  <v-card>
                    <v-img
                      :src="require('@/assets/images/stocks.jpg')" height="200px">
                    </v-img>

                    <v-card-actions>
                      <v-btn flat color="orange" @click="viewStocks">View Details</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>

</template>

<script>
  import router from '../router';

  export default {
    name: 'Home',
    data: () => ({
      validUserName: "Guest"
    }),
    mounted() {
      this.getUser();
    },
    methods: {
      viewCustomers() {
        router.push('/customer-list');
      },

      viewInvestments() {
        router.push('/investment-list');
      },

      getUser() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          this.validUserName = JSON.parse(localStorage.getItem("log_user"));
        }
      }



    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
