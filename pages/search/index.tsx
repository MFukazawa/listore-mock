import React, { useState } from 'react';
import Link from 'next/link';

type TodoTypes = {
  id: string;
  title: string;
  description: string;
  style: Object;
};

// TODO change to KIT
const dummy: Array<TodoTypes> = [
  {
    id: '1123412341235123',
    title: '夏のバーベキュー',
    description: '夏のバーベキューに必要な物を全部揃ったキット！',
    style: {
      'background-color': '#74EBD5',
      'background-image': 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)'
    }
  },
  {
    id: '22345234523452345',
    title: 'ビーチパーティー',
    description: '盛り上げていくぜー！スイカを忘れずに〜',
    style: {
      'background-color': '#74EBD5',
      'background-image': 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)'
    }
  },
  {
    id: '3345634563456436',
    title: 'チヌ釣り',
    description: '浜ちゃんの特性チヌ釣りキット',
    style: {
      'background-color': '#74EBD5',
      'background-image': 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)'
    }
  },
  {
    id: '44567456745674567',
    title: '真夏サーフィンギア',
    description: '南国向けのサーフィンキット',
    style: {
      'background-color': '#74EBD5',
      'background-image': 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)'
    }
  },
];

const Search = () => {
  const [dummyLists, setDummyLists] = useState(dummy);
  const [hasResults, setHasResults] = useState(true);

  const todoLists = dummyLists.map((list) => {
    return (
      <article key={list.id} className='pointer todo-list' style={list.style}>
        <Link href={`/kits/${list.id}`}>
          <a>
            <header>
              <h4>{list.title}</h4>
            </header>
            <p className="todo-description">{list.description}</p>
          </a>
        </Link>
      </article>
    );
  });

  const searchResults = () => {
    return hasResults ? (
      <article>
        <h2>検索結果：</h2>
        <div className='grid todolist-grid'>{todoLists}</div>
      </article>
    ) : (
      <article>
        <h2>検索結果：</h2>
        <p>検索した内容のキットを見つかりませんでした。作りませんか？</p>
        <button>新しいキットを作る</button>
      </article>
    );
  };

  return (
    <>
      <fieldset>
        <label htmlFor='owner'>
          {hasResults ? '検索結果有り' : '検索結果無し'}
        </label>
        <input
          type='checkbox'
          id='results'
          name='results'
          role='switch'
          onChange={(e) => setHasResults(e.target.checked)}
          checked={hasResults}
        />
      </fieldset>
      {searchResults()}
    </>
  );
};

export default Search;
