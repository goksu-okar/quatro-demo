import { DatePickerInput } from '@mantine/dates';

// Due date picker. It stores a plain calendar date ("2026-12-16") in dueOn.
// Older orders have free-text due dates in dueDate; show that until a real date is picked.
export default function DueDateInput({ form }) {
  const typedDueDate = form.values.dueDate;

  return (
    <DatePickerInput
      label="Due Date:"
      placeholder="Pick a date"
      withAsterisk
      clearable
      valueFormat="MMM D, YYYY"
      description={!form.values.dueOn && typedDueDate ? `Was: ${typedDueDate}` : undefined}
      {...form.getInputProps('dueOn')}
    />
  );
}
