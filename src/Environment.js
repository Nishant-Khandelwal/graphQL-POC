import { Environment, Network, RecordSource, Store, QueryResponseCache } from 'relay-runtime';

const cache = new QueryResponseCache({ size: 100, ttl: 100000 });

function fetchQuery(operation, variables, cacheConfig) {
	const queryId = operation.name;
	const cachedData = cache.get(queryId, variables);
	const forceLoad = cacheConfig && cacheConfig.force;
	if (!forceLoad && cachedData) {
		console.log("Cache Hit..");
		return cachedData;
	}
	if (forceLoad) {
		// clear() means to reset all the cache, not only the entry addressed by specific queryId.
		console.log("Clearing Cache..");
		cache.clear();
	}
	return fetch('/graphql', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			query: operation.text,
			variables
		})
	}).then((response) => {
		const data = response.json();
		cache.set(queryId, variables, data);
		return data;
	});
}

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({
	network,
	store
});
