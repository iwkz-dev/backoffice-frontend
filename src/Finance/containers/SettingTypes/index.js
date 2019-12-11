import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetch as fetchIncomeTypes } from 'Finance/state/actions/incomeTypes/collection';
import { fetch as fetchBillTypes } from 'Finance/state/actions/billTypes/collection';
import {
  update as updateIncomeType,
  add as addIncomeType,
} from 'Finance/state/actions/incomeTypes/single';
import {
  update as updateBillType,
  add as addBillType,
} from 'Finance/state/actions/billTypes/single';
import { generateEntryData as generateEntryDataCollection } from 'Finance/state/reducers/incomeTypes/collection';
import { generateEntryData as generateEntryDataSingle } from 'Finance/state/reducers/incomeTypes/single';

import TypesTable from 'Finance/components/TypesTable';
import { RootSection } from './styled.components';

import { AVAILABLE_TYPES, COMPONENT_ID } from './constants';

class SettingTypes extends Component {
  componentDidMount() {
    this.fetchIncomeTypes();
    this.fetchBillTypes();
  }

  componentDidUpdate(prevProps) {
    this.reactOnAddAndUpdateIncomeType(prevProps);
    this.reactOnAddAndUpdateBillType(prevProps);
  }

  get isIncomeTypeLoading() {
    const { fetching: singleFetching } = this.incomeTypesData(false);
    const { fetching: collectionFetching } = this.incomeTypesData();

    return singleFetching || collectionFetching;
  }

  get isBillTypeLoading() {
    const { fetching: singleFetching } = this.billTypesData(false);
    const { fetching: collectionFetching } = this.billTypesData();

    return singleFetching || collectionFetching;
  }

  onAddNewType = (entryType) => (data) => {
    const {
      componentId,
      addIncomeType,
      addBillType,
    } = this.props;

    if (entryType === AVAILABLE_TYPES.INCOME) {
      addIncomeType({ componentId, data });
    } else if (entryType === AVAILABLE_TYPES.BILL) {
      addBillType({ componentId, data });
    }
  }

  onEditType = (entryType) => ({ id, name, description }) => {
    const {
      componentId,
      updateIncomeType,
      updateBillType,
    } = this.props;
    const data = {
      name,
      description,
    };

    if (entryType === AVAILABLE_TYPES.INCOME) {
      updateIncomeType({ componentId, id, data });
    } else if (entryType === AVAILABLE_TYPES.BILL) {
      updateBillType({ componentId, id, data });
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

  billTypesData = (isCollection = true, props = this.props) => {
    const {
      componentId,
      billTypes,
      billType,
    } = props;

    return isCollection
      ? billTypes[componentId] || generateEntryDataCollection()
      : billType[componentId] || generateEntryDataSingle();
  }

  fetchIncomeTypes = () => {
    const { componentId, fetchIncomeTypes } = this.props;

    fetchIncomeTypes({ componentId });
  }

  fetchBillTypes = () => {
    const { componentId, fetchBillTypes } = this.props;

    fetchBillTypes({ componentId });
  }

  reactOnAddAndUpdateIncomeType = (prevProps) => {
    const { fetching: wasFetching } = this.incomeTypesData(false, prevProps);
    const { fetching } = this.incomeTypesData(false);

    if (wasFetching && !fetching) {
      this.fetchIncomeTypes();
    }
  }

  reactOnAddAndUpdateBillType = (prevProps) => {
    const { fetching: wasFetching } = this.billTypesData(false, prevProps);
    const { fetching } = this.billTypesData(false);

    if (wasFetching && !fetching) {
      this.fetchBillTypes();
    }
  }

  generateTableProps = (entryType) => ({
    title: entryType === AVAILABLE_TYPES.INCOME ? 'Tipe Pemasukan' : 'Tipe Pengeluaran',
    data: entryType === AVAILABLE_TYPES.INCOME
      ? this.incomeTypesData().data : this.billTypesData().data,
    loading: entryType === AVAILABLE_TYPES.INCOME
      ? this.isIncomeTypeLoading : this.isBillTypeLoading,

    onEdit: this.onEditType(entryType),
    onAdd: this.onAddNewType(entryType),
  })

  render() {
    return (
      <RootSection>
        <TypesTable {...this.generateTableProps(AVAILABLE_TYPES.INCOME)} />
        <TypesTable {...this.generateTableProps(AVAILABLE_TYPES.BILL)} />
      </RootSection>
    );
  }
}

SettingTypes.propTypes = {
  componentId: PropTypes.string,
  incomeTypes: PropTypes.shape().isRequired,
  incomeType: PropTypes.shape().isRequired,
  billTypes: PropTypes.shape().isRequired,
  billType: PropTypes.shape().isRequired,

  fetchIncomeTypes: PropTypes.func.isRequired,
  updateIncomeType: PropTypes.func.isRequired,
  addIncomeType: PropTypes.func.isRequired,
  fetchBillTypes: PropTypes.func.isRequired,
  updateBillType: PropTypes.func.isRequired,
  addBillType: PropTypes.func.isRequired,
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
    billTypes: {
      collection: billTypes,
      single: billType,
    },
  },
}) => ({
  incomeTypes,
  incomeType,
  billTypes,
  billType,
});

const mapDispatchToProps = {
  fetchIncomeTypes,
  updateIncomeType,
  addIncomeType,
  fetchBillTypes,
  updateBillType,
  addBillType,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingTypes);
