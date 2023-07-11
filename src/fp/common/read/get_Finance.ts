



// 取得 _ 付款方式
export const get_PaymentMethod = ( data : any ) : string => {

    return data?.payment_method ? data?.payment_method : ""

} ;