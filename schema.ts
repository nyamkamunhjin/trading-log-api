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
    },
    ui: {
      listView: {
        initialColumns: ['name', 'posts'],
      },
    },
  }),
};
