import GoogleButton from 'react-google-button';
import { Helmet } from 'react-helmet';
import Router from 'next/router'

export default function Index() {
	const connect = () => {
		gapi.load('client:auth2', () => {
			gapi.client
				.init({
					apiKey: 'AIzaSyAWyaE1dyM_qtZsZ96Th-Yxxqo1PtKVdeE',
					clientId:
						'339671057669-vq657ohkfllnoa8q4tkiun5he8kdub0d.apps.googleusercontent.com',
					scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
					discoveryDocs: [
						'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
					],
				})
				.then((gapi as any).auth2.getAuthInstance().signIn)
				.then(() => gapi.client.load('youtube', 'v3'))
				.then(() => Router.push('/playlists'));
		});
	};

	return (
			<main>
				<div>Reddit playlist creator</div>

				<GoogleButton onClick={() => connect()}></GoogleButton>
				<style jsx>{`
					div {
						font-size: 2.4rem;
						margin-bottom: 1.6rem;
						color: #444;
					}
					main {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 30rem;
						height: 30rem;
						padding: 2rem;
						background-color: white;
						border-radius: 6px;
						box-shadow: rgba(0, 0, 0, 0.4) 4px 4px 6px 0;
					}
				`}</style>

				<style global jsx>{`
					html {
						font-size: 10px;
					}
					body {
						height: 100vh;
						width: 100vw;
						margin: 0;
						background-color: #4285f4;
						background-image: linear-gradient(135deg, #4285f4 0%, #b721ff 100%);
					}
					#__next {
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				`}</style>

				<Helmet>
					<script src={'https://apis.google.com/js/api.js'}></script>
				</Helmet>
			</main>
	);
}
