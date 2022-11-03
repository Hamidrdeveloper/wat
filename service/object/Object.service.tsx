import React from "react";
import PropTypes from "prop-types";
import http from "../../utils/http-common";
import { Langue, TOKEN } from "../../utils/main";
// import Storage from '../../utils/storeData';
class ObjectDataService {
  objectTemplate() {
    return http
      .get(`/api/v1/users/objects/template`)
      .then((res) => {

        return res.data.object_id;
      })
      .catch((error) => {
        console.log("SIGNUP_ADDRESS", error.response);

        return false;
      });
  }
  oject(e: string) {
    let search='';
    if(e!=null){
    let search  =`&objectName=${e}`
    }
    return http
      .get(`/api/v1/watchList/map/search?skip=1&limit=100${search}`)
      .then((res) => {
      
        return res.data;
      })
      .catch((error) => {
       


        return error.response.status;
      });
  }

  ojectImage(file, id) {
    let formData = new FormData();
    formData.append("symbolPhoto", {
      uri: file.uri,
      name: `photo.${file.type}`,
      type: `image/${file.type}`,
    });
    return http
      .put(`/api/v2/users/objects/${id}/symbolPhoto`, formData, {
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
  ojectMultiImage(file, id) {
    let formData = new FormData();
    formData.append("photo", {
      uri: file.uri,
      name: `photo.${file.type}`,
      type: `image/${file.type}`,
    });
    return http
      .post(`/api/v2/users/objects/${id}/objectPhoto`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        
      })
      .catch((error) => {
        console.log("ojectImageerror", error);
        //handle error
      });
  }

  objectCreate(
    fullName: string,
    address: [],
    location,
    numberId: number
  ) {
    console.log(`/api/v1/users/objects/${numberId}`);
    const value = {
      fullName: fullName,
      address: address,
      location: {
        lat: location?.lat,
        lng: location?.lng,
      },
    };
    console.log(`objectCreate`,value);
    return http
      .post(`/api/v1/users/objects/${numberId}`, value)
      .then((res) => {
       
        return true;
      })
      .catch((error) => {
        console.log(
          `/api/v1/Object/users/signup/verify/email?language=${Langue.lan}`,
          error
        );
        return false;
      });
  }
  objectCreatePut(
    fullName: string,
    address: [],
    location: { lat: number; lng: number },
    numberId: number
  ) {
    const value = {
      fullName: fullName,
      address: address,
      location: {
        lat: location?.lat,
        lng: location?.lng,
      },
    };
    return http
      .put(`/api/v1/users/objects/${numberId}`, value)
      .then((res) => {
       
        return true;
      })
      .catch((error) => {
       
        return false;
      });
  }

  objectId(_id) {
   
    return http
      .get(`/api/v1/watchList/objects/${_id}`)
      .then((res) => {
       
        return res.data;
      })
      .catch((error) => {
        console.log(
          `objectId`,
          error
        );
        return {};
      });
  }
  deleteObjectId(_id) {
   
    return http
      .delete(`/api/v1/users/objects/${_id}`)
      .then((res) => {
        
        return res.data;
      })
      .catch((error) => {
        console.log(
          `deleteObjectId`,
          error
        );
        return {};
      });
  }
  filterCompany() {
   
    return http
      .get(`/api/v1/filters?skip=1&limit=100&language=${Langue.lan}`)
      .then((res) => {
       
        return res.data?.objects_filters;
      })
      .catch((error) => {
        console.log(
          `filterCompany`,
          error
        );
        return {};
      });
  }
  numberCompany() {
    return http
      .get(`/api/v1/watchList/onboarding/onboarding`)
      .then((res) => {
       
        return res.data;
      })
      .catch((error) => {
        console.log(
          `numberCompany`,
          error
        );
        return {};
      });
  }
  baseData() {
    return http
      .get(`/api/v1/baseData`)
      .then((res) => {
        console.log(
          `baseData`,
          res.data
        );
        return res.data;
      })
      .catch((error) => {
        console.log(
          `baseData`,
          error
        );
        return {};
      });
  }
}
export default new ObjectDataService();
