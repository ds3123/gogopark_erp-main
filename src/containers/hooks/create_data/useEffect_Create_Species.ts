
import { columns_Covert_Pet_Species } from "hooks/crud/process/convert_Columns" ;
import { useCreate_Species } from "hooks/react-query/species/useCreateSpecies" ;


// @ 新增 _ 品種
export const useEffect_Create_Species = () => { 

    
    // # 新增函式
    const create_Species_Fun = useCreate_Species() ; // 品種
   
    
    // # 執行 _ 新增函式
    const create_Species = ( data : any ) => {

        // 轉換為資料表欄位
        const obj_Speices = columns_Covert_Pet_Species( data ) ;

        create_Species_Fun( obj_Speices ) ;
     
    }
     
    return create_Species

}


