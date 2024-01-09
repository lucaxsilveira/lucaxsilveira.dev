'use client';

import React, { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as Toast from '@radix-ui/react-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, X } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { Input } from '@/components/Input';

import { initZodTranslations } from '@/dictionaries/zod';
import { sendEmail } from '@/services/send-email';

import { getDictionary } from '@/utils/dictionaries';
import { LocaleNames } from '@/utils/language';

import { EmailSchemaValidation, TEmail } from '@/validations/email.schema';

interface IContactForm {
  lang: LocaleNames;
}

const ContactForm: React.FC<IContactForm> = ({ lang }) => {
  const queryClient = useQueryClient();

  initZodTranslations(lang);

  const {
    error,
    isSuccess,
    isPending,
    mutate,
    reset: resetRequest,
  } = useMutation({
    mutationFn: (data: TEmail) => {
      return sendEmail(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email'] });
      setTimeout(() => {
        resetRequest();
        resetForm();
      }, 2500);
    },
  });

  const onSubmit: SubmitHandler<TEmail> = (data): void => {
    mutate(data);
  };

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors: formErrors },
  } = useForm<TEmail>({
    resolver: zodResolver(EmailSchemaValidation),
  });

  const dict = useMemo(() => getDictionary(lang), [lang]);

  return (
    <div className="flex w-full flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Input.Root>
          <Input.Label text={dict.contact.form.name.label} />
          <Input.Group>
            <Input.Input
              placeholder={dict.contact.form.name.placeholder}
              type="text"
              data-testid="name"
              {...register('name')}
              disabled={isPending}
            />
          </Input.Group>
          <Input.Message error>{formErrors.name?.message}</Input.Message>
        </Input.Root>

        <Input.Root>
          <Input.Label text={dict.contact.form.email.label} />
          <Input.Group>
            <Input.Input
              placeholder={dict.contact.form.email.placeholder}
              type="text"
              data-testid="email"
              {...register('email')}
              disabled={isPending}
            />
          </Input.Group>
          <Input.Message error>{formErrors.email?.message}</Input.Message>
        </Input.Root>

        <Input.Root>
          <Input.Label text={dict.contact.form.message.label} />
          <Input.Group>
            <Input.Textarea
              placeholder={dict.contact.form.message.placeholder}
              data-testid="message"
              {...register('message')}
              disabled={isPending}
            />
          </Input.Group>
          <Input.Message error>{formErrors.message?.message}</Input.Message>
        </Input.Root>

        <Button
          type="submit"
          color="white"
          disabled={isPending}
          loading={isPending}
          success={isSuccess}
        >
          {!isSuccess && !isPending && dict.contact.form.button.iddle}
          {isSuccess && dict.contact.form.button.success}
          {isPending && dict.contact.form.button.loading}
        </Button>
      </form>
      {error && <p className="text-pink-400">{error.message}</p>}

      <Toast.Root
        className="ToastRoot shadow-xs relative flex flex-col gap-3 rounded-lg border border-gray-900 bg-gray-800 p-4 tracking-wide text-gray-300 shadow-black"
        open={isSuccess}
      >
        <Toast.Title className="flex items-center text-sm">
          <CheckCircle size={18} className="mr-3 text-green-500" />
          {dict.contact.form.button.success}
        </Toast.Title>
        <Toast.Close className="absolute right-2 top-2">
          <X size={14} />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-[0] right-[calc(50%-152px)] z-[2147483647] m-0 flex w-[390px] max-w-full list-none flex-col gap-2 p-7 outline-none" />
    </div>
  );
};

export default ContactForm;
