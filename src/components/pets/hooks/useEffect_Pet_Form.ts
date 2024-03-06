/* eslint-disable react-hooks/exhaustive-deps */
import { useState , useEffect  } from 'react' ;
import { useDispatch  } from "react-redux" ;
import { get_Today } from "utils/time/date"

import { set_Current_Species_Select_Id , 
         set_Current_Pet
       } from "store/actions/action_Pet" 

import { set_Is_Show_Section_Services } from "store/actions/action_Global_Layout" ;
import { useAccount_Shop_Id } from 'hooks/data/useAccount';
import { useFetch_Shop_Account } from "hooks/react-query/account/useFetchAccounts" ;





// 帶入 _ 寵物欄位舊資料
const fill_Pet_Columns = ( pet : any , setValue : any ,  petSpecies : any[] ) => {
        

    // * 取得 _ 該寵物 pet_species 資料表資料 ( 為取得品種 id )
    const _pet   = petSpecies.filter( x => x['name'] === pet['species'] )[0] ; 
    const config = { shouldValidate : true , shouldDirty : true } ;

    // 基本資料
    setValue( "pet_Serial"   , pet['serial']  , config ) ;
    setValue( "pet_Name"     , pet['name']    , config ) ;

    setValue( "pet_Species"  , _pet ? _pet['id'] : '' , config ) ;

    setValue( "pet_Sex"      , pet['sex']     , config ) ;
    setValue( "pet_Color"    , pet['color']   , config ) ;
    setValue( "pet_Weight"   , pet['weight']  , config ) ;
   
    setValue( "pet_Size"     , pet['size'] ? pet['size'] : '請選擇' , config ) ;

    setValue( "pet_Age"      , pet?.birthday ? new Date( pet?.birthday ) : ''  , config ) ;
    setValue( "pet_Chip"     , pet?.chip_code  , config ) ;

    // 往來醫院
    setValue( "pet_Hospital_Name"      , pet?.hospital_name      , config ) ;
    setValue( "pet_Hospital_Telephone" , pet?.hospital_telephone , config ) ;
    setValue( "pet_Hospital_Address"   , pet?.hospital_address   , config ) ;


    // 調查資料 ( 單選 )
    setValue( "injection" , pet['injection'] , config ) ;
    setValue( "flea"      , pet['flea']      , config ) ;
    setValue( "ligate"    , pet['ligate']    , config ) ;
    setValue( "chip"      , pet['chip']      , config ) ;
    setValue( "infection" , pet['infection'] , config ) ;
    setValue( "together"  , pet['together']  , config ) ;
    setValue( "drug"      , pet['drug']      , config ) ;
    setValue( "bite"      , pet['bite']      , config ) ;

    // 調查資料 ( 複選 : 轉為陣列 ) 
    setValue( "health"       , pet['health']       ? pet['health'].split(',')       : [] , config ) ;
    setValue( "feed"         , pet['feed']         ? pet['feed'].split(',')         : [] , config ) ;
    setValue( "toilet"       , pet['toilet']       ? pet['toilet'].split(',')       : [] , config ) ;
    setValue( "ownerProvide" , pet['ownerProvide'] ? pet['ownerProvide'].split(',') : [] , config ) ;

    // 備註
    setValue( "pet_Note"     , pet['note']         , config ) ;  // 洗澡美容備註
    setValue( "lodge_Note"   , pet['lodge_note']   , config ) ;  // 住宿備註  
    setValue( "private_Note" , pet['private_note'] , config ) ;  // 客訴及其他備註 ( 私有備註 )

    
} ;  


//----------


// 點選 _ 寵物名字，設定、帶入 : 寵物欄位資料
export const useEffect_Click_Set_Pet_Data = ( setValue : any , petSpecies : any[]  ) => {

    const dispatch = useDispatch() ;


    const click_Set_Cus_Data = ( pet : any ) => {

          // * 取得 _ 該寵物 pet_species 資料表資料 ( 為取得品種 id )
          const _pet   = petSpecies.filter( x => x['name'] === pet['species'] )[0] ;
          const pet_Id = _pet ? _pet['id'] : '' ;


          // 帶入 _ 寵物欄位舊資料
          fill_Pet_Columns( pet , setValue , petSpecies ) ;

          // # 點選寵物，主要影響後續資料動作 ---

            // 設定 _ 目前所點選 : 寵物
            dispatch( set_Current_Pet( pet ) ) ;

            // 設定 _ 目前所選擇 : 寵物品種 id ( for 設定 _ 該品種 : 基本價格 )
            dispatch( set_Current_Species_Select_Id( pet_Id ) ) ;
  

          // ---

            // 設定 _ 顯示 : 服務整體區塊 ( 新增表單 )
            dispatch( set_Is_Show_Section_Services( true ) ) ;    

          
    }

    return click_Set_Cus_Data

} ;


// 改變 _ 下拉選單
export const useEffect_Change_Select_Option = ( petSpecies : any[]  ) => {

    const dispatch = useDispatch() ;

    // 品種代號
    const [ species_Num , set_Species_Num ] = useState( '' ) ;

    // 品種名稱
    const [ pet_Species_Name , set_Pet_Species_Name ] = useState( '' ) ;


    // 變動處理函式 
    const get_Species_Id = ( species_Id : string ) => {

         // 設定 _ 寵物品種 : 序號、名稱 
        const mPet = petSpecies.filter( x => x['id'] === parseInt( species_Id ) )[0] as any ;  // 篩選出該寵物 
        
        if( mPet ){

            set_Species_Num( mPet['serial'] ) ;                                                         
            set_Pet_Species_Name( mPet['name'] ) ;

        }else{

            set_Species_Num( '' ) ; 

        }


        // 設定 _ 目前下拉選擇的品種 Id 
        dispatch( set_Current_Species_Select_Id( species_Id ) ) ;  
        
    
    } ;


    return { species_Num , pet_Species_Name , get_Species_Id }

}


/*

  @ 設定、注入 _ 寵物編號

    # Param _ species_Num         : 品種編號 ( Ex. 秋田犬為 56 )
    # Param _ current_Species_Sum : 目前特定店家下，某品種在資料表 pet 所有數量總和
    # Param _ setValue            : React Hook Form 設定欄位值方法 

*/ 
export const useEffect_Change_Set_PetSerial_Column = ( species_Num : string , current_Species_Sum : number , setValue : any ) => {

   // 取得 _ 目前登入者，所屬店家資訊
   const shop_Info    = useFetch_Shop_Account( useAccount_Shop_Id() ) ;
   const shop_Zipcode = shop_Info?.zipcode ;  // 郵遞區號
   const shop_Num     = shop_Info?.shop_num ; // 區域店別編號


   useEffect( () => {

       /*
    
          # 編號產生規則 :

            (1) 前 2 位數為寵物 _ 品種編號 ( species_Num )         
            (2) 後 4 位數為特定店家，該品種目前於資料表 ( pet ) 總筆數 + 1 
    
                Ex. 若秋田犬 ( 品種編號為 56 ) 在資料表( pet ) 中已有 2 筆，則目前新增寵物自動產生的序號為 : 5600003

       */ 

       if( species_Num && shop_Zipcode && shop_Num ){

            const today = get_Today().slice( 2 , 10 ) ;  // 今日 ( 前 2 位數忽略 Ex 20211114 --> 211114 )   
            const cNum  = current_Species_Sum + 1  ;
            let _cNum   = '' ;
    
            if( cNum < 10 )                  _cNum = '000' + cNum.toString() ;
            if( cNum >= 10 && cNum < 100 )   _cNum = '00'  + cNum.toString() ;
            if( cNum >= 100 && cNum < 1000 ) _cNum = '0'   + cNum.toString() ;

            // 依照上述資訊，設定 _ 寵物編號 
            setValue( "pet_Serial" , `P_${ shop_Zipcode }_${ shop_Num }_${ today }_${ species_Num }${ _cNum }` ) ;   // 設定 input 欄位值 

       }       
      
    
   } , [ species_Num , current_Species_Sum , shop_Zipcode , shop_Num ] ) ;


} ;
