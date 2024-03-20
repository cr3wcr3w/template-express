import { text, pgTable } from "drizzle-orm/pg-core";

export type HelloType = {
	id: string
	message: string
}

export const helloTable = pgTable("hello", {
  id: text("id").primaryKey(),
  message: text("message"),
});

