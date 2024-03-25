<h1><ul><b>
   
</b></ul></h1>
<p align="center">
  <br />
  <img width="650" src="./public/global/banner.png" alt="VagaBlog Banner">
  <br />
</p>

 <p svg align="center">
<img src="https://readme-typing-svg.demolab.com?font=Noto+Serif&pause=3000&color=2FA4D7&center=true&vCenter=true&width=375&lines=Next+Alchemy+Boilerplate+14.1.0" alt=typing>
 </p>

Basic boilerplate for Next.js projects using Typescript, Tailwind; to be added: testing features from Jest & React Testing Library & Commit Linting with Lint-Staged & Huksy

<br>

<h2><ul><b>Features</b></ul></h2>

<h4>
    Testing<br>
        => Jest <br>
        => React Testing Library <br>
    Commits<br>
        => Husky <br>
        => Lint-Staged <br>
    Imports<br>
        => @ = ./src <br>
        => @/c = ./src/components <br>
        => @/h = ./src/hooks <br>
        => @/l = ./src/lib <br>
        => @/u = ./src/lib/util <br>
        => # = ./ <br>


</h4>

<h3><ul><b>Project State</b></ul></h3>

This biolerplate project is setup for Next.js 14.1.x [This project will be maintained to remain current with Next.js 14.1 until otherwise noted.] This is ready to use in its current state 
<br>
This project will be set up with Jest and React Testing Library for code testing, it has been configured to work with Typescript. Custom imports have been set up. Eslint settings are preconfigured using a moderately strict ruleset. Uses ESLint to parse to Typescript. Sets specific rules for for testing envrioment (files within the **tests** directory or files with names ending in .spec.js, .test.js, .ts, .jsx, or .tsx). Configured Import Resolver to handle custom import settings. Uses Lint-Staged & Husky to Lint & format with prettier all files before commiting updates.<br> <br>

<h3>🚀 Tailwind CSS Extensions</h3><br>
🌈 Neon Shadows <br>
🌀 Slower Spin Animation <br>
🙈 Scrollbar Hide <br>


<h3><ul><b>How to use</b></ul></h3>

## Install Node Modules

    npm install

## Run Application

    npm run dev

The app will start on [http://localhost:3000](http://localhost:3000) in your browser. 

### Deploy

Delop to your testing enviroment on vercel

    vercel

Deploy to your production enviroment on vercel

    vercel --prod

### Formatting and Checks

Run ESLint

    npm run lint

Prettier Code Check

    prettier --check.

Prettier Code Format

    prettier --write.


## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
- [Configuration](#configuration)
  - [Step 1. Set up the environment](#step-1-set-up-the-environment)
  - [Step 2. Set up the project locally](#step-2-set-up-the-project-locally)
  - [Step 3. Run Next.js locally in development mode](#step-3-run-nextjs-locally-in-development-mode)
  - [Step 4. Deploy to production](#step-4-deploy-to-production)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my personal site?](#how-can-i-remove-the-next-steps-block-from-my-personal-website)
- [Next steps](#next-steps)

## Project Overview

| [Personal Website](https://template-nextjs-personal-website.sanity.build/)                                                | [Studio](https://template-nextjs-personal-website.sanity.build/studio)                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| ![Personal Website](https://user-images.githubusercontent.com/6951139/206395107-e58a796d-13a9-400a-94b6-31cb5df054ab.png) | ![Sanity Studio](https://user-images.githubusercontent.com/6951139/206395521-8a5f103d-4a0c-4da8-aff5-d2a1961fb2c0.png) |

### Important files and folders

| File(s)                                                    | Description                                             |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| `sanity.config.ts`                                         | Config file for Sanity Studio                           |
| `sanity.cli.ts`                                            | Config file for Sanity CLI                              |
| `/app/studio/[[...tool]]/Studio.tsx`                       | Where Sanity Studio is mounted                          |
| `/app/api/revalidate/route.ts`                             |  Serverless route for triggering ISR                    |
| `/app/api/draft/route.ts`                                  | Serverless route for triggering Draft mode              |
| `/sanity/schemas`                                          | Where Sanity Studio gets its content types from         |
| `/sanity/plugins`                                          | Where the advanced Sanity Studio customization is setup |
| `/sanity/loader/loadQuery.ts`,`/sanity/loader/useQuery.ts` | Configuration for the Sanity Content Lake client        |

## Configuration

### Step 1. Set up the environment

Use the Deploy Button below. It will let you deploy the starter using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-sanity-example) as well as connect it to your Sanity Content Lake using [the Sanity Vercel Integration][integration].

[![Deploy with Vercel](https://vercel.com/button)][vercel-deploy]

### Step 2. Set up the project locally

[Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) that was created for you on your GitHub account. Once cloned, run the following command from the project's root directory:

```bash
npx vercel link
```

Download the environment variables needed to connect Next.js and the Studio to your Sanity project:

```bash
npx vercel env pull
```

### Step 3. Run Next.js locally in development mode

```bash
npm install && npm run dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your personal website should be up and running on [http://localhost:3000][localhost-3000]! You can create and edit content on [http://localhost:3000/studio][localhost-3000-studio].

### Step 4. Deploy to production

To deploy your changes to production you use `git`:

```bash
git add .
git commit
git push
```

Alternatively, you can deploy without a `git` hosting provider using the Vercel CLI:

```bash
npx vercel --prod
```

## Questions and Answers

### It doesn't work! Where can I get help?

In case of any issues or questions, you can post:

- [GitHub Discussions for Next.js][vercel-github]
- [Sanity's GitHub Discussions][sanity-github]
- [Sanity's Community Slack][sanity-community]

### How can I remove the "Next steps" block from my personal website?

You can remove it by deleting the `IntroTemplate` component in `/app/(personal)/layout.tsx`.

## Next steps

- [Join our Slack community to ask questions and get help][sanity-community]
- [How to edit my content structure?][sanity-schema-types]
- [How to query content?][sanity-groq]
- [What is content modelling?][sanity-content-modelling]

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Ftemplate-nextjs-personal-website&project-name=nextjs-personal-website&repository-name=nextjs-personal-website&demo-title=Personal+Website+with+Built-in+Content+Editing&demo-description=A+Sanity-powered+personal+website+with+built-in+content+editing+and+instant+previews.+Uses+App+Router.&demo-url=https%3A%2F%2Ftemplate-nextjs-personal-website.sanity.build%2F&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F6951139%2F206395107-e58a796d-13a9-400a-94b6-31cb5df054ab.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dtemplate-nextjs-personal-website
[integration]: https://www.sanity.io/docs/vercel-integration?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[`.env.local.example`]: .env.local.example
[nextjs]: https://github.com/vercel/next.js
[sanity-create]: https://www.sanity.io/get-started/create-project?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-deployment]: https://www.sanity.io/docs/deployment?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-community]: https://slack.sanity.io/
[sanity-schema-types]: https://www.sanity.io/docs/schema-types?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-github]: https://github.com/sanity-io/sanity/discussions
[sanity-groq]: https://www.sanity.io/docs/groq?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-content-modelling]: https://www.sanity.io/docs/content-modelling?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-webhooks]: https://www.sanity.io/docs/webhooks?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/studio
[vercel]: https://vercel.com
[vercel-github]: https://github.com/vercel/next.js/discussions
[personal-website-pages]: https://github.com/sanity-io/template-nextjs-personal-website
[presentation]: https://www.sanity.io/docs/presentation