


// 方案使用記錄
interface PlanUsedRecord {

    id           : string ;  // 使用記錄 id

    service_type : "洗澡" | "美容" ;

    bath?        : any ;     // 洗澡資料
    beauty?      : any ;     // 美容資料

}




// 刪除 : 方案使用紀錄 _ 所需資訊物件
interface Delete_PlanUsedRecord_Info_Obj {

    planId                   : string ;         // 方案資料 id
    planUsedRecord_DeleteObj : Delete_Obj ;     // 刪除 _ 修改物件 
  
}