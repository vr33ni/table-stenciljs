# Stencil Web Component - Table based on AG Grid


<!-- TABLE OF CONTENTS -->
<details id="tableContent">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#project-structure">Project structure</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a><li>
      </ul>
    </li>
    <li><a href="#usage-of-components">Usage</a></li>
    <li><a href="#local-development">Local development</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This repository contains an implementation of a Table component and it's Storybook sourcecode using Stencil web components.

Use it to build & run storybook and distribute the web component.

### Built With

[Stencil web components][Stencil-url]


<p align="right"><a href="#tableContent">back to top</a></p>


## Project structure 

### Overall structure

The repository has a monorepo architecture using Lerna.

 <br>

---

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- [Node](https://nodejs.org/en/) > v16 .
- [Yarn](https://classic.yarnpkg.com/en/) > v1.22.10, or [Npm](https://www.npmjs.com/) > v8.


---

## General usage of web components

Explore our currently available web components in Storybook. You will also find the code snippets needed to include them in your application.

https://vr33ni.github.io/table-stenciljs

 <br>

---

## Local development

### Installation

```bash
git clone https://github.com/vr33ni/table-stenciljs.git
```

Install all the modules and dependencies listed on the ```package.json``` file with:

```bash
yarn/npm install
```

<p align="right"><a href="#tableContent">back to top</a></p>

 <br>

---

### Build Storybook

To run Storybook to view and test the Stencil Web Component, you first need to export it as a static web app.

For building the application for the first time (to load fonts, assets and stylesheets) run:

```bash
yarn/npm run build:components
```

### Start Storybook

To run storybook locally (automatically rebuilds on changes), run:

```bash
yarn/npm run storybook
```


<p align="right"><a href="#tableContent">back to top</a></p>

 <br>

---

### Contributing

+ Clone the repository
+ Create an issue with a proper description (Naming convention: 'name-of-component: feature/bug')
+ Create a pull request with a proper description 
+ Request a review 


<p align="right"><a href="#tableContent">back to top</a></p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Stencil-url]: https://stenciljs.com/
