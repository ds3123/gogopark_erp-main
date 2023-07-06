import { useState , useEffect } from 'react' ;
import { useTocuh_Button_Numbers } from "hooks/layout/useTouch" ;
import { get_Today } from "utils/time/date" ;
import { get_TimeStamp_5 } from "utils/number/number" ;
import { useDispatch } from 'react-redux';
import { get_Current_Customer_Pets , get_Customer_Relatives , set_Current_Customer } from "store/actions/action_Customer" ;
import { set_Is_Show_Section_Pet } from "store/actions/action_Global_Layout" ;



// @ <Customer_Form /> 元件相關 Effect

// 點選 _ 設定 : 客戶隨機身分證字號
export const useEffect_Click_Set_Random_Id = ( setValue : any ) => {

    // 設定 _ 隨機身分證字號
    const set_Random_Id = () => {

        const randomId = `C_${ get_Today() }_${ get_TimeStamp_5() }` ;
        setValue( "customer_Id" , randomId , { shouldValidate: true  } ) ;

    } ;

    return set_Random_Id

} ;


// 輸入 _ 欄位值
export const useEffect_Change_Column_Value = () => {

    const dispatch = useDispatch() ;

    const handle_Column_Change = ( e : any , set_Query : any , query : any ) => {

        // 設定 _ state
        const { name , value } = e.target ;
        set_Query( { ...query , [ name ] : value } ) ;

    
        // # 查詢 _ 客戶相關紀錄 ---------------------

        // 設定 _ 客戶單，目前所填入客戶 _ 所有寵物 ( for 寵物表單，查詢客戶寵物用 )
        if( name === 'customer_Id' && value ){
            dispatch( get_Current_Customer_Pets( value ) ) ;
        }

    } ;

    return handle_Column_Change
    
} ;


// 點選 _ 客戶姓名，設定、帶入 : 客戶欄位資料
export const useEffect_Click_Set_Cutomer_Data = () => {

    const dispatch = useDispatch() ;

    const click_Set_Cus_Data = ( data : any , setValue : any ) => {

          // 設定 _ 目前點選 : 客戶資料
          dispatch( set_Current_Customer( data ) ) ;

          // 取得 _ 客戶單，目前所填入客戶 : 所有寵物 ( for 寵物表單，查詢客戶寵物用 )
          dispatch( get_Current_Customer_Pets( data['id'] ) ) ;

          // 取得 _ 客戶單，目前所填入客戶 : 所有關係人
          dispatch( get_Customer_Relatives( data['id'] ) ) ;

          // 設定 _ 顯示 : 寵物區塊 ( 新增表單 )
          dispatch( set_Is_Show_Section_Pet( true ) ) ; 
          
          const config = { shouldValidate : true , shouldDirty : true } ;

          // 設定 _ 客戶欄位值
          setValue( "customer_Id"        , data['id']           , config ) ;
          setValue( "customer_Name"      , data['name']         , config ) ;
          setValue( "customer_Cellphone" , data['mobile_phone'] , config ) ;
          setValue( "customer_Telephone" , data['tel_phone']    , config ) ;
          setValue( "customer_Line"      , data['line']         , config ) ;
          setValue( "customer_Email"     , data['email']        , config ) ;
          setValue( "customer_Address"   , data['address']      , config ) ;
          setValue( "customer_Sex"       , data['sex']          , config ) ;
          setValue( "customer_P_Note"    , data['note']         , config ) ;
      
    } ;

    return click_Set_Cus_Data

} ;


// 觸控輸入 _ 客戶手機號碼
export const useEffect_Touch_Insert_Num = ( setValue : any , set_Query : any , query : any ) => {

    
    // 是否顯示 : 觸控數字按鈕  
    const [ is_Show_NumButton , set_Is_Show_NumButton ] = useState( false ) ;

    // 存放
    const [ num_Arr , set_Num_Arr ] = useState<any[]>( [] ) ;


    // 取得、設定 _ 所點選數字
    const get_Tab_Numbers = ( num : number ) =>  set_Num_Arr( [ ...num_Arr , num.toString() ] ) ;


    // 清空 _ 所點選數字
    const clear_Number = () => {
        setValue( 'customer_Cellphone' , ''  ) ;
        set_Num_Arr( [] ) ;
    } ;

    // 觸控數字按鈕
    const { num_Buttons } = useTocuh_Button_Numbers( get_Tab_Numbers , clear_Number ) ;  


    // 觸控輸入手機號碼
    useEffect( () => { 

      if( num_Arr.length > 0 ){

         let num_Str = ''
         num_Arr.forEach( (x)=>{ num_Str +=x })
         setValue( 'customer_Cellphone' , num_Str  ) ;

         set_Query({ ...query , 'customer_Cellphone' : num_Str } ) ;
   
      }

    } , [ num_Arr ] ) ;


    return { is_Show_NumButton , set_Is_Show_NumButton , num_Buttons }







} ;