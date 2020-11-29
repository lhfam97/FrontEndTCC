import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IFoodPlate {
  status: string;
  ccnumber: string;
  cvv: string;
  coupon: string;
  discount: number;
  price: number;
  priceDiscount: number;
}

interface IProps {
  transaction: IFoodPlate;
  // handleDelete: (id: number) => {};
}

const Transaction: React.FC<IProps> = ({
  transaction,
}: // handleDelete,
IProps) => {
  return (
    <Container>
      <section className="body">
        <h2>Status Cartão: {transaction.status}</h2>
        <p>
          Nº do cartão {transaction.ccnumber} CVV: {transaction.cvv}
        </p>

        <p>
          Cupom {transaction.coupon} Desconto: {transaction.discount}
        </p>

        <p className="price">
          R$ <b>{transaction.price}</b>
        </p>
        <p className="price">
          R$ <b>{transaction.priceDiscount}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            // onClick={() => handleDelete(food.id)}
            // data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        {/* <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div> */}
      </section>
    </Container>
  );
};

export default Transaction;
