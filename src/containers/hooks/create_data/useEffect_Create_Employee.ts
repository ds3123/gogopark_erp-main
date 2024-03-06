
import { columns_Covert_Employee } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Employee } from "hooks/react-query/employee/useCreateEmployee" ;



// @ 新增 _ 員工
export const useEffect_Create_Employee = ( ) => { 
    
    // # 新增函式
    const create_Employee_Fun = useCreate_Employee() ; // 員工
   
    // # 執行 _ 新增函式
    const create_Employee = ( data : any ) => {

        // 轉換為資料表欄位
        const obj_Employee = columns_Covert_Employee( data ) ;

        create_Employee_Fun( obj_Employee ) ;
     
    }
     
    return create_Employee

}




