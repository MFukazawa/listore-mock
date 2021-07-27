import React from 'react'
import Head from 'next/head'
import styles from '../styles/Top.module.css'

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
      </main>
    </div>
  )
}
