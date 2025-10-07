-- create schemas on db creation and make product-metadata as default
CREATE SCHEMA IF NOT EXISTS "product_metadata";
ALTER DATABASE product SET search_path TO product_metadata;
