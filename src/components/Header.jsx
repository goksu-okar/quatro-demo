import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, TextInput, Text, UnstyledButton, Stack, Divider, Modal } from '@mantine/core';
import { Axios, capitalizeFirstLetter } from '../utils/helpers.js';
import CustomerDetailCard from './CustomerDetailCard';

export default function Header() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const fetchCustomers = () => {
    Axios.get('/customers').then((res) => setCustomers(res.data)).catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCustomers();
    Axios.get('/orders', { params: { all: true } }).then((res) => setOrders(res.data)).catch((err) => console.log(err));
  }, []);

  const q = query.trim().toLowerCase();

  const matchedCustomers = q === '' ? [] : customers
    .filter((c) => `${c.firstName} ${c.lastName}`.toLowerCase().includes(q))
    .slice(0, 5);

  const matchedOrders = q === '' ? [] : orders
    .filter((o) => (o.customerName || '').toLowerCase().includes(q) || `${o.orderId}`.toLowerCase().includes(q))
    .slice(0, 5);

  const hasResults = matchedCustomers.length > 0 || matchedOrders.length > 0;
  const dropdownOpened = focused && q.length > 0;

  const goToCustomer = (customer) => {
    setQuery('');
    setFocused(false);
    setSelectedCustomerId(customer._id);
  };

  const closeCustomerModal = () => setSelectedCustomerId(null);

  const handleCustomerDeleted = () => {
    closeCustomerModal();
    fetchCustomers();
  };

  const goToOrder = (order) => {
    Axios.get(`/customers/id/${order.customerId.valueOf()}`)
      .then((res) => {
        setQuery('');
        navigate('/order', { state: { customer: res.data, order } });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <header className="app-header">
      <a className="app-header-home" href="/">Forward Maui</a>
      <Popover opened={dropdownOpened} position="bottom-start" width={320} shadow="md" withinPortal>
        <Popover.Target>
          <TextInput
            placeholder="Search customers or orders"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            w={260}
            radius="md"
          />
        </Popover.Target>
        <Popover.Dropdown p="xs">
          {!hasResults && (
            <Text size="sm" c="dimmed" ta="center" py="sm">No results</Text>
          )}
          {matchedCustomers.length > 0 && (
            <>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>Customers</Text>
              <Stack gap={2}>
                {matchedCustomers.map((c) => (
                  <UnstyledButton key={c._id} onClick={() => goToCustomer(c)} className="search-result-row">
                    {capitalizeFirstLetter(c.firstName)} {capitalizeFirstLetter(c.lastName)}
                  </UnstyledButton>
                ))}
              </Stack>
            </>
          )}
          {matchedCustomers.length > 0 && matchedOrders.length > 0 && <Divider my={6} />}
          {matchedOrders.length > 0 && (
            <>
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb={4}>Orders</Text>
              <Stack gap={2}>
                {matchedOrders.map((o) => (
                  <UnstyledButton key={o.orderId} onClick={() => goToOrder(o)} className="search-result-row">
                    {capitalizeFirstLetter(o.customerName)} — #{o.orderId}
                  </UnstyledButton>
                ))}
              </Stack>
            </>
          )}
        </Popover.Dropdown>
      </Popover>
    </header>
    <Modal opened={!!selectedCustomerId} onClose={closeCustomerModal} size="lg" radius="lg" padding="xl">
      {selectedCustomerId && (
        <CustomerDetailCard customerId={selectedCustomerId} onClose={closeCustomerModal} onDeleted={handleCustomerDeleted} />
      )}
    </Modal>
    </>
  );
}
