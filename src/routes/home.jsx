import { Group, Center, Container, Stack, Button, Modal, Alert, Space, Text } from '@mantine/core';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NewCustomerOrder from '../components/NewCustomerOrder';
import CustomerListModal from '../components/CustomerListModal';
import CheckCustomer from '../components/CheckCustomer';
import CurrentCustomerOrder from '../components/CurrentCustomerOrder';
import BackgroundSlider from 'react-background-slider';
import { Axios } from '../utils/helpers.js';
import d1 from '../pictures/d1.jpg'
import d2 from '../pictures/d2.jpg'
import d3 from '../pictures/d3.jpg'
import d4 from '../pictures/d4.jpg'
import d5 from '../pictures/d5.jpg'
import d6 from '../pictures/d6.jpg'
import d7 from '../pictures/d7.jpg'
import d8 from '../pictures/d8.jpg'
import d9 from '../pictures/d9.jpg'
import d10 from '../pictures/d10.jpg'
import d11 from '../pictures/d11.jpg'
import d12 from '../pictures/d12.jpg'
import d13 from '../pictures/d13.jpg'
import d14 from '../pictures/d14.jpg'
import d16 from '../pictures/d16.jpg'

const Slider = BackgroundSlider.default ?? BackgroundSlider;

export default function Home() {
  const [customers, setCustomers] = useState([]);
  const [opened, setOpened] = useState(false);
  const [existingOpened, setExistingOpened] = useState(false);
  const [customer, setCustomer] = useState({});

  const [newCustomer, setNewCustomer] = useState({});
  const searchRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('/customers').then((res) => setCustomers(res.data));
  }, [])

  const goToOrders = () => {
    navigate('/orders');
  }

  const goToCustomers = () => {
    navigate('/customers', {state: {customers: customers}});
  }

  return (
    <div className='home'>
      {customer.firstName === undefined && (
        <>
          <Center mb="35px" >
            <div className='title'>FORWARD MAUI</div>
          </Center>
          <Stack>
            <Center>
              <Group gap="lg">
                <button className='voc-button' onClick={goToOrders}>View Orders</button>
                <button className='voc-button' onClick={goToCustomers}>View Customers</button>
              </Group>
            </Center>
            <Space h="lg" />
            <Stack
            >
              <Center>
                <div className='sub-text'>New Order</div>
              </Center>
              <Center>
                <Group>
                  <Modal opened={opened} onClose={() => setOpened(false)}>
                    <CheckCustomer
                      setCustomer={setCustomer}
                      setOpened={setOpened}
                      customer={customer}
                    />
                  </Modal>
                  <button className='n-e-c-button' onClick={() => setOpened(true)}>New Customer</button>
                  <Modal
                    opened={existingOpened}
                    onClose={() => setExistingOpened(false)}
                  >
                    <CustomerListModal
                      customers={customers}
                      setExistingOpened={setExistingOpened}
                      setCustomer={setCustomer}
                    />
                  </Modal>
                  <button className='n-e-c-button' onClick={() => setExistingOpened(true)}>Existing Customer</button>
                </Group>
              </Center>
            </Stack>
          </Stack>
        </>
      )}
      {customer._id === undefined && customer.firstName && (
        <NewCustomerOrder
          customer={customer}
          newCustomer={newCustomer}
          setNewCustomer={setNewCustomer}
        />
      )}
      {customer._id && <CurrentCustomerOrder customer={customer} />}
      <Slider images={[d3, d2, d1, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d16, ]} duration={5} transition={1} />
    </div>
  );
}