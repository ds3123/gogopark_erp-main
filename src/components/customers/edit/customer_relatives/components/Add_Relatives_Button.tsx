


type Btn = {

    is_Setting_Existing_Data   : boolean | "" | undefined ;    // 是否處於 _ 帶入舊關係人資料  ( 新增資料，且該客戶已有設定關係人 )    
    click_Add_Relatives        : () => void ; // 點選 _ 新增關係人按鈕 

}



// @ 新增關係人按鈕
const Add_Relatives_Button = ( { is_Setting_Existing_Data , click_Add_Relatives } : Btn ) => {


    return <>
    
            { !is_Setting_Existing_Data &&

                    <b className = "tag is-medium is-success is-light hover relative" 
                       style     = {{ float : "right" }}
                       onClick   = { () => click_Add_Relatives() } > 新 增 </b> 

            } 

          </>


} ;

export default Add_Relatives_Button
       