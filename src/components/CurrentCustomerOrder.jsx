import PdfWS from './pdfs/PdfWS.jsx';
import PdfSurf from './pdfs/PdfSurf.jsx';
import PdfFoil from './pdfs/PdfFoil.jsx';
import PdfTow from './pdfs/PdfTow.jsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  TextInput,
  NumberInput,
  Textarea,
  Checkbox,
  Radio,
  Button,
  Group,
  Container,
  Space,
  Divider,
  Stepper,
  Select,
  Code
} from '@mantine/core';
import { useForm } from '@mantine/form';
// import { OrderPDF } from './OrderPDF.jsx';
import SurfSpecs from './boardSpecs/SurfSpecs.jsx';
import FoilSpecs from './boardSpecs/FoilSpecs.jsx';
import TowSpecs from './boardSpecs/TowSpecs.jsx';
import WindsurfSpecs from './boardSpecs/WindsurfSpecs.jsx';
import { Axios } from '../utils/helpers.js';

export default function CurrentCustomerOrder({ customer, setCustomer, values }) {
  const [active, setActive] = useState(0);
  const [boardType, setBoardType] = useState('Surf');
  const [orderNum, setOrderNum] = useState('');

  //if values are passed, it is to edit an existing order. Otherwise, it's a new order being created
  useEffect(() => {
    if (values) {
      form.setValues(values);
    }
    form.setFieldValue('firstName', customer.firstName);
    form.setFieldValue('lastName', customer.lastName);
  }, [])

  const form = useForm({
    initialValues: {
      intro: 'walk in',
      customerType: 'retail',
      firstName: '',
      lastName: '',
      orderType: 'surf',
      approvedBy: '',
      phone: 'na',
      email: 'na',
      address: 'na',
      weight: 0,
      heightFt: 0,
      heightIn: 0,
      level: '',
      style: '',
      lengthFt: 0,
      lengthIn:0,
      width: 0,
      thickness: 0,
      volume: 0,
      towWeight: 0,
      tail: '',
      blank: '',
      construction: '',
      boardColor: '',
      finSetup: '',
      boxType: '',
      boxColor: '',
      logo:'',
      inserts: '',
      rearStrap: '',
      strapWidth: '',
      stance: '',
      leash: 'Deck',
      pads: '',
      waveLocation: '',
      foilType: '',
      finFromTail: '',
      boxLocation: '',
      rearInsertsFromTail: '',
      handle: 'Deck',
      notes: '',
      invoiceNum: '',
      dueDate: '',
      boardWeight: '',
      finish: '',
      image: '',
      priority: ''
    },

    transformValues: (values) => ({
      height: `${values.heightFt}ft ${values.heightIn}`,
      length: `${values.lengthFt}ft ${values.lengthIn}`
    }),

    validate: (values) => {
      if (active === 0) {
        return {
          firstName: values.firstName.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          lastName: values.lastName.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          approvedBy: ((values.customerType === 'team' || values.customerType === 'gratis') && values.approvedBy === '') ? 'Must select approval for team and gratis riders': null,
        }
      }
      if(active === 1) {

        const commonValidationValues = {
          volume: values.volume <= 0 ? 'Enter valid volume' : null,
          construction: values.construction === '' ? 'Construction must be picked' : null,
          waveLocation: values.waveLocation === '' ? 'Location must be picked' : null,
          pads: values.pads === '' ? 'Pick pads' : null,
          boxType: values.boxType === '' ? 'Box type must be picked' : null,
          dueDate: values.dueDate === '' ? 'Due date must be entered': null
        }

        const surfValidationValues = {
          tail: values.tail === '' ? 'Tail must be picked' : null,
          width: values.width <= 0 ? 'Enter valid width' : null,
          finSetup: values.finSetup === '' ? 'Fin setup must be picked' : null,
          boxColor: values.boxColor === '' ? 'Box color must be picked' : null,
          leash: values.leash === '' ? 'Pick leash' : null,
        }

        const windsurfValidationValues = {
          tail: values.tail === '' ? 'Tail must be picked' : null,
          finSetup: values.finSetup === '' ? 'Fin setup must be picked' : null,
        }

        const foilValidationValues = {
          leash: values.leash === '' ? 'Pick leash' : null,
          boxLocation: values.boxLocation === '' ? 'Must be entered' : null,
          rearInsertsFromTail: values.rearInsertsFromTail === '' ? 'Pick one' : null,
        }

        const towValidationValues = {
          leash: values.leash === '' ? 'Pick leash' : null,
          airbrush: values.airbrush === '' ? 'Pick one' : null
        }


        if (values.orderType === 'surf') {
          return ({
            ...commonValidationValues, ...surfValidationValues
          })
        } else if (values.orderType === 'windsurf') {
          return({
            ...commonValidationValues, ...windsurfValidationValues
          })
        } else if (values.orderType === 'foil') {
          return({
            ...commonValidationValues, ...foilValidationValues
          })
        } else {
          return({
            ...commonValidationValues, ...towValidationValues
          })
        }
      }
      return {};
    },
  });

  // goes to next step in form, if it's validated
  const nextStep = () => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 4 ? current + 1 : current;
    });
    setBoardType(form.values.orderType)
  };

  //posts order to database
  const storeOrder = () => {
    let customerId = customer._id;
    let customerName = customer.firstName + ' ' + customer.lastName;
    Axios.post('/orders', {...form.values, customerId, customerName})
    .then((result) => setOrderNum(result.data.orderId))
    .catch(err => console.log(err));
  }

  // finishes order
  const finishOrder = () => {
    if (!form.validate().hasErrors) {
      storeOrder();
    }

    //change the active to print screen
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  }

  // goes to previous step in form
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // cannot navigate to next step, using stepper, if not validated
  const changeToActive = (val) => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return val < current ? val : current;
      }
      return val;
    })
    setBoardType(form.values.orderType);
  };

  const handleGeneratePdf = () => {
    window.print();
  };

  const saveEditedOrder = () => {
    //Post values to store order (handle logic in backend)
    setOrderNum(values.orderId);
    const {orderId} = values;
    const {_id} = values;
    if (!form.validate().hasErrors) {
      Axios.post('/orders', {...form.values, orderId, _id})
    }
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });
  }


  return (
    <div className='cc-order'>
      <a href={`/`}>Home</a>
      <Container mt='10px'>
          <h1>Current Customer Order</h1>
          <Stepper color="dark" size="sm" active={active} breapoint='sm' onStepClick={(val) => changeToActive(val)}>
            <Stepper.Step description='Intro'>
              <Radio.Group
                name='intro'
                defaultValue={['walk in']}
                label='INTRO'
                withAsterisk
                {...form.getInputProps('intro')}
              >
                <Radio size='sm' value='walk in' label='walk in'/>
                <Radio size='sm' value='phone' label='phone'/>
                <Radio size='sm' value='email' label='email'/>
                <Radio size='sm' value='website' label='website'/>
              </Radio.Group>
              <Group>
                <TextInput
                  withAsterisk
                  label="First Name"
                  {...form.getInputProps('firstName')}
                />
                <TextInput
                  withAsterisk
                  label="Last Name"
                  {...form.getInputProps('lastName')}
                />
              </Group>
              <Radio.Group
                name='order type'
                label='Order Type'
                withAsterisk
                onChange={() => console.log('change')}
                {...form.getInputProps('orderType')}
              >
                <Radio size='sm' value='surf' label='Surf'/>
                <Radio size='sm' value='windsurf' label='Windsurf'/>
                <Radio size='sm' value='foil' label='Foil'/>
                <Radio size='sm' value='tow' label='Tow'/>
              </Radio.Group>
              <Radio.Group
                name='customer type'
                defaultValue={['retail']}
                label='Customer Type'
                withAsterisk
                {...form.getInputProps('customerType')}
              >
                <Radio size='sm' value='retail' label='Retail'/>
                <Radio size='sm' value='team' label='Team'/>
                {/* <Radio size='sm' value='gratis' label='Gratis'/> */}
                <Radio size='sm' value='wholesale' label='Wholesale'/>
              </Radio.Group>

              <Select
                label="Approved By (only for team orders)"
                allowDeselect
                placeholder="Approved by"
                data={[
                  { value: 'Lalo', label: 'Lalo' },
                  { value: 'Francisco', label: 'Francisco' },
                  { value: 'Pascal', label: 'Pascal' },
                  { value: 'Keith', label: 'Keith' },
                  { value: 'Logan', label: 'Logan'},
                ]}
                {...form.getInputProps('approvedBy')}
              />
            </Stepper.Step>

            <Stepper.Step description="Board Specs">
              {boardType === "surf" ? (<SurfSpecs form={form}/>) 
              : boardType === "windsurf" ? (<WindsurfSpecs form={form}/>) 
              : boardType === "foil"  ? (<FoilSpecs form={form}/>) 
              : boardType === "tow" ? (<TowSpecs form={form}/>): null}
            </Stepper.Step>

          <Stepper.Completed>
            {boardType === "surf" ? 
            (<PdfSurf values={form.values} orderNum={orderNum} customer={customer}/>) 
            : boardType === "windsurf" ? (<PdfWS values={form.values} orderNum={orderNum} customer={customer}/>) 
            : boardType === "foil" ? (<PdfFoil values={form.values} orderNum={orderNum} customer={customer}/>) 
            : (<PdfTow values={form.values} orderNum={orderNum} customer={customer}/>)
            }
          </Stepper.Completed>
          </Stepper>
          <Group position="right" mt="xl">
            {(active !== 0 && active < 1) && (
              <Button color="dark" variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active < 1 && <Button color="dark" onClick={nextStep}>Next step</Button>}
            {active === 1 && !values && <Button color="dark"  onClick={finishOrder}>Finish Order</Button>}
            {active === 1 && values && <Button color="dark" onClick={saveEditedOrder}>Save</Button>}
            {active > 1 && <Button color="dark" onClick={handleGeneratePdf}>Print</Button>}
          </Group>
      </Container>
    </div>
  )
};