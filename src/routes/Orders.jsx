import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import {
  Table,
  Container,
  Alert,
  Pagination,
  TextInput,
  Button,
  Group,
  Center,
  Flex,
  Tabs
} from '@mantine/core';
import axios from 'axios';
import OrdersTable from '../components/ordersTable';
import { Axios } from '../utils/helpers.js';

export default function Orders() {

  const [activePage, setPage] = useState(1);
  const [type, setType] = useState("");
  const [numOfPages, setNumOfPages] = useState(0);
  const [orders, setOrders] = useState([]);
  const [display, setDisplay] = useState([]);
  const searchRef = useRef(null);

  // initial render gets all the orders
  useEffect(() => {
    Axios.get(`/orders`)
    .then((res) => {
      setType("all");
      setOrders(res.data);
      setDisplay(res.data);
      setNumOfPages(res.data.length);
    })
    .catch((err) => {console.log(err)})
  }, [])

  const orderTypeChange = (v) => {
    let types = ["surf", "windsurf", "foil", "tow", "retail", "team", "wholesale"];
    if (types.includes(v)) {
      let newDisplay = orders.filter((order) => (order.orderType == v || order.customerType == v));
      setDisplay(newDisplay);
      setNumOfPages(newDisplay.length);
      setType(v);
    } else {
      setDisplay(orders);
      setNumOfPages(orders.length);
      setType(v);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let name = searchRef.current.value;
    let searchResults = orders.filter((order) => (order.customerName.includes(name)));
    setDisplay(searchResults);
    setNumOfPages(searchResults.length);
  }

  return (
    <Container size="xl" mt="20px">
      <Group justify="space-between" mt={10}>
        <a id='orders-h-btn' href={`/`}>Home</a>
        <Group>
          <form onSubmit={handleSearch} className='search-form'>
            <TextInput placeholder="search order" ref={searchRef} w="160px"/>
            <Button color="dark" type="submit">
              submit
            </Button>
          </form>
        </Group>
      </Group>
      <Flex gap="xl" align="flex-start" mt="md">
        <Tabs value={type} onChange={orderTypeChange} orientation="vertical" color="dark">
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
          <OrdersTable orders={display} activePage={activePage} />
          <Center mt="md">
            <Pagination
              page={activePage}
              onChange={setPage}
              total={Math.ceil(numOfPages / 30)}
              color="gray"
              size="sm"
              radius="xs"
            />
          </Center>
        </div>
      </Flex>
    </Container>
  );
}