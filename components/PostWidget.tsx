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

	// console.log(relatedPosts)
	
	return (
		<div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
				{slug ? 'Related Posts' : 'Recent Posts'}
			</h3>
			{relatedPosts.map(post => (
				<div key={post.title} className="flex items-center w-full mb-4">
					<div className="w-16 flex-none">
						<img 
						src={post.featuredImage.url} 
						alt={post.title} 
						className='w-[60px] h-[60px] align-middle rounded-full object-cover border-gray-300 border'
						/>
					</div>
					<div className="flex-grow ml-4">
						<p className='text-gray-500 text-xs'>
							{moment(post.createdAt).format('MMM DD, YYYY')}
						</p>
						<Link href={`/post/${post.slug}`} className='text-md'>
							{post.title}
						</Link>
					</div>

				</div>
			))}
		</div>
	)
}

export default PostWidget