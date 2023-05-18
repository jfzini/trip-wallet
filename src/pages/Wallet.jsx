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
          <div className="dark-circle" />
          <div className="darker-circle" />
          <WalletForm />
          <Table />
        </div>
      </>
    );
  }
}

export default Wallet;
