export interface Post {
	title: string,
	excerpt: string,
	featured?: boolean
}

export interface PostProp {
	post: Post
}

export interface QueryResponse {
	postsConnection: {
		edges: {
			node: {
				author: {
					bio: string
					id: string
					name: string
					photo: {
						url: string
					}
				}
				createdAt: string
				title: string
				slug: string
				excerpt: string
				featuredImage: {
					url: string
				}
				categories: {
					name: string
					slug: string
				}[]
			}
		}[]
	}
}

export interface QueryResponseDetails {
	post: {
		author: {
			bio: string
			id: string
			name: string
			photo: {
				url: string
			}
		}
		createdAt: string
		title: string
		slug: string
		excerpt: string
		featuredImage: {
			url: string
		}
		categories: {
			name: string
			slug: string
		}[]
		content: {
			raw?: {
				children: {
					children: {
						text?: string,
						[anything: string]: any
					},
					type: string
				}[]
			}
		}
	}
}

export interface RecentQueryResponse {
	posts: {
		title: string,
		featuredImage: {
			url: string
		},
		createdAt: string
		slug: string
	}[]
}

export interface QueryNode {
	node: QueryResponse['postsConnection']['edges']
}

export interface GetCategories {
	categories: {
		name?: string
		slug?: string
	}[]
}

export interface GetComments {
	comments: {
		name: string,
		comment: string,
		createdAt: string
	}[]
}

export interface GetFeaturedPosts {
	posts: FeaturedPost['post'][]
}

export interface FeaturedPost {
	post: {
		author: {
			name: string,
			photo: {
				url: string
			}
		},
		featuredImage: {
			url: string
		},
		title: string,
		slug: string,
		createdAt: string
	}
}

export interface GetCategoryPost {
	postsConnection: {
		edges: {
			cursor: string,
			node: {
				author: {
					bio: string,
					name: string,
					id: string,
					photo: {
						url: string
					}
				},
				createdAt: string,
				slug: string,
				title: string,
				excerpt: string,
				featuredImage: {
					url: string,
				},
				categories: {
					name: string,
					slug: string,
				}[]
			}
		}[]
	}
}

export interface CategoryPost {
	posts: GetCategoryPost['postsConnection']['edges']
}
//**  Component Props **

export interface CategoriesProps {
	name?: string
	slug?: string
}

export interface PostCardProps {
	node: QueryResponse['postsConnection']['edges'][0]['node']
}

export interface PostWidgetProps {
	categories?: string[],
	slug?: string
}

export interface PostDetailProps {
	post: QueryResponseDetails['post']
}

export interface AuthorProps {
	author: QueryResponseDetails['post']['author']
}

export interface CommentsProps {
	slug: QueryResponseDetails['post']['slug']
}

export interface CommentsFormProps {
	slug: QueryResponseDetails['post']['slug']
}