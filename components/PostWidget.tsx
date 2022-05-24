import React, { useEffect, useState} from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import { NextPage } from 'next';
import { PostWidgetProps, RecentQueryResponse } from '../interfaces';


const PostWidget: NextPage<PostWidgetProps> = ({ categories, slug }) => {
	const [relatedPosts, setRelatedPosts] = useState<RecentQueryResponse['posts']>([]);

	useEffect(() => {
		if(slug) {
			getSimilarPosts(categories, slug).then((results) =>
        setRelatedPosts(results)
      )
		}
		else {
			getRecentPosts()
			.then(result => setRelatedPosts(result))
		}
	}, [slug])
	
	return (
    <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
      <h3 className="mb-8 border-b pb-4 text-xl font-semibold">
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post) => (
        <Link key={post.title} href={`/post/${post.slug}`} className="text-md ">
          <div className="mb-4 flex w-full cursor-pointer items-center">
            <div className="w-16 flex-none">
              <img
                src={post.featuredImage.url}
                alt={post.title}
                className="h-[60px] w-[60px] rounded-full border border-gray-300 object-cover align-middle"
              />
            </div>
            <div className="ml-4 flex-grow">
              <p className="text-xs text-gray-500">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
              <div className="text-md">{post.title}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostWidget