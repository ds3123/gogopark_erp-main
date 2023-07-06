/* eslint-disable react-hooks/exhaustive-deps */


import { fetch_Shop_Plan_UsedRecord_By_Id } from "utils/api/api_Plan" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;

import { useState , useEffect  } from 'react' ;


// 檢查 _ 該方案使用紀錄，是否有 : 加價項目
export const useEffect_Check_PlanRecord_ExtraItems = ( plan : any ) => {

    const shop_Id = useAccount_Shop_Id();

    // 有使用 "加價項目" 的服務數量
    const [ is_ExtraItem_Used , set_Is_ExtraItem_Used ] = useState( false ) ;   


    // 檢查 _ 特定紀錄
    const check_PlanRecord_ExtraItems = async( record_Id : string ) => {
    
        const record = await fetch_Shop_Plan_UsedRecord_By_Id( shop_Id , record_Id ) ;


        let extra_Item_Arr = null ;
        if( record && record?.service_type === '洗澡' ) extra_Item_Arr = record.bath?.extra_service?.split(',') ;
        if( record && record?.service_type === '美容' ) extra_Item_Arr = record.beauty?.extra_service?.split(',') ;

        // 回傳 _ 該方案使用紀錄，是否有 : 加價項目 ( Boolean )
        return ( extra_Item_Arr && extra_Item_Arr.length > 0 ) ? true : false ;

    } ;


    // 檢查 _ 特定方案 
    const check_Plan = (  plan : any ) => {

        
        // 該方案 : 使用紀錄
        const used_Records = plan['plan_used_records'] ;

        let arr = [] as any[] ;

        // 檢查 _ 特定方案，每一個方案使用紀錄
        used_Records?.forEach( ( x : any ) => {

            check_PlanRecord_ExtraItems( x['id'] ).then( result => {

                arr.push( result );

            } )
                
        })

        // 等待以上 forEach 結束
        setTimeout( ()=> {

            set_Is_ExtraItem_Used( arr.includes( true ) ? true : false ) ;

        } , 300 )

    
    } ;


    // 檢查 _ 特定方案中，若有使用紀錄，這些紀錄是否有使用加價項目
    useEffect( () => {
      
        check_Plan( plan )
             
    } , [ plan ] ) ;


    return is_ExtraItem_Used

} ;