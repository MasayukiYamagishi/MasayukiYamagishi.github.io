import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
const loadPackage = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(fs.readFileSync(new URL('./braces-patch.json', import.meta.url), 'utf8'));

/** Locate installed copies instead of trusting lockfile version labels. */
function installedBraces() {
  const candidates = [];
  const lock = path.join(root, 'package-lock.json');
  if (fs.existsSync(lock)) {
    for (const name of Object.keys(JSON.parse(fs.readFileSync(lock, 'utf8')).packages || {})) {
      if (/(^|\/)node_modules\/braces$/.test(name)) candidates.push(path.join(root, name));
    }
  }
  const virtualStore = path.join(root, 'node_modules', '.pnpm');
  if (fs.existsSync(virtualStore)) {
    for (const name of fs.readdirSync(virtualStore)) {
      if (name.startsWith('braces@')) candidates.push(path.join(virtualStore, name, 'node_modules', 'braces'));
    }
  }
  return [...new Set(candidates.filter(name => fs.existsSync(path.join(name, 'package.json'))).map(name => fs.realpathSync(name)))];
}

/** Construct a supplied AST independently of the string parser. */
function chainAst(depth) {
  let node = { type: 'text', value: 'x' };
  while (depth-- > 0) node = { type: 'paren', nodes: [node] };
  return { type: 'root', nodes: [node] };
}

const packages = installedBraces();
test('installed braces copies carry the bounded-traversal backport', { skip: packages.length === 0 ? 'braces is absent from this installed dependency subset' : false }, () => {
  for (const directory of packages) {
    const info = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
    assert.equal(info.name, 'braces');
    assert.equal(info.version, '3.0.3');
    for (const [file, expected] of Object.entries(manifest.files_sha256)) {
      const actual = crypto.createHash('sha256').update(fs.readFileSync(path.join(directory, file), 'utf8').replace(/\r\n/g, '\n')).digest('hex');
      assert.equal(actual, expected, 'Security patch is missing or changed: ' + path.join(directory, file));
    }
    const braces = loadPackage(directory);
    assert.equal(braces.compile('a/{b,c}/d'), 'a/(b|c)/d');
    assert.deepEqual(braces.expand('a/{b,c}/d'), ['a/b/d', 'a/c/d']);
    assert.deepEqual(braces.expand('{01..03}'), ['01', '02', '03']);
    assert.deepEqual(braces(['a/{b,c}', '{1..3}'], { expand: true }), ['a/b', 'a/c', '1', '2', '3']);
    assert.equal(braces.stringify(braces.parse('a/\\{b,c\\}')), 'a/{b,c}');
    assert.doesNotThrow(() => braces.compile('{'.repeat(99) + 'a,b' + '}'.repeat(99)));
    for (const pair of [['{', '}'], ['(', ')']]) {
      const input = pair[0].repeat(3000) + 'x' + pair[1].repeat(3000);
      for (const method of ['parse', 'compile', 'expand', 'stringify', 'create']) {
        assert.throws(() => braces[method](input, { maxDepth: Infinity }), SyntaxError);
      }
      assert.throws(() => braces(['safe', input]), SyntaxError);
    }
    for (const method of ['compile', 'expand', 'stringify']) {
      assert.throws(() => braces[method](chainAst(20000)), SyntaxError);
      const cycle = { type: 'root', nodes: [] };
      cycle.nodes.push(cycle);
      assert.throws(() => braces[method](cycle), SyntaxError);
      const parentCycle = { type: 'paren', nodes: [] };
      parentCycle.parent = parentCycle;
      assert.throws(() => braces[method](parentCycle), SyntaxError);
      assert.throws(() => braces[method]({ type: 'root', nodes: [{ type: 'text', value: [[['x']]] }] }), TypeError);
      const wide = { type: 'root', nodes: Array.from({ length: 20001 }, () => ({ type: 'text', value: 'x' })) };
      assert.throws(() => braces[method](wide), SyntaxError);
    }
  }
});
