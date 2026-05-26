# One Bite No Thank You

A static recipe site for the keepers — recipes that survived the family taste-test. Built with [Astro](https://astro.build) and designed to be hosted free on [Netlify](https://netlify.com). Recipes are stored as markdown files in `src/content/recipes/` and built into a fast static site.

## What's included

- **Editorial design.** Warm paper background, serif headlines (Fraunces), generous spacing.
- **Search & category filters** on the homepage.
- **Serving scaler** on each recipe page — tap +/− and every ingredient amount updates instantly. Common fractions render as `½`, `¼`, etc.
- **Type-safe recipe schema.** If you forget a field, the build fails with a helpful error.
- **Zero database.** Every recipe is a plain `.md` file in your git repo.

## Running it locally

You'll need [Node.js 20+](https://nodejs.org).

```bash
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

## Adding a new recipe

Create a new file in `src/content/recipes/` named `your-recipe-slug.md`. The URL will be `/recipes/your-recipe-slug/`. Use this template:

```markdown
---
title: Recipe Name Here
description: One sentence describing it.
category: Dinner   # one of: Breakfast, Lunch, Dinner, Dessert, Sides, Drinks, Snacks, Basics
tags: [tag1, tag2]
servings: 4
prepTime: 15       # minutes
cookTime: 30       # minutes
uses:              # optional — other recipe filenames this one builds on
  - everyday-pizza-dough
ingredients:
  - amount: 2
    unit: cup
    name: all-purpose flour
  - amount: 3
    name: large eggs              # no unit for whole/countable items
  - section: For the sauce        # optional grouping header
  - amount: 0.5
    unit: cup
    name: olive oil
notes: Any tips, variations, or storage notes.
source: Aunt Linda                # optional
addedBy: Me                       # optional
---

1. First step. Use **bold** for actions and *italics* for emphasis.
2. Second step.
3. Third step.
```

### Cross-linking recipes (Uses / Used in)

When a recipe builds on another — a pizza that uses your pizza dough, a salad that uses a homemade vinaigrette — list the filename (without `.md`) in the `uses` field:

```yaml
uses:
  - everyday-pizza-dough
  - quick-tomato-sauce
```

Then on every recipe page you get two automatic sections at the bottom:

- **Uses** — what this recipe builds on (from the `uses` field above).
- **Used in** — every other recipe whose `uses` includes this one. Derived at build time, so you never edit it directly.

If you reference a recipe that doesn't exist (typo in the filename), it silently drops from the list rather than failing the build.

### Ingredient tips

- **`amount`** is a number, never a string. Use `0.5` for ½ cup — the site will display it as `½` automatically.
- **Skip `unit`** for whole/countable things like eggs, apples, or garlic cloves. Put "garlic cloves, minced" in `name`.
- **`section`** lines (with no `amount` or `name`) act as headers — useful for "For the dough" / "For the filling".
- Allowed units: `tsp`, `tbsp`, `cup`, `oz`, `lb`, `g`, `kg`, `ml`, `l`, `pinch`, or any custom string.

## Deploying to Netlify

### One-time setup

1. Push this folder to a new GitHub repository.
2. Go to [app.netlify.com](https://app.netlify.com), click **Add new site → Import an existing project**.
3. Connect GitHub and select your repo.
4. Netlify will detect the `netlify.toml` file and use the right build settings automatically. Click **Deploy**.

### Adding recipes after deploy

You can edit recipes directly on GitHub (click any `.md` file → pencil icon → commit), or commit from your local clone:

```bash
git add src/content/recipes/new-recipe.md
git commit -m "Add new-recipe"
git push
```

Netlify auto-rebuilds and your site is live in about 30 seconds.

### Custom domain (optional)

In Netlify: **Site settings → Domain management → Add custom domain**. Netlify provides free HTTPS automatically.

## Project structure

```
src/
├── content/
│   ├── config.ts            # Recipe schema (what fields are required)
│   └── recipes/             # ← Add new recipes here
│       ├── grandmas-apple-pie.md
│       ├── lemon-blueberry-pancakes.md
│       └── weeknight-chicken-curry.md
├── layouts/
│   └── BaseLayout.astro     # Header, footer, fonts
├── pages/
│   ├── index.astro          # Homepage (search + filters)
│   └── recipes/
│       └── [slug].astro     # Recipe detail page (serving scaler)
└── styles/
    └── global.css           # Design tokens & shared styles
```

## Tweaking the design

The color palette and typography live as CSS variables at the top of `src/styles/global.css`. Change `--wine`, `--paper`, `--saffron`, etc. and they update everywhere.
