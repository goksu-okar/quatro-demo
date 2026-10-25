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
  Radio,
  Flex
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
    <Container mt="20px">
      <a id='orders-h-btn' href={`/`}>Home</a>
      <Group position="apart" mt={10}>
        <Radio.Group value={type} onChange={orderTypeChange}>
          <Group gap="xs">
            <Radio value="all" label="All" />
            <Radio value="surf" label="Surf" />
            <Radio value="windsurf" label="Windsurf" />
            <Radio value="foil" label="Foil" />
            <Radio value="tow" label="Tow" />
            <Radio value="retail" label="Retail" />
            <Radio value="team" label="Team" />
            <Radio value="wholesale" label="Whole Sale" />
          </Group>
        </Radio.Group>
        <Group>
          <form onSubmit={handleSearch} className='search-form'>
            <TextInput placeholder="search order" ref={searchRef} w="160px"/>
            <Button color="dark" type="submit">
              submit
            </Button>
          </form>
        </Group>
      </Group>
      <OrdersTable orders={display} activePage={activePage} />
      <Center>
        <Pagination
          page={activePage}
          onChange={setPage}
          total={Math.ceil(numOfPages / 30)}
          color="gray"
          size="sm"
          radius="xs"
        />
      </Center>
    </Container>
  );
}