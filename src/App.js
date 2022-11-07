import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';
import TableContainer from './TableContainer';
import "./index.css"
import { SelectColumnFilter } from './filters';

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch('https://randomuser.me/api/?results=100');
      const body = await response.json();
      const contacts = body.results;
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const renderRowSubComponent = (row) => {
    const {
      name: { first, last },
      location: { city, street, postcode },
      picture,
      cell,
    } = row.original;
    return (
      <Card style={{ width: '18rem', margin: '0 auto' }}>
        <CardImg top src={picture.large} alt='Card image cap' />
        <CardBody>
          <CardTitle>
            <strong>{`${first} ${last}`} </strong>
          </CardTitle>
          <CardText>
            <strong>Phone</strong>: {cell} <br />
            <strong>Address:</strong>{' '}
            {`${street.name} ${street.number} - ${postcode} - ${city}`}
          </CardText>
        </CardBody>
      </Card>
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: 'fgd',
        id: 'expander', // 'id' is required
        Cell: ({ row }) => (
            <div>
                <input type="checkbox" />
            </div>
        ),
      },
        {
            Header: 'First Name',
            accessor: 'first name',
        },

        {
            Header: 'Last Name',
            accessor: 'name.last',
        },
        {
            Header: 'Address',
            accessor: 'address',
        },


        {
            Header: 'City',
            accessor: 'city',
        },



        {
            Header: 'State',
            accessor: 'state',
        },
        {
            Header: 'Day Time Phone',
            accessor: 'day time phone',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'Start Date',
            accessor: 'start date',
        },
        {
            Header: 'End Date',
            accessor: 'end date',
        },
        {
            Header: 'Zip Code',
            accessor: 'zip Code',
        },
        {
            Header: 'Active State',
            accessor: 'active state',
        },







    ],
    []
  );

  return (
    <Container className="bg-[#839278] pt-[3.333vw] pl-[12.031vw] h-[46.875vw] w-[100vw]">

          <div   className="bg-white w-[75.938vw] h-[40.208vw] rounded-[1.042vw]    p-[0.521vw]">
              <div className=" able">
              <h1 className=" text-center pt-[2.604vw] head">Vendor List:</h1>
      <TableContainer
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
          </div>
          </div>

    </Container>

  );
};

export default App;
