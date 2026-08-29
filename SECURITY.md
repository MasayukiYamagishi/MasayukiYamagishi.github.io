# Security Policy

## Supported Versions

This repository is a statically generated portfolio website.

| Target                                                         | Supported |
| -------------------------------------------------------------- | --------- |
| The current production deployment and the latest `main` branch | Yes       |
| Older commits, archived builds, forks, and modified copies     | No        |

## System and Scope

This repository contains the source code and content for
<https://masayukiyamagishi.github.io/>.

The website is built as a static Next.js export and deployed to GitHub Pages
through GitHub Actions.

The production website does not intentionally provide:

- user accounts or authentication
- server-side application logic
- a database
- payment functionality
- contact forms or other user-submitted content
- storage of visitor credentials or sensitive personal information

Repository-controlled YAML, MDX, images, build scripts, dependencies, and
GitHub Actions workflows are processed at build time.

This policy covers:

- the source code in this repository
- the deployed portfolio website
- build and image-processing scripts
- GitHub Actions workflows used to build and deploy the website
- repository configuration when it can affect the integrity of the deployment

## Threat Model and Trust Boundaries

Public website visitors are untrusted. They can control browser requests,
URLs, fragments, and navigation to external links, but they cannot directly
modify portfolio content at runtime.

Repository changes, dependencies, and GitHub Actions can affect the generated
deployment artifact. Pull request content and dependency updates must therefore
be treated as untrusted until reviewed and checked.

GitHub, GitHub Pages, package registries, external websites, and other
third-party services are outside this repository's direct control.

## Security Properties

The following properties must hold:

- The deployed website must be built from the intended `main` branch.
- Deployment workflows must use only the permissions required for their jobs.
- Secrets, credentials, private keys, and non-public personal information must
  not be committed or included in static build artifacts.
- Pull requests must not be able to obtain deployment credentials or modify the
  production deployment without satisfying repository protections.
- Invalid repository-controlled metadata must fail the build rather than be
  silently accepted.
- User-visible content must not allow unintended script execution in a
  visitor's browser.
- External links opened in a new browsing context must not give the destination
  access to the originating page.
- Third-party dependencies and GitHub Actions must be reviewed and updated
  when relevant security fixes are available.

## Reporting a Vulnerability

Please do not report security vulnerabilities through a public GitHub issue,
discussion, pull request, or social media post.

Use GitHub's private vulnerability reporting form:

<https://github.com/MasayukiYamagishi/MasayukiYamagishi.github.io/security/advisories/new>

Include as much of the following information as possible:

- a concise description of the issue
- the affected URL, file, workflow, or commit
- reproducible steps
- the expected and actual behavior
- the realistic security impact
- a minimal proof of concept, if needed
- any known mitigations

Do not include unrelated personal information, active credentials, or secrets.
Redact sensitive values whenever possible.

Reports may be submitted in Japanese or English.

## Reportable Security Issues

Examples of reportable issues include:

- cross-site scripting or unintended script execution on the deployed website
- exposure of credentials, secrets, or non-public information
- a GitHub Actions or dependency issue that can compromise the build or
  production deployment
- unauthorized modification of the deployed site
- arbitrary file access or unsafe file writes in repository build scripts
- a GitHub Pages or custom-domain configuration issue that creates a realistic
  takeover risk
- a vulnerable dependency that is demonstrably exploitable in this website or
  its build and deployment process

## Out of Scope

The following are generally out of scope unless a concrete security impact on
this repository or its production deployment is demonstrated:

- information intentionally published in the portfolio, such as profile,
  employment, project, and skill information
- vulnerabilities affecting only old commits, forks, or locally modified copies
- UI issues affecting only the local Storybook or development server
- self-XSS requiring a user to paste code into their own browser console
- missing security headers without a demonstrated exploit
- automated scanner output without manual validation
- dependency advisories that are not reachable or exploitable in this project
- vulnerabilities in GitHub, GitHub Pages, browsers, browser extensions, package
  registries, or linked third-party websites
- social engineering, phishing, physical attacks, or attacks against personal
  accounts unrelated to this repository
- denial-of-service testing, high-volume automated scanning, or any testing
  that may degrade GitHub Pages or another third-party service

Please report vulnerabilities in third-party products directly to the
appropriate vendor.

## Response Process

The maintenance targets for a valid report are:

- acknowledgment within 7 calendar days
- an initial assessment within 14 calendar days
- periodic updates when investigation or remediation takes longer

These are targets rather than guaranteed service-level commitments.

Fix and disclosure timing depends on severity, exploitability, affected users,
and third-party coordination. Please allow a reasonable period for remediation
before public disclosure.

This project does not currently operate a paid bug bounty program.

## Known Limitations

The website is hosted on GitHub Pages. TLS termination, some HTTP response
headers, availability controls, and platform-level behavior are managed by
GitHub rather than by this repository.

Security issues in third-party services may require coordination with their
respective maintainers.
