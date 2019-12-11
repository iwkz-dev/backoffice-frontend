import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import { fetch as fetchBills } from 'Finance/state/actions/bills/collection';
import {
  add as addBill,
  update as updateBill,
  remove as removeBill,
} from 'Finance/state/actions/bills/single';
import { fetch as fetchBillTypes } from 'Finance/state/actions/billTypes/collection';
import { generateEntryData as generateEntryDataCollection } from 'Finance/state/reducers/bills/collection';
import { generateEntryData as generateEntryDataSingle } from 'Finance/state/reducers/bills/single';

import IncomeBillTable from 'Finance/components/IncomeBillTable';
import MonthYearFilter from 'Finance/components/MonthYearFilter';

import { DATE_FORMAT } from 'shared/constants/general';

import { RootSection } from './styled.components';

const COMPONENT_ID = 'BILLS_PAGE';

class Bills extends Component {
  constructor() {
    super();

    this.state = {
      month: moment().format('MM'),
      year: moment().format('YYYY'),
      selectedBillId: null,
    };
  }

  componentDidMount() {
    const {
      componentId,
      fetchBillTypes,
    } = this.props;

    fetchBillTypes({ componentId });
    this.fetchBills();
  }

  componentDidUpdate(prevProps) {
    this.reactOnAddedBill(prevProps);
    this.reactOnUpdatedBill(prevProps);
  }

  get billsTypesData() {
    const { componentId, billTypes } = this.props;

    return billTypes[componentId] || generateEntryDataCollection();
  }

  get data() {
    const { data } = this.billsData();

    return data.map((d) => ({
      createdAt: moment(d.createdAt).format(DATE_FORMAT),
      amount: d.amount,
      billType: d.billType.id,
      info: d.info,
      bill: d,
    }));
  }

  get typesData() {
    const { data } = this.billsTypesData;

    return data.reduce((acc, { id, name }) => ({
      ...acc,
      [id]: name,
    }), {});
  }

  get isLoading() {
    const { fetching: fetchingBills } = this.billsData();
    const { fetching: fetchingBill } = this.billsData(false);
    const { fetching: fetchingBillTypes } = this.billsTypesData;

    return fetchingBills || fetchingBillTypes || fetchingBill;
  }

  onAddNewBill = ({
    amount,
    billType,
    info,
  }) => {
    const { componentId, addBill } = this.props;
    const { month, year } = this.state;

    const data = {
      month,
      year,
      billTypeId: billType,
      amount,
      info,
    };

    addBill({ componentId, data });
  }

  onEditBill = (newBill) => {
    const { updateBill } = this.props;
    const {
      bill: { id },
      amount,
      billType,
      info,
    } = newBill;

    updateBill({
      id,
      data: {
        billTypeId: billType,
        amount,
        info,
      },
    });

    this.setState({ selectedBillId: id });
  }

  onDeleteBill = ({ bill }) => {
    const { removeBill } = this.props;
    const { id } = bill;

    removeBill({ id });

    this.setState({ selectedBillId: id });
  }

  onFilterChange = (date) => {
    const month = Number(moment(date).format('MM'));
    const year = moment(date).format('YYYY');

    this.setState({ month, year }, this.fetchBills);
  }

  billsData = (isCollection = true, props = this.props) => {
    const { selectedBillId } = this.state;
    const { componentId, bills, bill } = props;

    const singleBillComponentId = selectedBillId || componentId;

    return isCollection
      ? (bills[componentId] || generateEntryDataCollection())
      : (bill[singleBillComponentId] || generateEntryDataSingle());
  }

  fetchBills = () => {
    const { month, year } = this.state;
    const { componentId, fetchBills } = this.props;
    const paginationAndFiltering = {
      page: {
        pageSize: 300,
      },
      filters: {
        month,
        year,
      },
    };

    if (!this.loading) {
      fetchBills({ componentId, paginationAndFiltering });
    }
  }

  reactOnAddedBill = (prevProps) => {
    const { fetching: wasFetching } = this.billsData(false, prevProps);
    const { fetching, isAdded } = this.billsData(false);

    if (wasFetching && !fetching && isAdded) {
      this.fetchBills();
    }
  }

  reactOnUpdatedBill = (prevProps) => {
    const { fetching: wasFetching } = this.billsData(false, prevProps);
    const { fetching, isUpdated, isDeleted } = this.billsData(false);

    if (wasFetching && !fetching && (isUpdated || isDeleted)) {
      this.setState({ selectedBillId: null }, this.fetchBills);
    }
  }

  render() {
    return (
      <RootSection>
        <MonthYearFilter
          onFilterChange={this.onFilterChange} />
        <IncomeBillTable
          title="Pengeluaran"
          data={this.data}
          loading={this.isLoading}

          typeDataField="billType"
          typeData={this.typesData}

          onAdd={this.onAddNewBill}
          onEdit={this.onEditBill}
          onDelete={this.onDeleteBill} />
      </RootSection>
    );
  }
}

Bills.propTypes = {
  componentId: PropTypes.string,
  bills: PropTypes.shape().isRequired,
  bill: PropTypes.shape().isRequired,
  billTypes: PropTypes.shape().isRequired,

  fetchBills: PropTypes.func.isRequired,
  addBill: PropTypes.func.isRequired,
  updateBill: PropTypes.func.isRequired,
  removeBill: PropTypes.func.isRequired,
  fetchBillTypes: PropTypes.func.isRequired,
};

Bills.defaultProps = {
  componentId: COMPONENT_ID,
};

const mapStateToProps = ({
  finance: {
    bills: { collection: billsCollection, single },
    billTypes: { collection: billTypes },
  },
}) => ({
  bills: billsCollection,
  bill: single,
  billTypes,
});

const mapDispatchToProps = {
  fetchBills,
  addBill,
  updateBill,
  removeBill,
  fetchBillTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Bills);
