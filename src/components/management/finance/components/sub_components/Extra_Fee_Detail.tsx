
import React from 'react' ;


type feeObj = {
  extra_item : string | null,
  extra_item_price : number | null ,
  extra_beauty : string | null,
  extra_beauty_price : number | null ,
  extra_custom : string | null,
  extra_custom_price : number | null ,
}

const Extra_Fee_Detail = ( { fee_Obj } : { fee_Obj : feeObj }) => {
    
  const { extra_item, extra_item_price, extra_beauty, extra_beauty_price, extra_custom, extra_custom_price } = fee_Obj;

  if ( !extra_item && !extra_beauty && !extra_custom ) {

    return null;
  
  }

  return (
    <>
      {/* 加價項目 */}
      {extra_item && (
        <p className="m_Right_30 m_Bottom_20">
          加價項目 : <span className="fDblue">{extra_item}</span>&nbsp;
          <span className="f_12"> <span className="fRed"> {extra_item_price} </span> 元 </span>
        </p>
      )}

      {/* 加價美容 */}
      {extra_beauty && (
        <p className="m_Right_30 m_Bottom_20">
          加價美容 : <span className="fDblue">{extra_beauty}</span>&nbsp;
          <span className="f_12"> <span className="fRed"> {extra_beauty_price} </span>元 </span>
        </p>
      )}

      {/* 自訂加價 */}
      {extra_custom && (
        <p className="m_Right_30 m_Bottom_20">
          自訂加價 : <span className="fDblue">{extra_custom}</span>&nbsp;
          <span className="f_12"> <span className="fRed"> {extra_custom_price} </span> 元 </span>
        </p>
      )}
    </>
  );
};

export default Extra_Fee_Detail;
