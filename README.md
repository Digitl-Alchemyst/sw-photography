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
