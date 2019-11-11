/* eslint-disable */
import axios from 'axios';
const API_URL = 'http://localhost:8000'; /* http://groyce.pythonanywhere.com/ or http://localhost:8000 */
// const API_URL = 'https://efs-vue-bobo.herokuapp.com';

export class APIService {
  constructor() {

  }

  getCustomer(param_pk) {
    const url = `${API_URL}/api/customers/${param_pk}`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

  getCustomerList() {
    const url = `${API_URL}/api/customers/`;
    let jwtToken = localStorage.getItem('token');
    console.log(":::jwtToken:::::" + jwtToken);
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.get(url, {headers: headers});

  }

  addNewCustomer(customer) {
    const url = `${API_URL}/api/customers/`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.post(url, customer, {headers: headers});
  }

  updateCustomer(customer) {
    const url = `${API_URL}/api/customers/${customer.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, customer, {headers: headers});
  }

  deleteCustomer(customer_Pk) {
    const url = `${API_URL}/api/customers/${customer_Pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.delete(url, {headers: headers});
  }


  authenticateLogin(credentials) {
    const url = `${API_URL}/auth/`;
    return axios.post(url, credentials);
  }

  getInvestment(param_pk) {
     const url = `${API_URL}/api/investments/${param_pk}`;
     let jwtToken = localStorage.getItem('token');
     console.log(":::jwtToken:::::"+jwtToken);
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

  getInvestmentList() {
       const url = `${API_URL}/api/investments`;
       let jwtToken = localStorage.getItem('token');
       console.log(":::jwtToken:::::" + jwtToken);
       const headers = {Authorization: `jwt ${jwtToken}`};
       return axios.get(url, {headers: headers});

   }

    addNewInvestment(investment){
   const url = `${API_URL}/api/investments/`;
   let jwtToken = localStorage.getItem('token');
   const headers = {Authorization: `jwt ${jwtToken}`};
   return axios.post(url, investment, {headers: headers});
  }

  updateInvestment(investment){
    const url = `${API_URL}/api/investments/${investment.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, investment, {headers: headers});
  }

  deleteInvestment(investment_Pk){
     const url = `${API_URL}/api/investments/${investment_Pk}`;
     let jwtToken = localStorage.getItem('token');
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.delete(url, {headers: headers});
  }
  getStock(param_pk) {
     const url = `${API_URL}/api/stocks/${param_pk}`;
     let jwtToken = localStorage.getItem('token');
     console.log(":::jwtToken:::::"+jwtToken);
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.get(url, {headers: {Authorization: `jwt ${jwtToken}`}});
  }

  getStockList() {
       const url = `${API_URL}/api/stocks`;
       let jwtToken = localStorage.getItem('token');
       console.log(":::jwtToken:::::" + jwtToken);
       const headers = {Authorization: `jwt ${jwtToken}`};
       return axios.get(url, {headers: headers});

   }

  addNewStock(stock){
   const url = `${API_URL}/api/stocks/`;
   let jwtToken = localStorage.getItem('token');
   const headers = {Authorization: `jwt ${jwtToken}`};
   return axios.post(url, stock, {headers: headers});
  }

    updateStock(stock){
    const url = `${API_URL}/api/stocks/${stock.pk}`;
    let jwtToken = localStorage.getItem('token');
    const headers = {Authorization: `jwt ${jwtToken}`};
    return axios.put(url, stock, {headers: headers});
  }

    deleteStock(stock_Pk){
     const url = `${API_URL}/api/stocks/${stock_Pk}`;
     let jwtToken = localStorage.getItem('token');
     const headers = {Authorization: `jwt ${jwtToken}`};
     return axios.delete(url, {headers: headers});
  }

}
