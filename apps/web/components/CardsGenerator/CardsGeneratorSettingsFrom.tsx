"use client";

import { Input } from "@repo/ui/input";
import type React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useI18n } from "../../locales/client";
import { Button } from "@repo/ui/button";
import { useCardsGeneratorContext, type Settings } from './CardsGeneratorProvider';

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="web-flex web-gap-3 web-items-end">
      <label className="web-text-indigo-100">
        {t("form.cardsGenerationSettings.width")}
        <Input
          {...register("width", {
            required: t("form.errors.required", {
              name: t("form.cardsGenerationSettings.width"),
            }),
          })}
          placeholder={t("form.cardsGenerationSettings.width")}
        />
        { errors.width && errors.width.message }
      </label>
      <label className="web-text-indigo-100">
        {t("form.cardsGenerationSettings.height")}
        <Input
          {...register("height", {
            required: t("form.errors.required", {
              name: t("form.cardsGenerationSettings.height"),
            }),
          })}
          placeholder={t("form.cardsGenerationSettings.height")}
        />
        { errors.height && errors.height.message }
      </label>
      <label className="web-text-indigo-100">
        {t("form.cardsGenerationSettings.gap")}
        <Input
          {...register("gap", {
            required: t("form.errors.required", {
              name: t("form.cardsGenerationSettings.gap"),
            }),
          })}
          placeholder={t("form.cardsGenerationSettings.gap")}
        />
        { errors.gap && errors.gap.message }
      </label>
      <Button type="submit">{t("form.buttons.apply")}</Button>
    </form>
  );
}


