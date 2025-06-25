# Sync Pad

A real-time collaborative editor offering rich formatting—bold, italics, font sizes, images, links, tables, task lists—and low-latency multi-user sync with live cursors via Liveblocks. It includes organization support and secure authentication through Clerk and reactive persistence with Convex.

---

## Demo

**[Deployed on Vercel](http://sync-pad-seven.vercel.app/)**

To co-edit with others just share the url of the document with the other users.


Collaborative Editing Demo-> (It takes some time to load or go to the demo_video folder ) 
![Demo GIF](demo_video/sync-pad-collab.gif)



Text Editor Features Demo->
![Demo GIF](demo_video/sync-pad-editor.gif)

---

## Features

* **Rich Text Formatting:**

  * Bold, italics, underline, strikethrough.
  * Multiple font sizes and colors.
  * Inline images, hyperlinks, and tables.
  * Task lists and numbered/bulleted lists.

* **Real-Time Collaboration (Liveblocks):**

  * Low-latency syncing across clients.
  * Visible live cursors with user names and colors.
  * Conflict-free edits powered by CRDTs.

* **Organization Support:**

  * Create and manage multiple “workspaces.”
  * Invite teammates with role-based permissions.
  * Nested folders and document hierarchy.

* **Secure Authentication (Clerk):**

  * Email/password and social logins.
  * Single-sign-on (SSO) options.
  * Two-factor authentication support.

* **Reactive Persistence (Convex):**

  * Serverless real-time database for document storage.
  * Optimistic UI updates and offline resilience.
  * Incremental backups and version history.

* **Document History & Undo/Redo:**

  * Full change history with timestamped snapshots.
  * Unlimited undo/redo across editing sessions.

* **Commenting & Mentions:**

  * Inline comments for collaborative discussions.
  * User tagging and real-time notifications.

* **Auto-Save & Drafts:**

  * Real-time auto-save for uninterrupted work.
  * Drafts maintained even after unexpected reloads.

---

## Build & Run

### Prerequisites

* **Node.js** (v16 or higher) & **npm** or **Yarn**
* **Clerk account** (for authentication keys)
* **Convex account** (for database URL & key)
* **Liveblocks account** (for real-time collaboration)

### Clone the Repository

```sh
git clone https://github.com/harsh-panchal-804/Sync-Pad
cd Sync-Pad
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CONVEX_URL=
CONVEX_SECRET_KEY=

LIVEBLOCKS_SECRET_KEY=
```

### Development Server

By default, the app will run at [http://localhost:3000/](http://localhost:3000/).

```bash
npm run dev
# or
yarn dev
```

---

## Contributing

Pull requests, issues, and suggestions are welcome!
Please open an issue to discuss proposed changes or improvements.

---
