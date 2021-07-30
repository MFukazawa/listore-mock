import React, { useState } from 'react';
import Link from 'next/link';

type TodoTypes = {
  id: string;
  title: string;
  description: string;
  style: Object;
};

type KitTypes = {
  id: string;
  title: string;
  description: string;
  style: Object;
};

const dummy: Array<TodoTypes> = [
  {
    id: '1123412341235123',
    title: 'ちゃんぽん',
    description: 'てげてげてげてげてげてげてげ',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '22345234523452345',
    title: 'ラーメン',
    description: 'てげてげてげてげてげてげてげ',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '3345634563456436',
    title: 'とんかつ',
    description: 'てげてげてげてげてげてげてげ',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '44567456745674567',
    title: 'カレー',
    description: 'てげてげてげてげてげてげてげ',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
];

const dummyKits: Array<KitTypes> = [
  {
    id: '1123412341235123',
    title: '夏のバーベキュー',
    description: '夏のバーベキューに必要な物を全部揃ったキット！',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '22345234523452345',
    title: 'ビーチパーティー',
    description: '盛り上げていくぜー！スイカを忘れずに〜',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '3345634563456436',
    title: 'チヌ釣り',
    description: '浜ちゃんの特性チヌ釣りキット',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '44567456745674567',
    title: '真夏サーフィンギア',
    description: '南国向けのサーフィンキット',
    style: {
      backgroundColor: '#74EBD5',
      backgroundImage: 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
];

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
