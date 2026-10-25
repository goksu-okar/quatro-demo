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
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
// import { OrderPDF } from '../components/OrderPDF.jsx';
import SurfSpecs from './boardSpecs/SurfSpecs.jsx';
import FoilSpecs from './boardSpecs/FoilSpecs.jsx';
import WindsurfSpecs from './boardSpecs/WindsurfSpecs.jsx';
import TowSpecs from './boardSpecs/TowSpecs.jsx';
import { Axios } from '../utils/helpers.js';


export default function NewCustomerOrder({ customer, newCustomer, setNewCustomer }) {
  const [active, setActive] = useState(0);
  const [boardType, setBoardType] = useState('Surf');
  const [orderNum, setOrderNum] = useState('');

  useEffect(() => {
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
      leash: '', //'Deck'
      pads: '',
      airbrush:'',
      waveLocation: '',
      finFromTail: '',
      boxLocation: '',
      rearInsertsFromTail: '',
      handle: 'Deck',
      foilType: '',
      notes: '',
      invoiceNum: '',
      dueDate: '',
      boardWeight: '',
      finish: '',
      image: '',
      priority: ''
    },

    validate: (values) => {
      if (active === 0) {
        return {
          firstName: values.firstName.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          lastName: values.lastName.trim().length < 2 ? 'Name must include at least 2 characters' : null,
          approvedBy: ((values.customerType === 'team' || values.customerType === 'gratis') && values.approvedBy === '') ? 'Must select approval for team and gratis riders': null,
        }
      }
      if (active === 1) {
        return {
          email: (/^\S+@\S+$/.test(values.email) || values.phone.trim().length > 8 || values.address.trim().length > 8) ? null : 'must fill at least one field',
          // phone: (values.phone.trim().length < 8 && /^\S+@\S+$/.test(values.email) && ) ? 'must fill at least one field' : null,
        }
      }
      if(active === 2) {
        return ({
          weight: values.weight < 30 ? 'Enter valid weight' : null,
          heightFt: values.heightFt <= 0 ? 'Enter valid height' : null,
          heightIn: values.heightIn < 0 ? 'Enter valid height' : null,
          level: values.level === '' ? 'Level must be picked' : null,
        })
      }
      if(active === 3) {

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
          inserts: values.inserts === '' ? 'Inserts must be picked' : null,
        }

        const foilValidationValues = {
          leash: values.leash === '' ? 'Pick leash' : null,
          boxLocation: values.boxLocation === '' ? 'Must be entered' : null,
          rearInsertsFromTail: values.rearInsertsFromTail === '' ? 'Pick one' : null,
        }

        const towValidationValues = {
          leash: values.leash === '' ? 'Pick leash' : null,
          airbrush: values.airbrush === '' ? 'Select one' : null,
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

  // form.setFieldValue('firstName', customer.firstName);
  // form.setFieldValue('lastName', customer.lastName);

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

  // save rider info to database
    const toBoardSpecs = () => {
      setActive((current) => {
        if (form.validate().hasErrors) {
          return current;
        }
        return current < 4 ? current + 1 : current;
      });
    }

  //post values to database
  //WIP > CHANGED ALL FORM.VALUES TO VALUES
  const storeNewCustomerOrder = () => {

    Axios.post('/customers', form.values)
    .then((result) => {
      console.log('result: ', result)
      setNewCustomer(result.data);
      let customerId = result.data._id;
      let customerName = result.data.firstName + ' ' + result.data.lastName;
      Axios.post('/orders', { ...form.values, customerId, customerName })
        .then((result) => {
          setOrderNum(result.data.orderId)
        })
    })
    .catch(err => console.log(err));
  }

  // finishes order and post to database if the form is complete
  const finishOrder = () => {
    if (!form.validate().hasErrors) {
      if (orderNum === '' || orderNum === undefined) {
        storeNewCustomerOrder();
      }
      // else update order!
      setActive((current) => {
        console.log('current', current)
        if (form.validate().hasErrors) {
          return current;
        }
        return current < 4 ? current + 1 : current;
      });
    }
  }

  // goes to previous step in form
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  // cannot navigate to next step, using stepper, if not validated
  const changeToActive = (val) => {
    setActive((current) => {
      if (form.validate().hasErrors) {
        return val < current ? val : current;
      }
      return current;
    })
    setBoardType(form.values.orderType);
  };

  const handleGeneratePdf = () => {
    window.print();
  };


  return (
    <div className='new-customer'>
      <div className='nc-inner-cont'>
        <a id='nc-h-btn' href={`/`}>Home</a>
        <Container mt='10px'>
            <h1>New Customer Order</h1>
            <Stepper color="dark" size="sm" active={active} breakpoint='sm' onStepClick={(val) => changeToActive(val)}>
              <Stepper.Step description='Intro'>
                <Radio.Group
                  name='intro'
                  defaultValue={['walk in']}
                  label='INTRO'
                  withAsterisk
                  {...form.getInputProps('intro')}
                >
                  <Group gap="xs">
                    <Radio size='sm' value='walk in' label='walk in'/>
                    <Radio size='sm' value='phone' label='phone'/>
                    <Radio size='sm' value='email' label='email'/>
                    <Radio size='sm' value='website' label='website'/>
                  </Group>
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
                  <Group gap="xs">
                    <Radio size='sm' value='surf' label='Surf'/>
                    <Radio size='sm' value='windsurf' label='Windsurf'/>
                    <Radio size='sm' value='foil' label='Foil'/>
                    <Radio size='sm' value='tow' label='Tow'/>
                  </Group>
                </Radio.Group>
                <Radio.Group
                  name='customer type'
                  defaultValue={['retail']}
                  label='Customer Type'
                  withAsterisk
                  {...form.getInputProps('customerType')}
                >
                  <Group gap="xs">
                    <Radio size='sm' value='retail' label='Retail'/>
                    <Radio size='sm' value='team' label='Team'/>
                    {/* <Radio size='sm' value='gratis' label='Gratis'/> */}
                    <Radio size='sm' value='wholesale' label='Wholesale'/>
                  </Group>
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

              <Stepper.Step description='contact info'>
                <Text>Fill in at least one:</Text>
                <TextInput
                  label='Email:'
                  placeholder='customer@email.com'
                  {...form.getInputProps('email')}
                />
                <TextInput
                  label='Phone Number:'
                  placeholder='808-888-8888'
                  {...form.getInputProps('phone')}
                />
                <Textarea
                  label='Address:'
                  {...form.getInputProps('address')}
                />
              </Stepper.Step>

              <Stepper.Step description="rider info">
                <NumberInput
                  label="Weight:"
                  placeholder="weight in lb"
                  {...form.getInputProps('weight')}
                />
                <Group>
                  <TextInput
                    label="Ft:"
                    placeholder="ft"
                    {...form.getInputProps('heightFt')}
                  />
                  <NumberInput
                    label="Inch:"
                    placeholder="in"
                    {...form.getInputProps('heightIn')}
                  />
                </Group>
                <Select
                  label="Level"
                  allowDeselect
                  placeholder="pick one"
                  data={[
                    { value: 'Entry', label: 'Entry' },
                    { value: 'Intermediate', label: 'Intermediate' },
                    { value: 'Advanced', label: 'Advanced' },
                    { value: 'Pro', label: 'Pro' },
                  ]}
                  {...form.getInputProps('level')}
                />
              </Stepper.Step>

              <Stepper.Step description="Board Specs">
                {boardType === "surf" ? (<SurfSpecs form={form}/>) 
                : boardType === "windsurf" ? (<WindsurfSpecs form={form}/>) 
                : boardType === "foil" ? (<FoilSpecs form={form}/>) 
                : (<TowSpecs form={form}/>)
                }
              </Stepper.Step>

            <Stepper.Completed>
              {boardType === "surf" ? (
                  <div className='pdf-output'>
                    <PdfSurf 
                    values={form.values} 
                    orderNum={orderNum} 
                    customer={newCustomer}
                  />
                  </div>
                ) : boardType === "windsurf" ?
                (<div className='pdf-output'>
                  <PdfWS 
                  values={form.values} 
                  orderNum={orderNum} 
                  customer={newCustomer}
                />
                </div>) : boardType === "foil" ?
                (<div className='pdf-output'>
                  <PdfFoil 
                  values={form.values} 
                  orderNum={orderNum} 
                  customer={newCustomer}
                />
                </div>) :
                (<div className='pdf-output'>
                  <PdfTow 
                  values={form.values} 
                  orderNum={orderNum} 
                  customer={newCustomer}
                />
                </div>) 
              }
            </Stepper.Completed>
            </Stepper>
            <Group position="right" mt="xl">
              {(active !== 0 && active < 3) && (
                <Button color="dark" variant="default" onClick={prevStep}>
                  Back
                </Button>
              )}
              {active < 3 && <Button color="dark" onClick={nextStep}>Next step</Button>}
              {active === 3 && <Button color="dark" onClick={finishOrder}>Finish Order</Button>}
              {active > 3 && <Button color="dark" onClick={handleGeneratePdf}>Print</Button>}
            </Group>
        </Container>
      </div>
    </div>
  )
};