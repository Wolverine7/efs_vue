<template>
  <main>
    <br/>
    <v-container fluid grid-list-md>
      <v-layout column align-left>
        <blockquote>
         Welcome {{validUserName}}!
          <footer>
            <small>
              <em>&mdash;Eagle Financial Services, your Midwest Financial Services Partner.</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>

       <v-layout column align-center>
       <v-flex xs6 sm8 md7>
       <v-alert v-if="showMsg === 'new'"
                dismissible
        :value="true"
        type="success"
      >
        New investment has been added.
      </v-alert>
      <v-alert v-if="showMsg === 'update'" dismissible
        :value="true"
        type="success"
      >
        Investment information has been updated.
      </v-alert>
         <v-alert v-if="showMsg === 'deleted'" dismissible
        :value="true"
        type="success"
      >
        Selected Investment has been deleted.
      </v-alert>

       </v-flex>
       </v-layout>
      <br/>
      <v-container fluid grid-list-md fill-height>
      <v-layout column>
        <v-flex md6>
      <v-data-table
        :headers="headers"
        :items="investments"
        hide-actions
        class="elevation-1"
        fixed
        style="max-height: 300px; overflow-y: auto"
      >

        <template slot="items" slot-scope="props" >
          <td>{{ props.item.customer }}</td>
          <td nowrap="true">{{ props.item.category }}</td>
          <td nowrap="true">{{ props.item.description }}</td>
          <td nowrap="true">{{ props.item.acquired_value }}</td>
          <td nowrap="true">{{ props.item.acquired_date }}</td>
          <td nowrap="true">{{ props.item.recent_value }}</td>
          <td nowrap="true">{{ props.item.recent_date }}</td>
          <td nowrap="true">
            <v-icon @click="updateInvestment(props.item)">edit</v-icon>
          </td>
          <td nowrap="true">
            <v-icon @click="deleteInvestment(props.item)">delete</v-icon>
          </td>

        </template>

      </v-data-table>
        </v-flex>
      </v-layout>
      </v-container>

      <v-btn class="blue white--text" @click="addNewInvestment">Add Investment</v-btn>
    </v-container>

  </main>
</template>


<script>

  import router from '../router';
  import {APIService} from '../http/APIService';
  const apiService = new APIService();

  export default {
    name: "InvestmentList",
    data: () => ({
      investments: [],
      validUserName: "Guest",
      investmentSize: 0,
      showMsg: '',
      headers: [

        {text: 'Customer', sortable: false, align: 'left',},
        {text: 'Category', sortable: false, align: 'left',},
        {text: 'Description', sortable: false, align: 'left',},
        {text: 'Acquired_Value', sortable: false, align: 'left',},
        {text: 'Acquired_Date', sortable: false, align: 'left',},
        {text: 'Recent_Value', sortable: false, align: 'left',},
        {text: 'Recent_Date', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'left',},
        {text: 'Delete', sortable: false, align: 'left',}

      ],

    }),
    mounted() {
      this.getInvestments();
      this.showMessages();
    },
    methods: {
      showMessages(){
        console.log(this.$route.params.msg)
         if (this.$route.params.msg) {
           this.showMsg = this.$route.params.msg;
         }
      },
      getInvestments() {
        apiService.getInvestmentList().then(response => {
          this.investments = response.data.data;
          this.investmentSize = this.investments.length;
          if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      },
      addNewInvestment() {
        if (localStorage.getItem("isAuthenticates")
          && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
          router.push('/investment-create');
        } else {
          router.push("/auth");
        }
      },
      updateInvestment(investment) {
        router.push('/investment-create/' + investment.pk);
      },
      deleteInvestment(investment) {
        apiService.deleteInvestment(investment.pk).then(response => {
          if (response.status === 204) {
            alert("Investment deleted");
            this.showMsg = 'deleted';
            this.$router.go();
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      }
    }
  };
</script>
