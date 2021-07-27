import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Confirm = () => {
  const router = useRouter()
  const { email } = router.query

  return (
    <div className='container text-center'>
      <h1>パスワードリセットについて</h1>
      <article>
        <p>パスワードリセットを完了するには、</p>
        <p>
          <strong>{email}</strong>
        </p>
        <p>に送信したリンクをクリックしてください。</p>
        <p>
          新しいパスワードを設定するページが表示されますので、画面の指示に従って、リセットを完了させてください。
        </p>
        <Link href='/'>
          <a>
            <button>トップに戻る</button>
          </a>
        </Link>
      </article>
    </div>
  )
}

export default Confirm
