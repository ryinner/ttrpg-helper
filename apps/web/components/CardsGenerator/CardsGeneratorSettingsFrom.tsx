"use client";

import { Input } from "@repo/ui/input";
import type React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useI18n } from "../../locales/client";
import { Button } from '@repo/ui/button';

export default function CardsGeneratorSettingsFrom(): React.ReactNode {
  const t = useI18n();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      width: 16,
      height: 32,
      gap: 10,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    e?.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='web-flex web-gap-3'>
      <Input
        {...register("width", {
          required: t("form.errors.required", {
            name: "ширина мм",
          }),
        })}
      />
      <Input
        {...register("height", {
          required: t("form.errors.required", {
            name: "длина мм",
          }),
        })}
      />
      <Input
        {...register("gap", {
          required: t("form.errors.required", {
            name: "отступ мм",
          }),
        })}
      />
      <Button>
        {t('form.buttons.apply')}
      </Button>
    </form>
  );
}

interface Inputs {
  width: number;
  height: number;
  gap: number;
}
