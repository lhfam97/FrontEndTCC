import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';

import { FoodsContainer } from './styles';

interface IFoodPlate {
  status: string;
  ccnumber: string;
  cvv: string;
  coupon: string;
  discount: number;
  price: number;
  priceDiscount: number;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // useEffect(() => {
  //   async function loadFoods(): Promise<void> {
  //     api.get('/foods').then(response => {
  //       setFoods(response.data);
  //     });
  //   }

  //   loadFoods();
  // }, []);

  // eslint-disable-next-line no-shadow
  async function handleAddTransaction(transaction: IFoodPlate): Promise<void> {
    try {
      const response = await api.get(
        `/creditCard?id=${transaction.ccnumber}&codigo=${transaction.cvv}`,
      );
      console.log(response.data);
      transaction.status = response.data.status;
    } catch (err) {
      // eslint-disable-next-line no-param-reassign
      transaction.status = 'Service Offline';
      console.log(err);
    }
    try {
      const response = await api.get(`/coupon?name=${transaction.coupon}`);
      transaction.discount = response.data.Discount;
      transaction.priceDiscount =
        (transaction.price * (100 - transaction.discount)) / 100;
    } catch (err) {
      // eslint-disable-next-line no-param-reassign
      transaction.coupon = 'Service Offline';
      transaction.discount = 0;
      transaction.priceDiscount = transaction.price;
      console.log(err);
    }

    setTransactions([...transactions, transaction]);
    // setTransactions([...transactions, response.data]);
  }

  // async function handleDeleteFood(id: number): Promise<void> {
  //   try {
  //     await api.delete(`/foods/${id}`);

  //     const updatedFoods = foods.filter(food => food.id !== id);

  //     if (updatedFoods) {
  //       setFoods(updatedFoods);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddTransaction={handleAddTransaction}
      />
      {/* <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      /> */}

      <FoodsContainer data-testid="foods-list">
        {transactions &&
          transactions.map(transaction => (
            <Food
              key={transaction.ccnumber}
              transaction={transaction}
              // handleDelete={handleDeleteFood}
              // handleEditFood={handleEditFood}
              // handleUpdateFood={handleUpdateFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

export default Dashboard;
