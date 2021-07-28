import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Top.module.css';

type TodoTypes = {
  id: string;
  title: string;
  description: string;
  style: Object;
};

const dummy: Array<TodoTypes> = [
  {
    id: '1123412341235123',
    title: '夏のバーベキュー',
    description: '夏のバーベキューに必要な物を全部揃ったキット！',
    style: {
      'background-color': '#74EBD5',
      'background-image': 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '22345234523452345',
    title: 'ビーチパーティー',
    description: '盛り上げていくぜー！スイカを忘れずに〜',
    style: {
      'background-color': '#74EBD5',
      'background-image': 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
    },
  },
  {
    id: '3345634563456436',
    title: 'チヌ釣り',
    description: '浜ちゃんの特性チヌ釣りキット',
    style: {
      'background-color': '#74EBD5',
      'background-image': 'linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)',
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

const todoLists = dummy.map((list) => {
  return (
    <article key={list.id} className='pointer todo-list' style={list.style}>
      <Link href={`/kits/${list.id}`}>
        <a>
          <header>
            <h4>{list.title}</h4>
          </header>
          <p className='todo-description'>{list.description}</p>
        </a>
      </Link>
    </article>
  );
});

export default function Top(): JSX.Element {
  return (
    <div className='container'>
      <Head>
        <title>リストア</title>
        <meta name='description' content='友人と一緒にToDoを完了していこう' />
        <link rel='shortcut icon' href='/frame_00_delay-0.1s.gif' />
      </Head>

      <main>
        <h1 className={styles.hero}>
          TODOリストを作って
          <br />
          友人と一緒に完成していこう
        </h1>
        <article>
          <h4>TODO</h4>
          <ul>
            <li>アカウントを作成</li>
            <li>TODOリスト作成</li>
            <li>URLで共有</li>
          </ul>
        </article>
        <article>
          <h4>人気キット</h4>
          <div className='grid todolist-grid'>{todoLists}</div>
        </article>
      </main>
    </div>
  );
}
