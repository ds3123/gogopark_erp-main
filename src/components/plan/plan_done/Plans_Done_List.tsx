/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { FC , useState , useMemo } from 'react' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useFetch_All_Plans } from "hooks/react-query/plan/useFetchPlans";
import { is_Plan_Done } from "../hooks/useEffect_Plan_Used_Column";
import Plan_Used_Records_Button from "components/plan/components/Plan_Used_Records_Button";
import { is_Downloading } from "templates/note/Query_Info" ;
import { execute_Filter } from "./functions/execute_filter" 
import { Filter_Columns } from './types/column';
import Plan_Type from '../components/Plan_Type';
import List_Title from './components/List_Title';
import Filter_Column from './components/Filter_Column';
import { useEffect_Init_Data } from './hooks/useEffect_Init_Data';
import { Filter_Note } from './components/Filter_Snippet';





// # 已用完方案列表 ( 右側面板 )
const Plans_Done_List : FC = () => {

    // 客戶 : 姓名
    const [ cus_Name , set_Cus_Name ] = useState( '' ) ; 

    // 客戶 : 手機號碼
    const [ cus_Mobile , set_Cus_Mobile ] = useState( '' ) ; 

    // 客戶 : 身分證字號
    const [ cus_Id , set_Cus_Id ] = useState( '' ) ; 

    // 寵物 : 名字
    const [ pet_Name , set_Pet_Name ] = useState( '' ) ; 

    // 寵物 : 品種
    const [ pet_Species , set_Pet_Species ] = useState( '' ) ; 

    // 寵物 : 序號
    const [ pet_Serial , set_Pet_Serial ] = useState( '' ) ; 

    // 篩選資料
    const [ filter_Data , set_Filter_Data ] = useState< any[] >( [] ) ; 


    // 目前登入使用者，所屬商店 id
    const shop_Id    = useAccount_Shop_Id() ; 


    // 取得 _ 特定店家，所有的方案
    const all_Plans  = useFetch_All_Plans( shop_Id ) ; 


    // 篩選 _ 已用完方案    
    const done_Plans = useMemo( () => all_Plans?.filter( is_Plan_Done ) , [ all_Plans ] ) ;


    // 篩選欄位
    const obj : Filter_Columns = {
                            cus_Name   : cus_Name   ,
                            cus_Mobile : cus_Mobile ,
                            cus_Id     : cus_Id     ,
                            pet_Name    : pet_Name ,
                            pet_Serial  : pet_Serial ,
                            pet_Species : pet_Species ,
                          } ; 


    // 點選 _ 篩選欄位
    const click_Filter = () => {
    
        const data = execute_Filter( done_Plans , obj ) ;

        if( data?.length === 0 ){
          click_Clean();
          return alert( '沒有符合篩選條件的方案' )
        } 
        
        set_Filter_Data( data ) ; 

    } ;

    // 清除 _ 篩選欄位
    const click_Clean = () => {

        set_Cus_Name( '' ) ; 
        set_Cus_Mobile( '' ) ; 
        set_Cus_Id( '' ) ; 
        set_Pet_Name( '' ) ; 
        set_Pet_Serial( '' ) ; 
        set_Pet_Species( '' ) ; 

        set_Filter_Data( [] ) ;

    } ;


    // 初始顯示資料
    useEffect_Init_Data( done_Plans , set_Filter_Data ) ;


    
    const has_Data = filter_Data?.length > 0 ;


  return <div className = "relative" >
         
           <b onClick = { click_Clean } className = "button hover absolute" style = {{ right : "30px" }} >
              <i className = "fas fa-sync-alt"></i> 
           </b> 

           <b className = "tag is-large is-rounded f_18 relative" > 
                        
             <i className = "fas fa-file-alt"></i> &nbsp; 方案 ( 已用完 ) &nbsp; 

             <span className = "tag is-rounded is-white f_14" > 
                 筆數 : &nbsp; <span className = "fDblue" > { filter_Data?.length  } </span>  
             </span>

           </b> 

           <Filter_Note />

           { done_Plans?.length > 0 ? 

           <>

              <div className = "columns is-multiline m_Top_30" > 

                <Filter_Column title = "寵物名字"    value = { pet_Name }    action = { set_Pet_Name } />            
                <Filter_Column title = "寵物品種"    value = { pet_Species } action = { set_Pet_Species } />            
                <Filter_Column title = "寵物序號"    value = { pet_Serial }  action = { set_Pet_Serial } />     
                <Filter_Column title = "客戶手機號碼" value = { cus_Mobile } action = { set_Cus_Mobile } />            
                <Filter_Column title = "客戶姓名"     value = { cus_Name }  action = { set_Cus_Name } />            
                <Filter_Column title = "客戶身分字號" value = { cus_Id }     action = { set_Cus_Id } />            
                      
                <div className = "column is-12"> 
                  <b onClick = { click_Filter } className = "tag is-large is-success w-full pointer" > 
                    <i className = "fas fa-filter"></i> &nbsp; 篩 選 _ 已 用 完 方 案 
                  </b>
                </div>

              </div>

              { !has_Data && <div className = "tag is-large is-white w-full m_Top_50 fDred" > 
                              <i className = "fas fa-info" ></i> &nbsp; 尚未取得資料 
                          </div>  }

              { has_Data && 

                <>
                    <List_Title />
                    {
                        filter_Data?.map( ( x : any , y : number ) => {

                                const pet = x?.pet ;
                                const cus = x?.customer ;

                          return <div key = { y } className = "columns p-4 m_Bottom_20" >
                                    <div className = "column is-3" > <Plan_Type data = { x } /> </div>
                                    <div className = "column is-3" > <b className = "f_14" > <p> { pet?.name }  <span className = "f_11"> ( { pet?.species } ) </span> </p> </b> { pet?.serial }   </div>
                                    <div className = "column is-3" > <b className = "f_14" > <p> { cus?.name }  <span className = "f_12"> ( { cus?.mobile_phone } ) </span> </p> </b>  { cus?.id } </div>
                                    <div className = "column is-offset-1 is-1 has-text-centered" > <Plan_Used_Records_Button plan = { x } /> </div>
                                </div> ;

                        }) 
                    }
                </>  

              } 

           </> : <div> { is_Downloading() } </div>      }
          
         </div>

} ;

export default Plans_Done_List  