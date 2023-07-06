


// # 查詢 _ 共同相關 Query Key
export const commonKeys = {

      

    

    // 各類型（ for 作業區：客戶、寵物、洗美、方案、住宿、安親 ）_ 所有資料  
    "type_List_Data" : (
                         page          : number = 1  , 
                         api           : string , 
                        //  search     : string ,
                         filter_Date_1 : string , 
                         filter_Date_2 : string  
                      // ) =>  [ "type_List_Data" ,  page  , api , search , filter_Date_1 , filter_Date_2  ] ,
                       ) =>  [ "type_List_Data" , page , api , filter_Date_1 , filter_Date_2 ] ,
    
  
  }