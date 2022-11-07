import React from 'react';
import { Input, CustomInput } from 'reactstrap';

export const Filter = ({ column }) => {
  return (
    <div className="inp pt-[0.573vw] pr-[0.833vw]">
      {column.canFilter && column.render('Filter')}
    </div>
  );
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={``}
    />
  );
};



