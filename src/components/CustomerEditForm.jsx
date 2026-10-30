import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../utils/helpers.js";
import {Container, Center, TextInput, Textarea, Button, Group, Stack, NumberInput, Select, Text} from '@mantine/core';

export default function CustomerEditForm({customerValues, onSaved, onCancel}) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      weight: 0,
      heightFt: 0,
      heightIn: 0,
      level: "",
    },
  });

  useEffect(() => {
    form.setValues(customerValues);
  }, [customerValues]);

  const handleSave = () => {
    console.log(form.values)
    Axios.patch('/customers', form.values)
      .then((res) => {
        form.setValues(res.data);
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          onSaved?.(res.data);
        }, 1200);
      })
      .catch((err) => {
        alert("could not save, try again");
      });
  }

  const handleDelete = () => {
      Axios.delete('/customers', {
      data: {_id: customerValues._id}
    })
    .then((res) => {navigate(-1)})
    .catch((err) => {alert('oops could not delete')});
  }


  return (
    <Container pt='10px' pb='15px'>
      <Stack gap="lg">
        <Center>
          <h1>Customer Form</h1>
        </Center>
        <Group grow>
          <TextInput label="First Name:" {...form.getInputProps("firstName")} />
          <TextInput label="Last Name:" {...form.getInputProps("lastName")} />
        </Group>
        <Group grow>
          <TextInput
            label="Phone Number:"
            placeholder="808-888-8888"
            {...form.getInputProps("phone")}
          />
          <TextInput label="Email:" {...form.getInputProps("email")} />
        </Group>
        <Textarea label="Address:" {...form.getInputProps("address")} />
        <Group grow align="flex-end">
          <Group gap="xs" wrap="nowrap">
            <NumberInput
              label="Ft:"
              placeholder="ft"
              {...form.getInputProps("heightFt")}
              min={0}
              max={12}
            />
            <NumberInput
              label="Inch:"
              placeholder="in"
              {...form.getInputProps("heightIn")}
            />
          </Group>
          <NumberInput
            label="Weight:"
            hideControls
            placeholder="weight in lb"
            {...form.getInputProps("weight")}
          />
          <Select
            label="Level"
            allowDeselect
            placeholder="pick one"
            data={[
              { value: "entry", label: "entry" },
              { value: "intermediate", label: "intermediate" },
              { value: "advanced", label: "advanced" },
              { value: "pro", label: "pro" },
            ]}
            {...form.getInputProps("level")}
          />
        </Group>
        <Group gap="lg" justify="flex-end">
          {saved && <Text c="green" fw={700}>✓ Saved</Text>}
          <Button color="dark" onClick={handleSave}>
            Save
          </Button>
          {onCancel && (
            <Button color="dark" variant="default" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            color="dark"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
          <Button
            color="dark"
            onClick={() => {
              handleDelete();
            }}
          >
            Delete Customer
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}