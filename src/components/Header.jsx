import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popover, TextInput, Text, UnstyledButton, Stack, Divider, Modal, Menu, ActionIcon } from '@mantine/core';
import { Axios, capitalizeFirstLetter, isAuthenticated, clearToken } from '../utils/helpers.js';
import CustomerDetailCard from './CustomerDetailCard';
import ChangePasswordModal from './ChangePasswordModal';

export default function Header() {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [changePasswordOpened, setChangePasswordOpened] = useState(false);

  const fetchCustomers = () => {
    Axios.get('/customers').then((res) => setCustomers(res.data)).catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!authed) return;
    fetchCustomers();
    Axios.get('/orders', { params: { all: true } }).then((res) => setOrders(res.data)).catch((err) => console.log(err));
  }, [authed]);

  const handleLogout = () => {
    clearToken();
    window.location.href = '/';
  };

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
      {authed && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
          <Menu position="bottom-end" withinPortal>
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray.0" size="lg" aria-label="Account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.09H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={() => setChangePasswordOpened(true)}>Change Password</Menu.Item>
              <Menu.Item onClick={handleLogout} color="red">Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </header>
    <Modal opened={!!selectedCustomerId} onClose={closeCustomerModal} size="lg" radius="lg" padding="xl">
      {selectedCustomerId && (
        <CustomerDetailCard customerId={selectedCustomerId} onClose={closeCustomerModal} onDeleted={handleCustomerDeleted} />
      )}
    </Modal>
    <ChangePasswordModal opened={changePasswordOpened} onClose={() => setChangePasswordOpened(false)} />
    </>
  );
}
