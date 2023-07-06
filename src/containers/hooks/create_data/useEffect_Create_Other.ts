

import { columns_Covert_Other } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Other } from "hooks/react-query/other/useCreateOther" ;


// @ 新增 _ 其他（ 現金收支 ）
export const useEffect_Create_Other = (  ) => { 

    // # 新增函式
    const create_Other_Fun = useCreate_Other() ;   
    

    // # 執行 _ 新增函式
    const create_Other = ( data : any  ) => {

        // 轉換為資料表欄位
        const obj_Other = columns_Covert_Other( data ) ;

        create_Other_Fun( obj_Other ) ;  
     
    }
     
    return create_Other


}