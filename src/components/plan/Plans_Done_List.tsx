import { FC , useState } from 'react' ;
import { useAccount_Shop_Id } from "hooks/data/useAccount" ;
import { useFetch_All_Plans } from "hooks/react-query/plan/useFetchPlans";
import { is_Plan_Done } from "./hooks/useEffect_Plan_Used_Column";


const is_Last_100 = ( x : any ) => x?.id < 100 ;

const is_Pet = ( x : any ) => {

    const pet = x?.pet

} ;




// # 已用完方案列表 ( 右側面板 )
const Plans_Done_List : FC = () => {


    // 手機號碼
    const [ mobile , set_Mobile ] = useState( '' ) ; 

    // 目前登入使用者，所屬商店 id
    const shop_Id    = useAccount_Shop_Id() ; 

    // 取得 _ 所有的方案
    const all_Plans  = useFetch_All_Plans( shop_Id ) ; 

    // 篩選 _ 已用完方案    
    const done_Plans = all_Plans?.filter( is_Plan_Done ) ; 


    console.log( '11' , all_Plans ) ;
    console.log( '22' , done_Plans ) ;

    const set_Filter_Column = ( value : string ) => {
    
    
    } ;


  return <>
   
           { mobile }

           <div className = "columns ">

              <div className = "column is-1" ></div>

              <div className = "column is-3"> 

                <b className = "f_14"> 篩選欄位</b>
                <div className = "control has-icons-left" >
                  
                    <div className = "select">
                        <select onChange = { e  => set_Filter_Column( e.target.value ) }>
                            <option value = "客戶手機號碼"> 客戶手機號碼     </option>
                            <option value = "客戶姓名"> 客戶姓名     </option>
                        </select>
                    </div> 

                    <div className="icon is-small is-left"> <i className="fas fa-expand"></i> </div>

                </div>

              </div>
             
              <div className="column is-8"> 

                 <b className = "f_14" > 篩選值 </b>

                 <div className="control has-icons-left" >

                  <span className="icon is-small is-left"> <i className="fas fa-expand"></i> </span>
               
                  <input className = "input"  
                         type      = "text"
                         onChange  = { e => set_Mobile( e.target.value ) }  />

               </div>
              
                 
              </div>
             
           </div>

           <hr/>

           {
              done_Plans?.map( ( x : any , y : number ) => 
           
                <div key = { y } className = "border p-4 m_Bottom_20" >

                    { x?.id } / { x?.pet?.name } / { x?.pet?.species } / { x?.customer?.name } / { x?.customer?.mobile_phone }
                  
                </div> 
                
              ) 
            }
             
         </>

} ;

export default Plans_Done_List  