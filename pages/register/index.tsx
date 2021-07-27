import React, { useState, FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Google from '../../public/Google.svg'
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push('/login')
  }

  return (
    <div className='account'>
      <h1>アカウント作成</h1>
      <button className='google'>
        <Image src={Google} alt='Google logo' />
        <span className='google__text'>Googleで作成する</span>
      </button>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='password'>パスワード</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='パスワード'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor='passwordCheck'>
              パスワード（再入力してください）
            </label>
            {/* TODO パスワードが一致するチェック入れる */}
            <input
              type='password'
              id='passwordCheck'
              name='passwordCheck'
              placeholder='パスワード（再入力してください）'
              required
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button type='submit'>作成する</button>
          </div>
        </article>
      </form>
      <div className='text-center'>
        <Link href='/forgot'>
          <a>パスワードをお忘れの方</a>
        </Link>
      </div>
    </div>
  )
}

export default Register
