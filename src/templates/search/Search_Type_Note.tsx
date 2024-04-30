import { useState , useEffect } from "react" ;
import { Services } from "utils/Interface_Type" ;


type Note = {
   data_Type : Services ;  // 資料類型 ( Ex. customer , pet , services , lodge , care , plan )
}


// 可搜尋關鍵字類型
const types_Customer = [ "客戶姓名","客戶身分證字號","客戶手機號碼","關係人姓名","關係人手機號碼","關係人家用電話" ] ;  // 客戶
const types_Pet      = [ "寵物名字","寵物品種","寵物編號","客戶姓名","客戶身分證字號","客戶手機號碼" ] ;              // 寵物
// const types_Service  = [ "客戶姓名","客戶身分證字號","客戶手機號碼","寵物名字","寵物品種","服務類型" ] ;              // 洗美
const types_Service  = [ "客戶姓名","客戶身分證字號","客戶手機號碼" ] ;              // 洗美
const types_Plan     = [ "方案名稱","客戶姓名","客戶身分證字號","客戶手機號碼","寵物名字","寵物品種","寵物編號" ] ;    // 方案
const types_Care     = [ "寵物名字","寵物品種","寵物編號","客戶姓名","客戶身分證字號","客戶手機號碼" ] ;              // 安親
const types_Lodge    = [ "自訂編號" , "房型","房號","寵物名字","寵物品種","寵物編號","客戶姓名","客戶身分證字號","客戶手機號碼" ] ; // 住宿


// @ 可搜尋類型提示 ( Ex. 客戶姓名、客戶身分證字號 .... )
const Search_Type_Note = ( { data_Type } : Note ) => {


  // 是否顯示 : 可搜尋類型提示 
  const [ is_Show_Note , set_Is_Show_Note ] = useState( false ) ;

  // 可搜尋類別提示字串
  const [ noteStr , set_NoteStr ] = useState( "" ) ;



  // 點選 _ 顯示提示字串
  const click_Note = () => set_Is_Show_Note( !is_Show_Note ) ;


  // 設定 _ 可搜尋類別提示字串
  useEffect( () => {
    
    if( data_Type === "customer" ) set_NoteStr( types_Customer.join( ' , ' ) ) ;
    if( data_Type === "pet" )      set_NoteStr( types_Pet.join( ' , ' ) ) ;
    if( data_Type === "service" )  set_NoteStr( types_Service.join( ' , ' ) ) ;
    if( data_Type === "plan" )     set_NoteStr( types_Plan.join( ' , ' ) ) ;
    if( data_Type === "lodge" )    set_NoteStr( types_Lodge.join( ' , ' ) ) ;
    if( data_Type === "care" )     set_NoteStr( types_Care.join( ' , ' ) ) ;

    
  } , [ data_Type ] ) ;



  return <div className="m_Bottom_5">     

              <b className= { is_Show_Note ? 'f_14 fGreen' : 'f_14' }  onClick={ click_Note }> <i className="fas fa-info-circle pointer m_Right_5"></i> </b>  

              { is_Show_Note &&   
                 <> 
                    可搜尋類別 : 
                    <div className="relative m_Left_30"> 
                        <b className="fDblue"> { noteStr } </b> 
                    </div>
                 </>
              }  

          </div>   

} ;


export default Search_Type_Note
       