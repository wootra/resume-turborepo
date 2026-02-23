import { createPool } from '@vercel/postgres';
import type { Todo } from './types';

export const getTodos = async (email: string) => {
    const pool = createPool({
        connectionString: import.meta.env.POSTGRES_URL,
    });
    // const table = 'todo';
    const results = await pool.sql`SELECT * FROM "Todo" WHERE email = ${email}`;
    const todos: Todo[] = results.rows.map(row => {
        const { id, text } = row;
        return { id, text };
    });
    return todos;
};
