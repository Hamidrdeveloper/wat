import React, { createContext, ReactElement, useEffect, useState } from "react";
import { useDebounce } from "../../screens/map/useDebounce";
import { HomeSample } from "../../screens/sampel/sampel";
// import Toast from '../../components/toast';
import { abortAc, ojectSearchAc, ojectSearchMapAc, signalAc } from "./Map.action";

interface IMapContext {
  MapFc: any;
  isRegister: boolean;
  MapSearchMapFc: any;
  mapObjects: any;
  mapObjectsSearch: any;
  setObjectCreate: any;
  objectCreate: any;
  isLoadingMap: any;
  numberPage: any;
  setStopLoopRequest: any;
  setObjectCreatePage: any;
  objectCreatePage: any;
  isButtonDrawer: any;
  setButtonDrawer: any;
}
export const MapContext = createContext<IMapContext>({} as IMapContext);
export default function MapContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoadingMap, setIsLoadingMap] = useState(false);
  const [numberPage, setNumberPage] = useState({ current: 0, pages: 0 });
  const [nextPage, setNextPage] = useState(1);
  const [stopLoopRequest, setStopLoopRequest] = useState(false);
  const [isButtonDrawer, setButtonDrawer] = useState(false);


  const [mapObjects, setMapObjects] = useState([]);
  const [mapObjectsSearch, setMapObjectsSearch] = useState([]);

  const [objectCreate, setObjectCreate] = useState({
    zoomLevel: "LEVEL_20",
    screenX1: 0,
    screenY1: 0,
    screenX2: 0,
    screenY2: 0,
    vintageFrom: 0,
    vintageTo: 0,
    officeSpaceFrom: 0,
    officeSpaceTo: 0,
    totalAreaFrom: 0,
    totalAreaTo: 0,
    vacancyFrom: 0,
    vacancyTo: 0,
    priceFrom: 0,
    priceTo: 0,
    sizeFrom: 0,
    sizeTo: 0,
    personType: "All",
    descendingYearOfConstruction: false,
    totalAreaBiggest: false,
    skip: 1,
    limit: 100,
    groupOfPeopleId: "",
  });
  const [objectCreatePage, setObjectCreatePage] = useState({
    zoomLevel: "LEVEL_20",
    screenX1: 0,
    screenY1: 0,
    screenX2: 0,
    screenY2: 0,
    vintageFrom: 0,
    vintageTo: 0,
    officeSpaceFrom: 0,
    officeSpaceTo: 0,
    totalAreaFrom: 0,
    totalAreaTo: 0,
    vacancyFrom: 0,
    vacancyTo: 0,
    priceFrom: 0,
    priceTo: 0,
    sizeFrom: 0,
    sizeTo: 0,
    personType: "All",
    descendingYearOfConstruction: false,
    totalAreaBiggest: false,
    skip: 1,
    limit: 100,
    groupOfPeopleId: "",
  });
  useEffect(() => {}, [objectCreate]);
  const debouncedSearchTerm = useDebounce(objectCreate, 100);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        console.log(objectCreate);
        setMapObjects([]);
        setTimeout(() => {
          MapSearchMapFc();
        }, 100);
       
      } else {
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  const MapFc = (first: number, two: number, object: string) => {
    ojectSearchAc(first, two, object).then((res) => {
      setMapObjectsSearch(res?.objects);
    });
  };

  const MapSearchMapFc = () => {
    
    setIsLoadingMap(true);
    setStopLoopRequest(false)
    
    ojectSearchMapAc(objectCreate).then((res) => {
      setIsLoadingMap(false);
      console.log("====================================");
      console.log(res);
      console.log("====================================");
      setNumberPage(res?.page);
     
        if (res?.page?.pages > 1) {
          setTimeout(() => {
            MapSearchMapPageFc(2, res?.objects);

          }, 2000);

          // Promise.all(promises).then(() => console.log(users));
        }else{
          setMapObjects(res?.objects);
        }
     
    });
    // setIsLoadingMap(false);
  };
  const MapSearchMapPageFc = (i, array) => {
    setIsLoadingMap(true);

    // requestInProgress came from redux so it will re-render when the value is updated
    console.log("================MapSearchMapPageFc============array========"+mapObjects);

    if(mapObjects){
      setMapObjects([...mapObjects, ...array]);

    }else{
      setMapObjects(array);

    }
    setNextPage(i);

    // setIsLoadingMap(false);
  };
  useEffect(() => {
    
    setTimeout(() => {
      
      let obj = {
        ...objectCreate,
        ...{
          skip: nextPage,
        },
      };
      if(stopLoopRequest==false) {
    ojectSearchMapAc(obj).then((res) => {
      setIsLoadingMap(false);
      console.log("================MapSearchMapPageFc====================");
      console.log(res);
      console.log("===============MapSearchMapPageFc=====================");
      setNumberPage(res?.page);
      console.log("arrayMap", mapObjects);

      if (res?.page?.current < res?.page?.pages &&stopLoopRequest==false) {
        MapSearchMapPageFc(res?.page?.current + 1, res?.objects);
      }

      // setMapObjects([...mapObjects, ...res?.objects]);
    });
  }
  }, 5000);
  }, [nextPage])
  const abortFc =()=>{
    abortAc()
  }
  const signalFc =()=>{
    signalAc()
  }

  
  return (
    <MapContext.Provider
      value={{
        MapFc,
        isRegister,
        MapSearchMapFc,
        mapObjects,
        mapObjectsSearch,
        setObjectCreate,
        objectCreate,
        isLoadingMap,
        setStopLoopRequest,
        numberPage,
        setObjectCreatePage,
        objectCreatePage,
        abortFc,
        signalFc,
        isButtonDrawer,
        setButtonDrawer
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
