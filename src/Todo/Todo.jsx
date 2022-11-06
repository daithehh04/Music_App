import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { BsCircle } from 'react-icons/bs'
import { BsCheckCircleFill } from 'react-icons/bs'
import classnames from 'classnames'
import './styles.scss'
import FormTodo from './FormTodo'

function Todo({ todos, removeTodo, onTodoClick, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })
  const handleTodoClick = (id) => {
    onTodoClick(id)
  }

  const submitUpdate = (value) => {
    updateTodo(edit.id, value)
    setEdit({
      id: null,
      value: ''
    })
  }
  if (edit.id) {
    return <FormTodo edit={edit} onSubmit={submitUpdate} />
  }
  return (
    <ul>
      {
        todos.map((todo, index) => (
          <li key={index} className="todo-list">
            <div onClick={() => handleTodoClick(todo.id)}
              className={classnames({ active: todo.status === 'completed', 'iconCheck': true })} >
              <BsCircle className='unCheck' />
              <BsCheckCircleFill className='checked' />
            </div>
            <div key={todo.id}
              className={classnames({
                'todo-item': true,
                completed: todo.status === 'completed'
              })}
            >{todo.text}</div>
            <AiFillEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} className="edit-todo" />
            <FaTrashAlt onClick={() => removeTodo(todo.id)}
              className="delete-todo"
            />
          </li>
        ))
      }
    </ul>
  )
}

export default Todo