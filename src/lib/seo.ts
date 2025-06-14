 
// lib/seo.ts
export const generateMetadata = ({
	title,
	description,
	url,
	image,
}: {
	title: string;
	description: string;
	url: string;
	image: string;
}) => ({
	title,
	description,
  image,
	robots: "index, follow",
	authors: [{ name: "TezKyzmat Info" }],
	openGraph: {
		title,
		description,
		url,
		type: "article",
		images: [{ url: image }],
	},
	alternates: {
		canonical: url,
	},
});

