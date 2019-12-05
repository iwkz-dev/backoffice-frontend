import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';

import { login as loginAction } from 'Auth/state/actions/users/single';
import { generateEntryData } from 'Auth/state/reducers/users/single';

import LoginForm from 'Auth/components/LoginForm';
import LoadingOverlay from 'shared/components/LoadingOverlay';

class LoginContainer extends Component {
  onClickLogin = ({ username, password }) => {
    this.props.loginAction({
      username,
      password,
    });
  }

  get authData() {
    const { authProps } = this.props;

    return isEmpty(authProps)
      ? generateEntryData() : authProps;
  }

  render() {
    return (
      <LoadingOverlay loading={this.authData.fetching}>
        <LoginForm
          onClickLogin={this.onClickLogin} />
      </LoadingOverlay>
    );
  }
}

LoginContainer.propTypes = {
  authProps: PropTypes.shape().isRequired,
  loginAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  auth: {
    users: { single },
  },
}) => ({
  authProps: single,
});

const mapDispatchToProps = {
  loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
