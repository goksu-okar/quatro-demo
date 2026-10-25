import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Center, Container } from '@mantine/core';
import { convertDate, capitalizeFirstLetter, Axios } from '../utils/helpers.js';
import { useState, useEffect } from 'react';
import CustomerEditForm from '../components/CustomerEditForm';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('/customers').then((res) => setCustomers(res.data));
  }, [])

  const editCustomer = (c) => {
    navigate('/customer/edit', {state: {customer: c}})
  };

  const rows = customers.map((customer) => (
    <Table.Tr key={customer._id} onClick={() => editCustomer(customer)}>
      <Table.Td>{capitalizeFirstLetter(customer.firstName)}</Table.Td>
      <Table.Td>{capitalizeFirstLetter(customer.lastName)}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div className='customers-list'>
      <a href={`/`}>Home</a>
      <Center>
        <Container>
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>First Name</Table.Th>
                <Table.Th>Last Name</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Container>
      </Center>
    </div>
  );
}