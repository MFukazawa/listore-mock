import React, { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Forgot = () => {
  const [email, setEmail] = useState<string>('')
  const router = useRouter()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push({
      pathname: '/forgot/confirm',
      query: { email },
    })
  }

  return (
    <div className='account'>
      <h1>パスワードお忘れの方</h1>
      <form onSubmit={onSubmit}>
        <article>
          <div className='fields'>
            <label htmlFor='email'>メールアドレス</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='メールアドレス'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit'>パスワードをリセットする</button>
          </div>
        </article>
      </form>
      <div className='text-center'>
        <Link href='/login'>
          <a>ログインはこちら</a>
        </Link>
      </div>
    </div>
  )
}

export default Forgot
