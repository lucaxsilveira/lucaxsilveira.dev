'use client';

import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { sendEmail } from '@/services/send-email';
import { EmailSchemaValidation, TEmail } from '@/validations/email.schema';

const ContactForm: React.FC = () => {
  const queryClient = useQueryClient();

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
      alert('email enviado');
      resetForm();
      resetRequest();
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

  return (
    <div className="flex w-full flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <Input.Root>
          <Input.Label text="Nome" />
          <Input.Group>
            <Input.Input
              placeholder="Harry"
              type="text"
              data-testid="name"
              {...register('name')}
              disabled={isPending}
            />
          </Input.Group>
          <Input.Message error>{formErrors.name?.message}</Input.Message>
        </Input.Root>
        <Input.Root>
          <Input.Label text="E-mail" />
          <Input.Group>
            <Input.Input
              placeholder="potter@hogwarts.com"
              type="text"
              data-testid="email"
              {...register('email')}
              disabled={isPending}
            />
          </Input.Group>
          <Input.Message error>{formErrors.email?.message}</Input.Message>
        </Input.Root>
        <Input.Root>
          <Input.Label text="Mensagem" />
          <Input.Group>
            <Input.Textarea
              placeholder="Qual das relíquias da morte você gostaria de possuir?"
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
          {!isSuccess && !isPending && 'Enviar e-mail'}
          {isSuccess && 'E-mail enviado!'}
          {isPending && 'Enviando e-mail'}
        </Button>
      </form>
      {error && <p className="text-pink-400">{error.message}</p>}
    </div>
  );
};

export default ContactForm;
