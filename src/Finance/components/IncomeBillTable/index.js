import React from 'react';
import PropTypes from 'prop-types';

import { transformDecimalNumber } from 'shared/utils/numbers';

import MaterialTable from 'material-table';
import LoadingOverlay from 'shared/components/LoadingOverlay';

const IncomeBillTable = ({
  title,
  data,
  loading,

  typeData,

  onAdd,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { title: 'Tanggal Input', field: 'createdAt', editable: 'never' },
    { title: 'Jumlah', field: 'amount', type: 'numeric' },
    { title: `Tipe ${title}`, field: 'incomeType', lookup: typeData, initialEditValue: 1 },
    { title: 'Keterangan', field: 'info' },
  ];

  return (
    <LoadingOverlay loading={loading}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: columns.length,
          exportButton: true,
        }}

        editable={{
          onRowAdd: (newData) => new Promise((resolve) => {
            onAdd({
              ...newData,
              amount: transformDecimalNumber(newData.amount),
            });
            resolve();
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve) => {
            onEdit({
              ...newData,
              ...((newData.amount !== oldData.amount)
                && { amount: transformDecimalNumber(newData.amount) }),
            });
            resolve();
          }),
          onRowDelete: (oldData) => new Promise((resolve) => {
            onDelete(oldData);
            resolve();
          }),
        }} />
    </LoadingOverlay>
  );
};

IncomeBillTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,

  typeData: PropTypes.shape(),

  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

IncomeBillTable.defaultProps = {
  title: null,
  data: [],
  loading: null,

  typeData: {},

  onAdd: null,
  onEdit: null,
  onDelete: null,
};

export default IncomeBillTable;
