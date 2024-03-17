
const container = {
                    position     : "absolute" ,
                    borderRadius : "5px" ,
                    padding      : "20px 15px" ,
                    top          : "-80px" ,
                    left         : "-100px" ,
                    background   : "white" ,
                    width        : "400px" ,
                    maxHeight    : "850px" ,
                    zIndex       : "2000" ,
                    boxShadow    : "1px 1px 5px 2px rgba(0,0,0,.2)" ,
                    overflow     : "auto" ,
                    overflowX    : "hidden"
                  } as any ;


// @ 左側資訊面板
const Left_Side_Panel = ( { children } : any ) => {

  
   return <div style = { container }>

            { children }

          </div>

} ;


export default Left_Side_Panel
       