import React, { useEffect, useRef, useState } from 'react'

function FormTodo(props) {

    const [input, setInput] = useState(props.edit ? props.edit.value : '')
    const refInput = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 1000),
            text: input,
            status: 'new'
        })

        setInput('')
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        refInput.current.focus();
    })


    return (
        <form action="submit" onSubmit={handleSubmit} className='formTodo'>
            {props.edit ? (
                <input
                    ref={refInput}
                    placeholder='Update todo ...'
                    value={input}
                    onChange={handleChange}
                    type="text"
                    className='inputTodo edit'
                />) : (
                <input
                    ref={refInput}
                    placeholder='What needs to be done?'
                    value={input}
                    onChange={handleChange}
                    type="text"
                    className='inputTodo'
                />
            )
            }
        </form>
    )
}

export default FormTodo