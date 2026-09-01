import Link from "next/link";

export interface Crumb {
	name: string;
	href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
	return (
		<nav aria-label="breadcrumb" className="mb-4 overflow-x-auto whitespace-nowrap text-[13px] text-[#777]">
			<ol className="flex items-center gap-1.5">
				{items.map((c, i) => (
					<li key={i} className="flex items-center gap-1.5">
						{i > 0 ? <span aria-hidden>/</span> : null}
						{c.href && i < items.length - 1 ? (
							<Link href={c.href} className="hover:text-black hover:underline">
								{c.name}
							</Link>
						) : (
							<span className={i === items.length - 1 ? "text-black" : ""}>{c.name}</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
