import React from 'react';
import PropTypes from 'prop-types';
import http from '../../utils/http-common';
import {Langue, TOKEN} from '../../utils/main';
// import Storage from '../../utils/storeData';
class ProfileDataService {
  profile() {
  

    return http
      .get(`/api/v1/users/profile?language=${Langue.lan}`)
      .then(res => {
        console.log("SIGNUP_ADDRESS", res.data);
        // Storage.storeData('TOKEN', res.data.data.token);
        return res.data;
      })
      .catch(error => {
        console.log("SIGNUP_ADDRESS", error.response);

        return false;
      });
  }
  
  userProfile(fullName: string,phoneNumber: string) {
    console.log(`/api/v1/users/profile`);
   const value = {
    fullName:fullName,
    phoneNumber:phoneNumber
   }
    return http
      .put(`/api/v1/users/profile`, value)
      .then(res => {
        console.log(`/api/v1/users/profile`, res);
        TOKEN.token = res.data.token;
        return true;
      })
      .catch(error => {
        console.log(`/api/v1/Profile/users/signup/verify/email?language=${Langue.lan}`, error)
        return false;
      });
  }
  userLanguage(language: string) {
    console.log(`/api/v1/users/profile/language?language=en`, language);
   const value = {
    language:language,
   }
    return http
      .put(`/api/v1/users/profile/language?language=${language}`)
      .then(res => {
        console.log(`/api/v1/Profile/users/signup/verify/email?language=${Langue.lan}`, res);
        TOKEN.token = res.data.token;
        return true;
      })
      .catch(error => {
        console.log(`/api/v1/Profile/users/signup/verify/email?language=${Langue.lan}`, error)
        return false;
      });
  }
  userAvatar(file) {
    let formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: `photo.${file.type}`,
      type: `image/${file.type}`,
    });
    return http
      .put(`/api/v2/users/profile/avatar?language=en`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        //handle success
        console.log("ojectImage", response);
      })
      .catch((error) => {
        console.log("ojectImageerror", error);
        //handle error
      });
  }
}
export default new ProfileDataService();
