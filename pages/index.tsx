import type { NextPage } from 'next'
import { QueryNode } from '../interfaces'

import Head from 'next/head'
import { getPosts } from '../services';
import { PostCard, Categories, PostWidget } from '../components'
import { FeaturedPosts } from '../sections';


const Home: NextPage<QueryNode> = ({ node }) => {
  return (
    <div className="container mx-auto mb-8 ">
      <Head>
        <title>Oluwayomi's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className='col-span-1" lg:col-span-8'>
          {node.map((post) => <PostCard node={post.node} key={post.node.title} />
          )}
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}
 
export default Home;


export async function getStaticProps () {
  const node = (await getPosts()) || [];

  return {
    props: { node }
  }
}
