import {Account} from './types';

export const ownAccountData: Account[] = [
  {
    name: 'Account1',
    accountNumber: '301090',
  },
  {
    name: 'Account2',
    accountNumber: '3018998',
  },
  {
    name: 'Account3',
    accountNumber: '30187987',
  },
  {
    name: 'Account4',
    accountNumber: '301023490',
  },
  {
    name: 'Account5',
    accountNumber: '3018928911078',
  },
  {
    name: 'Account6',
    accountNumber: '301872341987',
  },
  {
    name: 'Account7',
    accountNumber: '301023467890',
  },
  {
    name: 'Account8',
    accountNumber: '30183249678798',
  },
  {
    name: 'Account9',
    accountNumber: '30187876787',
  },
];

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
