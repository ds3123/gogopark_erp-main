/* eslint-disable react/jsx-pascal-case */
import { FC , useState , useMemo } from 'react' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useFetch_All_Plans } from "hooks/react-query/plan/useFetchPlans";
import { is_Plan_Done } from "./hooks/useEffect_Plan_Used_Column";
import { compose } from 'fp/tool' ;
import useServiceType from "hooks/layout/useServiceType";


// @ 方案類型( "預設" / "自訂" )
const Plan_Type = ( { data } : { data : any } ) => {


  // 方案類型
  const plan_Type  = data['plan_type'] ;     
  const _plan_Type = ( plan_Type === "包月洗澡" || plan_Type === "包月美容" ) ? plan_Type : null;

  // 方案類型欄位 : 顏色、Icon
  const { color , icon }  = useServiceType( _plan_Type, false , 'medium' ); 

  return <>

               { /* 預設方案 */ } 
               { ( plan_Type === '包月洗澡' || plan_Type === '包月美容' ) &&
               
                   <b className = { color } >
                       <i className = { icon } ></i> &nbsp;  [ 預設 :  { data['id'] } ]  { plan_Type }
                   </b>
               
               }

               { /* 自訂方案 */ } 
               { ( plan_Type !== '包月洗澡' && plan_Type !== '包月美容' ) &&
               
                   <b className="tag is-medium is-warning is-light"  >
                       <i className="fas fa-ruler"></i> &nbsp; [ 自訂 : { data['id'] } ]  { plan_Type }
                   </b>
               
               }
  
         </>  

} ;


// 篩選 _ 客戶手機號碼
const filter_Cus_Mobile = ( cus_Mobile : string ) => ( data : any[] ) : any[] => {  

    if( !cus_Mobile ) return data ;

    return data?.filter( x => ( x?.customer?.mobile_phone )?.includes( cus_Mobile ) ) ;

}

// 篩選 _ 客戶姓名
const filter_Cus_Name = ( cus_Name : string ) => ( data : any[] ) : any[] => {  

  if( !cus_Name ) return data ;
    
  return data?.filter( x => ( x?.customer?.name )?.includes( cus_Name ) ) ;

}


// 執行篩選
const execute_Filter = ( data : any[] , cus_Mobile : string , cus_Name : string ) : any[] => { 

  return compose(
                  filter_Cus_Mobile( cus_Mobile ) , 
                  filter_Cus_Name( cus_Name )
                 )( data ) ; 

} ;



// # 已用完方案列表 ( 右側面板 )
const Plans_Done_List : FC = () => {


    // 客戶姓名
    const [ cus_Name , set_Cus_Name ] = useState( '' ) ; 

    // 客戶手機號碼
    const [ cus_Mobile , set_Cus_Mobile ] = useState( '' ) ; 


    // 目前登入使用者，所屬商店 id
    const shop_Id    = useAccount_Shop_Id() ; 

    // 取得 _ 所有的方案
    const all_Plans  = useFetch_All_Plans( shop_Id ) ; 


    // 篩選 _ 已用完方案    
    const done_Plans = all_Plans?.filter( is_Plan_Done ) ;
    
    // 執行篩選
    const filter_Data = useMemo( 
                                 () => execute_Filter( done_Plans , cus_Mobile , cus_Name ) , 
                                 [ done_Plans , cus_Mobile , cus_Name ] 
                                ) ;


  return <>

          <b className = "tag is-large is-rounded f_18 relative "> 
                        
             <i className = "fas fa-file-alt"></i> &nbsp; 方案 ( 已用完 ) &nbsp; 

             <span className = "tag is-rounded is-white f_14" > 
                 資料筆數 : &nbsp; <span className = "fDblue" > { filter_Data?.length  } </span>  
             </span>

          </b> 
          
           <div className = "columns m_Top_30">              
             
              <div className = "column is-2"> 

                 <b className = "f_14" > 客戶手機號碼 </b>

                 <div className = "control has-icons-left" >
                    <span className="icon is-small is-left"> <i className="fas fa-expand"></i> </span>
                    <input className = "input"  
                           type      = "text"
                           onChange  = { e => set_Cus_Mobile( e.target.value ) }  />
                 </div>
                 
              </div>

              <div className="column is-2"> 

                  <b className = "f_14" > 客戶姓名 </b>

                  <div className="control has-icons-left" >
                    <span className="icon is-small is-left"> <i className="fas fa-expand"></i> </span>
                    <input className = "input"  
                            type      = "text"
                            onChange  = { e => set_Cus_Name( e.target.value ) }  />
                  </div>

              </div>
             
           </div>

           <hr/>

           {
              filter_Data?.map( ( x : any , y : number ) => {

                       const pet = x?.pet ;
                       const cus = x?.customer ;


                return <div key = { y } className = "columns p-4 m_Bottom_20" >

                          <div className = "column is-3" > <Plan_Type data = { x } /> </div>

                          <div className = "column is-3" > <b className = "f_14" > { pet?.name } </b> ( { pet?.species } ) </div>

                          <div className = "column is-3" > <b className = "f_14" > { cus?.name } </b> ( { cus?.mobile_phone } ) </div>
                      
                       </div> ;


              }) 
            }
             
         </>

} ;

export default Plans_Done_List  