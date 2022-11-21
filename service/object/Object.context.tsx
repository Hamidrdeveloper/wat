import React, {createContext, ReactElement, useContext, useEffect, useState} from 'react';
import { ToastAndroid } from 'react-native';
import { navigationStatic } from '../../utils/main';
// import Toast from '../../components/toast';
import {
  objectAc,
  objectCreate,
  objectCreatePut,
  objectIdAc,
  objectTemplateAc,
  ojectImageAc,
  deleteObjectIdAc,
  ojectMultiImageAc,
  filterCompanyAc,
  numberCompanyAc,
  baseDataAc
} from './Object.action';
import Storage from '../../utils/storeData/index'
import { MapContext } from '../map/Map.context';

interface IObjectContext {
  objectFc:any;
  objectCreateFc:any;
  isRegister:boolean;
  objectCreatePutFc:any;
  objectTemplateFc:any;
  objectImageFc:any;
  objects:any;
  objectIdFc:any;
  objectsDetails:any;
  isShowObject:boolean;
  deleteObjectIdFc:any;
  isAddObject:any;
  ojectMultiImageFc:any;
  isEditObject:any;
  objectTwoIdFc:any;
  isShowObjectTwo:any
  setIsShowObject:any;
  setIsShowObjectTwo:any;
  setIsAddObject:any;
  setIsEditObject:any;
  nameCompany:any;
  setNameCompany:any;
  filterCompanyFc:any;
  numberCompany:any;
  numberCompanyFc:any;
  setLanObject:any;
  lanObject:any;
  baseDataFc:any;
  baseData:any;
  setOpenObject:any;
  openObject:any;
  isShowObjectLoading:any;
  setReactAnimation:any;
  reactAnimation:any;
}
export const ObjectContext = createContext<IObjectContext>({} as IObjectContext);
export default function ObjectContextProvider({
  children,
}: {
  children: ReactElement;

}) {
  const [openObject, setOpenObject] = useState(false)

  const [isRegister, setIsRegister] = useState(false)
  const [idObject, setIdObject] = useState(0)
  const [objects, setObjects] = useState()
  const [objectsDetails, setObjectsDetails] = useState()
  const [isShowObject, setIsShowObject] = useState(false)
  const [isAddObject, setIsAddObject] = useState(false)
  const [isEditObject, setIsEditObject] = useState(false)
  const [nameCompany, setNameCompany] = useState([])
  const [numberCompany, setNumberCompany] = useState()
  const [lanObject, setLanObject] = useState()
  const [isShowObjectLoading, setIsShowObjectLoading] = useState(false)
  const [reactAnimation, setReactAnimation] = useState(false)

  const [baseData, setBaseData] = useState()
  
  
  const [isShowObjectTwo, setIsShowObjectTwo] = useState(false)
  const {MapSearchMapFc} = useContext(MapContext)
  useEffect(() => {
    numberCompanyFc();
    filterCompanyFc();
  }, [])

  
  const baseDataFc=()=>{
    baseDataAc().then((res)=>{
     
      setBaseData(res)
    });
  }
  const objectIdFc=(id)=>{
    setIsShowObjectLoading(true)
    setIsShowObject(false)
   
    objectIdAc(id).then((res)=>{
      if(res?.object?.length>0){
        
        setObjectsDetails(res.object[0])
        setIsShowObject(true)
        setIsShowObjectLoading(false)

      }else{
        ToastAndroid.show('Request sent unsuccessfully!', ToastAndroid.SHORT);
      }
    
    });
    setIsShowObjectLoading(false)

    setIsShowObject(false)
  }
  const objectTwoIdFc=(id)=>{
    setIsShowObjectTwo(false)
    objectIdAc(id).then((res)=>{
      if(res.object!=null){
        setObjectsDetails(res.object)
        setIsShowObjectTwo(true)
      }else{
        ToastAndroid.show('Request sent unsuccessfully!', ToastAndroid.SHORT);
      }
    
    });
    setIsShowObjectTwo(false)
  }
  const objectTemplateFc=()=>{
  
    objectTemplateAc().then((res)=>{
      setIdObject(res)
    });
  }
  const numberCompanyFc=()=>{
  
    numberCompanyAc().then((res)=>{
      setNumberCompany(res)
    });
  }
  
  const objectFc =(e:string)=>{

    objectAc(e).then((res)=>{
      if(res==401){
        Storage.removeData("User")
        navigationStatic.navigation.navigate("SignIn");
        
      }
      setObjects(res?.objects);
    });
    
   }
   
   const ojectMultiImageFc =(file,id=idObject,put=false)=>{
   
    ojectMultiImageAc(file,id).then(()=>{
      objectFc(1,100);
      if(put){
        objectIdFc(objectsDetails?._id);
       }
    });
    
   }

   const objectImageFc =(file,id=idObject,put=false)=>{
   
    ojectImageAc(file,id).then(()=>{
      objectFc(1,100);
       if(put){
        objectIdFc(objectsDetails?._id);
       }
    });
    
   }

   const objectCreateFc =(fullName: string,
    address: [],
    location,image,multiImage)=>{
      setIsAddObject(false);
    objectCreate(fullName, address, location, idObject).then((res)=>{
      if(image!=null){
        objectImageFc(image);
      }
      
      multiImage.forEach(element => {
        if(element.image!="add"){
          setTimeout(() => {
            ojectMultiImageFc(element.image)
          }, 2000);
        }
      });
      if(res==true){
        setIsAddObject(true);
        objectFc(1,100);
        if(location.lat!=null&&location.lat>9){
          let lat=location?.lat+"";
          let lng=location?.lat+"";
          MapSearchMapFc(lat.substring(0,2),lat.substring(0,2),lng.substring(0,2),100,90);
        }
        
        
       
      }else{
        ToastAndroid.show('Request sent unsuccessfully!', ToastAndroid.SHORT);
      }
      objectFc(1,100);
    });
    setIsAddObject(false);
   }
   const objectCreatePutFc =(fullName: string,
    address: [],
    location,image,multiImage)=>{
      setIsEditObject(false);
    objectCreatePut(fullName, address, location, objectsDetails?._id).then((res)=>{
    
      if(image!=null){
        objectImageFc(image,objectsDetails?._id,true);
      }
      multiImage.forEach(element => {
        if(element.image!="add"){
          setTimeout(() => {
            ojectMultiImageFc(element.image,objectsDetails?._id,true)
          }, 2000);
        }
      });
      if(res==true){
        objectIdFc(objectsDetails?._id);
        objectFc(1,100);
        setIsEditObject(true)
        if(location.lat!=null&&location.lat>9){
          let lat=location?.lat+"";
          let lng=location?.lat+"";
          MapSearchMapFc(lat.substring(0,2),lat.substring(0,2),lng.substring(0,2),100,90);
        }        
      }else{
        ToastAndroid.show('Request sent unsuccessfully!', ToastAndroid.SHORT);
      }
    });
    setIsEditObject(false);
   }
   const deleteObjectIdFc =(id)=>{
    setIsRegister(false);
    deleteObjectIdAc(id).then(()=>{
      setIsRegister(true);
      objectFc(1,100);
    });
    setIsRegister(false);
   }
   const filterCompanyFc =()=>{
    
    filterCompanyAc().then((res)=>{
    let array =  res?.map((x)=>{
        return  { label:x?.title, value: x?.id }
      })
      setNameCompany(array)
    });
    
   }
  return (
    <ObjectContext.Provider
      value={{
        objectFc,
        isRegister,
        filterCompanyFc,
        nameCompany,
        objectCreatePutFc,
        objectCreateFc,
        objectTemplateFc,
        objectImageFc,
        objects,
        objectIdFc,
        setOpenObject,
        objectsDetails,
        isShowObject,
        deleteObjectIdFc,
        isAddObject,
        ojectMultiImageFc,
        isEditObject,
        numberCompanyFc,
        numberCompany,
        objectTwoIdFc,
        isShowObjectTwo,
        setIsShowObject,
        setIsShowObjectTwo,
        setIsAddObject,
        setIsEditObject,
        lanObject,
        setLanObject,
        baseDataFc,
  baseData,
  openObject,
  isShowObjectLoading,
  setReactAnimation,
  reactAnimation,
      }}>
      {children}
    </ObjectContext.Provider>
  );
}
