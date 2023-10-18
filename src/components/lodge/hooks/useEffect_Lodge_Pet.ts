/* eslint-disable react-hooks/exhaustive-deps */
import { useState , useEffect } from 'react' ;
import { useDispatch, useSelector } from "react-redux" ;
import { set_Lodge_Together_Amount } from "store/actions/action_Extra_Service_Fee" ;
import { get_Interval_Dates , get_Interval_Dates_Without_LastDate  } from "utils/time/date" ;



// 驗證 _ 點選 : 所選擇寵物
const validate_Click_Pet = ( pet : any , room_Type : string , selected_Pets : any[] , check_In_Date : string , check_Out_Date : string  ) => {

    if( !room_Type ){ 

        alert( "請選擇 _ 房型" ) ;
        return false ;
        
    }
    
    if( ( check_In_Date && check_Out_Date ) &&  check_In_Date === check_Out_Date ){

        alert( "住房日期 與 退房日期，不能同一天" ) ;
        return false ;

    }

    if( !( room_Type === "大房" || room_Type === "中房" || room_Type === "豪華樓中樓" ) ){
        alert( "所選擇 _ 房型，並非 : 大房、中房、豪華樓中樓" ) ;
    }

    if( pet?.is_rejected === 1 ){

        alert( `此寵物 < ${ pet?.name } ( ${ pet?.species } ) > 已設定 _ 拒接` ) ;
        return false ;

    } 

    if( pet?.is_dead === 1 ) { 

        alert( `此寵物 < ${ pet?.name } ( ${ pet?.species } ) > 已設定 _ 過世` ) ;
        return false ; 

    } ;

    if( selected_Pets?.length === 2 && !( selected_Pets.includes( pet?.pet_id ) ) ){  

        alert( "僅能同住 2 隻寵物" ) ;
        return false ;

    } 

} ;



// ---------



// 取得 _ 目前所點選住宿寵物、可供同住寵物選項
export const useEffect_Pet_Options = () => {

    // 客戶單，目前所填入客戶的所有寵物
    const current_Customer_Pets = useSelector( ( state : any ) => state.Customer.Current_Customer_Pets ) ;

    // 目前所點選寵物
    const current_Pet           = useSelector( ( state : any ) => state.Pet.current_Pet ) ; 

    // 排除 _ 目前所點選住宿的寵物 ( 其他可同住寵物選項 )
    const pet_Options           = ( current_Customer_Pets.length > 0 && current_Pet ) ? current_Customer_Pets.filter( ( x : any ) => x?.pet_id !== current_Pet?.pet_id ) : [] ;


    return { current_Pet , pet_Options } ;

} ;


// 計算 _ 同住寵物的費用
const useEffect_Together_Pets_Price = ( selected_Pets : any[] , setValue : any , check_In_Date : string , check_Out_Date : string ) => {

    const dispatch                 = useDispatch() ;


    // 取得 _ 起、迄日期之間 : 所有日期                                                     
    const intervalDays             = get_Interval_Dates( check_In_Date , check_Out_Date ) ;  
    
    // 去除最後一個日期 ( 要計算幾晚 )
    const intervalDays_No_LastDate = get_Interval_Dates_Without_LastDate( intervalDays ) ;


    // 住宿期間，共幾 "晚"
    const night_Num = intervalDays_No_LastDate ? intervalDays_No_LastDate?.length : 0 ;


    // 設定 _ 同住價格
    const set_Price = ( night_Num : number ) => {

         /*  每一隻、每一晚 : 200 元 */
        const amount = ( selected_Pets.length ) * 200 * night_Num ;  
 
        setValue( "lodge_Together_Fee" , amount ) ;  
        dispatch( set_Lodge_Together_Amount( amount ) ) ;
    
    } ;




    // 設定 _ 輸入價格
    useEffect( () => {
       
        set_Price( night_Num ) ;
        
    } , [ selected_Pets , night_Num ] ) ;


} ; 



// 取得 _ 所選擇同住寵物 
export const useEffect_Selected_Pets = ( setValue : any ) => {

    // 目前選擇 _ 房型
    const room_Type      = useSelector( ( state : any ) => state.Lodge.current_Lodge_Type ) ;

    const check_In_Date  = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ;  // 住房日期
    const check_Out_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_Out_Date ) ; // 退房日期


    // 所選擇同住寵物 
    const [ selected_Pets , set_Selected_Pets ] = useState< any[] >( [] ) ;

    
    // 計算 _ 同住寵物的費用
    useEffect_Together_Pets_Price( selected_Pets , setValue  , check_In_Date , check_Out_Date ) ;


    // 點選寵物
    const click_Pet = ( pet : any ) => {

                        // 驗證條件
                        if( validate_Click_Pet( pet , room_Type , selected_Pets , check_In_Date , check_Out_Date ) === false ) return ;


                        // 放入寵物 id
                        const petId = pet?.pet_id ;

                        if( selected_Pets.includes( petId ) ){

                            const arr = selected_Pets.filter( x => x !== petId ) ;
                            set_Selected_Pets( arr ) ;

                        }else{

                            set_Selected_Pets( [ ...selected_Pets , petId ] ) ;

                        }

                     } ;


    return { selected_Pets , click_Pet } ;


} ;



// 將所選擇寵物資料，輸入 < input > 欄位
export const useEffect_Insert_SelectedPets = ( pet_Options : any[] , selected_Pets : any[] , setValue : any ) => {


    useEffect( () => {
      
        // 取出 _ 所選擇的寵物資料
        const intersect        = pet_Options.filter( ( e : any ) => selected_Pets.includes( e?.pet_id ) ) ;
       
        // 轉換 _ 寵物格式
        const selectedPets     = intersect.map( ( e : any ) => `${ e.name } ( ${ e.species } )` ) ;

        // 轉換 _ 字串
        const selectedPets_Str = selectedPets.join( ',' ) ;

        setValue( 'lodge_Together_Pets' , selectedPets_Str ) ;

    } , [ selected_Pets ] ) ;


} ;


