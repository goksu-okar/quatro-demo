import { capitalizeFirstLetter, convertDate, createTodaysDate } from "../../utils/helpers.js";

// Top of every order sheet: the board type with the order numbers beside it, then the
// customer's name and details on one line, so the board specs get the room.
export default function SheetHeader({ values, orderNum, customer }) {
  const name = capitalizeFirstLetter(customer.firstName + " " + customer.lastName);
  const has = (v) => v !== undefined && v !== null && v !== '' && v !== 'na';

  const details = [
    ['Phone', customer.phone],
    ['Weight', has(customer.weight) ? `${customer.weight} lbs` : null],
    ['Height', has(customer.heightFt) ? `${customer.heightFt}' ${customer.heightIn ?? ''}` : null],
    ['Location', values.waveLocation],
  ].filter(([, value]) => has(value));

  return (
    <div className='sheet-header'>
      <div className='sheet-title-row'>
        <div className='sheet-title'>
          <span className='order-title'>{capitalizeFirstLetter(values.orderType)}</span>
        </div>
        <div className='sheet-title-side'>
          {values.priority && (
            <div className='sheet-priority' style={{ backgroundColor: values.priority.toLowerCase() }} />
          )}
          <div className='sheet-order-info'>
            <div><span>Order #:</span> {orderNum}</div>
            {has(values.invoiceNum) && <div><span>Invoice #:</span> {values.invoiceNum}</div>}
            <div><span>Created:</span> {values.createdAt ? convertDate(values.createdAt) : createTodaysDate()}</div>
          </div>
        </div>
      </div>
      <div className='sheet-details'>
        <div className='sheet-name'>{name}</div>
        {details.map(([label, value]) => (
          <div key={label} className='sheet-detail'>
            <span>{label}:</span> {value}
          </div>
        ))}
      </div>
    </div>
  );
}
