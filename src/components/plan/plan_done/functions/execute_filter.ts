
import { compose } from 'fp/tool';
import { filter_Cus_Id , filter_Cus_Mobile , filter_Cus_Name , filter_Pet_Name , filter_Pet_Serial , filter_Pet_Species } from "./filter_column"
import { Filter_Columns } from '../types/column';




// 執行 _ 篩選條件
export const execute_Filter = ( data : any[] , obj : Filter_Columns ) : any[] => { 

    return compose(
                    filter_Cus_Mobile( obj.cus_Mobile ) , 
                    filter_Cus_Name( obj.cus_Name ) ,
                    filter_Cus_Id( obj.cus_Id ) ,
                    filter_Pet_Name( obj.pet_Name ) ,
                    filter_Pet_Species( obj.pet_Species ) ,
                    filter_Pet_Serial( obj.pet_Serial ) 
                   )( data ) ; 
  
  } ;
  