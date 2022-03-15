import {
  Button,
  CheckboxIcon,
  Group,
  Paper,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import {
  AlertFillIcon,
  DeviceMobileIcon,
  MailIcon,
  PersonIcon,
} from '@primer/octicons-react';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import {
  addContactToLocalStorage,
  editContactLocalStorage,
} from '../../Context/actions';
import { useAppDispatch } from '../../Context/store';

const NewContactForm = (props) => {
  const { formtype, setmodalopen: setModalOpen, editcontact } = props;

  const typeContactForm = formtype === 'edit' ? 'edit' : 'new';
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      email: editcontact?.email ?? '',
      name: editcontact?.name ?? '',
      phone: editcontact?.phone ?? '',
      favorite: editcontact?.favorite ?? false,
    },

    validationRules: {
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      name: (value) => value.length >= 3,
      phone: (value) => value.length >= 6 && /^\d+$/.test(value),
    },
  });

  useEffect(() => {
    setFormError(null);
  }, []);

  const handleSubmit = (contact) => {
    setLoading(true);
    if (typeContactForm === 'edit') {
      editContactLocalStorage(dispatch, contact);
    } else {
      addContactToLocalStorage(dispatch, contact);
    }
    setLoading(false);
    setModalOpen(false);
  };

  return (
    <Paper radius='md' padding='xs'>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group direction='column' grow>
          <TextInput
            required
            label='Name'
            icon={<PersonIcon />}
            placeholder='Your Fullname'
            value={form.values.name}
            onChange={(event) => {
              form.setFieldValue('name', event.currentTarget.value);
            }}
            error={form.errors.name && 'Must have at least 3 characters'}
          />

          <TextInput
            required
            label='Email'
            icon={<MailIcon />}
            placeholder='contact@example.com'
            value={form.values.email}
            onChange={(event) => {
              form.setFieldValue('email', event.currentTarget.value);
            }}
            error={form.errors.email && 'Invalid email'}
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
            error={form.errors.phone && 'Phone must have 6+ and only numbers'}
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
            color={formtype === 'edit' ? 'blue' : 'teal'}
            disabled={!form.errors}
            loading={isLoading}
            leftIcon={<CheckboxIcon />}
          >
            {formtype === 'edit' ? 'Update contact' : 'Add contact'}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

NewContactForm.propTypes = {
  formtype: propTypes.string,
  setmodalopen: propTypes.func.isRequired,
  editcontact: propTypes.shape({
    name: propTypes.string,
    email: propTypes.string,
    phone: propTypes.string,
    favorite: propTypes.bool,
  }),
};

NewContactForm.defaultProps = {
  formtype: 'new',
  editcontact: {
    name: '',
    email: '',
    phone: '',
    favorite: false,
  },
};

export default NewContactForm;
