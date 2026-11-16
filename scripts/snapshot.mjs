// A successful discovery check does not need a new commit when its published data is unchanged.
export function nextDiscoverySnapshot(previous, repositories, candidates, checkedAt) {
  const same = typeof previous?.lastSuccessfulSync === 'string'
    && Array.isArray(previous.repositories)
    && Array.isArray(previous.candidates)
    && JSON.stringify(previous.repositories) === JSON.stringify(repositories)
    && JSON.stringify(previous.candidates) === JSON.stringify(candidates);
  if (same) return {changed: false, snapshot: previous};
  return {changed: true, snapshot: {lastSuccessfulSync: checkedAt, repositories, candidates}};
}
