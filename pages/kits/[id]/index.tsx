import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import Image from 'next/image'
interface ITodo {
  id: string
  content: string
  isDone: boolean
}

interface ITodoList {
  id: string
  title: string
  description: string
  isPublished: boolean
  todos: ITodo[]
}

const todoList: ITodoList = {
  id: '1123412341235123',
  title: 'ほげ',
  description: 'てげてげてげてげてげてげてげ',
  isPublished: false,
  todos: [
    {
      id: '1',
      content: 'ちゃんぽん食べに行く',
      isDone: true,
    },
    {
      id: '2',
      content: 'Golangを勉強する',
      isDone: false,
    },
    {
      id: '3',
      content: '早く寝る',
      isDone: false,
    },
  ],
}

const initTodoState: ITodo = { id: '', content: '', isDone: false }

const Kits = () => {
  const [todo, setTodo] = useState<ITodo>(initTodoState)
  const [todos, setTodos] = useState<ITodo[]>(todoList.todos)
  const [title, setTitle] = useState(todoList.title)
  const [description, setDescription] = useState(todoList.description)
  const [debouncedTitle, setDebouncedTitle] = useState(title)
  const [debouncedDescription, setDebouncedDescription] = useState(description)
  const [publishStatus, setPublishStatus] = useState(todoList.isPublished)
  const [isOwner, setIsOwner] = useState(true)

  // TODO: Custom Hook
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTitle(title)
    }, 3000)
    return () => {
      clearTimeout(timerId)
    }
  }, [title])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedDescription(description)
    }, 3000)
    return () => {
      clearTimeout(timerId)
    }
  }, [description])

  useEffect(() => {
    // INFO: 初期レンダリング時は処理しない
    if (
      debouncedTitle === todoList.title &&
      debouncedDescription === todoList.description
    )
      return

    console.log('APIを叩く')
  }, [debouncedTitle, debouncedDescription])

  const toggleTodo = (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => {
    todo.isDone = e.target.checked

    setTodos((prev) => {
      const index = prev.findIndex((t) => t.id === todo.id)
      prev.splice(index, 1, todo)
      return [...prev]
    })
  }

  const editTodo = (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => {
    todo.content = e.target.value
    setTodos((prev) => {
      const index = prev.findIndex((t) => t.id === todo.id)
      prev.splice(index, 1, todo)
      return [...prev]
    })
  }

  const deleteTodo = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    todo: ITodo
  ) => {
    if (todos.length === 1) {
      alert('最後のToDoを削除することができません')
      return
    }
    setTodos((prev) => {
      return prev.filter((t) => t.id !== todo.id)
    })
  }

  const todoMap = todos.map((todo) => {
    return isOwner ? (
      <div key={todo.id} className='todo-item grid'>
        <input
          type='checkbox'
          checked={todo.isDone}
          onChange={(e) => toggleTodo(e, todo)}
        />
        <input
          type='text'
          value={todo.content}
          onChange={(e) => editTodo(e, todo)}
          onKeyPress={(e) =>
            e.key === 'Enter' ? alert('保存しました！') : null
          }
        />
        <Image
          src='/Trash.svg'
          alt='trash can'
          className='pointer'
          width='30'
          height='30'
          onClick={(e) => deleteTodo(e, todo)}
        />
      </div>
    ) : (
      <div key={todo.id} className='todo-item grid'>
      <input
        type='checkbox'
        checked={todo.isDone}
        onChange={(e) => toggleTodo(e, todo)}
      />
      <span>{todo.content}</span>
    </div>
    )
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTodos((prev) => [...prev, todo])
    setTodo(initTodoState)
  }

  return (
    <>
      <fieldset>
        <label htmlFor='owner'>
          {isOwner ? 'キットオーナー' : 'オーナー以外の人'}
        </label>
        <input
          type='checkbox'
          id='owner'
          name='owner'
          role='switch'
          onChange={(e) => setIsOwner(e.target.checked)}
          checked={isOwner}
        />
      </fieldset>
      <article>
        {isOwner && (
          <fieldset className='publish'>
            <label htmlFor='publish'>{publishStatus ? '公開' : '非公開'}</label>
            <input
              type='checkbox'
              id='publish'
              name='publish'
              role='switch'
              onChange={(e) => setPublishStatus(e.target.checked)}
              checked={publishStatus}
            />
          </fieldset>
        )}
        {isOwner ? (
          <div>
            <label htmlFor='title'>タイトル</label>
            <input
              name='title'
              type='text'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              data-tip="🔧適当なタイトルをつけることによって、検索時にみつけやすくなります！"
            />
            <ReactTooltip />
            <label htmlFor='description'>説明</label>
            <input
              name='description'
              type='text'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              data-tip="🔧見つけやすくするには、ここで関連しているキーワードを書いてね！"
            />
          </div>
        ) : (
          <>
            <h1 className="todo-list__title">{title}</h1>
            <p>{description}</p>
          </>
        )}

        { isOwner && <label>Todos</label>}

        <div>{todoMap}</div>

        {isOwner && <>
          <br />
          <form onSubmit={handleSubmit}>
            <label htmlFor='todo'>ToDo追加</label>
            <input
              type='text'
              name='todo'
              value={todo.content}
              onChange={(e) => {
                setTodo(() => {
                  return {
                    id: String(todos.length + 1),
                    content: e.target.value,
                    isDone: false,
                  }
                })
              }}
            />
          </form>
        </>}
      </article>
    </>
  )
}

export default Kits
