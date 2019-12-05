import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { generateEntryData as generateEntryDataSingle } from 'Auth/state/reducers/users/single';

class CompanyDashboard extends Component {
  userData = () => {
    const { currentUser } = this.props;

    return currentUser.single || generateEntryDataSingle();
  }

  render() {
    const { data } = this.userData();
    return (
      <div>
        <h1>{`Hallo ${data.username}`}</h1>
      </div>
    );
  }
}

CompanyDashboard.propTypes = {
  currentUser: PropTypes.shape().isRequired,
};

const mapStateToProps = ({
  auth: { users },
}) => ({
  currentUser: users,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDashboard);
