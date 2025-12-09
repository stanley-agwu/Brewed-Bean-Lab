import { pool } from "../index.js"

const main = async () => {
    try {
       await pool.query(`
        CREATE TABLE IF NOT EXIST "beans" (
            "bean_id" varchar PRIMARY KEY,
            "year": integer NOT NULL,
            "country" text NOT NULL,
            "region" text NOT NULL,
            "processingMethod" text NOT NULL,
            "species" text NOT NULL,
            "sweetness" real NOT NULL,
            "balance" real NOT NULL,
            "body" real NOT NULL,
            "afterTaste" real NOT NULL,
            "acidity" real NOT NULL,
            "aroma" real NOT NULL,
            "numOfBags" real NOT NULL,
            "bagWeight" real NOT NULL,
            "flavor" real NOT NULL,
            "uniformity" real NOT NULL,
        );

        CREATE TABLE IF NOT EXIST "custom_columns" (
            "id" serial PRIMARY KEY,
            "column_name" varchar NOT NULL UNIQUE,
            "data_type" varchar NOT NULL
       );

       CREATE TABLE IF NOT EXIST "bean_custom_values" (
            "bean_id" varchar NOT NULL REFERENCES "beans"("bean_id"),
            "custom_column_id" integer NOT NULL REFERENCES "custom_columns"("id"),
            "value" text NOT NULL,
            PRIMARY KEY ("bean_id", "custom_column_id")
       );
        `); 
    } catch (error) {
        throw error
    } finally {
        await pool.end()
    }
}

main().catch(console.error)