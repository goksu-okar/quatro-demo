import { Table, Center, Container, Modal } from '@mantine/core';
import { capitalizeFirstLetter, Axios } from '../utils/helpers.js';
import { useState, useEffect } from 'react';
import CustomerDetailCard from '../components/CustomerDetailCard';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const fetchCustomers = () => {
    Axios.get('/customers').then((res) => setCustomers(res.data));
  };

  useEffect(() => {
    fetchCustomers();
  }, [])

  const closeModal = () => setSelectedCustomerId(null);

  const handleDeleted = () => {
    closeModal();
    fetchCustomers();
  };

  const rows = customers.map((customer) => (
    <Table.Tr key={customer._id} onClick={() => setSelectedCustomerId(customer._id)}>
      <Table.Td>{capitalizeFirstLetter(customer.firstName)}</Table.Td>
      <Table.Td>{capitalizeFirstLetter(customer.lastName)}</Table.Td>
    </Table.Tr>
  ))

  return (
    <div className='customers-list'>
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
      <Modal opened={!!selectedCustomerId} onClose={closeModal} size="lg" radius="lg" padding="xl">
        {selectedCustomerId && (
          <CustomerDetailCard customerId={selectedCustomerId} onClose={closeModal} onDeleted={handleDeleted} />
        )}
      </Modal>
    </div>
  );
}
