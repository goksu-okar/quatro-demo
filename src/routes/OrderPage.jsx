import { useState, useEffect } from 'react';
import PdfFoil from '../components/pdfs/PdfFoil';
import PdfWS from '../components/pdfs/PdfWS';
import PdfSurf from '../components/pdfs/PdfSurf';
import PdfTow from '../components/pdfs/PdfTow';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Center, Button, Group, Paper, Stepper, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CurrentCustomerOrder from '../components/CurrentCustomerOrder';
import { useOrderStatus } from '../components/OrderStatusBadge';
import { Axios, capitalizeFirstLetter, getLastTwoDigitsOfYear, getStatuses, statusLabel } from "../utils/helpers.js";

let year = getLastTwoDigitsOfYear();

function BuildProgress({ orderId, initialStatus, statuses, onChange }) {
  const { status, saving, error, changeStatus } = useOrderStatus(orderId, initialStatus, onChange);
  const narrow = useMediaQuery('(max-width: 62em)');

  const index = statuses.indexOf(status);
  const isDone = index === statuses.length - 1;
  const next = isDone ? null : statuses[index + 1];

  return (
    <Paper withBorder radius="md" p="md" mb="lg" className="no-print">
      <Group justify="space-between" mb="md">
        <div>
          <Text fw={600}>Build progress</Text>
          <Text size="sm" c={error ? 'red' : 'dimmed'}>
            {error ? "Couldn't update — try again" : `Currently: ${statusLabel(status)}`}
          </Text>
        </div>
        {next && (
          <Button color="violet" size="xs" loading={saving} onClick={() => changeStatus(next)}>
            Mark as {capitalizeFirstLetter(next)}
          </Button>
        )}
      </Group>
      {/* when the last status is reached, push past it so every step shows as done */}
      <Stepper
        active={isDone ? statuses.length : index}
        onStepClick={(i) => changeStatus(statuses[i])}
        orientation={narrow ? 'vertical' : 'horizontal'}
        color="violet"
        size="xs"
        iconSize={22}
      >
        {statuses.map((s) => (
          <Stepper.Step key={s} label={capitalizeFirstLetter(s)} />
        ))}
      </Stepper>
    </Paper>
  );
}

export default function OrderPage() {
  const [edit, setEdit] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state.order;
  const customer = location.state.customer;
  const orderNum = location.state.order.orderId;
  // location.state is a snapshot, so track status changes made on this page.
  // older orders have no status; they stay that way until someone sets one
  const [status, setStatus] = useState(order.status || null);

  useEffect(() => {
    getStatuses()
      .then(setStatuses)
      .catch((err) => console.log(err));
  }, [])

  const handleEdit = () => {
    setEdit(true);
  }

  const print = () => {
    window.print();
  }

  const handleDelete = () => {
    if (!window.confirm(`Delete order #${orderNum}? This cannot be undone.`)) return;
    Axios.delete('/orders', { data: { _id: order._id } })
      .then(() => navigate('/orders'))
      .catch(() => alert('could not delete, try again'));
  }

  return (
    <Center>
      {
        !edit ? (
          <Container>
            {statuses.length > 0 && (
              <BuildProgress orderId={order._id} initialStatus={status} statuses={statuses} onChange={setStatus} />
            )}
            {
              order.orderType === "surf" ? <PdfSurf values={order} orderNum={orderNum} customer={customer}/>
              : order.orderType === "windsurf" ? <PdfWS values={order} orderNum={orderNum} customer={customer}/>
              : order.orderType === "foil" ? <PdfFoil values={order} orderNum={orderNum} customer={customer}/>
              : <PdfTow values={order} orderNum={orderNum} customer={customer} />
            }
            <Center>
              <Group>
                <Button color="dark" onClick={print}>Print/Save</Button>
                <Button color="dark" onClick={() => navigate('/')}>Go Home</Button>
                <Button color="dark" onClick={handleEdit}>Edit</Button>
                <Button color="red" onClick={handleDelete}>Delete Order</Button>
              </Group>
            </Center>
          </Container>
        ) :
        (

          <CurrentCustomerOrder values={status ? { ...order, status } : order} customer={customer}/>
        )
      }
    </Center>
  )
}
