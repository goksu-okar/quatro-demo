import { useEffect, useState } from "react";
import { Group, Stack, Text, ActionIcon, Title, Avatar, SimpleGrid, Badge, Divider } from '@mantine/core';
import CustomerEditForm from './CustomerEditForm';
import { Axios, capitalizeFirstLetter } from '../utils/helpers.js';

function EditIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <Text size="xs" tt="uppercase" fw={700} c="dimmed">{label}</Text>
      <Text size="sm" fw={500}>{value || '—'}</Text>
    </div>
  );
}

export default function CustomerDetailCard({ customerId, onClose, onDeleted }) {
  const [customer, setCustomer] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    Axios.get(`/customers/id/${customerId}`)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.log(err));
  }, [customerId]);

  if (!customer) return null;

  const handleSaved = (updatedCustomer) => {
    setCustomer(updatedCustomer);
    setEdit(false);
  };

  if (edit) {
    return (
      <CustomerEditForm
        customerValues={customer}
        onSaved={handleSaved}
        onCancel={() => setEdit(false)}
        onDeleted={onDeleted}
      />
    );
  }

  const fullName = `${capitalizeFirstLetter(customer.firstName)} ${capitalizeFirstLetter(customer.lastName)}`;
  const initials = `${customer.firstName?.[0] || ''}${customer.lastName?.[0] || ''}`.toUpperCase();

  return (
    <div>
      <Group justify="space-between" align="center" mb="md">
        <Group gap="md">
          <Avatar color="violet" radius="xl" size="lg">{initials}</Avatar>
          <div>
            <Title order={3}>{fullName}</Title>
            {customer.level && <Badge color="violet" variant="light" mt={2}>{customer.level}</Badge>}
          </div>
        </Group>
        <ActionIcon variant="light" color="violet" size="lg" radius="md" onClick={() => setEdit(true)} aria-label="Edit customer">
          <EditIcon />
        </ActionIcon>
      </Group>

      <Divider mb="md" />

      <Stack gap="md">
        <SimpleGrid cols={2} spacing="md">
          <Field label="Phone" value={customer.phone} />
          <Field label="Email" value={customer.email} />
        </SimpleGrid>
        <Field label="Address" value={customer.address} />
        <SimpleGrid cols={3} spacing="md">
          <Field label="Weight" value={customer.weight ? `${customer.weight} lbs` : ''} />
          <Field label="Height" value={`${customer.heightFt || 0}' ${customer.heightIn || 0}"`} />
          <Field label="Level" value={customer.level} />
        </SimpleGrid>
      </Stack>
    </div>
  );
}
