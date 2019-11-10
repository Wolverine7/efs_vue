<template>
  <v-container grid-list-md>
    <v-layout row wrap align-left justify-left fill-height>
      <v-flex xs12 sm8 lg7 md5>
         <v-layout column align-center>
       <v-flex xs6 sm8 md7>

         <v-alert v-if="showMsg === 'error'"
                dismissible
        :value="true"
        type="error"
      >
            Please verify Customer information.
      </v-alert>
       </v-flex>
         </v-layout>
        <v-card class="login-card">
          <v-card-title>
            <span class="headline">{{pageTitle}}</span>
          </v-card-title>

          <v-spacer/>

          <v-card-text>


            <v-form ref="form" lazy-validation>
              <v-container>

                <v-text-field
                  v-model="customer.cust_number"
                  label="Customer Number"
                  required
                  type="number"
                />

                <v-text-field
                  v-model="customer.name"
                  label="Name"
                  required
                />
                <v-text-field
                  v-model="customer.address"
                  label="Address"
                  required  />
                <v-text-field
                  v-model="customer.city"
                  label="City"
                  required
                />
                <v-text-field
                  v-model="customer.state"
                  label="State"
                  required
                />
                <v-text-field
                  v-model="customer.zipcode"
                  label="ZipCode"
                  required
                />
                <v-text-field
                  v-model="customer.email"
                  label="Email"
                  required
                />
                <v-text-field
                  v-model="customer.cell_phone"
                  label="Phone"
                  required
                />

              </v-container>
              <v-btn v-if="!isUpdate" class="blue white--text" @click="createCustomer">Save</v-btn>
              <v-btn v-if="isUpdate" class="blue white--text" @click="updateCustomer">Update</v-btn>
              <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>


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
    name: 'CustomerCreate',
    components: {},
    data() {
      return {
        showError: false,
        customer: {},
        pageTitle: "Add New Customer",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      createCustomer() {
        apiService.addNewCustomer(this.customer).then(response => {
          if (response.status === 201) {
            this.customer = response.data;
             this.showMsg = "";
            router.push('/customer-list/new');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
            this.showMsg = "error";
          }
        });
      },
      cancelOperation(){
         router.push("/customer-list");
      },
      updateCustomer() {
        apiService.updateCustomer(this.customer).then(response => {
          if (response.status === 200) {
            this.customer = response.data;
            router.push('/customer-list/update');
          }else{
              this.showMsg = "error";
          }
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }else if (error.response.status === 400) {
         this.showMsg = "error";
          }
        });
      }
    },
    mounted() {
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Customer";
        this.isUpdate = true;
        apiService.getCustomer(this.$route.params.pk).then(response => {
          this.customer = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>

