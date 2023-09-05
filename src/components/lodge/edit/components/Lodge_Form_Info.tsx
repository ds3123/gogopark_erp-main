import { FC , useState } from "react" ;
import moment from "moment" ;
import { set_Current_Lodge_Type , set_Current_Lodge_Number } from "store/actions/action_Lodge" ;
import { useDispatch, useSelector } from "react-redux" ; 
import { lodge_Rooms } from "components/lodge/lodge_config" ;


type lodgeForm = {

    editType    : string | undefined ;
    errors      : any ;
    register    : any ;
    serviceData : any ;
    
}



            
// @ 住宿基本資訊欄位 : 合約編號、房型、房號  
const Lodge_Form_Info : FC< lodgeForm > = ( { editType , register , serviceData } ) => {


    const dispatch = useDispatch();
    const today    = moment( new Date() ).format('YYYY-MM-DD') ;                              // 今日 
    
    const [ currentNumbers , set_CurrentNumbers ] = useState<any[]>([]) ;                     // 目前房型下，相對應的房號     
    const check_In_Date = useSelector( ( state : any ) => state.Lodge.lodge_Check_In_Date ) ; // 住房日期
    

    // 下拉變動 : 房型
    const handle_Lodge_Type = ( type : string ) => {

        // 設定 : 房型 
        dispatch( set_Current_Lodge_Type( type === '請選擇' ? '' : type ) ) ;  

        // 清空房號   
        if( type === '請選擇' ){ set_CurrentNumbers( [] ) ; return false ;  }

        // 設定 _ 此房型所有房號
        lodge_Rooms.forEach( x => { if( x['type'] === type ) set_CurrentNumbers( x['number'] ) ; } ) ;

    } ;


    // 下拉變動 : 房號
    const handle_Lodge_Number = ( number : string ) => {

        dispatch( set_Current_Lodge_Number( number === '請選擇' ? '' : number ) ) ;

    } ;
    

    // # 資料狀態
    const is_Create = editType !== '編輯' ;  // 新增
    const is_Update = editType === '編輯' ;  // 編輯

    const blue      = { color : "rgb(30,30,180)" } ; 
    const green     = "f_13 m_Top_5 fGreen" ;
    const column    = "column is-2-desktop" ;


  return  <div className="columns is-multiline is-mobile relative">

                { /* 系統編號 */ }
                <div className={ column }>

                    { is_Create && <div className = "absolute" style = {{ width : "158px" , height : "40px" , top : "37px" , borderRadius : "5px" , zIndex : 100 , background : "rgba(0,0,0,.1)" }} ></div>  }

                    <p> <b>系統編號</b> </p>

                    { is_Create && <input className="input" type="text" { ...register( "lodge_Serial" ) }  /> }
                    { is_Update && <b style={ blue } > { serviceData.contract_serial } </b> }

                </div>

                <div className={ column }>


                    <p> <b>自訂編號</b> </p>
                    { is_Create && <input className="input" type="text" { ...register( "lodge_Custom_Serial" ) }  /> }
                    { is_Update && <b style={ blue } > { serviceData.custom_serial } </b> }
                     

                </div>

                <div className={ column }>

                    <p> <b>性 質</b> </p>

                    { is_Create && <b className={ green }> { check_In_Date === today ? '當日住宿' : '預約住宿' } </b> }
                    { is_Update && <b className={ green }> { serviceData.service_status } </b> }

                </div>

                { /* 房 型  */ }
                <div className = { `${ column } required` }>

                    <p> <b>房 型</b> </p>

                    { is_Create && 

                        <div className = "select" >
                            <select { ...register( "lodge_Room_Type" ) } onChange={ e => handle_Lodge_Type( e.target.value ) } >
                                <option value="請選擇"> 請選擇 </option>
                                { lodge_Rooms.map( ( x : any , y : number ) => <option key={ y } value={ x['type'] }> { x['type'] } </option> ) }
                            </select>
                        </div>
                        
                    }    

                    { is_Update && <b className={ green }> { serviceData.room_type } </b> }

                </div>

                { /* 房 號 */ }
                <div className={ `${ column } required` }>

                    <p> <b>房 號</b> </p>
                    
                    { is_Create && 
                        <div className="select">
                            <select { ...register( "lodge_Room_Number" ) } onChange={ e => handle_Lodge_Number( e.target.value ) }  >
                                <option value="請選擇"> 請選擇 </option>
                                { currentNumbers.map( ( x : any , y : number ) => <option key={ y } value={ x } > { x } </option> ) }
                            </select>
                        </div>
                    }  

                    { is_Update && <b className={ green }> { serviceData.room_number } </b> }
                    
                </div>

         </div>
                 
} ;

export default Lodge_Form_Info
       