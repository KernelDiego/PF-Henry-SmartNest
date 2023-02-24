import React from "react";

export const MyShopping: React.FC<any> = ({ purchase, handleFormatedDate, info }) => {
  return (
    <div className='dash_purchaseDiv'>
      <div className='dash_purchaseTitleContainer'>
        <img
          className='dash_purchase_iconMenu'
          src={info.img}
          alt='cartPurchase'
        />
        <h2>{info.title}</h2>
      </div>

      {purchase.length ? (
        <div className='dash_Allpurchase_container'>
          {purchase.map((payment: any) => (
            <div className='dash_onePurchase' key={payment.id}>
              <div className='dash_onePurchase_imageSide'>
                <img
                  className='imagePurchase'
                  src={payment.items[0].picture_url}
                  alt='imgPurchase'
                />
              </div>
              <div className='dash_onePurchase_infoSide'>
                <h3>Items:</h3>
                <div className='dash_onePurchase_infoItems'>
                  <ul>
                    {payment.items.map((item: any, index: number) => (
                      <li key={item.title + index}>{` ${item.title.slice(0,45)} \nQuantity: ${item.quantity}`}</li>
                    ))}
                  </ul>
                </div>
                <div className='dash_onePurchase_PaymentInfo'>
                  <p>
                    Total: <span>${payment.total_paid_amount.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>{handleFormatedDate(payment.date_created)}</span>
                  </p>
                  <p>
                    Status: <span> {payment.status}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>You have not made any purchases yet</p>
        </div>
      )}
    </div>
  );
};
