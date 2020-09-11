import { useEffect, useState } from "react"

export default function Playlists() {
	const getPlaylist = async () => {
		return await fetch('/api/playlists?subreddit=videos')
			.then((res) => res.json())
			.then(({ collection }) => setPosts(collection))
	}
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPlaylist();
	}, [])

	const postStyle = {
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'center',
		alignItems: 'center',
		padding: '2rem',
		backgroundColor: 'white',
		borderRadius: '6px',
		boxShadow: 'rgba(0, 0, 0, 0.4) 4px 4px 6px 0',
		margin: '2.4rem',
	}
	const postElements = () => posts.map((post) => <div key={post.url} style={postStyle}><a style={{ display: 'inline-block' }} href={post.url}><img src={post.thumbnail}/></a></div>)

	return(
		<main>
			<section>
				{postElements()}
			</section>
			<style jsx>{`
				section {
					width: 100vh;
					box-sizing: border-box;
					overflow: auto;
					display: flex;
					flex-wrap: wrap;
					box-sizing: border-box;
					justify-content: center;
					align-item: center;
					overflow: auto;
				}
			`}</style>
			<style jsx global>{`
				html {
					font-size: 10px;
				}
				body {
					// height: 100vh;
					width: 100vw;
					margin: 0;
					background-color: #4285f4;
					background-image: linear-gradient(135deg, #4285f4 0%, #b721ff 100%);
				}
				#__next {
					height: 100vh;
					overflox: auto;
				}
			`}</style>
		</main>
	)
}
