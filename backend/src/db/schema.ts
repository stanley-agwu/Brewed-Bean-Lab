import { relations } from 'drizzle-orm';
import {
    pgTable,
    serial,
    text,
    integer,
    real,
    varchar,
    primaryKey,
} from 'drizzle-orm/pg-core';

export const beans = pgTable('beans', {
    bean_id: varchar('bean_id').primaryKey(),
    year: integer('year').notNull(),
    country: text('country').notNull(),
    region: text('region').notNull(),
    processingMethod: text('processing_method').notNull(),
    species: text('species').notNull(),
    sweetness: real('sweetness'),
    balance: real('balance').notNull(),
    body: real('body').notNull(),
    afterTaste: real('after_taste').notNull(),
    acidity: real('after_taste').notNull(),
    aroma: real('aroma').notNull(),
    numOfBags: real('num_of_bags').notNull(),
    bagWeight: real('bag_weight').notNull(),
    flavor: real('flavor').notNull(),
    uniformity: real('uniformity').notNull(),
});

export const customColumns = pgTable('custom_columns', {
    id: serial('id').primaryKey(),
    column_name: varchar('column_name').notNull(),
    data_type: varchar('data_type').notNull().$type<'integer' | 'real' | 'string'>(),
});

export const beanCustomValues = pgTable('bean_custom_values', {
    bean_id: varchar('bean_id').notNull().references(() => beans.bean_id),
    custom_column_id: integer('custom_column_id').notNull().references(() => customColumns.id),
    value: text('value').notNull(),
    },
    table => ({
        pk: primaryKey({ columns: [table.bean_id, table.custom_column_id]}),
    }),
);

export const beansRelations = relations(beans, ({ many }) => ({
    customValues: many(beanCustomValues),
}));

export const customColumnsRelations = relations(customColumns, ({ many }) => ({
    values: many(beanCustomValues),
}));

export const beanCustomValuesRelations = relations(beanCustomValues, ({ one }) => ({
    bean: one(beans, {
        fields: [beanCustomValues.bean_id],
        references: [beans.bean_id],
    }),
    customColumns: one(customColumns, {
        fields: [beanCustomValues.custom_column_id],
        references: [customColumns.id],
    })
}))