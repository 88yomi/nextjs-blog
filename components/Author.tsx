import React from 'react'

import { NextPage } from 'next'
import { AuthorProps } from '../interfaces'
import Image from 'next/image'

const Author: NextPage<AuthorProps> = ({ author }) => {
  return (
    <div className="relative mt-20 mb-8 rounded-lg bg-black bg-opacity-20 p-12 text-center">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          className="rounded-[50%] align-middle"
          width='100px'
          height='100px'
          src={author.photo.url as string}
          alt={author.name}
        />
      </div>
        <h3 className="text-white my-4 text-xl font-bold">{author.name}</h3>
        <p className="text-white text-lg">{author.bio}</p>
    </div>
  )
}

export default Author
