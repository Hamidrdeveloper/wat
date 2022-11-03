import React from 'react';
import PropTypes from 'prop-types';
import http from '../../utils/http-common';
import {TOKEN} from '../../utils/main';
// import Storage from '../../utils/storeData';
let controller = new AbortController();

class ObjectDataService {
  ojectSearch(first?:number,two?:number,object?:string) {
    return http
      .get(`/api/v1/map/search?skip=1&limit=100&fullName=${object}`)
      .then(res => {

        // Storage.storeData('TOKEN', res.data.data.token);
        return  res.data;
      })
      .catch(error => {
        console.log("SIGNUP_ADDRESS error", error.response);

        return false;
      });
  }

  objectSearchMap(ob:any) {
    const va =  JSON.stringify(ob)
    const request = {
      params: JSON.stringify(ob)
    }
  // console.log('objectSearchMap',JSON.stringify(ob));
  
    return http
      .get(`/api/v2/watchList/map/objects`,{params:ob, signal: controller.signal})
      .then(res => {
      

        return  res?.data;
      })
      .catch(error => {
        console.log(`/api/v2/watchList/map/objects`, error)
        return [];
      });
  }
  abort() {
    controller.abort()

  }
  signal() {
    controller = new AbortController();


  }
}
export default new ObjectDataService();
