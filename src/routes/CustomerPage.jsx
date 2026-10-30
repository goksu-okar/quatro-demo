import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Container, Center, Stack, Text, Button, Title } from '@mantine/core';
import CustomerEditForm from '../components/CustomerEditForm';
import { Axios, capitalizeFirstLetter } from '../utils/helpers.js';

export default function CustomerPage() {
  const location = useLocation();
  const customerId = location.state.customer._id;
  const [customer, setCustomer] = useState(location.state.customer);
  const [edit, setEdit] = useState(false);

  const fetchCustomer = () => {
    Axios.get(`/customers/id/${customerId}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.log(err));
  };

  // always pull the current record from the server, since the value
  // passed through navigation state can go stale (e.g. after a refresh)
  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleSaved = (updatedCustomer) => {
    setCustomer(updatedCustomer);
    setEdit(false);
  };

  if (edit) {
    return (
      <Container>
        <CustomerEditForm customerValues={customer} onSaved={handleSaved} onCancel={() => setEdit(false)} />
      </Container>
    );
  }

  return (
    <Container pt="20px" pb="20px">
      <Center>
        <Stack gap="sm" w={400}>
          <Title order={2} ta="center">Customer</Title>
          <Text><b>First Name:</b> {capitalizeFirstLetter(customer.firstName)}</Text>
          <Text><b>Last Name:</b> {capitalizeFirstLetter(customer.lastName)}</Text>
          <Text><b>Phone:</b> {customer.phone}</Text>
          <Text><b>Email:</b> {customer.email}</Text>
          <Text><b>Address:</b> {customer.address}</Text>
          <Text><b>Weight:</b> {customer.weight} lbs</Text>
          <Text><b>Height:</b> {customer.heightFt}' {customer.heightIn}"</Text>
          <Text><b>Level:</b> {customer.level}</Text>
          <Center mt="md">
            <Button color="dark" onClick={() => setEdit(true)}>Edit</Button>
          </Center>
        </Stack>
      </Center>
    </Container>
  );
}
