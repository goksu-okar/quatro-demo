import { Button, Checkbox, Group, Stack, Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { capitalizeFirstLetter, formatDueDate, statusLabel } from "../utils/helpers.js";
import { useNavigate } from 'react-router-dom';
import { Axios } from '../utils/helpers.js';
import OrderStatusBadge, { StatusDot } from './OrderStatusBadge';

const BOARD_TYPES = ['surf', 'windsurf', 'foil', 'tow'];
const CUSTOMER_TYPES = ['retail', 'team', 'wholesale'];

const convertDate = (d) => {
  if (d) {
    let date = new Date(d);
    return date.toISOString().slice(0, 10);
  }
};

// checklist shown in a column header's filter popover
function CheckboxFilter({ options, value, onChange }) {
  return (
    <Stack gap="xs" miw={170}>
      <Checkbox.Group value={value} onChange={onChange}>
        <Stack gap={6}>
          {options.map((o) => (
            <Checkbox
              key={o.value}
              value={o.value}
              color="violet"
              label={o.dot ? <Group gap={6} wrap="nowrap">{o.dot}{o.label}</Group> : o.label}
            />
          ))}
        </Stack>
      </Checkbox.Group>
      <Button size="compact-xs" variant="subtle" color="gray" disabled={!value.length} onClick={() => onChange([])}>
        Clear
      </Button>
    </Stack>
  );
}

const typeOptions = (types) => types.map((t) => ({ value: t, label: capitalizeFirstLetter(t) }));

export default function OrdersTable ({
  orders,
  statuses = [],
  statusOptions = [],
  filters,
  onFilterChange,
  onStatusChange,
  sortStatus,
  onSortStatusChange,
  page,
  onPageChange,
  totalRecords,
  recordsPerPage,
  fetching,
  noRecordsText,
}) {
  const navigate = useNavigate();

  const goToOrder = (o) => {
    Axios.get(`/customers/id/${o.customerId.valueOf()}`)
      .then((res) => {
          navigate('/order', {state: {customer: res.data, order: o}})
        }
      );
  };

  const columns = [
    { accessor: 'createdAt', title: 'Date', sortable: true, render: (o) => convertDate(o.createdAt) },
    { accessor: 'customerName', title: 'Customer', render: (o) => capitalizeFirstLetter(o.customerName) },
    {
      accessor: 'orderType',
      title: 'Board',
      render: (o) => capitalizeFirstLetter(o.orderType),
      filter: (
        <CheckboxFilter
          options={typeOptions(BOARD_TYPES)}
          value={filters.orderTypes}
          onChange={(v) => onFilterChange('orderTypes', v)}
        />
      ),
      filtering: filters.orderTypes.length > 0,
    },
    {
      accessor: 'customerType',
      title: 'Customer type',
      render: (o) => capitalizeFirstLetter(o.customerType),
      filter: (
        <CheckboxFilter
          options={typeOptions(CUSTOMER_TYPES)}
          value={filters.customerTypes}
          onChange={(v) => onFilterChange('customerTypes', v)}
        />
      ),
      filtering: filters.customerTypes.length > 0,
    },
    {
      accessor: 'status',
      title: 'Status',
      render: (o) => (
        <OrderStatusBadge
          orderId={o._id}
          status={o.status}
          statuses={statuses}
          onChange={(s) => onStatusChange && onStatusChange(o._id, s)}
        />
      ),
      // nothing to narrow down when the view only holds one status
      filter: statusOptions.length > 1 ? (
        <CheckboxFilter
          options={statusOptions.map((s) => ({
            value: s,
            label: statusLabel(s === 'none' ? null : s),
            dot: <StatusDot status={s} statuses={statuses} />,
          }))}
          value={filters.statuses}
          onChange={(v) => onFilterChange('statuses', v)}
        />
      ) : undefined,
      filtering: filters.statuses.length > 0,
    },
    { accessor: 'orderId', title: 'Order #' },
    { accessor: 'invoiceNum', title: 'Invoice #' },
    {
      accessor: 'dueOn',
      title: 'Due',
      sortable: true,
      // older orders have typed due dates; dim them so they read as "not a real date"
      render: (o) => (o.dueOn
        ? formatDueDate(o)
        : <Text span size="sm" c="dimmed" fs="italic">{o.dueDate}</Text>),
    },
  ];

  return (
    <DataTable
      records={orders}
      columns={columns}
      idAccessor="_id"
      highlightOnHover
      withTableBorder
      borderRadius="md"
      minHeight={orders.length ? undefined : 180}
      fetching={fetching}
      loaderColor="violet"
      noRecordsText={noRecordsText}
      onRowClick={({ record }) => goToOrder(record)}
      sortStatus={sortStatus}
      onSortStatusChange={onSortStatusChange}
      page={page}
      onPageChange={onPageChange}
      totalRecords={totalRecords}
      recordsPerPage={recordsPerPage}
      paginationActiveBackgroundColor="violet"
      paginationText={({ from, to, totalRecords }) => `${from}–${to} of ${totalRecords}`}
    />
  )
}
