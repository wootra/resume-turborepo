import type { Todo } from './types';

export const TodoList = ({
    todos,
    idBase,
}: {
    todos: Todo[];
    idBase: number;
}) => {
    return (
        <div id='todo-list'>
            <form
                hx-post='/todo-list/todo'
                hx-target='#todo-list'
                hx-swap='outerHTML'
            >
                <input
                    class='border-spacing-2 border border-cyan-700 p-2 w-full rounded-md'
                    type='text'
                    placeholder='What needs to be done?'
                    hx-action='enter'
                    name='todo'
                />
                <input type='hidden' name='id-base' value={idBase ?? 1} />
            </form>
            <ul class='py-4'>
                {todos.map(todo => (
                    <li class='flex gap-2'>
                        <input
                            type='checkbox'
                            hx-post='/todo-list/remove'
                            name='todo-item'
                            value={todo.id}
                            id={todo.id}
                            hx-swap='outerHTML'
                            class='cursor-pointer'
                            hx-target='#todo-list'
                        ></input>
                        <label for={todo.id} class='cursor-pointer'>
                            {todo.text}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
