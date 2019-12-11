import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import { fetch as fetchIncomes } from 'Finance/state/actions/incomes/collection';
import {
  add as addIncome,
  update as updateIncome,
  remove as removeIncome,
} from 'Finance/state/actions/incomes/single';
import { fetch as fetchIncomeTypes } from 'Finance/state/actions/incomeTypes/collection';
import { generateEntryData as generateEntryDataCollection } from 'Finance/state/reducers/incomes/collection';
import { generateEntryData as generateEntryDataSingle } from 'Finance/state/reducers/incomes/single';

import IncomeBillTable from 'Finance/components/IncomeBillTable';
import MonthYearFilter from 'Finance/components/MonthYearFilter';

import { DATE_FORMAT } from 'shared/constants/general';

import { RootSection } from './styled.components';

const COMPONENT_ID = 'INCOMES_PAGE';

class Incomes extends Component {
  constructor() {
    super();

    this.state = {
      month: moment().format('MM'),
      year: moment().format('YYYY'),
      selectedIncomeId: null,
    };
  }

  componentDidMount() {
    const {
      componentId,
      fetchIncomeTypes,
    } = this.props;

    fetchIncomeTypes({ componentId });
    this.fetchIncomes();
  }

  componentDidUpdate(prevProps) {
    this.reactOnAddedIncome(prevProps);
    this.reactOnUpdatedIncome(prevProps);
  }

  get incomesTypesData() {
    const { componentId, incomeTypes } = this.props;

    return incomeTypes[componentId] || generateEntryDataCollection();
  }

  get data() {
    const { data } = this.incomesData();

    return data.map((d) => ({
      createdAt: moment(d.createdAt).format(DATE_FORMAT),
      amount: d.amount,
      incomeType: d.incomeType.id,
      info: d.info,
      income: d,
    }));
  }

  get typesData() {
    const { data } = this.incomesTypesData;

    return data.reduce((acc, { id, name }) => ({
      ...acc,
      [id]: name,
    }), {});
  }

  get isLoading() {
    const { fetching: fetchingIncomes } = this.incomesData();
    const { fetching: fetchingIncome } = this.incomesData(false);
    const { fetching: fetchingIncomeTypes } = this.incomesTypesData;

    return fetchingIncomes || fetchingIncomeTypes || fetchingIncome;
  }

  onAddNewIncome = ({
    amount,
    incomeType,
    info,
  }) => {
    const { componentId, addIncome } = this.props;
    const { month, year } = this.state;

    const data = {
      month,
      year,
      incomeTypeId: incomeType,
      amount,
      info,
    };

    addIncome({ componentId, data });
  }

  onEditIncome = (newIncome) => {
    const { updateIncome } = this.props;
    const {
      income: { id },
      amount,
      incomeType,
      info,
    } = newIncome;

    updateIncome({
      id,
      data: {
        incomeTypeId: incomeType,
        amount,
        info,
      },
    });

    this.setState({ selectedIncomeId: id });
  }

  onDeleteIncome = ({ income }) => {
    const { id } = income;
    const { removeIncome } = this.props;

    removeIncome({ id });

    this.setState({ selectedIncomeId: id });
  }

  onFilterChange = (date) => {
    const month = Number(moment(date).format('MM'));
    const year = moment(date).format('YYYY');

    this.setState({ month, year }, this.fetchIncomes);
  }

  incomesData = (isCollection = true, props = this.props) => {
    const { selectedIncomeId } = this.state;
    const { componentId, incomes, income } = props;

    const singleIncomeComponentId = selectedIncomeId || componentId;

    return isCollection
      ? (incomes[componentId] || generateEntryDataCollection())
      : (income[singleIncomeComponentId] || generateEntryDataSingle());
  }

  fetchIncomes = () => {
    const { month, year } = this.state;
    const { fetching } = this.incomesData();
    const { componentId, fetchIncomes } = this.props;
    const paginationAndFiltering = {
      page: {
        pageSize: 300,
      },
      filters: {
        month,
        year,
      },
    };

    if (!fetching) {
      fetchIncomes({ componentId, paginationAndFiltering });
    }
  }

  reactOnAddedIncome = (prevProps) => {
    const { fetching: wasFetching } = this.incomesData(false, prevProps);
    const { fetching, isAdded } = this.incomesData(false);

    if (wasFetching && !fetching && isAdded) {
      this.fetchIncomes();
    }
  }

  reactOnUpdatedIncome = (prevProps) => {
    const { fetching: wasFetching } = this.incomesData(false, prevProps);
    const { fetching, isUpdated, isDeleted } = this.incomesData(false);

    if (wasFetching && !fetching && (isUpdated || isDeleted)) {
      this.setState({ selectedIncomeId: null }, this.fetchIncomes);
    }
  }

  render() {
    return (
      <RootSection>
        <MonthYearFilter
          onFilterChange={this.onFilterChange} />
        <IncomeBillTable
          title="Pemasukan"
          data={this.data}
          loading={this.isLoading}

          typeDataField="incomeType"
          typeData={this.typesData}

          onAdd={this.onAddNewIncome}
          onEdit={this.onEditIncome}
          onDelete={this.onDeleteIncome} />
      </RootSection>
    );
  }
}

Incomes.propTypes = {
  componentId: PropTypes.string,
  incomes: PropTypes.shape().isRequired,
  income: PropTypes.shape().isRequired,
  incomeTypes: PropTypes.shape().isRequired,

  fetchIncomes: PropTypes.func.isRequired,
  addIncome: PropTypes.func.isRequired,
  updateIncome: PropTypes.func.isRequired,
  removeIncome: PropTypes.func.isRequired,
  fetchIncomeTypes: PropTypes.func.isRequired,
};

Incomes.defaultProps = {
  componentId: COMPONENT_ID,
};

const mapStateToProps = ({
  finance: {
    incomes: { collection: incomesCollection, single },
    incomeTypes: { collection: incomeTypesCollection },
  },
}) => ({
  incomes: incomesCollection,
  income: single,
  incomeTypes: incomeTypesCollection,
});

const mapDispatchToProps = {
  fetchIncomes,
  addIncome,
  updateIncome,
  removeIncome,
  fetchIncomeTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Incomes);
