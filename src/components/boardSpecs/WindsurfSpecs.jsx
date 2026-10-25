import {
  Select,
  NumberInput,
  TextInput,
  Group,
  Textarea,
  Title,
  Flex,
  Radio,
} from "@mantine/core";
import { futureDate7 } from "../../utils/helpers";
import { useEffect } from "react";
import UploadWidget from "../upload/UploadWidget";

export default function WindsurfSpecs({ form }) {
  // useEffect(() => {
  //   if (form.values.dueDate === "") {
  //     form.setFieldValue('dueDate', futureDate7())
  //   }
  // }, [])

  return (
    <>
      <Title order={3} mb={3}>
        WINDSURF
      </Title>
      <Group>
        <Select
          label="Style:"
          withAsterisk
          allowdeselect="true"
          placeholder="pick one"
          data={[
            { value: "Wave Symmetrical", label: "Wave Symmetrical" },
            { value: "Wave Asymmetrical", label: "Wave Asymmetrical" },
            { value: "Freeride", label: "Freeride" },
          ]}
          {...form.getInputProps("style")}
        />
        <TextInput
          label="Invoice Number:"
          placeholder="type here"
          {...form.getInputProps("invoiceNum")}
        />
        <TextInput
          label="Due Date:"
          placeholder="type here"
          withAsterisk
          // value={form.values.dueDate}
          // onChange={(event) => form.setFieldValue('dueDate', event.currentTarget.value)}
          {...form.getInputProps("dueDate")}
        />
      </Group>

      <Group>
        <NumberInput
          label="Volume(lt):"
          withAsterisk
          placeholder="lt"
          step={10}
          precision={2}
          {...form.getInputProps("volume")}
        />
        <NumberInput label="Length(ft):" {...form.getInputProps("lengthFt")} />
      </Group>

      <Group>
        <NumberInput
          label="Length(in):"
          precision={2}
          step={0.5}
          {...form.getInputProps("lengthIn")}
        />
        <NumberInput
          label="Width(in):"
          placeholder="inches"
          precision={2}
          step={0.5}
          {...form.getInputProps("width")}
        />
        <NumberInput
          label="Thickness(in):"
          placeholder="inches"
          precision={2}
          step={0.5}
          {...form.getInputProps("thickness")}
        />
      </Group>

      <Group>
        <TextInput
          label="Tail:"
          withAsterisk
          placeholder="type here"
          {...form.getInputProps("tail")}
        />
        <Select
          label="Construction:"
          withAsterisk
          placeholder="pick one"
          allowdeselect="true"
          data={[
            { value: "Regular", label: "Regular" },
            { value: "Pro", label: "Pro" },
            { value: "Ultra Lite", label: "Ultra Lite" },
          ]}
          {...form.getInputProps("construction")}
        />
      </Group>

      <Group>
        <TextInput
          label="Logo Color:"
          withAsterisk
          placeholder="type here"
          {...form.getInputProps("logo")}
        />
        <TextInput
          label="Board Color:"
          withAsterisk
          placeholder="type here"
          allowdeselect="true"
          {...form.getInputProps("boardColor")}
        />
        <Select
          label="Pad Color:"
          withAsterisk
          placeholder="pick one"
          allowdeselect="true"
          data={[
            { value: "Black", label: "Black" },
            { value: "White", label: "White" },
            { value: "TBA", label: "TBA" },
          ]}
          {...form.getInputProps("pads")}
        />
      </Group>

      <Group>
        <Select
          label="Fin Setup:"
          withAsterisk
          placeholder="pick one"
          allowdeselect="true"
          data={[
            { value: "Single", label: "Single" },
            { value: "Twin", label: "Twin" },
            { value: "Thruster", label: "Thruster" },
            { value: "Quad", label: "Quad" },
            { value: "Five Fin", label: "Five Fin" },
          ]}
          {...form.getInputProps("finSetup")}
        />
        <Select
          label="Box Type:"
          withAsterisk
          placeholder="pick one"
          allowdeselect="true"
          data={[
            { value: "US", label: "US" },
            { value: "Power Box", label: "Power Box" },
            { value: "Custom Mix", label: "Custom Mix" },
          ]}
          {...form.getInputProps("boxType")}
        />
        <TextInput
          label="Stance:"
          placeholder="type here"
          {...form.getInputProps("stance")}
        />
      </Group>

      <Group>
        <Select
          label="Inserts:"
          withAsterisk
          placeholder="pick one"
          allowdeselect="true"
          data={[
            { value: "single", label: "single" },
            { value: "double", label: "double" },
            { value: "single/double", label: "single/double" },
            { value: "see notes", label: "see notes" },
            { value: "none", label: "none" },
          ]}
          {...form.getInputProps("inserts")}
        />
        <TextInput
          label="Rear Strap From Tail:"
          placeholder="type here"
          {...form.getInputProps("rearStrap")}
        />
        <TextInput
          label="Strap Width:"
          placeholder="type here"
          {...form.getInputProps("strapWidth")}
        />
      </Group>

      <Group>
        <TextInput
          label="Wave/Location:"
          withAsterisk
          placeholder="type here"
          {...form.getInputProps("waveLocation")}
        />
        <Select
          label="Airbrush:"
          placeholder="pick one"
          data={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
          {...form.getInputProps("airbrush")}
        />
        <TextInput
          label="Finish:"
          placeholder="type here"
          {...form.getInputProps("finish")}
        />
        <TextInput
          label="Board Weight:"
          placeholder="lbs"
          {...form.getInputProps("boardWeight")}
        />
      </Group>
      <Flex mt={12} justify="space-between" align="center">
        <Radio.Group
          name="Shop Flow"
          label="Shop Flow:"
          {...form.getInputProps("priority")}
        >
          <Group gap="xs">
            <Radio size="sm" value="Red" label="Red" />
            <Radio size="sm" value="Green" label="Green" />
            <Radio size="sm" value="Yellow" label="Yellow" />
          </Group>
        </Radio.Group>
        <UploadWidget form={form} />
      </Flex>
      <Textarea
        mt={3}
        placeholder="type here"
        label="Notes:"
        radius="md"
        size="md"
        {...form.getInputProps("notes")}
      />
    </>
  );
}
