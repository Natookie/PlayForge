# Pou Hub

Pou Hub is a small front-end prototype for discovering games in progress, reading developer updates, and leaving focused feedback. It is aimed at indie game developers who want useful playtest notes, and players who want to follow work before release.

The prototype includes Discover, game detail, devlog detail, developer profile, My Games, and Create Devlog views. Search, filters, saved items, feedback, and demo profiles are powered by mock data. The interface is plain HTML, CSS, and JavaScript modules; PHP provides an optional shared state relay.

## Run locally

The project has no JavaScript package-install step. With XAMPP, put the folder in `C:\xampp\htdocs\pou-hub`, start Apache, then visit:

```text
http://localhost/pou-hub/
```

Serving it through Apache/PHP enables `api/state.php` to read and write `data/state.json`. The web server needs permission to write that file. If you only want to inspect the front end, you can open `index.html` or use another static file server; API requests will fail and the app will fall back to its JavaScript seed data. Updates made in that mode are not reliably persisted.

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

For bulk filler, adjust `devlogPlan`; `src/data/devlogs.js` uses `makeDevlogTitle` and `makeDevlogContent` to create deterministic sample text. For a post with exact wording, append a hand-authored object to the `out` array inside `buildDevlogs()` before its final sort:

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

The Create Devlog page can create a game and its first post, or publish a post for an existing game owned by the selected demo user. The current user defaults to `dev-1`; use a query parameter such as `?me=dev-2` to preview another seeded profile. The form asks for a game title when creating a game, then a devlog title and update text. Its image/GIF attachment control is a placeholder only.

When PHP is available, form changes are saved as the full app state in `data/state.json`; open clients poll for updates every three seconds. To return to the source seed data, use **Reset demo data** in the footer. This overwrites the JSON state with the current JavaScript seeds, so do not use it if you need to preserve form-created demo content.

## Extend the prototype

To add a page, create a renderer under `src/pages/`, register its hash pattern and render call in `src/router.js`, and add event bindings in `src/actions/bindings.js` if it needs interactions. Reuse the existing selectors and components where possible. For new form behavior, keep writes in the relevant action module and update `STATE` through the functions in `src/state.js`.

## Prototype limitations

- There is no authentication or authorization; changing `?me=` only selects a seeded demo profile.
- The PHP endpoint stores the entire app state as one JSON document. It is intended for a local demo, not concurrent production use; overlapping writes can replace each other's changes.
- The API currently allows cross-origin requests and has no access control. Do not expose it publicly with real user data.
- Images are placeholders, and the Create Devlog attachment control does not upload files.
- If `data/state.json` already contains state, it takes precedence over the JavaScript seeds at startup. Editing seed files alone will not change that saved state until you reset it or remove the saved state while the app is stopped.