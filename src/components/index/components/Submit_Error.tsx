

import { useEffect_Click_Is_Error ,
         useEffect_Click_Submit_Error ,
         useEffect_Click_Delete_Service
       } from "../hooks/useEffect_Submit_Error" ;



type Error = {

    current_User_Name : string ;
    data              : any 

}

// @ 提交 _ 銷單 / 轉異常
const Submit_Error = ( { current_User_Name , data } : Error ) => {


 
    // # 銷單 ------  

        // 點選 _ 提交銷單
        const click_Delete_Service = useEffect_Click_Delete_Service( data , current_User_Name ) ;



    // # 異常 ------ 
  
        // * 是否異常 / 點選 _ 顯示異常處理
        const { is_Error , click_Is_Error } = useEffect_Click_Is_Error() ;


        // * 異常處理
        const { 
                error_Cause ,       // 異常原因
                set_Error_Cause ,   // 設定 _ 異常原因 
                click_Submit_Error  // 點選 _ 提交異常
              } = useEffect_Click_Submit_Error( data , current_User_Name ) ;



   return  <div className="columns is-mobile is-multiline">

               { /* 轉異常  */ }
               <div className="column is-2-desktop">

                    { ( data['is_error'] === 0 && data['is_delete'] === 0 && !is_Error ) &&
                    
                        <b className="tag is-large pointer hover w-full" onClick = { click_Is_Error } >
                            <i className="fas fa-exclamation-triangle"></i> &nbsp;  轉異常 
                        </b>

                    }

                    { is_Error &&

                        <b className="tag is-large pointer" style={{ background:"darkorange" , color:"white" }} onClick = { click_Is_Error } >
                            <i className="fas fa-exclamation-triangle"></i> &nbsp;  異常原因
                        </b>
                        
                    }

               </div>

               { /* 銷單 */ }    
               { ( data['is_delete'] === 0 && data['is_error'] !== 1 ) && 
               
                    <div className="column is-2-desktop">

                        <b className = "tag is-large pointer w-full" 
                           onClick   = { () => { if( window.confirm( "確認要取消此服務單?" ) ) click_Delete_Service() } }> 

                            <i className="fas fa-trash-alt"></i> &nbsp; 銷 單 

                        </b>  

                    </div>
               
               }

               { /* 提交異常 */ }
               { is_Error &&

                    <>
                       
                        { /* 異常原因  */}
                        <div className="column is-5-desktop">

                            <input type="text" className="input" value={ error_Cause } onChange={ e => set_Error_Cause( e.target.value ) } placeholder="請輸入 : 異常原因" />

                        </div>

                        <div className="column is-3-desktop">

                            <b className="tag is-large pointer hover" onClick={ () => click_Submit_Error() } >
                                <i className="fas fa-paper-plane"></i> &nbsp; 提交異常 &nbsp;
                               
                               <span className="f_12" >( { current_User_Name ? current_User_Name : '店長' } ) </span> 
                            </b>

                        </div>

                    </>

                }

           </div>

            
} ;


export default Submit_Error 
       