import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div className="wallet-page">
          <WalletForm />
          <Table />
        </div>
      </>
    );
  }
}

export default Wallet;
