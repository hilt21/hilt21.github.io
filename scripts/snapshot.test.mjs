import {test} from 'node:test';
import assert from 'node:assert/strict';
import {nextDiscoverySnapshot} from './snapshot.mjs';

const prior = {
  lastSuccessfulSync: '2026-11-14T12:00:00.000Z',
  repositories: [{name: 'aboutMe', pagesUrl: 'https://example.com/aboutMe/'}],
  candidates: [],
};

test('unchanged discovery retains published bytes and timestamp', () => {
  const next = nextDiscoverySnapshot(prior, structuredClone(prior.repositories), [], '2026-11-16T12:00:00.000Z');
  assert.equal(next.changed, false);
  assert.strictEqual(next.snapshot, prior);
  assert.equal(next.snapshot.lastSuccessfulSync, prior.lastSuccessfulSync);
});

test('a changed public Pages URL updates the snapshot', () => {
  const repositories = [{name: 'aboutMe', pagesUrl: 'https://example.org/aboutMe/'}];
  const next = nextDiscoverySnapshot(prior, repositories, [], '2026-11-16T12:00:00.000Z');
  assert.equal(next.changed, true);
  assert.equal(next.snapshot.lastSuccessfulSync, '2026-11-16T12:00:00.000Z');
  assert.deepEqual(next.snapshot.repositories, repositories);
});

test('initial or malformed snapshot is rebuilt from validated discovery', () => {
  for (const previous of [null, {}, {repositories: prior.repositories, candidates: []}]) {
    const next = nextDiscoverySnapshot(previous, prior.repositories, [], '2026-11-16T12:00:00.000Z');
    assert.equal(next.changed, true);
  }
});
