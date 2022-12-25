import AuthDataService from "./Object.service";
import React from "react";

export function objectAc(object:any) {
  return AuthDataService.oject(object);
}

export function numberCompanyAc() {
  return AuthDataService.numberCompany();
}
export function baseDataAc() {
  return AuthDataService.baseData();
}



export function filterCompanyAc() {
  return AuthDataService.filterCompany();
}
export function objectTemplateAc() {
  return AuthDataService.objectTemplate();
}
export function ojectImageAc(file,id) {
  return AuthDataService.ojectImage(file,id);
}
export function ojectMultiImageAc(file,id) {
  return AuthDataService.ojectMultiImage(file,id);
}

export function objectIdAc(id) {
  return AuthDataService.objectId(id);
}
export function deleteObjectIdAc(id) {
  return AuthDataService.deleteObjectId(id);
}


export function objectCreate(
  fullName: string,
  address: [],
  location,
  numberId: number
) {
  return AuthDataService.objectCreate(fullName, address, location, numberId);
}
export function objectCreatePut(
  fullName: string,
  address: [],
  location: { lat: number; lng: number },
  numberId: number
) {
  return AuthDataService.objectCreatePut(fullName, address, location, numberId);
}
