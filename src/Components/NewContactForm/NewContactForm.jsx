/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Anchor,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  ThemeIcon,
} from '@mantine/core';
import { useForm, useToggle } from '@mantine/hooks';
import { AlertFillIcon, CheckIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'react';

const NewContactForm = (props) => {
  const { formtype, setmodalopen: setModalOpen } = props;
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      phone: '',
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      name: (val) => val.length >= 3,
      phone: (val) => val.length === 10 || val.length === 7,
    },
  });

  useEffect(() => {
    setFormError(null);
  }, []);

  const handleSubmit = () => {
    setLoading(true);
  };

  return (
    <>
      {/* <LoadingOverlay overlayOpacity={0.65} visible={isLoading} /> */}
      <Paper radius='md' padding='xs' {...props}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group direction='column' grow>
            <TextInput
              required
              label='Name'
              placeholder='Your fullname'
              value={form.values.name}
              onChange={(event) => {
                form.setFieldValue('name', event.currentTarget.value);
              }}
            />

            <TextInput
              required
              label='Email'
              placeholder='myemail@example.com'
              value={form.values.email}
              onChange={(event) => {
                form.setFieldValue('email', event.currentTarget.value);
              }}
              error={form.errors.email}
            />
            <TextInput
              required
              label='Phone'
              placeholder='3002342345'
              value={form.values.email}
              onChange={(event) => {
                form.setFieldValue('email', event.currentTarget.value);
              }}
              error={form.errors.phone}
            />

            {type === 'register' && (
              <Checkbox
                label='I accept the terms of service'
                checked={form.values.terms}
                onChange={(event) => {
                  form.setFieldValue('terms', event.currentTarget.checked);
                }}
              />
            )}
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

          <Group position='apart' mt='xl'>
            <Anchor
              component='button'
              type='button'
              color='gray'
              onClick={() => toggle()}
              size='sm'
              style={{ textDecoration: 'none' }}
            >
              {type === 'register' ? (
                <Group noWrap>
                  <Text size='sm' style={{ marginRight: -10 }}>
                    Already have an account?
                  </Text>
                  <Text size='sm' color='indigo' weight='bold'>
                    Log in.
                  </Text>
                </Group>
              ) : (
                <Group position='left' noWrap>
                  <Text size='sm' style={{ marginRight: -10 }}>
                    {`Don't have an account?`}
                  </Text>
                  <Text size='sm' color='indigo' weight='bold'>
                    Register.
                  </Text>
                </Group>
              )}
            </Anchor>
            <Button
              type='submit'
              disabled={!form.values.terms}
              loading={isLoading}
              leftIcon={<EnterIcon />}
            >
              {type === 'register' ? 'Register' : 'Log in'}
            </Button>
          </Group>
        </form>
      </Paper>
    </>
  );
};

export default NewContactForm;
