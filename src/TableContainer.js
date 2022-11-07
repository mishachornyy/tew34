import React, { Fragment } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, CustomInput } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import left from "./last_left.png"
import  one_left from "./one page_left.png"
import  one_right from "./one page_right.png"
import  right from "./last_right.png"
const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (


      <Table className="mt-[1.55vw] ml-[2.083vw]  mr-[2.083vw]">
        <insaid className="max-w-[900px]">
          <div className="line">

          </div>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th  {...column.getHeaderProps()}>
                  <div className="head-text pt-[0.729vw]" {...column.getSortByToggleProps()} >
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>

                  <Filter  column={column}  />

                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>


      <Row className="flex">
        <Col md={3}>

          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <img src={left} alt="left "/>
          </Button>
          <Button
              color='primary'
              onClick={previousPage}
              disabled={!canPreviousPage}
          >
            <img src={one_left} alt="one_left "/>
          </Button>

        </Col>
        <Col md={2}>
          <Input
              type='number'
              min={1}
              style={{ width: 70 }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
          />
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>

          <strong>
            / {pageOptions.length}
          </strong>
        </Col>


        <Col md={3}>
          <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
            <img src={one_right} alt="one_right "/>
          </Button>
          <Button
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <img src={right} alt="right "/>
          </Button>
        </Col>
      </Row>
        </insaid>
      </Table>

  );
};

export default TableContainer;
