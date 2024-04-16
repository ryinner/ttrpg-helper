"use client";

import { Input } from "@repo/ui/input";
import type React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useI18n } from "../../locales/client";
import { Button } from "@repo/ui/button";
import {
  useCardsGeneratorContext,
  type Settings,
} from "./CardsGeneratorProvider";

export default function CardsGeneratorSettingsFrom(): React.ReactNode {
  const t = useI18n();
  const { settings, setSettings } = useCardsGeneratorContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Settings>({
    defaultValues: settings,
  });

  const onSubmit: SubmitHandler<Settings> = (data, e) => {
    e?.preventDefault();
    setSettings(() => data);
  };

  const fields = Object.keys(settings) as (keyof typeof settings)[];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="web-flex web-gap-3 web-items-end"
    >
      {fields.map((f) => (
        <label className="web-text-indigo-100" key={f}>
          {t(`form.cardsGenerationSettings.${f}`)}
          <Input
            {...register(f, {
              required: t("form.errors.required", {
                name: t(`form.cardsGenerationSettings.${f}`),
              }),
            })}
            placeholder={t(`form.cardsGenerationSettings.${f}`)}
          />
          {errors[f] && errors[f]?.message}
        </label>
      ))}
      <Button type="submit">{t("form.buttons.apply")}</Button>
    </form>
  );
}
