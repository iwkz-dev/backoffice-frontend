import React from 'react';
import PropTypes from 'prop-types';

import { transformDecimalNumber } from 'shared/utils/numbers';

import MaterialTable from 'material-table';
import LoadingOverlay from 'shared/components/LoadingOverlay';

const IncomeBillTable = ({
  title,
  data,
  loading,

  typeDataField,
  typeData,

  onAdd,
  onEdit,
  onDelete,
}) => {
  const columns = [
    { title: 'Tanggal Input', field: 'createdAt', editable: 'never' },
    { title: 'Jumlah', field: 'amount', type: 'numeric' },
    { title: `Tipe ${title}`, field: typeDataField, lookup: typeData, initialEditValue: 1 },
    { title: 'Keterangan', field: 'info', type: 'text' },
  ];

  const pageSizeOptions = () => {
    const options = [5];

    if ((5 % data.length) === 5) options.push(10);
    if ((10 % data.length) === 10) options.push(data.length);

    return options;
  };

  return (
    <LoadingOverlay loading={loading}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: columns.length,
          exportButton: true,
          pageSizeOptions: pageSizeOptions(),
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

  typeDataField: PropTypes.string,
  typeData: PropTypes.shape(),

  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

IncomeBillTable.defaultProps = {
  title: null,
  data: [],
  loading: null,

  typeDataField: null,
  typeData: {},

  onAdd: null,
  onEdit: null,
  onDelete: null,
};

export default IncomeBillTable;
