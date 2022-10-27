export type Provider = {
  provider: string;
  currency: string;
  amount: number;
};

export const providerData: Provider[] = [
  {
    provider: 'Provider1',
    currency: 'EUR',
    amount: 3245,
  },
  {
    provider: 'Provider2',
    currency: 'USD',
    amount: 902,
  },
  {
    provider: 'Provider3',
    currency: 'USD',
    amount: 12,
  },
];
