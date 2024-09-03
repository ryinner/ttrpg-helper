interface DNDSpell {
  readonly name: string;
  readonly description: string;
  readonly level: number;
}

const SPELLS = Object.freeze({
  thaumaturgy: {
    name: 'Чудотворство',
    description: '',
    level: 0,
  },
}) satisfies Readonly<Record<string, DNDSpell>>;

export { SPELLS };
