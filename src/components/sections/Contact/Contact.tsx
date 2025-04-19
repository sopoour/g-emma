import SectionContainer from '@app/components/SectionContainer/SectionContainer';
import { FC, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Checkbox, Group, Textarea, TextInput, Text, Flex } from '@mantine/core';
import styles from './Contact.module.scss';
import LinkContainer from '@app/components/LinkContainer/LinkContainer';
import { IconLink } from '@app/types';
import EmailCopy from '@app/components/EmailCopy/EmailCopy';

const links: IconLink[] = [
  { type: 'bandcamp' },
  { type: 'instagram' },
  { type: 'youtube' },
  { type: 'tiktok' },
  { type: 'spotify' },
  { type: 'appleMusic' },
];

const Contact: FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
      gdpr: false,
    },

    validate: {
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      message: (value) =>
        value.trim().length > 10 ? null : 'Message must be at least 10 characters',
      gdpr: (value) => (value ? null : 'You must agree to the GDPR terms'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <SectionContainer id="contact" className={styles.contactSection}>
      <form onSubmit={form.onSubmit(handleSubmit)} className={styles.contactContainer}>
        <TextInput
          label="Name"
          placeholder="Your name"
          {...form.getInputProps('name')}
          withAsterisk
          size="md"
          radius="md"
          key={form.key('name')}
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...form.getInputProps('email')}
          withAsterisk
          size="md"
          radius="md"
          key={form.key('email')}
        />
        <Textarea
          label="Message"
          placeholder="Write your message..."
          minRows={4}
          autosize
          {...form.getInputProps('message')}
          withAsterisk
          size="md"
          radius="md"
        />
        <Checkbox
          style={{ maxWidth: '400px' }}
          label="I agree that this data may be stored and processed for the purpose of contacting me. I am aware that I can withdraw my consent at any time."
          {...form.getInputProps('gdpr', { type: 'checkbox' })}
        />
        <Group mt="md">
          <Button type="submit" loading={status === 'sending'}>
            Send
          </Button>
        </Group>

        {status === 'sent' && <Text c="g-dark.5">Message sent successfully!</Text>}
        {status === 'error' && <Text c="red">Something went wrong. Please try again.</Text>}
      </form>
      <Flex gap={'32px'} direction={'column'} align={{ base: 'center', sm: 'flex-start' }}>
        <Text size="24px" ff={'Lexend'} c={'g-dark.9'} fw={700}>
          Or reach us at
        </Text>
        <EmailCopy email="contact@g-emma.com" label="Email" />
        <EmailCopy email="booking@g-emma.com" label="Booking" />
        <LinkContainer className={styles.contactLinkContainer} iconLinks={links} hasToolTip />
      </Flex>
    </SectionContainer>
  );
};

export default Contact;
