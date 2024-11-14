import React from 'react';
import { Checkbox } from 'antd';

const SelectAllCheckbox = ({ selectedRowKeys, setSelectedRowKeys, data }) => {
  const onSelectAllChange = (e) => {
    const newSelectedRowKeys = e.target.checked ? data.map((record) => record.key) : [];
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <Checkbox
      indeterminate={selectedRowKeys.length > 0 && selectedRowKeys.length < data.length}
      checked={selectedRowKeys.length === data.length}
      onChange={onSelectAllChange}
    >
      Вибрати всі
    </Checkbox>
  );
};

export default SelectAllCheckbox;
