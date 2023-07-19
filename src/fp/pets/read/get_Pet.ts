


// 取得 _ 有特定寵物 id 的服務單
export const get_ServiceOrder_By_PetId = ( petId : number ) => ( serviceOrder : any[] ) => serviceOrder.filter( x => x?.pet?.pet_id === petId ) ;



