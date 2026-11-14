import { useState, useEffect, useRef } from 'react';
import { Menu, Badge, Loader, Tooltip, Box, Select, Group } from '@mantine/core';
import { Axios, getStatuses, statusLabel, statusColor } from '../utils/helpers.js';

export function StatusDot({ status, statuses }) {
  const color = statusColor(status, statuses);
  return (
    <Box
      w={8}
      h={8}
      style={{ borderRadius: '50%', flexShrink: 0, backgroundColor: `var(--mantine-color-${color}-6)` }}
    />
  );
}

// Status picker for the order forms; spread form.getInputProps('status') into it.
export function OrderStatusSelect(props) {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    getStatuses().then(setStatuses).catch((err) => console.log(err));
  }, []);

  return (
    <Select
      label="Status"
      placeholder="No status"
      allowDeselect={false}
      data={statuses.map((s) => ({ value: s, label: statusLabel(s) }))}
      leftSection={props.value ? <StatusDot status={props.value} statuses={statuses} /> : null}
      renderOption={({ option }) => (
        <Group gap="xs" wrap="nowrap">
          <StatusDot status={option.value} statuses={statuses} />
          {option.label}
        </Group>
      )}
      {...props}
    />
  );
}

// Shows the new status right away, saves it, and puts the old one back if the save fails.
export function useOrderStatus(orderId, initialStatus, onChange) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const errorTimer = useRef(null);

  useEffect(() => { setStatus(initialStatus); }, [initialStatus]);
  useEffect(() => () => clearTimeout(errorTimer.current), []);

  const changeStatus = (next) => {
    if (next === status || saving) return;
    const previous = status;
    setStatus(next);
    setSaving(true);
    setError(false);
    clearTimeout(errorTimer.current);

    Axios.patch(`/orders/${orderId}/status`, { status: next })
      .then(() => onChange && onChange(next))
      .catch(() => {
        setStatus(previous);
        setError(true);
        errorTimer.current = setTimeout(() => setError(false), 3000);
      })
      .finally(() => setSaving(false));
  };

  return { status, saving, error, changeStatus };
}

export default function OrderStatusBadge({ orderId, status: initialStatus, statuses, onChange }) {
  const { status, saving, error, changeStatus } = useOrderStatus(orderId, initialStatus || null, onChange);

  // statuses not loaded yet: show a plain, non-interactive badge
  if (!statuses.length) {
    return <Badge variant="light" color="gray">{statusLabel(initialStatus)}</Badge>;
  }

  return (
    // the menu renders in a portal, but React still bubbles its clicks up here;
    // stop them so picking a status doesn't also open the order
    <span onClick={(e) => e.stopPropagation()}>
      <Tooltip label="Couldn't update — try again" color="red" opened={error} withArrow>
        <span>
          <Menu shadow="md" width={200} position="bottom-start">
            <Menu.Target>
              <Badge
                variant="light"
                color={statusColor(status, statuses)}
                style={{ cursor: 'pointer' }}
                rightSection={saving ? <Loader size={10} color="currentColor" /> : '▾'}
              >
                {statusLabel(status)}
              </Badge>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Set status</Menu.Label>
              {statuses.map((s) => (
                <Menu.Item
                  key={s}
                  onClick={() => changeStatus(s)}
                  leftSection={<StatusDot status={s} statuses={statuses} />}
                  rightSection={s === status ? '✓' : null}
                  fw={s === status ? 600 : 400}
                >
                  {statusLabel(s)}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </span>
      </Tooltip>
    </span>
  );
}
