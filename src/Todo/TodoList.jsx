
import classNames from 'classnames';
import React, { useState } from 'react'
import FormTodo from './FormTodo';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState(() => {
        const storageTodos = JSON.parse(localStorage.getItem('todos'))

        return storageTodos ? storageTodos : []

    });


    const [filterStatus, setFilterStatus] = useState('all')

    const addTodo = (todo) => {
        if (!todo.text)
            return;
        const newTodos = [todo, ...todos];

        setTodos(newTodos);

        const todosLocal = JSON.stringify(newTodos);
        localStorage.setItem('todos', todosLocal);
    }

    const removeTodo = (id) => {
        const newTodos = [...todos].filter(todo => todo.id !== id)
        setTodos(newTodos)

        const todosLocal = JSON.stringify(newTodos);
        localStorage.setItem('todos', todosLocal)
    }

    const handleTodoClick = (id) => {
        let newTodos = todos.map(todo => {
            if (todo.id === id) {
                if (todo.status === 'new') {
                    todo.status = 'completed'
                } else {
                    todo.status = 'new'
                }
            }
            return todo
        })
        setTodos(newTodos)

        const todosLocal = JSON.stringify(newTodos);
        localStorage.setItem('todos', todosLocal)
    }

    const handleShowAll = () => {
        setFilterStatus('all')
    }
    const handleShowCompleted = () => {
        setFilterStatus('completed')
    }
    const handleShowNew = () => {
        setFilterStatus('new')
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text)
            return;
        const newTodos = todos.map(todo => (todo.id === todoId ? newValue : todo))
        setTodos(newTodos)

        const todosLocal = JSON.stringify(newTodos);
        localStorage.setItem('todos', todosLocal)
    }

    const renderTodoList = todos.filter(todo => filterStatus === 'all' || todo.status === filterStatus)

    return (
        <>
            <h2 className='todo-title'>What is the plan today?</h2>
            <div className='todoApp'>
                <FormTodo onSubmit={addTodo} />
                <Todo todos={renderTodoList} removeTodo={removeTodo} onTodoClick={handleTodoClick}
                    updateTodo={updateTodo} />
                <div className='filter-todo'>
                    <button onClick={handleShowAll} className={classNames({ selected: filterStatus === 'all' })}>All</button>
                    <button onClick={handleShowNew} className={classNames({ selected: filterStatus === 'new' })}>Active</button>
                    <button onClick={handleShowCompleted} className={classNames({ selected: filterStatus === 'completed' })}>Completed</button>
                </div>
            </div>
        </>
    )
}

export default TodoList