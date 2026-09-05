import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('synthetic fixture is explicitly synthetic and deterministic', () => {
  const fixture = JSON.parse(fs.readFileSync(new URL('./fixtures/synthetic-project.json', import.meta.url)));
  assert.equal(fixture.synthetic, true);
  assert.equal(fixture.project_id, 'SYN-PROJ-001');
  assert.equal(fixture.lifecycle[0], 'PROJECT_CREATED');
});
