import React from 'react'
import { PostCardProps } from '../interfaces'

import { AiOutlineCalendar } from 'react-icons/ai'

import moment from 'moment'
import Link from 'next/link'
import { NextPage } from 'next'

const PostCard: NextPage<PostCardProps> = ({ node }) => {
  return (
    <div className="mb-8 rounded-lg bg-white p-0 pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden pb-80 shadow-md">
        <img
          src={node.featuredImage?.url}
          alt={node.title}
          className="roundd-t-lg absolute h-80 w-full object-cover object-top shadow-lg lg:rounded-lg"
        />
      </div>
      <h1 className="mb-8 cursor-pointer text-center text-3xl font-semibold transition duration-500 hover:text-pink-600">
        <Link href={`/post/${node.slug}`}>{node.title}</Link>
      </h1>
      <div className="mb-8 block w-full items-center justify-center text-center lg:flex">
        <div className="mb-4 mr-8 flex w-full items-center justify-center lg:mb-0 lg:w-auto">
          <img
            src={node.author.photo?.url}
            alt={node.author.name}
            height="30px"
            width="30px"
            className="rounded-full align-middle"
          />
          <p className="ml-2 inline align-middle text-lg uppercase text-gray-700">
            {node.author.name}
          </p>
        </div>
        <div className="text-center font-medium text-gray-700">
          <AiOutlineCalendar
            className="mr-2 inline h-6 w-6 text-pink-500"
            stroke="currentColor"
          />
          <span>{moment(node.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <p className="mb-8 px-4 text-center text-lg font-normal text-gray-700 lg:px-20">
        {node.excerpt}
      </p>
      <div className="text-center">
        <Link href={`/post/${node.slug}`}>
          <span className="inline-block transform cursor-pointer rounded-full bg-pink-600 px-6 py-3 text-lg font-medium text-white transition duration-300 hover:-translate-y-1">
            Continue Reading
          </span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard
