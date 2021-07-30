import React, { useState, ReactChild, ReactChildren } from 'react'
import Link from 'next/link'
import Styles from './Layout.module.css'
import Logo from '../../assets/images/logo_transparent.png'
import search from '../../public/search.svg'
import Image from 'next/image'
import router from 'next/router'

interface ChildProps {
  children: ReactChild | ReactChildren
}

const BaseLayout = ({ children }: ChildProps) => {
  const currentYear = () => {
    return new Date().getFullYear()
  }

  return (
    <div className='container'>
      <header>
        <nav>
          <ul>
            <li>
              <Link href='/'>
                <a>
                  <Image
                    src={Logo}
                    alt='リストアのロゴ'
                    width='150'
                    height='150'
                    className='pointer'
                  />
                </a>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <div className="flex">
                <input
                  onKeyUp={(e) => e.key === 'Enter' ? router.push('/search') : ''}
                />
                <span className="search-icon">
                  <Link href="/search">
                    <a>
                      <Image
                        src={search}
                        alt="虫眼鏡"
                        width="40"
                        height="40"
                      />
                    </a>
                  </Link>
                </span>
              </div>
            </li>
            <li>
              <Link href='/register'>
                <a>
                  <button>アカウント作成</button>
                </a>
              </Link>
            </li>
            <li>
              <Link href='/login'>
                <a>
                  <button>ログイン</button>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>{children}</div>
      <footer className={Styles.footer}>
        <div className={Styles.footerContents}>©️Nomadori {currentYear()}</div>
      </footer>
    </div>
  )
}

const logo = `%c
Made by 🐥:

        #                  #     # #     #   #
        #    ##########    #     # #     #   #
       #             #     ##    # #     #   #
      #             #      # #           #   #
    ##           # #       #  #              #
  ##              #        #                #
##                 #       #              ##

`

console.log(logo, "color:#ee9600; font-family: monospace; text-shadow: 1px 1px 3px #ee9600; padding: 0 10px;")

export default BaseLayout
