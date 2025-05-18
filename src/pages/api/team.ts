import { fetchGraphQL } from '@app/lib/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getMusic(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchGraphQL(
      `query {
            teamCollection(limit: 1000) {
              items {
                name
                picture {
                    url
                }
                role
                email
                instagram
                website
                description
                orderNumber
              }
            }
          }`,
    );

    res.status(200).json(data.data.teamCollection.items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
