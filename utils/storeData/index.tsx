import  AsyncStorage  from '@react-native-async-storage/async-storage';

 class Storage {


storeData = async (nameTable:string,data:any)=> {
    console.log("storeData",data+"="+nameTable);
    try {
        await AsyncStorage.setItem(
            nameTable,
            data
        );
        console.log("storeData",data+"======"+nameTable);
        return true;
      } catch (error) {
        // Error saving data
        console.log("storeData",error);
        return false;
      }
}
retrieveData = async (keys:string) => {
    
    return await AsyncStorage.getItem(keys)
    .then((result) => {
        if (result) {
            try {
                console.log(keys,result);

              return result;
            } catch (e) {
            
              console.log(keys,e);
          
                return "error";
            }
        }
   
    });
  };
  removeData = async (keys:string) => {
  
    try {
      console.log('====================================');
      console.log(keys);
      console.log('====================================');
        AsyncStorage.removeItem(keys, (err) => {
          // keys k1 & k2 removed, if they existed
          // do most stuff after removal (if you want)
        });
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
   multiRemoveData = async (keys:Array<string>) => {
    try {
       
        AsyncStorage.multiRemove(keys, (err) => {
          // keys k1 & k2 removed, if they existed
          // do most stuff after removal (if you want)
        });
    } catch (error) {
      // Error retrieving data
    }
  };

}
export default new Storage();


