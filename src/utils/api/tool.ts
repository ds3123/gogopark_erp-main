/* eslint-disable @typescript-eslint/no-unused-vars */

import { Services } from "utils/Interface_Type" ;


export const get_Api_Obj = ( type : Services , account_id : string ) => {

    
    const config : any = {

                        // 客戶
                        'customer'  : `/customers/show_all_customers_relatives_pets/${ account_id }/0` , 
                                
                        // 寵物
                        'pet'       : `/pets/show_all_pets_customers_relatives/${ account_id }/0` ,
    
                        // 洗美
                        'service'   : `/services/show_all_with_cus_relative_pet/${ account_id }/0` ,  
                            
                        // 方案
                        'plan'      : `/plans/show_all_with_customer_species_records/${ account_id }` , 

                        // 方案 ( 已用完 )
                        'plan_done' : `/plans/show_all_with_customer_species_records/${ account_id }` , 

                        // 住宿 
                        'lodge'     : `/lodges/show_with_cus_relative_pet/${ account_id }/0` ,         
                                    
                        // 安親 
                        'care'      : `/cares/show_with_cus_relative_pet/${ account_id }/0` ,        
                                    
                    } ;

    return config[ type ]

}