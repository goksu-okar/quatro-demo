import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Center, Stack, TextInput, PasswordInput, Button, Text } from '@mantine/core';
import { Axios, setToken } from '../utils/helpers.js';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: { email: '', password: '' },
  });

  const handleSubmit = (values) => {
    setError('');
    setLoading(true);
    Axios.post('/login', values)
      .then((res) => {
        setToken(res.data.token);
        window.location.href = '/';
      })
      .catch((err) => {
        setError('Invalid email or password');
        setLoading(false);
      });
  };

  return (
    <Center mih="70vh">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md" w={320}>
          <Text size="lg" fw={700} ta="center">Sign in</Text>
          <TextInput
            label="Email"
            placeholder="you@forwardmaui.com"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Password"
            {...form.getInputProps('password')}
          />
          {error && <Text c="red" size="sm" ta="center">{error}</Text>}
          <Button type="submit" color="violet" loading={loading} fullWidth>
            Sign in
          </Button>
        </Stack>
      </form>
    </Center>
  );
}
