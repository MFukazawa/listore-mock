import React, { useState } from 'react';
import Link from 'next/link';
import { TodoTypes } from '../../types';
import { dummy, dummyKits } from './../../components/Home/constants'


const Home = () => {
  const [dummyLists, setDummyLists] = useState(dummy);

  const handleDelete = (list: TodoTypes) => {
    if (confirm(`「${list.title}」のTODOリストを削除しますか？`)) {
      setDummyLists(dummyLists.filter((dummyList) => dummyList.id !== list.id));
      alert(`${list.title}を削除しました`);
    } else {
      // do nothing
      alert('削除しませんでした');
    }
  };

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
            <article className='pointer todo-list' style={list.style}>
              <header style={{ backgroundColor: 'transparent' }}>
                <span>{list.title}</span>
              </header>
              <p>{list.description}</p>
            </article>
          </a>
        </Link>
      </article>
    );
  });

  const todoKits = dummyKits.map((kit) => {
    return (
      <article key={kit.id}>
        <button
          className='button--delete opaque-hover'
          onClick={() => handleDelete(kit)}
        >
          削除
        </button>
        <Link href={`/kits/${kit.id}`}>
          <a>
            <article className='pointer todo-list' style={kit.style}>
              <header style={{ backgroundColor: 'transparent' }}>
                <span>{kit.title}</span>
              </header>
              <p>{kit.description}</p>
            </article>
          </a>
        </Link>
      </article>
    );
  });

  return (
    <div>
      <div className='grid'>
        <button>TODOリストを作成する</button>
        <button>キットを作成する</button>
      </div>

      <article>
        <header>TODOリスト一覧</header>
        <div className='grid todolist-grid'>{todoLists}</div>
      </article>

      <article>
        <header>Myキット一覧</header>
        <div className='grid todolist-grid'>{todoKits}</div>
      </article>
    </div>
  );
};

export default Home;
