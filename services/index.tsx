import { request, gql } from 'graphql-request'
import {
  GetCategories,
  GetComments,
  QueryResponse,
  QueryResponseDetails,
  RecentQueryResponse,
} from '../interfaces'

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            title
            slug
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  const result: QueryResponse = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        title
        slug
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `
  const result: QueryResponseDetails = await request(graphqlAPI, query, {
    slug,
  })

  return result.post
}

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails() {
    posts (
      orderBy: createdAt_ASC
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `
  const result: RecentQueryResponse = await request(graphqlAPI, query)
  return result.posts
}

export const getSimilarPosts = async (categories?: string[], slug?: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories }}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result: RecentQueryResponse = await request(graphqlAPI, query, { categories, slug})
  return result.posts
}

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const result: GetCategories = await request(graphqlAPI, query)
  return result.categories
}


export const submitComment = async (obj: {name: string, email: string, comment: string, slug: string}) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj),
  })

  return result.json();
}

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: { post: { slug:$slug }}) {
        name
        createdAt
        comment
      }
    }
  `;

  const result: GetComments = await request(graphqlAPI, query, { slug })
  return result.comments;
}
