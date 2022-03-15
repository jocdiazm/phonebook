/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Button,
  CheckboxIcon,
  Group,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useForm, useToggle } from '@mantine/hooks';
import {
  AlertFillIcon,
  CheckIcon,
  DeviceMobileIcon,
} from '@primer/octicons-react';
import { useEffect, useState } from 'react';
import { addContactToLocalStorage } from '../../Context/actions';
import { useAppDispatch } from '../../Context/store';

const NewContactForm = (props) => {
  const { formtype, setmodalopen: setModalOpen, editcontact } = props;
  console.log(
    '🚀 ~ file: NewContactForm.jsx ~ line 25 ~ NewContactForm ~ editcontact',
    editcontact,
  );
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      email: editcontact?.email ?? '',
      name: editcontact?.name ?? '',
      phone: editcontact?.phone ?? '',
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      name: (val) => val.length >= 3,
      phone: (val) => val.length >= 6,
    },
  });

  useEffect(() => {
    setFormError(null);
  }, []);

  const handleSubmit = (contact) => {
    addContactToLocalStorage(dispatch, contact);
  };

  return (
    <Paper radius='md' padding='xs' {...props}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group direction='column' grow>
          <TextInput
            required
            label='Name'
            placeholder='New contact fullname'
            value={form.values.name}
            onChange={(event) => {
              form.setFieldValue('name', event.currentTarget.value);
            }}
          />

          <TextInput
            required
            label='Email'
            placeholder='contact@example.com'
            value={form.values.email}
            onChange={(event) => {
              form.setFieldValue('email', event.currentTarget.value);
            }}
            error={form.errors.email}
          />
          <TextInput
            required
            label='Phone'
            icon={<DeviceMobileIcon />}
            placeholder='Phone number 6 or 10 digit'
            value={form.values.phone}
            onChange={(event) => {
              form.setFieldValue('phone', event.currentTarget.value);
            }}
            error={form.errors.phone}
          />

          {formError ? (
            <Group position='left' noWrap>
              <Text color='red' size='sm' weight={500}>
                <ThemeIcon
                  radius='lg'
                  size={16}
                  color='red'
                  style={{ marginRight: 10 }}
                >
                  <AlertFillIcon size={10} />
                </ThemeIcon>
                {formError}{' '}
              </Text>
            </Group>
          ) : null}
        </Group>

        <Group position='center' mt='xl'>
          <Button
            type='submit'
            disabled={!form.errors}
            loading={isLoading}
            leftIcon={<CheckboxIcon />}
          >
            Add contact
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default NewContactForm;
