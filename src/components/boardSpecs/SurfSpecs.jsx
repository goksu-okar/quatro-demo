import { Select, NumberInput, TextInput, Group, Textarea, Title, Radio, Flex } from '@mantine/core';
import { useEffect } from 'react';
import { futureDate6 } from '../../utils/helpers';
import UploadWidget from '../upload/UploadWidget';

export default function SurfSpecs({ form }) {

  // useEffect(() => {
  //   if (form.values.dueDate === "") {
  //     form.setFieldValue('dueDate', futureDate6())
  //   }
  // }, []);

  return (
    <>
    <Title order={3} mb={3}>SURF</Title>
      <Group>
        <Select
          label="Style:"
          withAsterisk
          allowDeselect
          placeholder="style"
          data={[
            { value: "STD SHORT", label: "STD SHORT" },
            { value: "STEP-UP", label: "STEP-UP" },
            { value: "FISH", label: "FISH" },
            { value: "MINI TANKER", label: "MINI TANKER" },
            { value: "LONG BOARD", label: "LONG BOARD" },
            { value: "GUN", label: "GUN" },
            { value: "GROVELER", label: "GROVELER" },
            { value: "SUP", label: "SUP" },
            { value: "STEP-OFF", label: "STEP-OFF" }
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
          withAsterisk
          placeholder='feet'
          label="Length(ft):"
          {...form.getInputProps("lengthFt")}
        />
        <NumberInput
          label="Length(in):"
          precision={2}
          withAsterisk
          step={0.5}
          {...form.getInputProps("lengthIn")}
        />
        <NumberInput
          label="Width(in):"
          placeholder="inches"
          withAsterisk
          precision={2}
          step={0.5}
          {...form.getInputProps("width")}
        />
      </Group>

      <Group>
        <NumberInput
          label="Thickness(in):"
          placeholder="inches"
          withAsterisk
          precision={2}
          step={0.5}
          {...form.getInputProps("thickness")}
        />
        <NumberInput
          label="Volume(lt):"
          withAsterisk
          placeholder="lt"
          precision={2}
          step={10}
          {...form.getInputProps("volume")}
        />
        <Select
          label="Tail:"
          withAsterisk
          placeholder="pick one"
          data={[
            { value: "Squash", label: "Squash" },
            { value: "Round Pin", label: "Round Pin" },
            { value: "Swallow", label: "Swallow" },
            { value: "Thumb", label: "Thumb" },
            { value: "Fish", label: "Fish" },
          ]}
          {...form.getInputProps("tail")}
        />
      </Group>

      <Group>
        <Select
          label="Blank:"
          withAsterisk
          placeholder="pick one"
          allowDeselect
          defaultValue="PU"
          data={[
            { value: "PU", label: "PU" },
            { value: "EPS", label: "EPS" },
            { value: "Custom", label: "Custom" },
          ]}
          {...form.getInputProps("blank")}
        />
        <Select
          label="Construction:"
          placeholder="pick one"
          withAsterisk
          allowDeselect
          data={[
            { value: "STD PU", label: "STD PU" },
            { value: "Carbon Wrap PU", label: "Carbon Wrap PU" },
            { value: "STD EPS", label: "STD EPS" },
            { value: "Carbon Wrap EPS", label: "Carbon Wrap EPS" },
            { value: "Custom", label: "Custom" },
            { value: "4+4/4", label: "4+4/4" },
            { value: "4+4/6", label: "4+4/6" },
            { value: "6+4/4", label: "6+4/4" },
            { value: "6+4/6", label: "6+4/6" },
          ]}
          {...form.getInputProps("construction")}
        />
        <Select
          label="Fin Setup:"
          placeholder="pick one"
          withAsterisk
          allowDeselect
          data={[
            { value: "Thruster", label: "Thruster" },
            { value: "Quad", label: "Quad" },
            { value: "Twin", label: "Twin" },
            { value: "Single", label: "Single" },
            { value: "Five Fin", label: "Five Fin" },
          ]}
          {...form.getInputProps("finSetup")}
        />
      </Group>

      <Group>
        <TextInput
          label="Logo Color:"
          placeholder="type here"
          {...form.getInputProps("logo")}
        />
        <TextInput
          label="Board Color:"
          placeholder="type here"
          {...form.getInputProps("boardColor")}
        />
        <Select
          label="Box Type:"
          placeholder="pick one"
          withAsterisk
          allowDeselect
          data={[
            { value: "FCS II", label: "FCS II" },
            { value: "Futures", label: "Futures" },
            { value: "A Box", label: "A Box" },
            { value: "US Box", label: "US Box" },
          ]}
          {...form.getInputProps("boxType")}
        />
        </Group>

        <Group>
        <Select
          label="Box Color:"
          placeholder="pick one"
          allowDeselect
          withAsterisk
          data={[
            { value: "black", label: "black" },
            { value: "blue", label: "blue" },
            { value: "red", label: "red" },
            { value: "white", label: "white" },
            { value: "any", label: "any" },
          ]}
          {...form.getInputProps("boxColor")}
        />
        <TextInput
          label="Stance:"
          placeholder="12"
          {...form.getInputProps("stance")}
        />
        <Select
          label="Inserts:"
          placeholder="pick one"
          allowDeselect
          data={[
            { value: "single", label: "single" },
            { value: "double", label: "double" },
            { value: "single/double", label: "single/double" },
            { value: "see notes", label: "see notes" },
            { value: "none", label: "none" },
          ]}
          {...form.getInputProps("inserts")}
        />
        </Group>
        
      

      <Group>
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
        <Select
          label="Leash Plug:"
          withAsterisk
          placeholder="pick one"
          data={[
            { value: "yes", label: "yes" },
            { value: "no", label: "no" },
          ]}
          {...form.getInputProps("leash")}
        />
      </Group>

      <Group>
        
        <Select
          label="Install Pad:"
          withAsterisk
          placeholder="pick one"
          data={[
            { value: "yes", label: "yes" },
            { value: "no", label: "no" },
          ]}
          {...form.getInputProps("pads")}
        />
        <Select
          label="Wave/Location:"
          withAsterisk
          placeholder="pick one"
          data={[
            {
              value: "Point Break",
              label: "Point Break",
            },
            { value: "Punchy Beach Break", label: "Punchy Beach Break" },
            { value: "Ankle Waist High Mush", label: "Ankle Waist High Mush" },
            { value: "XL-XXL", label: "XL-XXL" },
            { value: "Peahi", label: "Peahi" },
            { value: "Other", label: "Other" },
          ]}
          {...form.getInputProps("waveLocation")}
        />
        <Select
          label="Airbrush:"
          withAsterisk
          placeholder="pick one"
          data={[
            { value: "yes", label: "yes" },
            { value: "no", label: "no" },
          ]}
          {...form.getInputProps("airbrush")}
        />
      </Group>
      <Group>
      <TextInput
        label="Board Weight:"
        placeholder="lbs"
        {...form.getInputProps("boardWeight")}
      />
      
      </Group>
      <Flex mt={12} justify='space-between' align='center'>
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
        <UploadWidget form={form}/>
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