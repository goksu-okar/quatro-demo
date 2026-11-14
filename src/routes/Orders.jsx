import { useState, useEffect, useCallback } from 'react';
import {
  Badge,
  CloseButton,
  Container,
  Group,
  SegmentedControl,
  TextInput
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import OrdersTable from '../components/ordersTable';
import { Axios, getStatuses } from '../utils/helpers.js';

const PAGE_SIZE = 100;
const NO_FILTERS = { statuses: [], orderTypes: [], customerTypes: [] };

export default function Orders() {

  const [view, setView] = useState('active');
  const [filters, setFilters] = useState(NO_FILTERS);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search.trim(), 300);
  const [sortStatus, setSortStatus] = useState({ columnAccessor: 'createdAt', direction: 'desc' });
  const [activePage, setPage] = useState(1);

  const [statuses, setStatuses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [counts, setCounts] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getStatuses().then(setStatuses).catch((err) => {console.log(err)});
  }, [])

  // filters every request shares; status is handled separately because the counts ignore it
  const commonParams = {
    orderType: filters.orderTypes.join(',') || undefined,
    customerType: filters.customerTypes.join(',') || undefined,
    q: debouncedSearch || undefined,
  };
  const commonKey = JSON.stringify(commonParams);

  // the column filter narrows the quick view; with nothing ticked, the whole view shows
  const statusParam = filters.statuses.length ? filters.statuses.join(',') : view;

  // refetches whenever the page, a filter, the search or the sort changes
  useEffect(() => {
    let ignore = false; // a slower, older response must not overwrite a newer one
    setFetching(true);
    Axios.get(`/orders`, {
      params: {
        ...commonParams,
        status: statusParam,
        page: activePage,
        limit: PAGE_SIZE,
        sort: sortStatus.columnAccessor === 'dueOn' ? 'dueOn' : 'createdAt',
        dir: sortStatus.direction,
      },
    })
    .then((res) => {
      if (ignore) return;
      setOrders(res.data);
      setTotalCount(parseInt(res.headers['x-total-count'], 10) || 0);
    })
    .catch((err) => {console.log(err)})
    .finally(() => { if (!ignore) setFetching(false); });
    return () => { ignore = true; };
  }, [commonKey, statusParam, activePage, sortStatus])

  const refreshCounts = useCallback(() => {
    Axios.get('/order-counts', { params: JSON.parse(commonKey) })
      .then((res) => setCounts(res.data))
      .catch((err) => {console.log(err)});
  }, [commonKey]);

  useEffect(() => { refreshCounts(); }, [refreshCounts]);

  // any change to what's shown starts again from page 1
  const changeView = (v) => {
    setView(v);
    setFilters((f) => ({ ...f, statuses: [] }));
    setPage(1);
  }

  const changeFilter = (key, value) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  }

  const changeSearch = (value) => {
    setSearch(value);
    setPage(1);
  }

  const changeSort = (s) => {
    setSortStatus(s);
    setPage(1);
  }

  // keep the row where it is, even if it no longer matches the filter, until the next fetch
  const updateOrderStatus = (_id, newStatus) => {
    setOrders((current) => current.map((o) => (o._id === _id ? { ...o, status: newStatus } : o)));
    refreshCounts();
  }

  // which statuses the Status column filter offers in each view
  const statusOptions = view === 'active' ? statuses.slice(0, -1)
    : view === 'completed' ? statuses.slice(-1)
    : [...statuses, 'none'];

  const filtered = view !== 'all' || !!debouncedSearch
    || Object.values(filters).some((v) => v.length > 0);

  // only the active view shows a count; that's the number the shop watches
  const viewLabel = (label, value) => (
    <Group gap={6} wrap="nowrap" justify="center">
      {label}
      {value === 'active' && counts && (
        <Badge size="sm" variant={view === value ? 'white' : 'light'} color="violet" circle={counts[value] < 10}>
          {counts[value]}
        </Badge>
      )}
    </Group>
  );

  return (
    <Container size="xl" mt="xl">
      <Group justify="space-between" mb="md" gap="sm">
        <SegmentedControl
          value={view}
          onChange={changeView}
          color="violet"
          radius="md"
          data={[
            { value: 'active', label: viewLabel('Active', 'active') },
            { value: 'completed', label: viewLabel('Completed', 'completed') },
            { value: 'all', label: viewLabel('All', 'all') },
          ]}
        />
        <TextInput
          aria-label="Search orders"
          placeholder="Search customer or order #"
          w={{ base: '100%', sm: 280 }}
          value={search}
          onChange={(e) => changeSearch(e.currentTarget.value)}
          rightSection={search ? <CloseButton size="sm" aria-label="Clear search" onClick={() => changeSearch('')} /> : null}
        />
      </Group>
      <OrdersTable
        orders={orders}
        statuses={statuses}
        statusOptions={statusOptions}
        filters={filters}
        onFilterChange={changeFilter}
        onStatusChange={updateOrderStatus}
        sortStatus={sortStatus}
        onSortStatusChange={changeSort}
        page={activePage}
        onPageChange={setPage}
        totalRecords={totalCount}
        recordsPerPage={PAGE_SIZE}
        fetching={fetching}
        noRecordsText={filtered ? 'No orders match these filters' : 'No orders yet'}
      />
    </Container>
  );
}
