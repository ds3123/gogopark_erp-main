import { useState , useEffect } from "react" ;
import { Input } from "templates/form/Input";
import useCreate_Custom_Plan_Context from "../contexts/createCustomPlanContext" ;
import { useFetch_Shop_Custom_Plan_By_Name } from "hooks/react-query/plan/useFetchPlans" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";



type pInfo = {

    register  : any ;
    errors    : any ; 
    setValue  : any ;
    edit_Type : string ;

    get_Is_Plan_Existed : ( bool : boolean ) => void ;

}


const note = { top:"11px" , left:"90px" } as const ;  



// 方案本訊息 : 名稱、洗澡 / 美容次數、期限、預設價格
const Plan_Basic_Info = ( { edit_Type , register , errors , setValue , get_Is_Plan_Existed } : pInfo ) => {

  
      // 目前登入者，所屬店家 id 
      const shop_Id = useAccount_Shop_Id() ;

      const [ bath_Num , set_Bath_Num ]     = useState( 0 ) ;  // 洗澡次數
      const [ beauty_Num , set_Beauty_Num ] = useState( 0 ) ;  // 美容次數


      // # 目前新增自訂方案，所設定 :
      const {                                
             current_Custom_Bath_Num ,          // 洗澡次數     
             current_Custom_Beauty_Num ,        // 洗澡次數
             set_Current_Custom_Bath_Num ,      // 設定 _ 洗澡次數
             set_Current_Custom_Beauty_Num ,    // 設定 _ 美容次數
             set_Current_Custom_DefaultPrice    // 設定 _ 預訂價格
            } = useCreate_Custom_Plan_Context();    

            
      // 方案名稱
      const [ plan_Name , set_Plan_Name ] = useState( '' ) ; 


      // 依照輸入方案名稱，查詢 _ 是否有該自訂方案存在
      const custom_Plan = useFetch_Shop_Custom_Plan_By_Name( shop_Id , plan_Name ) ;

      // 自訂方案是否存在條件
      const is_Plan_Name_Existing = custom_Plan ? true : false ;

      

      // 共同邏輯
      const handle_Common = ( e : any , type : "洗澡" | "美容" ) => {

        const num = parseInt( e.target.value ) ; // 次數
        
        if( num > 10 ){
            alert( `${ type }次數，不得大於 10`) ;
            const column = type === "洗澡" ? "plan_Type_Bath_Num" : "plan_Type_Beauty_Num" ;
            setValue( column , '' ) ;
            return false
        }
  
        return num
  
      }

      // 變動處理 : 方案名稱
      const handle_Plan_Name_Change = ( e : any ) => {

          const plan_Name = e.target.value ;

          if( !plan_Name ){
            set_Plan_Name('') ;
            return false
          }

          set_Plan_Name( plan_Name ) ;

  
      } ;

      // 變動處理 : 洗澡次數
      const handle_Bath_Num_Change = ( e : any ) => {

        const num = handle_Common( e , "洗澡" ) ;
        set_Bath_Num( num ? num : 0 ) ;
        set_Current_Custom_Bath_Num( num ? num : 0 ) ;

      } ;
  
      // 變動處理 : 美容次數
      const handle_Beauty_Num_Change = ( e : any ) => {

        const num = handle_Common( e , "美容" ) ;
        set_Beauty_Num( num ? num : 0 ) ;
        set_Current_Custom_Beauty_Num( num ? num : 0 ) ;

      } ;
  
      // 變動處理 : 預設價格
      const handle_Default_Price_Change = ( e : any ) => {
  
        if( edit_Type === "新增" && bath_Num === 0 && beauty_Num === 0 ){
           alert( "洗澡次數 與 美容次數，不可皆為 0" ) ;
           setValue( "plan_Type_Price" , '' ) ;
           return false
        }
  
        const price = parseInt ( e.target.value ) ; // 輸入價格
        set_Current_Custom_DefaultPrice( price ? price : 0 )  ;
        
      } ;

      
      // 回傳 _ 方案是否存在
      useEffect( () => {
        
         get_Is_Plan_Existed( is_Plan_Name_Existing ) ;
         
      } , [ is_Plan_Name_Existing ] ) ;
      



  return  <div className="columns is-multiline is-mobile m_Bottom_40 relative">

                { /* 方案名稱使用提示 */ } 
                { ( plan_Name && is_Plan_Name_Existing )  && <b className="fRed absolute" style={ note }> <i className="fas fa-exclamation"></i> &nbsp;此名稱已被使用 </b>  }
                { ( plan_Name && !is_Plan_Name_Existing ) && <b className="fGreen absolute" style={ note }> <i className="fas fa-check"></i> &nbsp;此名稱可使用 </b> }

              
                <Input type="text" name="plan_Type_Name" label="方案名稱" register={ register } error={ errors.plan_Type_Name } icon="fas fa-id-card-alt"  asterisk={true} columns="4" onChange = { handle_Plan_Name_Change } /> 

                {
                    edit_Type === "新增" && 
                      <>
                         <Input type="number" name="plan_Type_Bath_Num"   label="洗澡次數 ( 次 )"  register={ register } error={ errors.plan_Type_Bath_Num }   icon="fas fa-bath" min="0" max="10" asterisk={false} columns="2" onChange = { handle_Bath_Num_Change } /> 
                         <Input type="number" name="plan_Type_Beauty_Num" label="美容次數 ( 次 )"  register={ register } error={ errors.plan_Type_Beauty_Num } icon="fas fa-cut"  min="0" max="10" asterisk={false} columns="2" onChange = { handle_Beauty_Num_Change } /> 
                      </>
                }

                {
                    edit_Type === "編輯" && 
                      <>
                         <div className="column is-2-desktop" > <span className="relative" style={{ top:"30px" }}> <i className="fas fa-bath"></i>&nbsp;洗澡次數 : <b className="fRed"> { current_Custom_Bath_Num }   </b> 次 </span> </div>
                         <div className="column is-2-desktop" > <span className="relative" style={{ top:"30px" }}> <i className="fas fa-cut" ></i>&nbsp;美容次數 : <b className="fRed"> { current_Custom_Beauty_Num } </b> 次 </span> </div>
                      </>
                }

                <Input type="number" name="plan_Type_Period" label="方案使用期限 ( 天 )"  register={ register } error={ errors.plan_Type_Period }  icon="far fa-calendar-alt" min="0" asterisk={true} columns="2"   /> 
                
                <Input type="number" name="plan_Type_Price"  label="方案預設價格 ( 元 )"  register={ register } error={ errors.plan_Type_Price }   icon="fas fa-dollar-sign"  min="0" asterisk={true} columns="2" onChange = { handle_Default_Price_Change } /> 

                <Input type="text"  name="plan_Type_Note" label="方案備註"  register={ register } error={ errors.plan_Type_Note }  icon="fas fa-edit" asterisk={false} columns="12"  /> 

                { edit_Type === "新增" &&  <span className="absolute f_10" style={{ top:"85px" , left:"34.5%" }} >  * <b>洗澡次數</b> 與 <b>美容次數</b> : 不得大於 10、不可皆為 0 。 </span>   }

          </div>

} ;

export default Plan_Basic_Info
       