# Local braces security backport

The registry release braces 3.0.3 has no upstream fix for [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). This repository keeps its original name/version and carries the source patch in patches/. We do not rename the package, suppress audit results, or claim that the advisory database recognizes this local backport.

The patch bounds parser nesting for braces and parentheses and validates supplied AST child traversal, parent chains, cycles, node count and scalar values before every recursive walker. Patterns with excessive structure raise SyntaxError; invalid AST values raise TypeError. The immutable maximum AST depth is 100 and the maximum visited node count is 20,000. Ordinary patterns, ranges, escaping, quotes, arrays and the public API remain supported.

pnpm applies the native patchedDependencies entry during installation. npm uses patch-package in postinstall, with --error-on-fail, followed by the security regression check. patch-package is an installation dependency so production installs can apply the same patch when the library is present. Do not disable npm install scripts; if scripts were disabled for a trusted staging step, run npm run postinstall before using the installed tree. CI must run the dependency security check after installation.

Run npm run test:dependency-security or pnpm test:dependency-security to check the actual installed source hashes and regression cases. npm/pnpm audit may continue to list the upstream braces advisory because the metadata deliberately remains 3.0.3. A missing or changed patch fails the source checks. Review the upstream change and remove this backport only after a verified fixed release is available.
