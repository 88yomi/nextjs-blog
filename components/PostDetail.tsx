import React, { ReactNode } from 'react'
import { NextPage } from 'next'
import { PostDetailProps } from '../interfaces'

import moment from 'moment'
import { AiOutlineCalendar } from 'react-icons/ai'

const PostDetail: NextPage<PostDetailProps> = ({ post }) => {
  const getContentFragment = (
    index: number,
    text: ({} | string)[],
    obj: {
      bold?: string
      italic?: string
      underline?: string
      title?: string
      height?: string
      width?: string
      src?: string
      [k: string]: any
    },
    type?: string
  ) => {
    let modifiedText: ({} | string)[] | React.ReactNode = text
    // console.log(modifiedText)

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>
      }
    }

    switch (type) {
      case 'heading-three':
        return (
          <h3 key={index} className="mb-4 text-xl font-semibold">
            {(modifiedText as {}[]).map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        )
      case 'paragraph':
        return (
          <p key={index} className="mb-8">
            {(modifiedText as {}[]).map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        )
      case 'heading-four':
        return (
          <h4 key={index} className="text-md mb-4 font-semibold">
            {(modifiedText as {}[]).map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        )
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        )
      default:
        return modifiedText
    }
  }

  return (
    <div className="mb-8 rounded-lg bg-white pb-12 shadow-lg lg:p-8">
      <div className="relative mb-6 overflow-hidden shadow-md">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="h-full w-full rounded-t-lg object-top "
        />
      </div>
      <div className="px-6 lg:px-0">
        <div className="mb-8 flex w-full items-center">
          <div className="mb-4 mr-8 flex w-full items-center lg:mb-0 lg:w-auto">
            <img
              src={post.author.photo?.url}
              alt={post.author.name}
              height="30px"
              width="30px"
              className="rounded-full align-middle"
            />
            <p className="ml-2 inline align-middle text-lg uppercase text-gray-700">
              {post.author.name}
            </p>
          </div>
          <div className="text-center font-medium text-gray-700">
            <AiOutlineCalendar
              className="mr-2 inline h-6 w-6 text-pink-500"
              stroke="currentColor"
            />
            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw?.children.map((typeObj, index) => {
          const objChildren = typeObj.children.map(
            (
              item: { text: ({} | string)[]; [anything: string]: any },
              itemIndex: number
            ) => getContentFragment(itemIndex, item.text, item)
          )

          return getContentFragment(index, objChildren, typeObj, typeObj.type)
        })}
      </div>
    </div>
  )
}

export default PostDetail
