import { useAdd_Data_Obj_Extra_Props } from "containers/data_components/Data_Obj_Extra_Props" ;
import { useMatch_Obj } from "containers/data_components/Condition_for_Currnet_Tab" ;
import { useSelector } from "react-redux" ;
import { useMap_Create_Hooks } from "./useMap_Create_Hooks" ;
import { useAccount_Shop_Id } from "hooks/data/useAccount";
import { useCreate_Customer_Relatives } from "hooks/crud/create/useCreate_Customer_Relatives" ;
import { extra_Validator } from "utils/validator/extra_validator" ;



// 事件處理 : 點選 _ 新增資料
export const useEffect_Submit_Create = () => {


    // 目前登入者，所屬店別 id
    const shop_Id     = useAccount_Shop_Id() ;

    // 目前點選 _ 新增項目 : 頁籤 ( Ex. 基礎、洗澡、美容 )
    const current     = useSelector( ( state : any ) => state.Service.current_Create_Tab ) ;   

    // 目前點選 _ 客戶寵物 ( 過去新增 )
    const current_Pet = useSelector( ( state : any ) => state.Pet.current_Pet ) ; 

    // -----------

    // # 依照目前所點選 : 頁籤 ( current )，判斷 _ 是否顯示/符合條件
    const is_Obj                   = useMatch_Obj( current ) ;

    // 新增 _ 提交資料物件( data ) 屬性、屬性值
    const add_Data_Obj_Extra_Props = useAdd_Data_Obj_Extra_Props() ;  

    // # 新增函式 _ 依目前所處資料類型 ( Ex. 客戶、寵物.. )，取得相對應的資料新增函式 ( Ex. create_Customer , create_Pet ... ) 
    const create_Fucntion          = useMap_Create_Hooks( current ) ; 


    // 僅針對 _ 客戶關係人 ( 再確認 2021.07.05 / 改為若有 "新增客戶" 情況下，即新增關係人 --> 寫在 useAjax_Create 中，目前以下條件判斷，容易漏掉  )
    const create_Cus_Relatives     = useCreate_Customer_Relatives() ; 



    
    // -----------


    // # 新增資料函式
    const create_Data = ( data : any ) => {

        // Yup schema 以外，額外新增的欄位驗證 : 寵物 ( 是否咬人 )、住宿、價格、員工
        if( !extra_Validator( current , data , is_Obj , current_Pet ) ) return false ;


        // 經處理後 ( 某些區塊，Ex. 基礎、洗澡... ，需額外附加 data 物件的屬性、屬性值 ) 提交新增的資料物件
        const submit_Data = add_Data_Obj_Extra_Props( current , data ) ;

        // 新增 _ 各類型 ( Ex. 客戶、寵物、洗美 .... ) 資料
        create_Fucntion( submit_Data , shop_Id ) ;

        // 新增 _ 客戶關係人 ( 再確認 2021.07.05 / 改為若有 "新增客戶" 情況下，即新增關係人 --> 寫在 useAjax_Create 中，目前以下條件判斷，容易漏掉 )
        if( is_Obj.is_Customer_Relatives ) create_Cus_Relatives( "/customers/store_relation" , data ) ;
    

    } ;


    return create_Data

} ;
