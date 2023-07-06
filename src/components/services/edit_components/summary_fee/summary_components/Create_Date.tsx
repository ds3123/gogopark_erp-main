// useContext
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;

import { get_Today } from "utils/time/date" ;


// @ 服務：建檔日期
const Create_Date = () => {


   // 取得 context 值 : React Hook Form 屬性   
   const { editType , serviceData } = useReact_Hook_Form_Context() ;  // React Hook Form 屬性


   return <div className="column is-4-desktop">

                <span className="tag is-large is-white">
                    <b> 建檔日期 :&nbsp; 
                        <span className="fDblue">
                        { /* for 新增  */ }
                        { !editType  && <>&nbsp;{ get_Today() } </> }  
                        { /* for 編輯 */ }
                        { editType  && serviceData?.created_at?.slice(0,10) }
                        </span> 
                    </b>
                </span>

          </div>

} ;

export default Create_Date
       