/* client/server/api/post_detail.ts */
import type { IncomingMessage, ServerResponse } from 'http'
import client from './client'
import { Post } from './types'
import * as url from "url";

export default async (req: IncomingMessage, res: ServerResponse) => {
    const params = url.parse(req.url as string, true).query;
    const slug = params.slug
    const data = client.getListDetail<Post>({
        endpoint: 'blog',
        contentId: String(slug),
    })

    return data
}
