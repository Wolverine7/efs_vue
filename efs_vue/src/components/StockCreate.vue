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
            Please verify Stock information.
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
                  v-model="stock.customer"
                  label="Customer"
                  required
                  type="number"
                />

                <v-text-field
                  v-model="stock.symbol"
                  label="Symbol"
                  required
                />
                <v-text-field
                  v-model="stock.name"
                  label="Name"
                  required
                />
                <v-text-field
                  v-model="stock.shares"
                  label="Shares"
                  required
                  type="number"
                />
                <v-text-field
                  v-model="stock.purchase_price"
                  label="Purchase Price"
                  required
                   type="number"

                />
                <v-text-field
                  v-model="stock.purchase_date"
                  label="Purchase Date"
                  required
                  type="date"
                />


              </v-container>
              <v-btn v-if="!isUpdate" class="blue white--text" @click="createStock">Save</v-btn>
              <v-btn v-if="isUpdate" class="blue white--text" @click="updateStock">Update</v-btn>
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
    name: 'StockCreate',
    components: {},
    data() {
      return {
        showError: false,
        stock: {},
        pageTitle: "Add New Stock",
        isUpdate: false,
        showMsg: '',
      };
    },
    methods: {
      createStock() {
        apiService.addNewStock(this.stock).then(response => {
          if (response.status === 201) {
            this.stock = response.data;
             this.showMsg = "";
            router.push('/stock-list/new');
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
         router.push("/stock-list");
      },
      updateStock() {
        apiService.updateStock(this.stock).then(response => {
          if (response.status === 200) {
            this.stock = response.data;
            router.push('/stock-list/update');
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
        this.pageTitle = "Edit Stock";
        this.isUpdate = true;
        apiService.getStock(this.$route.params.pk).then(response => {
          this.stock = response.data;
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
