
// Context
import useReact_Hook_Form_Context from "contexts/reactHookFormContext" ;

import { useSelector } from "react-redux" ;



// @ 服務項目
const Service_Item = () => {
    
    // 取得 context 值 : React Hook Form 屬性   
    const { editType , current } = useReact_Hook_Form_Context( ) ;  

    // 目前所點選 _ 新增類別標籤
    const current_Create_Tab = useSelector(( state : any ) => state.Service.current_Create_Tab ) ;

    // 目前所選擇 : 安親類型 ( 一般安親、住宿 _ 提早抵達、住宿 _ 延後帶走 )
    const current_Care_Type  = useSelector(( state : any ) => state.Care.current_Care_Type ) ;

    // 目前所選擇 : 方案類型(名稱)
    const current_Plan_Type  = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;        


    return <div className="column is-4-desktop">

                <span className="tag is-large is-white">

                    <b> 服務項目 :&nbsp;

                        <span className="fDblue" > 

                            { current_Create_Tab ? current_Create_Tab : current } &nbsp;

                            <span className='f_10'>
                                { ( current_Create_Tab === '方案' && !editType && current_Plan_Type ) && `( ${ current_Plan_Type } )` }
                                { ( current_Create_Tab === '安親' && !editType && current_Care_Type ) && `( ${ current_Care_Type } )` }
                            </span>

                        </span>
                    </b>
                </span>

          </div>  


} ;

export default Service_Item
       