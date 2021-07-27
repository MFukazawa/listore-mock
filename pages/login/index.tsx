import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";
import Google from "../../public/Google.svg";

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push('/home')
  }

  return (
    <div className='account'>
      <h1>ログイン</h1>
      <button className='google'>
        <Image src={Google} alt='Google logo' />
        <span className='google__text'>Googleでログインする</span>
      </button>
      <article>
        <form onSubmit={handleSubmit}>
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
            <button type='submit'>ログイン</button>
          </div>
        </form>
        <div className='text-center'>
          <Link href='/forgot'>
            <a>パスワードをお忘れの方</a>
          </Link>
        </div>
      </article>
    </div>
  )
}

export default Login
