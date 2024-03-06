
import { useAccount_Shop_Id } from 'hooks/data/useAccount';
import { FC } from 'react' ;
import { useForm , SubmitHandler } from "react-hook-form" ;
import { Toast } from 'templates/note/Toast' ;
import { create_Service_Tag , delete_Service_Tag } from "utils/api/api_Service_Tag" ;
import { useQueryClient } from "react-query" ;
import { useFetch_Shop_BathBeauty_CheckNotes } from "hooks/react-query/service/useFetchServices" ;



type Input = { service_Note : string ; }




// @ 洗澡美容備註
const BathBeauty_List : FC = () => {

    // 店家 id  
    const shopId      = useAccount_Shop_Id() ;

    // for 新增後，清除快取 ( 更新頁面 )
    const queryClient = useQueryClient() ;


    // React Hook Form
    const { register , setValue , handleSubmit } = useForm< Input >() ;

    // 取得 _ 所有新增標籤
    const data = useFetch_Shop_BathBeauty_CheckNotes( shopId ) ;
    
    
    // 點選 _ 新增
    const click_AddNote : SubmitHandler< Input > = async( data ) => {

        const text = data.service_Note ;

        if( !text ) return alert( "需填寫 : 勾選欄位名稱" ) ;

        // 清空
        setValue( "service_Note"  , "" ) ;

        // 新增資料
        await create_Service_Tag( { account_id : shopId , type : "洗澡美容備註" , text : text } ) ;

        // 設定 Toast 通知
        Toast( "新增成功" ) ;

        // 刪除快取
        queryClient.invalidateQueries() ; 
    
    } ;



    return <>
                <form onSubmit = { handleSubmit( click_AddNote ) } >

                    { /* 輸入欄位 */ }
                    <div className = "columns is-multiline is-mobile m_Bottom_50 m_Top_20" >

                        <div className = "column is-offset-2 is-2-desktop" >

                        <i className = "far fa-edit f_16 relative" style = {{ top : "6px" }} ></i> &nbsp; <b className = "f_14 relative" style={{ top:"5px" }} > 新增 _ 勾選欄位 : </b>

                        </div>

                        <div className = "column is-4-desktop" >

                            <input type = "text" { ...register( "service_Note" ) } className = "input" style={{ height : "40px" }}  />

                        </div>

                        <div className = "column is-4-desktop" >

                            <button className = "tag is-warning f_14 pointer" style = {{ border:"none" }} > 新 增 </button>

                        </div>

                    </div>

                </form>

                {/* 顯示區塊 */}
                <div className = "columns is-multiline is-mobile m_Bottom_50 m_Top_20" >

                   <div className = "column is-offset-1 is-10-desktop p_20" style = {{ border : "1px solid rgba(0,0,0,.1)" }}>

                      { 
                        data?.map( ( x , y ) => <b key = { y } className = "tag f_14 m_Bottom_15 m_Right_15" > 
                                                   { x.text }&nbsp; 
                                                   <span className="delete" onClick={ () => { if( window.confirm('確認要刪除此標籤 ?') ) delete_Service_Tag( x.id ) ; Toast( "刪除成功" ) ; }  }></span> 
                                                </b> ) 
                      }

                   </div> 
                    
                </div>
    
           </>

} ;

export default BathBeauty_List
       