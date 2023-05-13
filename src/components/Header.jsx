import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, subtotals } = this.props;
    const totalExpenses = subtotals.reduce((a, b) => Number(a) + Number(b), 0);

    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalExpenses}</p>
        <p data-testid="header-currency-field">BRL</p>
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
});

export default connect(mapStateToProps)(Header);
