import { useEffect } from 'react' ;
import cookie from 'react-cookies' ;    // 匯入 cookie


// @ 管理區 ( 首頁 / 整體 ) 相關 Effect




// cookie 值所相對應要點選的第 2 , 3 層頁籤
const obj_Tag : any = {

                        // # 價格管理
                        "價格管理_品種價格" : { second : "價格管理" , third : "品種價格" } ,  // 品種
                        "價格管理_基礎"    : { second : "價格管理"  , third : "基礎" } ,     // 基礎
                        "價格管理_洗澡"    : { second : "價格管理"  , third : "洗澡" } ,     // 洗澡
                        "價格管理_美容"    : { second : "價格管理"  , third : "美容" } ,     // 美容
                        "價格管理_安親"    : { second : "價格管理"  , third : "安親" } ,     // 安親
                        "價格管理_住宿"    : { second : "價格管理"  , third : "住宿" } ,     // 住宿
                        "價格管理_加價項目" : { second : "價格管理"  , third : "加價項目" } , // 加價項目
                        "價格管理_加價美容" : { second : "價格管理"  , third : "加價美容" } , // 加價美容

                         // # 帳號管理
                         "帳號管理"         : { second : "帳號管理"  , third : "" } ,       
                             
                         // # 員工管理
                         "員工管理"         : { second : "員工管理"  , third : "" } ,    

                         // # 資料管理
                         "資料管理_拒接客戶" : { second : "資料管理"  , third : "拒接客戶" } , // 拒接客戶
                         "資料管理_拒接寵物" : { second : "資料管理"  , third : "拒接寵物" } , // 拒接寵物
                         "資料管理_服務異常" : { second : "資料管理"  , third : "服務異常" } , // 服務異常
                         "資料管理_銷單資料" : { second : "資料管理"  , third : "銷單資料" } , // 銷單資料
                         "資料管理_方案資料" : { second : "資料管理"  , third : "方案資料" } , // 方案資料
                         
                         // 再確認 2022.12.114
                         "客戶"            : { second : "資料管理"  , third : "封存資料" } , // 封存資料
                         "寵物"            : { second : "資料管理"  , third : "封存資料" } , // 封存資料
                         "洗美"            : { second : "資料管理"  , third : "封存資料" } , // 封存資料
                         "方案"            : { second : "資料管理"  , third : "封存資料" } , // 封存資料
                         "安親"            : { second : "資料管理"  , third : "封存資料" } , // 封存資料
                         "住宿"            : { second : "資料管理"  , third : "封存資料" } , // 封存資料

                         // # 系統設定
                         "系統設定_寵物品種" : { second : "系統設定"  , third : "寵物品種" } , // 寵物品種
                         "系統設定_熱門時段" : { second : "系統設定"  , third : "熱門時段" } , // 熱門時段


                      } ;    


// # 編輯 ( 新增、修改、刪除 ) 資料後，藉由 cookie，重導向至相對應的區塊頁面
export const useEffect_Management_After_Edit = ( click_Second : any , click_Third : any ) => {

    
    useEffect( () => {

        // ＃ 取得 _ 管理區編輯後，所建立的 cookie : 

        // * 新增
        const cookie_Create = cookie.load('after_Created_Redirect') ;

        // * 修改
        const update_Price = cookie.load('after_Updated_Prices') ;
        const update_Data  = cookie.load('after_Updated_Data') ;
        const undo_Archive = cookie.load('after_Undo_Archive') ;

        // * 刪除
        const delete_Archive    = cookie.load('after_Delete_Archive') ;
        const delete_CustomPlan = cookie.load('after_Delete_CustomPlan') ;

        // --------------

        // 預設點選
        let c_Second = "財務管理" ;
        let c_Third  = "綜合報表" ;
        

        // 篩選出目前建立的 cookie
        const cookie_Arr = [ cookie_Create , update_Price , update_Data , undo_Archive , delete_Archive , delete_CustomPlan ] ;
        const tag_Index  = cookie_Arr.filter( x => x !== undefined )[0] ;

        // 若有 cookie，依其取得 _ 要點選的第 2 , 3 層標籤
        if( tag_Index ){
            c_Second = obj_Tag[ tag_Index ]?.second  ;
            c_Third  = obj_Tag[ tag_Index ]?.third  ;
        }

        // 點選標籤
        click_Second( c_Second ) ;
        click_Third( c_Third ) ;
      
    } , [] ) ;

    
} ;




