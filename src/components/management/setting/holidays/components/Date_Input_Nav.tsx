/* eslint-disable react/jsx-pascal-case */
import { FC , useState } from 'react' ;
import { useForm } from "react-hook-form" ;
import Date_Picker from "templates/form/Date_Picker" ;
import { useEffect_CheckIn_CheckOut } from "../hooks/useEffect_Holidays_List" ;
import { get_Interval_Dates } from "utils/time/date" ;
import { useCreate_Holiday } from "hooks/react-query/lodge/useCreateHoliday" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useEffect_Edit_Redirect } from "../hooks/useEffect_Holidays_List" ;
import { useFetch_Shop_All_Holidays } from "hooks/react-query/lodge/useFetchHoliday" ;
import { get_Lodge_All_Dates , is_Lodge_Duplicate_Date } from "fp/lodges/read/get_Lodge" ;




// 輸入 _ 起始、結束日期
const Date_Input_Nav : FC = () => {


    // 目前登入者所屬店家 id
    const shop_Id         = useAccount_Shop_Id() ;

    // 特定店家，所有熱門時段
    const shopAllHolidays = useFetch_Shop_All_Holidays( shop_Id ) ;

    // 取出所有時段名稱
    const allTitles = shopAllHolidays.map( x => x.title ) ;

    // 取出所有日期
    const allDates  = get_Lodge_All_Dates( shopAllHolidays ) ;


    // React Hook Form
    const { control , setValue } = useForm() ; 


    // 時段名稱
    const [ title , set_Title ] = useState( "" ) ;


    // 起始、結束日期
    const { check_In , check_Out , handle_CheckIn_Date , handle_CheckOut_Date } = useEffect_CheckIn_CheckOut( setValue ) ;


    // 新增函式
    const create_Holiday = useCreate_Holiday() ;

    // 重導向
    const redirect = useEffect_Edit_Redirect( "已新增 : 熱門時段" ) ;
 

    // 點選 _ 新增
    const click_AddDates = () => {

        // 所有日期
        const intervalDates = get_Interval_Dates( check_In , check_Out ) ;


        if( !title ){
           alert( "請輸入 : 時段名稱" ) ;
           return false
        }


        if( title && allTitles.includes( title ) ){
              alert( "熱門時段名稱重複，請改用其他名稱" ) ;
              set_Title( '' ) ;
              return false
        }

        if( is_Lodge_Duplicate_Date( intervalDates , allDates ) ){
            alert( "所輸入日期重複，請重新調整日期區間" ) ;
            return false
        }


        // 日期檢查
        if( check_Out < check_In ){
            alert('結束日期，不能早於起始日期') ;
            setValue( 'end_date' , new Date( check_In ) ) ;
            handle_CheckOut_Date( new Date( check_In ) ) ;     
            return false ;
        }


        
        if( intervalDates.length < 1 ){
            alert( "請輸入 : 日期資料" ) ;
            return false
        }


        // 回復初始值
        setValue( 'start_date' , new Date() ) ;
        setValue( 'end_date' , new Date() ) ;
        handle_CheckIn_Date( new Date() ) ;
        handle_CheckOut_Date( new Date() ) ;
        set_Title( '' ) ;


        // 新增熱門時段日期
        intervalDates.forEach( x => {

            create_Holiday({ 
                              account_id : shop_Id ,
                              title      : title ,
                              date       : x
                           })

        }) ;

        
        // 重導向
        redirect() ;
    

    } ;



    return <div className = "columns is-multiline is-mobile m_Top_30" >

                <div className = "column is-offset-1 is-3-desktop relative" >

                    <div className = "absolute" style={{ top :  "-12px" , width : "100%" }} >

                        <b> 時段名稱 </b>
                        <div className = "control has-icons-left" >
                            <input className="input" type="text" value={ title } onChange={ e => set_Title( e.target.value ) } />
                            <span className="icon is-small is-left"> <i className="fas fa-list"></i> </span>
                        </div>

                    </div>

                </div>

                <div className = "column is-offset-1 is-2-desktop relative" >

                    <b className="absolute" style={{top:"-15px",left:"10px"}} > 開始日期 : </b>

                    <Date_Picker control        = { control }
                                name            = "start_date"
                                default_Date    = { new Date() }
                                handle_OnChange = { ( value : any ) => handle_CheckIn_Date( value ) }  />

                </div>  

                <div className = "column is-2-desktop relative" >

                    <b className="absolute" style={{top:"-15px",left:"10px"}} > 結束日期 : </b>

                    <Date_Picker control         = { control }
                                name            = "end_date"
                                default_Date    = { new Date() }
                                handle_OnChange = { ( value : any ) => handle_CheckOut_Date( value ) }  />

                </div>  

                <div className = "column is-2-desktop" > 
                
                    <b className = "tag is-large hover" onClick = { () => click_AddDates() } > 
                    
                        <i className="fas fa-paper-plane m_Right_10"></i>
                        <span className = "f_12" > 新增日期 </span> 
                    
                    </b>


                </div>

            </div>


} ;


export default Date_Input_Nav
       