import React, { useState, useEffect } from 'react'

import { getCategories } from '../services'
import { CategoriesProps } from '../interfaces'

import Link from 'next/link'

const Header = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([])

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="inline-block w-full border-b border-blue-400 py-8 md:flex md:justify-between">
        <div className="block">
          <Link href="/">
            <span className="cursor-pointer text-4xl font-bold text-white">
              Sample Blog
            </span>
          </Link>
        </div>
        <div className="hidden md:inline-block">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className="mt-2 ml-4 cursor-pointer align-middle font-semibold text-white">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
