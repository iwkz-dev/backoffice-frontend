import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetch as fetchIncomeTypes } from 'Finance/state/actions/incomeTypes/collection';
import {
  update as updateIncomeType,
  add as addIncomeType,
} from 'Finance/state/actions/incomeTypes/single';
import { generateEntryData as generateEntryDataCollection } from 'Finance/state/reducers/incomeTypes/collection';
import { generateEntryData as generateEntryDataSingle } from 'Finance/state/reducers/incomeTypes/single';

import TypesTable from 'Finance/components/TypesTable';
import { RootSection } from './styled.components';

import { AVAILABLE_TYPES, COMPONENT_ID } from './constants';

class SettingTypes extends Component {
  componentDidMount() {
    this.fetchIncomeTypes();
  }

  componentDidUpdate(prevProps) {
    this.reactOnAddAndUpdateIncomeType(prevProps);
  }

  get isIncomeTypeLoading() {
    const { fetching: singleFetching } = this.incomeTypesData(false);
    const { fetching: collectionFetching } = this.incomeTypesData();

    return singleFetching || collectionFetching;
  }

  onAddNewType = (entryType) => (data) => {
    const { componentId, addIncomeType } = this.props;

    if (entryType === AVAILABLE_TYPES.INCOME) {
      addIncomeType({ componentId, data });
    } else if (entryType === AVAILABLE_TYPES.BILL) {
      console.log(data);
    }
  }

  onEditType = (entryType) => ({ id, name, description }) => {
    const { componentId, updateIncomeType } = this.props;
    const data = {
      name,
      description,
    };

    if (entryType === AVAILABLE_TYPES.INCOME) {
      updateIncomeType({ componentId, id, data });
      console.log("uopdatin")
    } else if (entryType === AVAILABLE_TYPES.BILL) {
      console.log(data);
    }
  }

  incomeTypesData = (isCollection = true, props = this.props) => {
    const {
      componentId,
      incomeTypes,
      incomeType,
    } = props;

    return isCollection
      ? incomeTypes[componentId] || generateEntryDataCollection()
      : incomeType[componentId] || generateEntryDataSingle();
  }

  fetchIncomeTypes = () => {
    const { componentId, fetchIncomeTypes } = this.props;

    fetchIncomeTypes({ componentId });
  }

  reactOnAddAndUpdateIncomeType = (prevProps) => {
    const { fetching: wasFetching } = this.incomeTypesData(false, prevProps);
    const { fetching } = this.incomeTypesData(false);

    if (wasFetching && !fetching) {
      this.fetchIncomeTypes();
    }
  }

  generateTableProps = (entryType) => ({
    title: entryType === AVAILABLE_TYPES.INCOME ? 'Tipe Pemasukan' : 'Tipe Pengeluaran',
    data: entryType === AVAILABLE_TYPES.INCOME ? this.incomeTypesData().data : [],
    loading: entryType === AVAILABLE_TYPES.INCOME ? this.isIncomeTypeLoading : [],

    onEdit: this.onEditType(entryType),
    onAdd: this.onAddNewType(entryType),
  })

  render() {
    return (
      <RootSection>
        <TypesTable {...this.generateTableProps(AVAILABLE_TYPES.INCOME)} />
      </RootSection>
    );
  }
}

SettingTypes.propTypes = {
  componentId: PropTypes.string,
  incomeTypes: PropTypes.shape().isRequired,
  incomeType: PropTypes.shape().isRequired,

  fetchIncomeTypes: PropTypes.func.isRequired,
  updateIncomeType: PropTypes.func.isRequired,
  addIncomeType: PropTypes.func.isRequired,
};

SettingTypes.defaultProps = {
  componentId: COMPONENT_ID,
};

const mapStateToProps = ({
  finance: {
    incomeTypes: {
      collection: incomeTypes,
      single: incomeType,
    },
  },
}) => ({
  incomeTypes,
  incomeType,
});

const mapDispatchToProps = {
  fetchIncomeTypes,
  updateIncomeType,
  addIncomeType,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingTypes);
