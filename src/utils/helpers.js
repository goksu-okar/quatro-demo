import axios from "axios";
import dayjs from "dayjs";

export function capitalizeFirstLetter(string) {
  if (string) {
    let words = string.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }
}

export function getLastTwoDigitsOfYear() {
  let date = new Date();
  return date.getFullYear() % 2000;
}

export function convertDate(d) {
  if (d) {
    let date = new Date(d).toString().slice(4, 15);
    return date;
  }
}

export function createTodaysDate() {
  let date = new Date().toString().slice(4, 15);
  return date;
}

export function futureDate6() {
  let date = new Date();
  date.setDate(date.getDate() + 42);
  return date.toString().slice(4, 15);
}

export function futureDate7() {
  let date = new Date();
  date.setDate(date.getDate() + 49);
  return date.toString().slice(4, 15);
}

// the live API unless VITE_API_URL says otherwise (local dev sets it in .env.local)
export const Axios = axios.create({ baseURL: import.meta.env.VITE_API_URL || "https://frwdmauiapi.com:443" });

const TOKEN_KEY = 'authToken';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

Axios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// the backend owns the status list; fetch it once per session
let statusesPromise = null;

export function getStatuses() {
  if (!statusesPromise) {
    statusesPromise = Axios.get('/order-statuses')
      .then((res) => res.data)
      .catch((err) => {
        statusesPromise = null; // let the next caller retry
        throw err;
      });
  }
  return statusesPromise;
}

// new orders have a picked calendar date (dueOn); older ones free text (dueDate)
export function formatDueDate(order) {
  if (order.dueOn) return dayjs(order.dueOn).format('MMM D, YYYY');
  return order.dueDate || '';
}

// new orders are due 8 weeks out unless staff pick another date
export function defaultDueOn() {
  return dayjs().add(8, 'week').format('YYYY-MM-DD');
}

// orders from before statuses existed have none
export function statusLabel(status) {
  return status ? capitalizeFirstLetter(status) : 'No status';
}

// first status = not started, last = done, everything between = in progress
export function statusColor(status, statuses) {
  const i = statuses.indexOf(status);
  if (i <= 0) return 'gray';
  if (i === statuses.length - 1) return 'green';
  return 'violet';
}

Axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      clearToken();
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);
