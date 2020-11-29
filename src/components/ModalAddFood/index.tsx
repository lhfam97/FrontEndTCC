import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IFoodPlate {
  status: string;
  ccnumber: string;
  cvv: string;
  coupon: string;
  discount: number;
  price: number;
  priceDiscount: number;
}

interface ICreateFoodData {
  status: string;
  ccnumber: string;
  cvv: string;
  coupon: string;
  discount: number;
  price: number;
  priceDiscount: number;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddTransaction: (transaction: IFoodPlate) => void;
}

const ModalAddFood: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddTransaction,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateFoodData) => {
      // console.log(data);
      handleAddTransaction(data);
      setIsOpen();
    },
    [handleAddTransaction, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Nova Transação</h1>
        <Input
          name="ccnumber"
          placeholder="Insira o seu cartão de crédito aqui"
        />

        <Input name="cvv" placeholder="Insira aqui o cvv" />
        <Input name="price" placeholder="Preco: Ex: 19.90" />

        <Input name="coupon" placeholder="Cupom" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Realizar transação</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddFood;
