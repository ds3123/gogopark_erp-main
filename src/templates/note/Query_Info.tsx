



// 下載中圖示
export const is_Downloading = () => {

     return <div className="has-text-centered m_Top_150 m_Bottom_150 relative" >
                <b className="f_16"> 資料搜尋中 </b> <br/>
                <button className="button is-loading is-white m_Top_30 m_Bottom_100" ></button> 
            </div>


} ;

// 查無相關資料
export const no_Query_Data = () => {

    return <div className="has-text-centered m_Top_100 m_Bottom_100" >
             <b className="tag is-large is-success"> <i className="fas fa-info"></i> &nbsp; 尚未查詢到相關資料，請改用其他關鍵字查詢． </b>
           </div>

} ;