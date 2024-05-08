/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
import Plan_Table_Columns from "./components/Plan_Table_Columns";
import Plans_Rows from "components/plan/components/Plans_Rows" ;
import { Admin_Table } from "utils/Interface_Type" ;
import { is_Plan_Done } from "./hooks/useEffect_Plan_Used_Column";


// 方案表格 ( 已用完 )
const Plans_Done_Table = ( { data } : Admin_Table ) => {


  return <table className="table is-fullwidth is-hoverable relative" style={{ width:"124%" , left:"-12%" }}>

            <thead><Plan_Table_Columns /></thead>

            <tbody>

                { 
                
                  data?.data.map( ( item : any , index : any ) => {

                      // 不顯示 _ 尚未使用完的方案
                      if( !is_Plan_Done( item ) ) return ;
                      
                      return <Plans_Rows key = { index } data = { item } /> ;

                  }) 
                
                }

            </tbody>

        </table> ;

} ;

export default Plans_Done_Table  