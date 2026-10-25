import { Select, TextInput, Group, Textarea, NumberInput, Title, Flex, Radio } from '@mantine/core';
import { futureDate7 } from '../../utils/helpers';
import { useEffect } from 'react';
import UploadWidget from '../upload/UploadWidget';
//

export default function TowSpecs({ form }) {

  // useEffect(() => {
  //   if (form.values.dueDate === "") {
  //     form.setFieldValue('dueDate', futureDate7())
  //   }
  // }, [])

  return (
    <>
      <Title order={3} mb={3}>TOW</Title>
      <Group>
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
          label="Length(ft):"
          {...form.getInputProps("lengthFt")}
        />
        <NumberInput
          label="Length(in):"
          precision={2}
          step={0.5}
          {...form.getInputProps("lengthIn")}
        />
      </Group>

      <Group>
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
        <NumberInput
          label="Volume(lt):"
          withAsterisk
          placeholder="lt"
          precision={2}
          step={10}
          {...form.getInputProps("volume")}
        />
      </Group>

      <Group>
        <Select
          label="Tail:"
          withAsterisk
          allowDeselect
          placeholder="pick one"
          data={[
            { value: "squash", label: "squash" },
            { value: "round pin", label: "round pin" },
            { value: "swallow", label: "swallow" },
            { value: "thumb", label: "thumb" },
            { value: "fish", label: "fish" },
          ]}
          {...form.getInputProps("tail")}
        />
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
            { value: "Pu Tow", label: "Pu Tow" }
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
      </Group>

      <Group>
        <Select
          placeholder="pick one"
          label="Logo:"
          withAsterisk
          allowDeselect
          data={[
            { value: "black", label: "black" },
            { value: "blue", label: "blue" },
            { value: "red", label: "red" },
            { value: "white", label: "white" },
            { value: "any", label: "any" },
          ]}
          {...form.getInputProps("logo")}
        />
        <TextInput
          label="Board Color:"
          placeholder="type here"
          withAsterisk
          {...form.getInputProps("boardColor")}
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
          <Select
            label="Box Color:"
            placeholder="pick one"
            withAsterisk
            allowDeselect
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
      </Group>
        
      

      <Group>
        <Select
          withAsterisk
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
        <TextInput
          label="Rear Strap From Tail:"
          withAsterisk
          placeholder="type here"
          {...form.getInputProps("rearStrap")}
        />
        <TextInput
          label="Strap Width:"
          withAsterisk
          placeholder="type here"
          {...form.getInputProps("strapWidth")}
        />
      </Group>

      <Group>
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
            { value: "steep/hollow point break", label: "Steep/Hollow Point Break" },
            { value: "punchy beach break", label: "Punchy Beach Break" },
            { value: "ankle waist high mush", label: "Ankle Waist High Mush" },
            { value: "Xl-XXL", label: "XL-XXL" },
            { value: "Peahi", label: "Peahi" },
            { value: "Outer Sprecks", label: "Outer Sprecks" },
            { value: "Other", label: "Other" },
          ]}
          {...form.getInputProps("waveLocation")}
        />
      </Group>
      <Group>
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
  )
    
}