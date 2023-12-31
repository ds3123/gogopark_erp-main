import  { useEffect, useState} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type" ;
import { useDispatch } from "react-redux" ;
import { string_Format_Slash } from 'utils/string/edit_string';

                


// Redux
import { set_BasicSumPrice } from "store/actions/action_Basic"
import useSection_Folding from "hooks/layout/useSection_Folding";

import { useFetch_Shop_Service_Type_Prices } from "hooks/react-query/price/useFetchPrices" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount"; 

import useCreate_Service_Context from "containers/contexts/createServiceContext"


interface IBasic extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


/* 基礎單選項 */
const Basic_Form = ( { register , current , editType , serviceData } : IBasic ) => {

    const dispatch                    = useDispatch() ;
    
    const basicPrices                 = useFetch_Shop_Service_Type_Prices( useAccount_Shop_Id() , '基礎' ) ; // 讀取 _ "基礎" 所有價格

    const { is_folding , Folding_Bt } = useSection_Folding( ( current === "基礎" || editType ) ? false : true ) ;      // 收折區塊

    // 目前 寵物區塊 ( Pet_Form.tsx ) 所選擇 : "體型" 下拉選項
    const { pet_Size } = useCreate_Service_Context() ; 


    // 所填寫 _ 基礎價格
    const [ price , set_Price ]  = useState<number>( 0 ) ;

    // 所點選 _ 基礎選項
    const [ basicArr , set_basicArr ]       = useState<string[]>( [] ) ; // checkbox
    const [ basicSelect , set_basicSelect ] = useState<string>( "" ) ;   // select

    // 取得 _ 所點選 checkbox
    const get_Checkbox = ( title : string  ) => {

       if( basicArr.indexOf( title ) !== -1 ){  // 重複點選同樣選項 --> 刪除

           const _basicArr = [...basicArr] ;
           _basicArr.splice( basicArr.indexOf( title ) , 1 ) ;
           set_basicArr( _basicArr ) ;

       }else{                                  // 尚未點選 --> 加入

           set_basicArr([ ...basicArr , title ] ) ;

       }

    } ;

    // 取得 _ 所選擇 select
    const get_Select   = ( title : string ) => {

       if( title === "請選擇" ){
           set_basicSelect("") ;
           return false ;
       }

       set_basicSelect( title );

    } ;


    useEffect( () => {

        // checkbox 選項 加入 select 選項
        let _basicArr = [ ...basicArr ]  ;
        if( basicSelect !== "" ) _basicArr = [ ...basicArr , basicSelect  ] ;

        // 計算 _ 基礎價格
        let _price = 0 ;

        if( _basicArr.length > 0 ){

            _basicArr.forEach( x => {

                basicPrices.forEach( y => {

                   const _item = y['service_name'] as any ;

                   if( x === ( _item.trim() ) ) _price += y['service_price'] ;

                } )

            })

        }

        set_Price( _price ) ;                     // 設定 _ 價格小計
        dispatch( set_BasicSumPrice( _price ) ) ; // 設定 _ Store

    } ,[ basicArr , basicSelect ] ) ;



   return <>

            { /* 顯示 : 是否顯示寵物體型 ( 僅新增資料時顯示 )  */ } 
            {  !editType && 

                <>   

                  <i className="fas fa-dog"></i>&nbsp;寵物體型 : 
                   
                    { ( pet_Size === '請選擇' || !pet_Size ) ?

                      <b className="fDred"> 尚未選擇寵物體型</b> : <b style={{color:"rgb(30,150,0)"}}> { pet_Size } </b> }  <br/><br/>
             
                </>     

             }
 

             <b className="tag is-large is-warning" >

                <i className="far fa-list-alt"></i> &nbsp; 基 礎

                { /* 顯示 : 基礎價格 */ }

                { /* for 新增 */ }
                { ( current === '基礎' && !editType && price !== 0 ) &&
       
                   <b className="tag is-rounded is-white f_12 m_Left_10" > 小計 : <span className="fRed"> &nbsp; { price } &nbsp; </span> 元 </b>
                    
                }

                { /* for 編輯 ( 僅 "基礎" 顯示價格 ) */ }
                { ( current === '基礎' && editType ) &&
 
                   <b className="tag is-rounded is-white f_12 m_Left_10" > 小計 : <span className="fRed"> &nbsp; { serviceData.basic_fee } &nbsp; </span> 元 </b>
                     
                }

             </b>

              { /* 收折鈕 */ }
              <label className="label relative" style={{top:"-40px"}}> { Folding_Bt } </label>

              <br/>

              { /* 新增  */ }
              { ( !is_folding && !editType ) &&

                   <>

                       <div className="columns is-multiline is-mobile">

                           {

                               basicPrices.map( (x,y) => {

                                  const service_Name = x['service_name'] as string ;  // 服務項目名稱
                                  const note         = x['note'] as string ;          // 備註

                                  // for 修腳緣( 針對寵物 "體型"，只顯示相對應的修腳緣選項 )
                                  if( ( pet_Size === '特大型犬' || pet_Size === '大型犬' ) && service_Name.indexOf('修腳緣') !== -1 && service_Name.indexOf('大狗') === -1 ) return null ;
                                  if( pet_Size === '中型犬' && service_Name.indexOf('修腳緣') !== -1 && service_Name.indexOf('中狗') === -1 ) return null ;
                                  if( pet_Size === '小型犬' && service_Name.indexOf('修腳緣') !== -1 && service_Name.indexOf('小狗') === -1 ) return null ;

                                  return  <div key={y} className="column is-3-desktop relative">

                                              { note &&
                                                 <span className="absolute f_10 " style={{ top:"-5px" , left : "30px" ,color:"rgb(0,0,180)" }}> { note }  </span>
                                              }

                                              <input type="checkbox" value={ service_Name } { ...register("basic_Option") }
                                                     onChange={ e => get_Checkbox(e.target.value) } />

                                              <b> { service_Name } </b>

                                          </div>

                               })

                           }

                           {/*<div className="column is-7-desktop">*/}

                           {/*    <b>修腳緣</b> &nbsp;*/}
                           {/*    <div className="select">*/}
                           {/*        <select {...register("basic_Option_Foot")} onChange={e => get_Select(e.target.value)}>*/}
                           {/*            <option value="請選擇">請選擇</option>*/}
                           {/*            <option value="修腳緣_大狗">大狗</option>*/}
                           {/*            <option value="修腳緣_中狗">中狗</option>*/}
                           {/*            <option value="修腳緣_小狗">小狗</option>*/}
                           {/*        </select>*/}
                           {/*    </div>*/}

                           {/*</div>*/}

                       </div>

                       <br/>

                   </>

               }

              { /* 編輯 */ }
              { ( !is_folding && editType ) &&

                <b className="tag is-large is-white" >
                    &nbsp;&nbsp; 基礎項目 :  
                     <span className="fDblue"> 
                          &nbsp; { serviceData.basic_data ? string_Format_Slash( serviceData.basic_data ) : "無" } 
                     </span>    
                </b>    

              }


              <hr/> <br/>

          </>


} ;

export default Basic_Form ;