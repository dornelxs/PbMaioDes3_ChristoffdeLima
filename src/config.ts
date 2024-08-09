import dotenv from 'dotenv';

dotenv.config({ path: "../.env" });

export const config = {
  secret: process.env.SECRET as string,
  dbUser: process.env.DB_USER as string,
  dbPassword: process.env.DB_PASS as string,
};
