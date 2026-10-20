# Play Forge

Play Forge is a prototype for discovering games in progress, following developer updates, and giving actionable playtest feedback. It is aimed at indie developers looking for useful feedback and players who want to follow games before release.

The app is plain HTML, CSS, and browser JavaScript modules, with no build step or package install. Its seeded demo data can be used on its own, or PHP can relay saved state between browsers.

## Features

- Browse recent devlogs, a feedback-request queue, or saved devlogs. Filter by genre, engine, development stage, and requested feedback category.
- Search for games and developers.
- View game pages with their devlog history, and open individual devlogs with previous/next navigation.
- Leave feedback by category, optionally structuring it around what you tried, expected, and observed. Developers can reply, mark notes as seen, or mark them as acted on.
- Create a game and its first devlog, or publish a devlog for an existing game. Devlogs can include a direct video URL.
- View and edit the selected demo developer's profile, browse their games, and view or copy their feedback portfolio as Markdown.
- Switch between light and dark themes; the theme preference is stored in the browser.
- Preview a sponsorship flow on game pages. Sponsorship is a mockup and does not process payments.

## Pages and routes

The app uses hash routes:

| Route | Page |
| --- | --- |
| `#/` | Discover feed |
| `#/queue` | Discover's feedback-request queue |
| `#/game/game-1` | Game details and devlog thread |
| `#/devlog/game-1-dl-1` | Devlog and feedback |
| `#/profile/dev-1` | Developer profile |
| `#/portfolio/dev-1` | Developer feedback portfolio |
| `#/my-games` | Current demo user's profile and games |
| `#/create` | Create a game or devlog |

The `?me=dev-2` query parameter selects a different seeded demo user, for example `http://localhost/pou-hub/?me=dev-2`. This is only a demo identity selector, not authentication.

## Run locally

The project has no JavaScript package-install step. With XAMPP, put the folder in `C:\xampp\htdocs\pou-hub`, start Apache, then visit:

```text
http://localhost/pou-hub/
```

Serving it through Apache/PHP enables `api/state.php` to read and write `data/state.json`. The web server needs permission to write that file. To inspect the front end without PHP, use a static HTTP server (do not open `index.html` directly as a `file:` URL); the app will fall back to its JavaScript seed data when API requests fail, and changes will not persist reliably or sync between browsers. See [SETUP.md](SETUP.md) for XAMPP and two-device setup.

## Where content lives

- `src/data/developers.js` defines demo developer profiles.
- `src/data/games.js` defines demo games and their feedback status.
- `src/data/devlogs.js` builds demo devlogs from each game's `devlogPlan`.
- `src/data/generators.js` supplies generated devlog titles and body text.
- `src/data/feedback.js` defines seeded feedback and replies.
- `src/state.js` loads and saves app data; `api/state.php` relays it to `data/state.json`.
- `src/router.js` maps hash URLs such as `#/game/game-1` and `#/devlog/game-1-dl-1` to pages.

## Add or change demo content

### Add a game or developer

Add a developer object to `src/data/developers.js` with a unique `id`, `name`, `handle`, and `bio`. Add a game object to `src/data/games.js` and set its `developerId` to an existing developer ID. For example:

```js
{
  id: 'game-13',
  title: 'Moonlit Workshop',
  developerId: 'dev-1',
  genre: 'Simulation',
  engine: 'Godot',
  stage: 'Prototype',
  shortDescription: 'Build tiny machines in a workshop after dark.',
  thumbnailSeed: 'moonlitworkshop',
  needsFeedback: true,
  feedbackCategory: 'Mechanics',
  devlogPlan: { count: 2, recentDaysAgo: 1, spacingDays: 5 },
}
```

Keep IDs unique and use the existing genre, engine, stage, and feedback category values where possible, since the UI filters are built around those options. `devlogPlan` controls how many generated posts are made, how many days ago the newest one appears, and the spacing in days between posts. The newest generated post is longer than the older ones.

### Write a specific dummy devlog

For bulk filler, adjust `devlogPlan`; `src/data/devlogs.js` uses `makeDevlogTitle` and `makeDevlogContent` to create sample text. For a post with exact wording, append a hand-authored object to the `out` array inside `buildDevlogs()` before its final sort:

```js
out.push({
  id: 'game-13-dl-notes-1',
  gameId: 'game-13',
  title: 'The first workshop loop is playable',
  content: 'I connected the workbench, inventory, and first crafting recipe. The loop works, but the recipe hints are easy to miss. Can someone try crafting the brass lamp without being told where to look?',
  timestamp: '2026-09-28T12:00:00.000Z',
  imageSeed: 'moonlitworkshop-workbench',
});
```

The `gameId` must match a game in `games.js`; the `id` must be unique. Use an ISO timestamp so newest-first lists and previous/next navigation sort correctly. `imageSeed` currently feeds a visual placeholder, not an uploaded image. The detail page displays `title`, `content`, timestamp-derived age, and the placeholder; feedback is associated with the devlog's ID.

The generator also accepts optional voice pools, configured through `src/data/voices.js`, if you want varied but still generated wording rather than fixed posts.

### Add feedback

Seed feedback in `src/data/feedback.js`. Each item should reference an existing devlog ID using its `postId` field; the feedback view also expects `authorId`, category, text, and timestamp. Follow the neighboring entries in that file for the full shape, including optional replies.

## Use the in-app form

The Create Devlog page can create a game and its first post, or publish a post for an existing game owned by the selected demo user. The current user defaults to `dev-1`; use a query parameter such as `?me=dev-2` to preview another seeded profile. A new game includes genre, engine, stage, and feedback-request settings. Each post needs a title and update text, and may include a direct URL to a browser-playable video. The image/GIF attachment control is a placeholder only; it does not upload files.

When PHP is available, form changes are saved as the full app state in `data/state.json`; open clients poll for updates every three seconds. To return to the source seed data, use **Reset demo data** in the footer. This overwrites the JSON state with the current JavaScript seeds, so do not use it if you need to preserve form-created demo content.

## Extend the prototype

To add a page, create a renderer under `src/pages/`, register its hash pattern and render call in `src/router.js`, and add event bindings in `src/actions/bindings.js` if it needs interactions. Reuse the existing selectors and components where possible. For new form behavior, keep writes in the relevant action module and update `STATE` through the functions in `src/state.js`.

## Prototype limitations

- There is no authentication or authorization; changing `?me=` only selects a seeded demo profile.
- The PHP endpoint stores the entire app state as one JSON document. It is intended for a local demo, not concurrent production use; overlapping writes can replace each other's changes.
- The API currently allows cross-origin requests and has no access control. Do not expose it publicly with real user data.
- Game and devlog artwork is generated placeholder imagery; the Create Devlog image/GIF attachment control does not upload files. Video playback uses a supplied direct URL.
- The sponsorship panel is a visual preview only; there is no payment integration.
- If `data/state.json` already contains state, it takes precedence over the JavaScript seeds at startup. Editing seed files alone will not change that saved state until you reset it or remove the saved state while the app is stopped.