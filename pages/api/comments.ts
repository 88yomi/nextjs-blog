// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!;
const graphCMSToken: string = process.env.GRAPHCMS_TOKEN!;

export default async function comments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphCMSToken}`
    }
  })
  
  const query = gql`
    mutation CreateComment($name: String!, $email: String!,$comment: String!,$slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug}} }) { id }
    }
  `

  const { name, email, comment, slug }= req.body;

  const result = await graphQLClient.request(query, {
    name,
    email,
    comment,
    slug,
  });

  return res.status(200).send(result);
}
