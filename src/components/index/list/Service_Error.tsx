/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-lone-blocks */
import { useSelector } from "react-redux"
import Date_Picker from "templates/form/Date_Picker"
import { useForm } from "react-hook-form" ; 
import { IService } from "utils/Interface_Type" ;
import Usage_Note from "templates/note/Usage_Note" ; 
import { usePet_Apply_Reject , usePet_Is_Rejected } from 'hooks/data/usePet' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useEffect_Service_Error } from "../hooks/useEffect_Service_Error" ;
import { Service_Error_Row } from "./components/Service_Error_Row" ;


const note_Str = `此區塊列舉 :「轉異常」、「銷單」、「刪除加價單」、「已回家( 房 ) 情況下，應收金額與實收金額不符合」資料` ;


// @ 服務異常
const Service_Error = () => {
 

    // 登入者所屬店家 id
    const shop_Id      = useAccount_Shop_Id() ;

    // 報表日期
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;
    
    // React Hook Form
    const { control }  = useForm<IService>({ mode : "all" }) ;


    // # 以下 2 種情況未納入，再確認 2023.01.10

    // 取得資料 _ 寵物：申請拒接中
    // const pet_Is_Apply_Reject   = usePet_Apply_Reject() ;

    // 取得資料 _ 寵物：拒接
    // const pet_Is_Rejected       = usePet_Is_Rejected() ;


    // 所有異常資料 _ 4 種類型 :「 轉異常 」、「 銷單 」、「 已回家( 房 ) 情況下，應收金額與實收金額不符合 」、「 被刪除的加價單 」
    const error_Data = useEffect_Service_Error( shop_Id , service_Date ) ;
    


    
    return <>
                <b className="tag is-large is-danger is-light m_Bottom_20"> <i className="fas fa-exclamation"></i> &nbsp; 服務異常 </b>

	            { /* 說明 */ }  
                <div className="m_Left_15 m_Bottom_50"> <Usage_Note  note = { note_Str } />  </div>    

                <div className="columns is-multiline is-mobile relative m_Bottom_50">

                    { /* 異常日期 */ }
                    <div className="column is-3-desktop">
                        <b className="f_14"> 查詢日期 </b>
                        <Date_Picker control={ control }  name="service_Date" default_Date={ new Date() } />
                    </div>

                </div>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                          <th> 服務類別 </th>
                          <th> 異常說明 </th>
                          <th> 主人姓名 </th>
                          <th> 主人手機 </th>
                          <th> 寵物資訊 </th>
                          <th> 經手人   </th>
                        </tr>
                    </thead>

                    <tbody>

                      { error_Data.map( ( x : any , y : number ) => <Service_Error_Row key = { y }  service = { x } /> ) }

                    </tbody>

                </table>

               

           </>

} ;

export default Service_Error