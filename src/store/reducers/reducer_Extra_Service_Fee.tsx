

/* @ 各項服務 _ 額外價格  */
interface ILayout {

    Self_Adjust_Amount    : number ; // 各項服務自行增減費用

    Lodge_Care_Amount     : number ; // 安親費用
    Lodge_Together_Amount : number ; // 同住費用

    Lodge_Bath_Amount     : number ; // 洗澡費用
    Lodge_Beauty_Amount   : number ; // 美容費用
    Lodge_Custom_Amount   : number ; // 自訂費用

    Extra_Item_Fee        : number ; // 加價項目
    Extra_Beauty_Fee      : number ; // 加價美容

    Pickup_Fee            : number ; // 接送費

}

const initState = {

    Self_Adjust_Amount    : 0 ,

    Lodge_Care_Amount     : 0 ,
    Lodge_Together_Amount : 0 ,

    Lodge_Bath_Amount     : 0 ,
    Lodge_Beauty_Amount   : 0 ,
    Lodge_Custom_Amount   : 0 ,

    Extra_Item_Fee        : 0 ,
    Extra_Beauty_Fee      : 0 ,

    Pickup_Fee            : 0 

} ;


const reducer_Extra_Service_Fee = ( state : ILayout = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 各項服務自行增減費用
        case  "SET_SELF_ADJUST_AMOUNT"    :  return { ...state , Self_Adjust_Amount : action.amount } ;

        // # 設定 _ 住宿 : 安親費用 ( 提早 15 : 00 入住 )
        case  "SET_LODGE_CARE_AMOUNT"     :  return { ...state , Lodge_Care_Amount : action.amount } ;

        // # 設定 _ 住宿 : 同住寵物費用
        case  "SET_LODGE_TOGETHER_AMOUNT" :  return { ...state , Lodge_Together_Amount : action.amount } ;


        // # 設定 _ 住宿 : 洗澡費用
        case  "SET_LODGE_BATH_AMOUNT"     :  return { ...state , Lodge_Bath_Amount : action.amount } ;

        // # 設定 _ 住宿 : 美容費用
        case  "SET_LODGE_BEAUTY_AMOUNT"   :  return { ...state , Lodge_Beauty_Amount : action.amount } ;

        // # 設定 _ 住宿 : 自訂費用
        case  "SET_LODGE_CUSTOM_AMOUNT"   :  return { ...state , Lodge_Custom_Amount : action.amount } ;

        // # 設定 _ 接送費
        case  "SET_PICKUP_FEE"            :  return { ...state , Pickup_Fee : action.price } ;

        // # 設定 _ 加價項目費用
        case  "SET_EXTRA_ITEM_FEE"        :  return { ...state , Extra_Item_Fee : action.price } ;

        // # 設定 _ 加價美容費用
        case  "SET_EXTRA_BEAUTY_FEE"      :  return { ...state , Extra_Beauty_Fee : action.price } ;

        default : return state ;

    }

} ;

export default reducer_Extra_Service_Fee ;
