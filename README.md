# Omneelinq: Open Multiple Links in New Tabs

![Omneelinq Logo](public/icons/48.png)

**Omneelinq** is a powerful Chrome extension that enhances your browsing efficiency by allowing you to open multiple links in new tabs at once, extract links from text, and more. Save time and streamline your online research and browsing experience.

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Usage](#usage)
4. [Features](#features)
5. [Troubleshooting](#troubleshooting)
6. [Acknowledgments](#acknowledgments)
7. [Contact and Support](#contact-and-support)

## Installation

You can install Omneelinq using one of the following methods:

### Option 1: Download from the Chrome Web Store

Visit the [Chrome Web Store page](https://chromewebstore.google.com/detail/omneelinq-multiple-url-op/dhagnbnofnklmhfdggckcpmhafmblajf) for Omneelinq and simply click the "Add to Chrome" button.

### Option 2: Manual Installation

1. Clone this repository or download the source code.

2. Install project dependencies using `pnpm` by running the following command:

   ```bash
   pnpm install

3. Build the extension using Webpack with the following command:

   ```bash
   pnpm run build
 
4. Open your Chrome browser and navigate to chrome://extensions/.

5. Enable "Developer mode" in the top right corner of the page.

6. Click the "Load unpacked" button.

7. Select the `/build` folder that was generated during the build process.

Your Omneelinq extension should now be installed and ready for use in your Chrome browser.

## Getting Started

After installation, you can get started with Omneelinq:

1. Click on the Omneelinq icon in your Chrome toolbar.

2. The Omneelinq popup will open, ready for you to use its powerful features.

## Usage

Omneelinq simplifies the following tasks:

- **Link Opening:** Easily open multiple links in new tabs by copying and pasting a list into Omneelinq. It swiftly opens each link in a new tab with a single click.

- **URL Extraction from Text/HTML:** Paste a block of text or HTML containing links, and Omneelinq will efficiently extract and open the links in new tabs, making it a breeze to access embedded URLs within content.

- **Parsing Currently Opened Tabs:** Omneelinq can also parse links from your currently opened tabs and compile them into a handy list. Share this list with colleagues or reuse it for other tasks, making your web research and multitasking a breeze.

## Features

- **Multi-Link Opening:** Open multiple links simultaneously in new tabs.

- **Link Extraction from Text:** Extract and open links from text or HTML.

- **Parsing Currently Opened Tabs:** Compile links from your currently opened tabs for easy access.


## Troubleshooting

If you encounter any issues or have questions, consider the following:

- **For Support:** Contact our support team at [khizrim@khizrim.ru](mailto:khizrim@khizrim.ru).

- **Reporting Bugs:** If you find a bug or issue, please report it on our [GitHub repository](https://github.com/khizrim/omneelinq/issues).


## Acknowledgments

Omneelinq makes use of the following libraries and tools:

- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/)
- [Gravity-UI](https://gravity-ui.com/)

## Contact and Support

If you have any questions or need support, you can reach us at [khizrim@khizrim.ru](mailto:khizrim@khizrim.ru).
