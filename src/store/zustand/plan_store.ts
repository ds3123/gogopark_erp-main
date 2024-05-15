


import { create } from "zustand"


export type PlanStore = {
    
     shop_plans : any[] , // 所有店家方案

}


// # 店家方案
export const useStore_Plan = create< PlanStore >( ( set ) => ({

    shop_plans : [] ,
       
}));

