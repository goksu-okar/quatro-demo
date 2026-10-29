import { useForm } from '@mantine/form';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Axios } from "../utils/helpers.js";
import {Container, Center, TextInput, Textarea, Button, Group, Stack, NumberInput, Select} from '@mantine/core';

export default function CustomerEditForm({customerValues}) {
  const navigate = useNavigate();

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
        <TextInput label="First Name:" {...form.getInputProps("firstName")} />
        <TextInput label="Last Name:" {...form.getInputProps("lastName")} />
        <TextInput label="Email:" {...form.getInputProps("email")} />
        <TextInput
          label="Phone Number:"
          placeholder="808-888-8888"
          {...form.getInputProps("phone")}
        />
        <Textarea label="Address:" {...form.getInputProps("address")} />
        <NumberInput
          label="Weight:"
          hideControls
          placeholder="weight in lb"
          {...form.getInputProps("weight")}
        />
        <Group>
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
        <NumberInput
          label="Weight:"
          hideControls
          placeholder="weight in lb"
          {...form.getInputProps("weight")}
        />
        <Group gap="lg" justify="flex-end">
          <Button color="dark" onClick={handleSave}>
            Save
          </Button>
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