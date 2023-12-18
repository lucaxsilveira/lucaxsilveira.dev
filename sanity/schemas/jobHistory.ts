import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'jobHistory',
  title: 'Job History',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),
    defineField({
      name: 'position',
      title: 'Job Position',
      type: 'string',
    }),
    defineField({
      name: 'dateFrom',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'dateTo',
      title: 'End Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
});
