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
            <form hx-post='/todo' hx-target='#todo-list' hx-swap='outerHTML'>
                <input
                    type='text'
                    placeholder='What needs to be done?'
                    hx-action='enter'
                    name='todo'
                />
                <input type='hidden' name='id-base' value={idBase ?? 1} />
            </form>
            <ul>
                {todos.map(todo => (
                    <li>
                        <input
                            type='checkbox'
                            hx-post='/remove'
                            name='todo-item'
                            value={todo.id}
                            hx-swap='outerHTML'
                            hx-target='#todo-list'
                        ></input>
                        <label for='todo-1-input'>{todo.text}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};
