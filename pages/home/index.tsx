import React, { useState } from 'react'
import Link from 'next/link'

type TodoTypes = {
  id: string
  title: string
  description: string
}

const dummy: Array<TodoTypes> = [
  {
    id: '1123412341235123',
    title: 'ちゃんぽん',
    description: 'てげてげてげてげてげてげてげ',
  },
  {
    id: '22345234523452345',
    title: 'ラーメン',
    description: 'てげてげてげてげてげてげてげ',
  },
  {
    id: '3345634563456436',
    title: 'とんかつ',
    description: 'てげてげてげてげてげてげてげ',
  },
  {
    id: '44567456745674567',
    title: 'カレー',
    description: 'てげてげてげてげてげてげてげ',
  },
]

const Home = () => {
  const [dummyLists, setDummyLists] = useState(dummy)

  const handleDelete = (list: TodoTypes) => {
    if (confirm(`「${list.title}」のTODOリストを削除しますか？`)) {
      setDummyLists(dummyLists.filter((dummyList) => dummyList.id !== list.id))
      alert(`${list.title}を削除しました`)
    } else {
      // do nothing
      alert('削除しませんでした')
    }
  }

  const todoLists = dummyLists.map((list) => {
    return (
      <article key={list.id}>
        <button
          className='button--delete opaque-hover'
          onClick={() => handleDelete(list)}
        >
          削除
        </button>
        <Link href={`/lists/${list.id}`}>
          <a>
            <article className='pointer todo-list'>
              <header>
                <span>{list.title}</span>
              </header>
              <p>{list.description}</p>
            </article>
          </a>
        </Link>
      </article>
    )
  })

  return (
    <div>
      <button>TODOリスト作成する</button>
      <article>
        <header>TODOリスト一覧</header>
        <div className='grid todolist-grid'>{todoLists}</div>
      </article>
    </div>
  )
}

export default Home