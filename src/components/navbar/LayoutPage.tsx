"use client";
import { FC, ReactNode, useState } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

interface LayoutPageProps {
	children: ReactNode;
}

const LayoutPage: FC<LayoutPageProps> = ({ children }) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})
	);
	// const dehydratedState = dehydrate(client);

	return (
		<div className="flex flex-col justify-between min-h-[100vh]">
			<QueryClientProvider client={client}>
				<Header />
				<main>{children}</main>
				<Footer />
			</QueryClientProvider>
		</div>
	);
};

export default LayoutPage;
