import { CLIENT_APP } from "@/constants/web.constants";

/**
 * App Links (Android). Проверка:
 * https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://www.tezkyzmat.kg&relation=delegate_permission/common.handle_all_urls
 * Нужно: NEXT_PUBLIC_ANDROID_SHA256="AA:BB:...,CC:DD:..." (release + Play App Signing)
 * и intent-filter с android:autoVerify="true" для https://www.tezkyzmat.kg.
 */
export const dynamic = "force-static";

export function GET() {
	const body = [
		{
			relation: ["delegate_permission/common.handle_all_urls"],
			target: {
				namespace: "android_app",
				package_name: CLIENT_APP.android.packageName,
				sha256_cert_fingerprints: CLIENT_APP.android.sha256,
			},
		},
	];
	return new Response(JSON.stringify(body), {
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
