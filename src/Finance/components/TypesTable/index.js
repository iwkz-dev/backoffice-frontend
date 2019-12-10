import React from 'react';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';
import LoadingOverlay from 'shared/components/LoadingOverlay';

const TypesTable = ({
  title,
  data,
  loading,

  onAdd,
  onEdit,
}) => {
  const columns = [
    { title: 'Nama Type', field: 'name' },
    { title: 'Keterangan', field: 'description' },
  ];

  return (
    <LoadingOverlay loading={loading}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: columns.length,
        }}
        editable={{
          onRowAdd: (newData) => new Promise((resolve) => {
            onAdd(newData);
            resolve();
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve) => {
            onEdit(newData);
            resolve();
          }),
        }} />
    </LoadingOverlay>
  );
};

TypesTable.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  loading: PropTypes.bool,

  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
};

TypesTable.defaultProps = {
  title: '',
  data: [],
  loading: false,

  onAdd: null,
  onEdit: null,
};

export default TypesTable;
