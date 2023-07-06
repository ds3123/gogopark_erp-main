/* eslint-disable react/jsx-pascal-case */

import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'utils/axios'
import { check_Plan_Done } from 'utils/data/check_data'
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Update_Pet from "components/pets/edit/Update_Pet";
import { useFetch_Species } from 'hooks/react-query/species/useFetchSpecies';
import { useFetch_Pet_Plans } from "hooks/react-query/plan/useFetchPlans" ;



// @ 寵物相關 Hook

// 取得資料 _ 寵物有提交 : 申請拒接
export const usePet_Apply_Reject = () => {

    const [ data , set_Data ] = useState( [] ) ;

    useEffect( () => {

        axios.get( `/pets` ).then( res => {

            const pets  = res.data ;
            const _pets = pets.filter( ( x : any ) => x?.rejected_status === '審核中' ) ; // 篩選出:審核中
    
            set_Data( _pets ) ;
    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 
      
    } , [] ) ;


    return data 

} ;


// 取得資料 _ 寵物為拒接
export const usePet_Is_Rejected = () => {


    const [ data , set_Data ] = useState( [] ) ;


    useEffect( () => {
        

        axios.get( `/pets` ).then( res => {


            const pets  = res.data ;
            const _pets = pets.filter( ( x : any ) => x?.is_rejected === 1 ) ; // 篩選出：拒接
    
            set_Data( _pets ) ;

    
        }).catch( err => {
    
            console.log( `資料錯誤 : ${ err }` ) ;
    
        }) ; 

      
    } , [] ) ;


    return data 

} ;


// 判斷 _ 特定寵物，是否能有方案，可供使用
export const usePet_Is_Plans_Available = ( pet_Serial : string  ) => {

   const [ is_Available , set_Is_Available ] = useState( false ) ;


   // 取得 _ 特定寵物，所有的方案
   const { data : pet_Plans } = useFetch_Pet_Plans( pet_Serial ) ;


   // 目前所點選 : 新增標籤
   const current_Tab = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;


   useEffect( () => {
     
     if( pet_Plans.length > 0 ){ 


        let arr : any[] = [] ;

        pet_Plans.forEach( ( x : any ) => {

            const p_Type    = x?.plan_type ;          // 方案類型  
            const u_Records = x?.plan_used_records ;  // 方案使用紀錄
            const c_Plan    = x?.custom_plan ;        // 自訂方案內容  

            arr.push( check_Plan_Done( p_Type , u_Records , c_Plan , current_Tab ) ) ;

        }) ;

        // # 只要該寵物方案中，仍有未使用方案，即設定為 _ 有方案可供使用
        if( arr.includes( false ) ) set_Is_Available( true ) ;
        
 
     }else{

        set_Is_Available( false ) ;

     }


     // 設回初始值
     return () => set_Is_Available( false )


      
   } , [ pet_Plans , current_Tab , pet_Serial ] ) ;


   return is_Available  

}


// 點選 _ 更新 : 寵物
export const usePet_Update_Panel = ( ) => {

    const dispatch = useDispatch() ;

    
    // 取得 _ 所有品種
    const petSpecies = useFetch_Species() ;


    // 點選 _ 顯示右側修改寵物 panel 
    const click_Update_Pet = ( pet : any ) => {

        // 依照品種名稱，篩選出所點選的品種
        const species = petSpecies?.filter( x => x[ 'name' ] === pet['species'] )[ 0 ] ;

        // 加入 _ 品種 id ( 在原先查詢，沒有 species_id 屬性、值 --> 後續需用於預先設定品種欄位 : pet_Species )
        pet.species_id = species?.id ;

        // 開啟右側更新面板 
        dispatch( set_Side_Panel( true , <Update_Pet /> , { preLoadData : pet } ) ) ;

    } 
    
    
    return click_Update_Pet


} ;







