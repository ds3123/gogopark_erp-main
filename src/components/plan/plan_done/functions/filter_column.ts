


// 篩選 _ 客戶 : 手機號碼
export const filter_Cus_Mobile = ( cus_Mobile : string ) => ( data : any[] ) : any[] => {  

    if( !cus_Mobile ) return data ;

    return data?.filter( x => ( x?.customer?.mobile_phone )?.includes( cus_Mobile ) ) ;

}

// 篩選 _ 客戶 : 姓名
export const filter_Cus_Name = ( cus_Name : string ) => ( data : any[] ) : any[] => {  

  if( !cus_Name ) return data ;
    
  return data?.filter( x => ( x?.customer?.name )?.includes( cus_Name ) ) ;

}

// 篩選 _ 客戶 : 身分證字號
export const filter_Cus_Id = ( cus_Id : string ) => ( data : any[] ) : any[] => {  

  if( !cus_Id ) return data ;
    
  return data?.filter( x => ( x?.customer_id )?.includes( cus_Id ) ) ;

}

// 篩選 _ 寵物 : 名字
export const filter_Pet_Name = ( pet_Name : string ) => ( data : any[] ) : any[] => {  

  if( !pet_Name ) return data ;
    
  return data?.filter( x => ( x?.pet?.name )?.includes( pet_Name ) ) ;

}

// 篩選 _ 寵物 : 品種
export const filter_Pet_Species = ( pet_Species : string ) => ( data : any[] ) : any[] => {  

  if( !pet_Species ) return data ;
    
  return data?.filter( x => ( x?.pet?.species )?.includes( pet_Species ) ) ;

}

// 篩選 _ 寵物 : 序號
export const filter_Pet_Serial = ( pet_Serial : string ) => ( data : any[] ) : any[] => {  

  if( !pet_Serial ) return data ;
    
  return data?.filter( x => ( x?.pet?.serial )?.includes( pet_Serial ) ) ;

}


