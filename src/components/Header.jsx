import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    const { subtotals } = this.props;
    const numSubtotals = Object.values(subtotals);
    const totalExpenses = numSubtotals.reduce((a, b) => Number(a) + Number(b), 0);

    return (
      <header>
        <div className="header-data">
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field" className="total">
            {`BRL: ${totalExpenses.toFixed(2)}`}
          </p>
        </div>
        <h1>Trip Wallet</h1>
        <div />
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  subtotals: globalState.wallet.subtotals,
  subtotalsQnt: Object.keys(globalState.wallet.subtotals).length,
});

export default connect(mapStateToProps)(Header);
