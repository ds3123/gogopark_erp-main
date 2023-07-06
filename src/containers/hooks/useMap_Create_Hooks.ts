
import { Create_Data_Type_Tab } from "utils/Interface_Type" ;

// 新增資料 Hooks
import { useEffect_Create_Account  } from "./create_data/useEffect_Create_Account" ;
import { useEffect_Create_Basic  } from "./create_data/useEffect_Create_Basic" ;
import { useEffect_Create_Bath  } from "./create_data/useEffect_Create_Bath" ;
import { useEffect_Create_Beauty  } from "./create_data/useEffect_Create_Beauty" ;
import { useEffect_Create_Care  } from "./create_data/useEffect_Create_Care" ;
import { useEffect_Create_Customer  } from "./create_data/useEffect_Create_Customer" ;
import { useEffect_Create_Employee  } from "./create_data/useEffect_Create_Employee" ;
import { useEffect_Create_Lodge  } from "./create_data/useEffect_Create_Lodge" ;
import { useEffect_Create_Other  } from "./create_data/useEffect_Create_Other" ;
import { useEffect_Create_Pet  } from "./create_data/useEffect_Create_Pet" ;
import { useEffect_Create_Plan  } from "./create_data/useEffect_Create_Plan" ;
import { useEffect_Create_Price  } from "./create_data/useEffect_Create_Price" ;
import { useEffect_Create_Species  } from "./create_data/useEffect_Create_Species" ;



// 暫時替代 _ 新增權限 ( 尚未完成 2022.12.30 )
const fake_Create_Auth = () => {} ;


// @ 依照目前所處新增類型標籤，Mapping 相對應的提交新增 Hook 
export const useMap_Create_Hooks = ( current_Tap : Create_Data_Type_Tab ) => {


    const obj = {

                    "客戶" : useEffect_Create_Customer() ,    
                    "寵物" : useEffect_Create_Pet() ,    

                    "基礎" : useEffect_Create_Basic() ,    
                    "洗澡" : useEffect_Create_Bath() ,    
                    "美容" : useEffect_Create_Beauty() ,    
                    "安親" : useEffect_Create_Care() ,    
                    "住宿" : useEffect_Create_Lodge() ,    

                    "其他" : useEffect_Create_Other() ,    
                    "方案" : useEffect_Create_Plan() ,    

                    "價格" : useEffect_Create_Price() ,    
                    "品種" : useEffect_Create_Species() ,    

                    "帳號" : useEffect_Create_Account() ,    
                    "員工" : useEffect_Create_Employee() ,
                
                    "權限" : fake_Create_Auth   // 暫時替代           

               }
    
    return obj[ current_Tap ] ;           



} ;