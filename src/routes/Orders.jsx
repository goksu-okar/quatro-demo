import { useState, useEffect } from 'react';
import {
  Container,
  Pagination,
  Center,
  Flex,
  Tabs
} from '@mantine/core';
import OrdersTable from '../components/ordersTable';
import { Axios } from '../utils/helpers.js';

const PAGE_SIZE = 100;

export default function Orders() {

  const [activePage, setPage] = useState(1);
  const [type, setType] = useState("all");
  const [totalCount, setTotalCount] = useState(0);
  const [orders, setOrders] = useState([]);

  // refetches whenever the page or the type filter changes
  useEffect(() => {
    Axios.get(`/orders`, { params: { page: activePage, limit: PAGE_SIZE, type } })
    .then((res) => {
      setOrders(res.data);
      setTotalCount(parseInt(res.headers['x-total-count'], 10) || 0);
    })
    .catch((err) => {console.log(err)})
  }, [activePage, type])

  const orderTypeChange = (v) => {
    setType(v);
    setPage(1);
  }

  return (
    <Container size="xl" mt="xl">
      <Flex gap="xl" align="flex-start">
        <Tabs value={type} onChange={orderTypeChange} orientation="vertical" variant="pills" color="violet" className="orders-sidenav">
          <Tabs.List>
            <Tabs.Tab value="all">All</Tabs.Tab>
            <Tabs.Tab value="surf">Surf</Tabs.Tab>
            <Tabs.Tab value="windsurf">Windsurf</Tabs.Tab>
            <Tabs.Tab value="foil">Foil</Tabs.Tab>
            <Tabs.Tab value="tow">Tow</Tabs.Tab>
            <Tabs.Tab value="retail">Retail</Tabs.Tab>
            <Tabs.Tab value="team">Team</Tabs.Tab>
            <Tabs.Tab value="wholesale">Whole Sale</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <div style={{ flex: 1, minWidth: 0 }}>
          <OrdersTable orders={orders} />
          <Center mt="md">
            <Pagination
              page={activePage}
              onChange={setPage}
              total={Math.ceil(totalCount / PAGE_SIZE)}
              color="violet"
              size="sm"
              radius="xs"
            />
          </Center>
        </div>
      </Flex>
    </Container>
  );
}