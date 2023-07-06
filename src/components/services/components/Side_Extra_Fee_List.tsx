import { useContext } from "react" ;
import { ModalContext } from "templates/panel/Modal" ;
import { switch_Service_Id } from "utils/data/switch" ;
import { useUpdate_Extra_Fee } from "hooks/react-query/service/useUpdateExtraFee" ;
import cookie from 'react-cookies';



// @ 加價清單 ( for Modal 彈跳視窗顯示  )
const Side_Extra_Fee_List = () => {


    // 取得 context 值
    const value      = useContext( ModalContext ) as any ;   

    // 目前所點選的服務單
    const service    = value?.data ;
    const service_Id = switch_Service_Id( service ) ; // 服務單 id

    // 該服務單所建立的加價單
    const extra_Fee  = service.extra_fee.filter( ( x : any ) =>  x?.is_delete === 0 ) as any[] ;


    // 點選 _ 修改：加價單函式
    const update_Extra_Fee = useUpdate_Extra_Fee() ;

    
    const current_User     = cookie.load('userInfo') ;
    const update_Submitter = current_User?.employee_name ? current_User?.employee_name  : '店長' ;


    return <>
    
              <b className = "tag is-large is-primary is-light m_Bottom_50 is-rounded" >

                 <i className = "fas fa-list m_Right_10"></i> 
                 <b className = "tag is-medium is-white is-rounded m_Right_10 f_14"> { service.service_type }單 ( Q{ service.q_code } ) : { service_Id } </b>
                 加價單列表 

              </b>

              <table className="table is-fullwidth is-hoverable m_Bottom_50">

                  <thead>

                      <tr className = "f_12" >

                        <th> 加價單 id </th>
                        <th> <p className="fDblue"> 加價項目 </p> </th>
                        <th> <p className="fDblue"> 加價美容 </p> </th>
                        <th> <p className="fDblue"> 自訂加價 </p> </th>
                        <th> 經手人          </th>
                        <th> 建檔日期        </th>
                        <th> 收款日期        </th>
                        <th> 小計金額 ( 元 ) </th>
                        <th> 刪 除          </th>

                      </tr>
                      
                  </thead>

                  <tbody>

                    {

                        extra_Fee.map( ( x : any , y ) => {


                             return <tr key = { y } className = "f_14" >

                                       <td> { x?.extra_fee_id } </td>

                                       <td> 
                                          { x?.extra_item }
                                          { x?.extra_item ? <span className = "f_11 fRed"> { x?.extra_item_price } </span> : '' }
                                       </td>

                                       <td> 
                                          { x?.extra_beauty }
                                          { x?.extra_beauty ? <span className = "f_11 fRed"> { x?.extra_beauty_price } </span> : '' }  
                                       </td>

                                       <td> 
                                          { x?.extra_custom }
                                          { x?.extra_custom ? <span className = "f_11 fRed"> { x?.extra_custom_price } </span> : '' }   
                                       </td>

                                       <td> { x?.admin_user }                      </td>
                                       <td> { x?.created_at.slice( 0 , 10 ) }      </td>
                                       <td> { x?.payment_date }                    </td>

                                       <td className = "fRed" > { x?.amount_paid } </td>

                                       <td> 

                                           <b className = "delete" 
                                              onClick   = { () => { 
                                                                      if( window.confirm( `確認要刪除此加價單 ( id : ${ x?.extra_fee_id } ) ? ` ) ){ 
                                                                        
                                                                           const obj = {
      
                                                                              extra_fee_id     : x?.extra_fee_id ,
                                                                              is_delete        : 1 ,             
                                                                              delete_submitter : update_Submitter

                                                                           } ;

                                                                           update_Extra_Fee( obj ) ;
                                                                           
                                                                      } 
                                                                        
                                                                  } } >
                                           </b>      

                                       </td>
                                     
                                    </tr>

                        })

                    }

                  </tbody>

              </table>


           </>

} ;


export default Side_Extra_Fee_List
       