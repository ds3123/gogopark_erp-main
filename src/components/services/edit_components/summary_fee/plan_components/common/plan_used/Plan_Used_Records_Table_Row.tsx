import { useAccount_Shop_Id } from "hooks/data/useAccount" ; 
import { useFetch_Shop_Plan_UsedRecord_By_Id } from "hooks/react-query/plan/useFetchPlans" ;
import { useEffect_Set_Extra_Items } from "../../../hooks/useEffect_Plan_Used_Records_Table_Row" ;
import { useEffect_Click_Delete_Service , useEffect_Click_Undo_Delete_Service } from "../../../hooks/useEffect_Plan_Used_Records_Table_Row" ;
import { get_PlanRecord_ServiceDate } from "funcs/plan/plan_used_records";



type Row = {

    service_Id : string ; // 服務單 id
    record_Id  : string ; // 使用紀錄 id
    
}


const Plan_Used_Records_Table_Row = ( { record_Id , service_Id } : Row ) => {


    // 目前登入者，所屬店家 id
    const shop_Id         = useAccount_Shop_Id() ;

    // 查詢 _ 特定方案使用紀錄( 包含該紀錄所屬 : 方案 / 洗澡單 / 美容單 內容 )
    const data            = useFetch_Shop_Plan_UsedRecord_By_Id( shop_Id , record_Id ) ;


    // 取得 _ 加價項目字串
    const set_Extra_Items = useEffect_Set_Extra_Items() ;

    

    // 點選 _ 使用紀錄 -> 銷單
    const click_Delete_Service = useEffect_Click_Delete_Service() ;


    // 點選 _ 復原 : 銷單
    const click_Undo_Delete_Service = useEffect_Click_Undo_Delete_Service() ;


    // 尚未載入資料
    if( !data ) return <div className = "m_Top_20 f_12 fDblue m_Left_20" > <b> 資料載入中... </b> </div> ;

    
    const is_Bath_Deleted   = data?.service_type === '洗澡' && !( data?.bath?.q_code ) ;   // 洗澡 ( 資料表：bath )   資料已刪除
    const is_Beauty_Deleted = data?.service_type === '美容' && !( data?.beauty?.q_code ) ; // 美容 ( 資料表：beauty ) 資料已刪除

    const line = data?.is_delete === 1 ?  { textDecoration : "line-through red" } : { textDecoration : "none" }

    
    return  <tr>
             
                <td className="td_Left relative"> 

                     { ( !is_Bath_Deleted && !is_Beauty_Deleted ) &&
                      
                        <b className={ `tag is-medium ${ data?.service_type === '洗澡' ? 'is-success' : 'is-danger' } is-light` }> 
                            { data?.service_type }&nbsp; <span className="f_9"> ( { record_Id } / { service_Id } ) </span> &nbsp; 
                          
                            <b className="tag is-white is-rounded ">
                               Q{ data?.service_type === '洗澡' ? data?.bath?.q_code : data?.beauty?.q_code   }
                            </b>      
                        
                        </b>
                      
                     }
                     
                     { is_Bath_Deleted   && <b className="fRed"> 洗澡 _ 資料已刪除 </b> }
                     { is_Beauty_Deleted && <b className="fRed"> 美容 _ 資料已刪除 </b> }

                     { data?.is_delete === 0 &&

                       <b className = "tag is-rounded is-medium pointer hover absolute" style = { { right : "10px"  } }
                          onClick   = { () => { if( window.confirm( "確認要取消此服務單?" ) ) click_Delete_Service( data ) } }>

                           <i className="fas fa-trash-alt"></i>&nbsp;銷單 

                       </b>
                     
                     } 

                </td>
                <td className="td_Left" > 
                
                  <span style = { line } > { data?.service_note }  </span>            
                
                </td>
                <td className="td_Left" > { set_Extra_Items( data ) } </td>
                <td> { data?.created_at?.slice( 0,10 ) }              </td>
                <td> { get_PlanRecord_ServiceDate( data ) }           </td>
                <td> 
                      { data?.is_delete === 0 ? 
                              "成立" : 
                              <b className = "tag is-medium is-rounded is-danger pointer" 
                                 onClick   = { () => { if( window.confirm( "確認要復原銷單?" ) ) click_Undo_Delete_Service( data ) } } > 
                                        銷單 
                             </b>  
                     }      
                 </td>

            </tr>


} ;

export default Plan_Used_Records_Table_Row
       