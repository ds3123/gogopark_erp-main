
import { create } from "zustand"


export type DataStore = {
    
     is_fetching : boolean , // 是否取得資料中

}


// # 資料處理
export const useStore_Data = create< DataStore >( ( set ) => ({

    is_fetching : true ,
       
}));
