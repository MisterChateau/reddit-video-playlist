import { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse } from 'axios';

type RedditListing = {
	data: {
		children: RedditPost[]
	}
}

type RedditPost = {
	data: {
		domain: string;
		url: string;
	}
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const subreddit = req.query.subreddit as string;
	console.log(subreddit);
	if (!subreddit) {
		res.statusCode = 400;
		res.setHeader('Content-Type', 'application/json');
		res.end({ error: 'query should be GET /api/playlists/subreddit'});
	}
	const videoUrls = await getYoutubeVideosFromSubbredit(subreddit);

	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ collection: videoUrls }));
}

function getYoutubeVideosFromSubbredit(subreddit: string) {
	return axios.get(`https://reddit.com/r/${subreddit}/top.json?limit=100`)
		.then(({ data }) => {
			return data.data.children
			.filter((post) => post.data.domain.includes('youtube'))
			.map((post) => ({ url: post.data.url, thumbnail: post.data.thumbnail }))
		})
}
