
import { create } from "zustand"


export type DataStore = {
    
     is_fetching : boolean , // 所有店家方案

}


// # 資料處理
export const useStore_Data = create< DataStore >( ( set ) => ({

    is_fetching : true ,
       
}));
