import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo.constants'

const Head = () => {
	return (
		<head>
			<meta
				name='google-site-verification'
				content='fQ0IqJz2eTDIDxVnU7cEV8OYPUrHscc9wXzSRQaozgY'
			/>
			 <meta name="facebook-domain-verification" content="s4jfzui6t9wcu2b5j3jqaaiaglet98" />
			<link
				rel='manifest'
				href='/manifest.json'
			/>

			<link
				rel='icon'
				href='/favicon.ico'
				type='image/x-icon'
			/>
			<link
				rel='apple-touch-icon'
				sizes='180x180'
				href='/icons/icon-192x192.webp'
			/>

			<meta
				name='description'
				content={SITE_DESCRIPTION}
			/>
			<meta
				property='og:title'
				content={SITE_NAME}
			/>
			<meta
				property='og:description'
				content={SITE_DESCRIPTION}
			/>

			{/* <meta
				name='apple-mobile-web-app-status-bar-style'
				content='black-translucent'
			/> */}
			<meta
				name='robots'
				content='index, follow'
			/>
		</head>
	)
}

export default Head

