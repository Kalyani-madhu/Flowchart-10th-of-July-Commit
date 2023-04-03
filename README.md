This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses [TailwindCSS](https://tailwindcss.com) for styling and [react-flow](https://reactflow.dev) as the core canvas library.

## Getting Started

First, clone the repo and then install all the dependencies using `yarn`.

```bash
cd flowchart
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project is divided into three parts, the Sidebar, the TreeView (the file system like manager) and the Flow (the main graph view).

- Flow is divided into two subparts: the Edges and Nodes
- The Sidebar primarily consists of the TreeView component

## To-do List

- [ ] Adjust the alignment and overlap of the boxes in edit mode for the nodes
- [ ] Update the look of the edges and their labels to match the mockup
- [ ] Add arrows, and add a checkbox to manage said arrows
- [ ] Make the add node button add a node at a better location
- [ ] Figure out a way to properly colour the edge ends
