/* eslint-disable react-hooks/exhaustive-deps */

import { useState , useEffect } from 'react' ;
import { useDispatch } from 'react-redux' ;
import { set_Extra_Beauty_Fee } from "store/actions/action_Extra_Service_Fee" ;
import { useFetch_Shop_Service_Prices  } from "hooks/react-query/price/useFetchPrices" ;
import { useAccount_Shop_Id } from 'hooks/data/useAccount';



// 加總 _ 所點選加價美容金額
export const useEffect_Extra_Beauty_Total = ( beauty_Picked : string[] , extra_Beauty_Prices : any[] ) => {


    const dispatch = useDispatch() ;

    // 加價美容費用小計
    const [ price , set_Price ] = useState( 0 ) ;


    // 計算 : 加價美容小計價格
    useEffect( () => {

        let is_Mounted = true ;

        if( is_Mounted ){
        
            let _price = 0 ;

            if( beauty_Picked.length > 0 ){
    
                beauty_Picked.forEach( x => {
    
                    extra_Beauty_Prices.forEach( y => {
    
                        if( parseInt(x) === y['id'] )  _price += y['service_price'] ;
    
                    } )
    
                })
    
            }
    
            // 設定 _ 價格小計
            set_Price( _price ) ;
            dispatch( set_Extra_Beauty_Fee( _price ) ) ;

        }

        return () => { is_Mounted = false }


    } , [ beauty_Picked ] ) ;


    return price




} ;



//  所點選的服務名稱 ( for 新增 ) / 變動處理 : 點選加價項目
export const useEffect_Change_Picked_Item = () => { 


    // 所點選的服務名稱 ( for 新增 )
    const [ beauty_Picked , set_Beauty_Picked ]  = useState<string[]>( [] ) ;


    // 變動處理函式
    const change_Picked_Item = ( service : string  ) => { 

        if( beauty_Picked.indexOf( service ) !== -1 ){  // * 重複點選同樣選項 --> 刪除

            const _beauty_Picked = [...beauty_Picked] ;

            // 刪除
            _beauty_Picked.splice( beauty_Picked.indexOf( service ) , 1 ) ;

            // 設定
            set_Beauty_Picked( _beauty_Picked ) ;

        }else{                                            // * 尚未點選 --> 加入

            set_Beauty_Picked([ ...beauty_Picked , service ] ) ;

        }

    }


    return { beauty_Picked , change_Picked_Item }


}



// 取得 _ 新增資料時，所點選過的加價項目
export const useEffect_Edit_Picked_Items = ( editType : any , serviceData : any  ) => {


    // 目前登入者，所屬店家 id
    const shop_Id            = useAccount_Shop_Id() ;


    // 讀取 _ 所有服務價格
    const all_Service_Prices = useFetch_Shop_Service_Prices( shop_Id ) ; 


    // 所點選的服務名稱 ( for 編輯 )
    const [ services_Data , set_Services_Data ] = useState<any>( [] ) ;


      // 取得 _ 新增資料時，所選擇的服務名稱 ( for【 編輯 】 )
      useEffect( () => { 
    
        let service_Arr : any = []  

        // 從所有價格資料，依照 id，篩選出所點選服務名稱
        if( editType === '編輯' && serviceData.extra_beauty ){

           const arr = serviceData.extra_beauty.split(',') ;

           service_Arr = all_Service_Prices.filter( x => { 
               
             const str_Id = ( x['id'] as string ).toString() ; // 轉為字串

             return arr.indexOf( str_Id ) !== -1
        
           } )

        }

        // 將物件轉為僅含 _ 服務名稱陣列
        const _service_Arr = service_Arr.map( ( x : any ) => x['service_name'] ) ;
    
        set_Services_Data( _service_Arr ) ;


    // } , [ serviceData , all_Service_Prices ] ) ;
    } , [ serviceData ] ) ;  // 再確認 若加上 all_Service_Prices 會不斷 render 2022.12.18


    return services_Data


} ;