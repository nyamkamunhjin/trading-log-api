/*
Welcome to the schema! The schema is the heart of Keystone.

Here we define our 'lists', which will then be used both for the GraphQL
API definition, our database tables, and our Admin UI layout.

Some quick definitions to help out:
A list: A definition of a collection of fields with a name. For the starter
  we have `User`, `Post`, and `Tag` lists.
A field: The individual bits of data on your list, each with its own type.
  you can see some of the lists in what we use below.

*/

import { list } from '@keystone-6/core';

import {
  text,
  relationship,
  password,
  timestamp,
  select,
  float,
} from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';

import { Lists } from '.keystone/types';

export const lists: Lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
        isFilterable: true,
      }),
      password: password({ validation: { isRequired: true } }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
      updatedAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
    // ui: {
    //   listView: {
    //     initialColumns: ['name'],
    //   },
    // },
  }),
  Trade: list({
    fields: {
      pair: text({ validation: { isRequired: true }, isFilterable: true }),
      entry: float({ validation: { isRequired: true } }),
      type: select({
        type: 'enum',
        options: ['long', 'short'],
        defaultValue: 'long',
      }),
      stopLoss: float({ validation: { isRequired: true } }),
      takeProfit: float({ validation: { isRequired: true } }),
      imageUrl: text({ validation: { isRequired: true } }),
      tradingViewUrl: text({ validation: { isRequired: true } }),
      user: relationship({ ref: 'User', many: true }),
      trade: relationship({ ref: 'TradingStrategy', many: false }),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
      updatedAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),
  TradingStrategy: list({
    fields: {
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
      updatedAt: timestamp({ defaultValue: { kind: 'now' } }),
      user: relationship({ ref: 'User', many: true }),
      trade: relationship({ ref: 'Trade', many: true }),
    },
  }),
};
