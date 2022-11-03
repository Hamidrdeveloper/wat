import React from 'react';
import PropTypes from 'prop-types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
// import Storage from '../../utils/storeData';
import Storage from '../../utils/storeData/index';
import { showToast } from 'react-native-gtoast';

class AuthDataService {
  signUp(data: string) {
    console.log(data);

    return http
      .get(`/api/v1/auth/watchlist/signup/verify/email/${data}?language=en`, data)
      .then(res => {
        console.log("SIGNUP_ADDRESS", res.data);
        TOKEN.token = res.data.token;
        showToast( res?.data?.message?.message, {
          duration: 5000
      })
        // Storage.storeData('TOKEN', res.data.data.token);
        return {data:res.data,loading:true};
      })
      .catch(error => {
        console.log("SIGNUP_ADDRESS", error.response);
        showToast( error?.message, {
          duration: 3000
      })
        return {data:error,loading:false};
      });
  }
  forgotRequestEmail(email: string) {
    console.log(email);

    return http
      .get(`/api/v1/auth/watchlist/forgot/password/${email}`)
      .then(res => {
        console.log("SIGNUP_ADDRESS", res.data);
        TOKEN.token = res.data.token;
        // Storage.storeData('TOKEN', res.data.data.token);
        setTimeout(() => {
          showToast( res?.data?.message?.message, {
            duration: 5000
        })
        }, 2000);
       
        return {data:res.data,loading:true};
      })
      .catch(error => {
        console.log("SIGNUP_ADDRESS", error.response);
        showToast( error?.message, {
          duration: 3000
      })
        return {data:error,loading:false};
      });
  }
  forgotRequest(data: string,password:string) {
    console.log(data);
    const value = {
      code:data,
          token:TOKEN.token,
          password:password,
     }
    return http
      .post(`/api/v1/auth/watchlist/forgot/password?language=en`,value)
      .then(res => {
        TOKEN.token = res.data.token;
        // Storage.storeData('TOKEN', res.data.data.token);
        return {data:res.data,loading:true};
      })
      .catch(error => {
        console.log("SIGNUP_ADDRESS", error.response?.data);
        showToast( error?.response?.data?.message, {
          duration: 3000
      })
        return {data:error,loading:false};
      });
  }
  code(data: string) {
    console.log(`/api/v1/auth/watchlist/signup/verify/email?language=en`, data+" "+TOKEN.token);
   const value = {
    code:data,
        token:TOKEN.token
   }
    return http
      .post(`/api/v1/auth/watchlist/signup/verify/email?language=en`, value)
      .then(res => {
        TOKEN.token = res.data.token;
        return {data:res.data,loading:true};
      })
      .catch(error => {
        console.log(`/api/v1/auth/watchlist/signup/verify/email?language=en`, error)
        showToast( error?.message, {
          duration: 3000
      })
        return {data:error,loading:false};
      });
  }
  information(password: string,fullName:string) {
    console.log(`/api/v1/auth/watchlist/signup/verify?language=en`, password+" "+TOKEN.token);
   const value = {
    password:password,
    fullName:fullName,
    token:TOKEN.token
   }
    return http
      .post(`/api/v1/auth/watchlist/signup/verify?language=en`, value)
      .then(res => {
        http.defaults.headers.common.Authorization = `Bearer ${TOKEN.token}`;

        Storage.storeData("User", TOKEN.token);
        return {data:res.data,loading:true};
      })
      .catch(error => {
        console.log(`information`, error)
        showToast( error?.message, {
          duration: 3000
      })
        return {data:error,loading:false};
      });
  }
  login(password: string,username:string) {
    console.log(`/api/v1/auth/watchlist/login`, password+" "+TOKEN.token);
   const value = {
    password:password,
    username:username,
   }
    return http
      .post(`/api/v1/auth/watchlist/login?language=de`, value)
      .then(res => {
        console.log(`/api/v1/auth/watchlist/login?language=de`, res);
        TOKEN.token = res.data.token;
        http.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

        Storage.storeData("User", res.data.token);
        return {data:res.data,loading:true};
      })
      .catch(error => {
        console.log(`/api/v1/auth/watchlist/login?language=de`, error?.message);
        showToast( error?.message, {
          duration: 3000
      })
        return {data:error,loading:false};
      });
  }
  forgotCode(password: string,code:string) {
    console.log(`/api/v1/auth/users/forgot/password?`, password+" "+TOKEN.token);
   const value = {
    password:password,
    code:code,
    token:TOKEN.token
   }
    return http
      .post(`/api/v1/auth/users/forgot/password?`, value)
      .then(res => {
        TOKEN.token = res.data.token;
        return {data:res.data,loading:true};
      })
      .catch(error => {
        console.log(`/api/v1/auth/users/forgot/password?`, error)
        showToast( error?.message, {
          duration: 3000
      })
        return {data:error,loading:false};
      });
  }
}
export default new AuthDataService();
