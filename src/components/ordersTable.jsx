import {Table} from '@mantine/core';
import axios from 'axios';
import { capitalizeFirstLetter } from "../utils/helpers.js";
import { useNavigate } from 'react-router-dom';
import { Axios } from '../utils/helpers.js';

const convertDate = (d) => {
  if (d) {
    let date = new Date(d);
    return date.toISOString().slice(0, 10);
  } 
};

export default function OrdersTable ({ orders, activePage }) {
  const navigate = useNavigate();

  const goToOrder = (o) => {
    Axios.get(`/customers/id/${o.customerId.valueOf()}`)
      .then((res) => {
          navigate('/order', {state: {customer: res.data, order: o}})
        }
      );
  };

  let start = (activePage - 1) * 30;
  let end = start + 30;

  // console.log('orders: ' ,orders);

  const rows = orders.slice(start, end).map((o) => (
    <Table.Tr key={o.orderId} onClick={() => {goToOrder(o)}}>
      <Table.Td>{convertDate(o.createdAt)}</Table.Td>
      <Table.Td>{capitalizeFirstLetter(o.customerName)}</Table.Td>
      <Table.Td>{capitalizeFirstLetter(o.orderType)}</Table.Td>
      <Table.Td>{o.orderId}</Table.Td>
      <Table.Td>{o.invoiceNum}</Table.Td>
      <Table.Td>{o.dueDate}</Table.Td>
    </Table.Tr>
  ))

  return (
    <Table highlightOnHover>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Date</Table.Th>
        <Table.Th>Customer Name</Table.Th>
        <Table.Th>Order Type</Table.Th>
        <Table.Th>Order Number</Table.Th>
        <Table.Th>Invoice Number</Table.Th>
        <Table.Th>Due</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>{rows}</Table.Tbody>
  </Table>
  )
}
