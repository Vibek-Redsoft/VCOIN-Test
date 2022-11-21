export default async function consumeAPI({ token, userIsSuperAdmin }) {
	const baseUrl = "https://us-central1-imvu-vcoin-dashboard.cloudfunctions.net";
	const adminEndpoint = "ConsumeData";
	const publicEndpoint = "PublicData";

	const consumeURLAdmin = `${baseUrl}/${adminEndpoint}`;
	const consumeURLPublic = `${baseUrl}/${publicEndpoint}`;

	const apiResult = {};

	const headerContent = {
		method: "post",
		headers: new Headers({
			Authorization: "Bearer " + token,
		}),
	};

	const res = userIsSuperAdmin
		? await fetch(consumeURLAdmin, headerContent)
		: await fetch(consumeURLPublic);

	const result = res;
	const resultJson = result.ok ? await result.json() : false;

	if (result.ok) apiResult.data = resultJson;

	return { apiResult, status: result.status };
}
