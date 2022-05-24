import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { getCategories } from '../services'
import { CategoriesProps } from '../interfaces'

const Categories = () => {
  // const router = useRouter();
  // const {pathname} = router;
  // console.log(router)
    
  const [categories, setCategories] = useState<CategoriesProps[]>([])

  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories))
  }, [])

  return (
      <div className="mb-8 rounded-lg bg-white p-8 shadow-lg pb-12">
        <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
          Categories
        </h3>
				{categories.map(category => (
					<Link key={category.slug} href={`category/${category.slug}`}>
						<span className='cursor-pointer block pb-3 mb-3'>
							{category.name}
						</span>
					</Link>
				))}
      </div>
  )
}

export default Categories
