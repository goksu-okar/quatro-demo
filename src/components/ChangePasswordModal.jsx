import { useState } from 'react';
import { Modal, Stack, PasswordInput, Button, Text } from '@mantine/core';
import { Axios } from '../utils/helpers.js';

export default function ChangePasswordModal({ opened, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    Axios.post('/change-password', { currentPassword, newPassword })
      .then(() => {
        setLoading(false);
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.error || 'Could not change password, try again');
      });
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Change Password" radius="lg">
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <PasswordInput
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
          />
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
          />
          <PasswordInput
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
          {error && <Text c="red" size="sm">{error}</Text>}
          {success && <Text c="green" size="sm">✓ Password changed</Text>}
          <Button type="submit" color="violet" loading={loading} fullWidth>
            Update Password
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
