# Play Forge — Setup and Two-Device Testing

This document walks through running Play Forge locally with XAMPP and testing it
across two devices on the same Wi-Fi. The single-device quickstart is in
[`README.md`](README.md); this file is the longer path, aimed at demonstrating
the shared state relay that lets two browsers see each other's changes.

Play Forge has no JavaScript build step. It is plain HTML, CSS, and ES modules
loaded by the browser. PHP is used only for the shared state relay.

---

## Contents

1. [Prerequisites](#1-prerequisites)
2. [Set up the host machine (device A)](#2-set-up-the-host-machine-device-a)
3. [Verify the server locally](#3-verify-the-server-locally)
4. [Allow Apache through the firewall](#4-allow-apache-through-the-firewall)
5. [Confirm both devices are on the same subnet](#5-confirm-both-devices-are-on-the-same-subnet)
6. [Load the app on device B](#6-load-the-app-on-device-b)
7. [Test with two tabs first](#7-test-with-two-tabs-first)
8. [Test with two devices](#8-test-with-two-devices)
9. [Understanding the two demo users](#9-understanding-the-two-demo-users)
10. [Troubleshooting](#10-troubleshooting)
11. [Tearing down and resetting](#11-tearing-down-and-resetting)

---

## 1. Prerequisites

**Device A** (the host) needs:

- XAMPP for Windows, or any equivalent stack that provides Apache and PHP.
- The project folder placed inside the web root, typically
  `C:\xampp\htdocs\pou-hub`.
- A modern browser.

**Device B** (the client) needs:

- A modern browser.
- A connection to the same local network as device A.

Device B does **not** need XAMPP, PHP, the project files, or any install. It
is only a browser pointed at device A's IP.

> **Do not use VS Code's Live Server extension for this project.** Live Server
> runs on port 5500 and serves files as static assets — it does not execute
> PHP. Loading the app through Live Server will make `api/state.php` return
> nothing, and the frontend will fall back to its JavaScript seed data. If
> you see `JSON.parse: unexpected character at line 1 column 1` in the
> console, the first thing to check is whether the page is being served by
> Live Server (port 5500) or by Apache (port 80).

---

## 2. Set up the host machine (device A)

1. Install XAMPP if you have not already.
2. Copy the project folder to `C:\xampp\htdocs\pou-hub`.

   The folder name matters: it must not contain spaces, and the path must
   match the URLs used later in this document. `pou-hub` (hyphen, no space)
   is the recommended name.

3. Start **Apache** from the XAMPP control panel. The status indicator for
   Apache should turn green. MySQL is not required for this project.
4. Find the machine's LAN IP:

   - Open Command Prompt.
   - Run `ipconfig`.
   - Note the **IPv4 Address** under your active network adapter. It will
     look like `192.168.100.181`.
   - This number is used in every URL from here on. Where this document
     writes `192.168.100.xxx`, substitute your own.

---

## 3. Verify the server locally

Before touching device B, confirm Apache serves the project correctly on
device A itself.

Open these URLs on device A, in order:

### 3a. `http://localhost/pou-hub/`

Expected: the Play Forge Discover feed loads with seeded games and devlogs.

If this fails, Apache is not running or the folder is not where you think it
is. Fix this before continuing.

### 3b. `http://localhost/pou-hub/api/state.php`

Expected: a JSON document. It will look like:

```json
{"version":1,"updatedAt":"2026-09-29T16:04:28+02:00","state":{"games":[...]}}
```

If you instead see the PHP source code starting with `<?php`, PHP is not
being executed. Check the XAMPP control panel and the Apache error log.

If you see a 404 page, the file is not at the path you think it is.

### 3c. `http://192.168.100.181/pou-hub/`

Replace `192.168.100.181` with your actual IPv4 address. Expected: the same
Discover feed as 3a.

If 3a works but 3c does not, Apache is bound to the loopback interface only.
Open `C:\xampp\apache\conf\httpd.conf`, find the line that starts with
`Listen`, and change `Listen 127.0.0.1:80` to `Listen 80`. Save the file and
restart Apache from the XAMPP control panel.

Do not move on to device B until 3c works on device A.

---

## 4. Allow Apache through the firewall

Windows Firewall blocks incoming HTTP by default. Without an explicit allow
rule, device B will time out even though the server is running correctly on
device A.

1. Press `Windows + R`, type `wf.msc`, and press Enter.
2. In the left panel, click **Inbound Rules**.
3. In the right panel, click **New Rule…**.
4. **Rule Type**: Port → Next.
5. **Protocol and Ports**: TCP, Specific local ports: `80` → Next.
6. **Action**: Allow the connection → Next.
7. **Profile**: check **Private** and **Domain**. Leave Public unchecked
   unless you know the network is classified as Public.
8. **Name**: `Apache XAMPP LAN` → Finish.

If existing rules for **Apache HTTP Server** already appear in the list,
right-click each and choose **Enable Rule**, then confirm the Private column
shows a checkmark.

Antivirus firewalls (Norton, McAfee, Bitdefender, Kaspersky, ESET) can also
block port 80 independently of Windows Firewall. If nothing works after
step 6, temporarily disable the antivirus firewall and retest. If that fixes
it, add an exception for Apache or port 80 and re-enable the firewall.

### If the network is classified as Public

Windows 11 sometimes classifies home Wi-Fi as **Public**, in which case the
Private-scoped rule above will not apply. Two options:

- Change the profile: Settings → Network & Internet → Wi-Fi → your network →
  Network profile type → **Private**.
- Or add a second inbound rule with the same settings but scoped to
  **Public**.

---

## 5. Confirm both devices are on the same subnet

On device B, open Command Prompt and run `ipconfig`. Compare the first three
numbers of the IPv4 addresses.

- Device A: `192.168.100.181`
- Device B: `192.168.100.xxx` → same subnet, proceed.
- Device B: `192.168.1.xxx` or `10.0.0.xxx` → different subnet, the devices
  cannot see each other.

Common causes of mismatched subnets:

- **Guest Wi-Fi networks.** Many routers isolate guests from the main
  network. Connect both devices to the same main network.
- **VPNs.** An active VPN on either device routes traffic away from the LAN.
  Turn VPNs off for this test.
- **Stacked routers.** A router behind another router puts devices on
  different subnets. Check the gateway address on each device with
  `ipconfig`.

Fix the network before continuing. No amount of firewall or URL tweaking
will make two different subnets see each other.

---

## 6. Load the app on device B

On device B's browser, open:

```text
http://192.168.100.181/pou-hub/?me=dev-2
```

Replace `192.168.100.181` with device A's actual IP.

If the Discover feed loads, the connection is working. The `?me=` parameter
is explained in [section 9](#9-understanding-the-two-demo-users).

---

## 7. Test with two tabs first

Before testing with a second physical device, confirm the sync works locally
on device A. This isolates sync bugs from network problems: if two tabs sync
but two devices do not, the issue is the network, not the code.

Open two tabs on device A:

```text
Tab 1: http://localhost/pou-hub/?me=dev-1
Tab 2: http://localhost/pou-hub/?me=dev-2
```

In Tab 1, open any devlog and submit a piece of feedback. Watch Tab 2.
Within about three seconds, the feedback should appear and a
**Updated from another device** toast should show.

Then do the same in reverse: submit from Tab 2, watch Tab 1.

If both directions work, the sync logic is correct and you are ready for a
second physical device. If neither tab sees the other, the problem is in the
app or the API, and testing on device B will not help. Common causes in that
case:

- The page is served by Live Server instead of Apache. See
  [section 1](#1-prerequisites).
- The polling interval is not firing. Open DevTools → Network and check that
  a request to `api/state.php` goes out roughly every three seconds.
- `api/state.php` is returning something other than JSON. Load it directly
  in a browser tab and inspect the response.

---

## 8. Test with two devices

With both devices on the app:

**Device A:**

```text
http://192.168.100.181/pou-hub/?me=dev-1
```

**Device B:**

```text
http://192.168.100.181/pou-hub/?me=dev-2
```

Both URLs use device A's IP. Device B never uses `localhost` — `localhost`
on device B refers to device B itself, which is not running the server.

Now:

1. On device A, open any devlog and submit a piece of feedback.
2. Wait about three seconds.
3. On device B, the feedback should appear and a **Updated from another
   device** toast should show.
4. Reverse the direction: submit from device B, watch device A.

Both directions working means the multi-device prototype is functioning as
designed.

If device B still cannot load the app, see
[section 10](#10-troubleshooting).

---

## 9. Understanding the two demo users

Play Forge has no authentication. The `?me=` query parameter selects which
seeded demo profile the current page acts as. The available values are
`dev-1` through `dev-8`, matching the entries in
`src/data/developers.js`.

The parameter affects:

- Which profile the **My Games** link opens.
- Whether the **Edit Profile** button appears on a profile page.
- Which handle is used when submitting feedback or replies.
- Whether the **Mark as seen** control appears on a feedback item.

It does **not** affect permissions in any real sense. Anyone with access to
the page can pass any `?me=` value and act as that profile. This is
deliberate for the prototype and unsuitable for real use.

For a two-device demo:

- Device A uses `?me=dev-1` (Mira Kovalenko).
- Device B uses `?me=dev-2` (Herman Prabo).

Because the two devices have different `currentUserId` values, each device's
Edit Profile button only appears for its own profile, and each device
submits feedback under its own handle.

---

## 10. Troubleshooting

### Device B cannot load the app at all

Work through these in order. Each step narrows the problem.

**10a.** From device B, ping device A:

```text
ping 192.168.100.181
```

If ping fails, the devices cannot see each other at all. This is a network
problem, not an Apache problem. Recheck [section 5](#5-confirm-both-devices-are-on-the-same-subnet).

**10b.** From device B, open `http://192.168.100.181/`.

- If the XAMPP welcome page loads, the network and firewall are fine, and
  the problem is the URL path (`/pou-hub/`).
- If it times out or refuses, the problem is the firewall
  ([section 4](#4-allow-apache-through-the-firewall)) or Apache binding
  ([section 3](#3-verify-the-server-locally)).

**10c.** From device B, open `http://192.168.100.181/pou-hub/api/state.php`.

- JSON appears → the server is reachable and PHP is running. Open
  `http://192.168.100.181/pou-hub/` and the app should load.
- PHP source code appears (starting with `<?php`) → PHP is not executing for
  requests to that host. Rare on XAMPP; check the Apache configuration or
  reinstall XAMPP.
- 404 → the folder name does not match. Check the exact name under
  `C:\xampp\htdocs\`.

### Symptom table

| Symptom on device B | Likely cause | Fix |
| --- | --- | --- |
| "This site can't be reached" or timeout | Windows Firewall blocking port 80 | [Section 4](#4-allow-apache-through-the-firewall) |
| `ERR_CONNECTION_REFUSED` | Apache not running, or bound to localhost only | Start Apache; check `Listen` in `httpd.conf` ([section 3](#3-verify-the-server-locally)) |
| `http://<ip>/` loads but `/pou-hub/` is 404 | Folder name mismatch | Confirm the folder is `C:\xampp\htdocs\pou-hub` (hyphen, no space) |
| App loads on device B but shows no data | Fetch to `api/state.php` failing | Open DevTools → Network on device B, inspect the `state.php` request |
| Works on device A, not device B | Almost always the firewall | [Section 4](#4-allow-apache-through-the-firewall); also check antivirus |
| `JSON.parse: unexpected character at line 1` | Page served from Live Server or `file://` instead of Apache | Load through `http://localhost/pou-hub/`, not port 5500 or a local file path |
| Data appears stale on device B | Polling not firing | DevTools → Network, check for a `state.php` request every ~3 seconds |
| Both devices fight for the same profile | Both use the same `?me=` value | Use `?me=dev-1` on one and `?me=dev-2` on the other ([section 9](#9-understanding-the-two-demo-users)) |

### Apache binding

If opening `http://192.168.100.181/pou-hub/` on device A fails, open
`C:\xampp\apache\conf\httpd.conf` and find the `Listen` line. If it reads
`Listen 127.0.0.1:80`, change it to `Listen 80`, save, and restart Apache.
This tells Apache to accept connections on all network interfaces, not just
the loopback interface.

### Live Server

Do not use VS Code's Live Server extension for this project. It serves files
on port 5500 as static assets and does not execute PHP. Loading the app
through Live Server will make `api/state.php` return nothing, and the
frontend will fall back to its JavaScript seed data. The console will show
`JSON.parse: unexpected character at line 1 column 1` when the fetch tries
to parse the empty response. Serve through Apache instead.

---

## 11. Tearing down and resetting

### Stop the server

Stop Apache from the XAMPP control panel. Device B will immediately lose
access. Nothing is corrupted by stopping; state is persisted in
`data/state.json` on device A.

### Reset to seed data

The **Reset demo data** button in the footer overwrites `data/state.json`
with the current JavaScript seed data and pushes the change to all connected
clients. Use this before a demo to start from a known state.

If the button is unavailable (for example, the footer is not visible), you
can reset manually:

1. Stop Apache.
2. Delete `C:\xampp\htdocs\pou-hub\data\state.json`.
3. Start Apache.
4. Reload the app. The next page load will seed from JavaScript and write a
   fresh `state.json`.

### Preserve demo content across resets

`Reset demo data` replaces the entire state, including any games or devlogs
created through the Create Devlog form. If you want to preserve that
content, copy `data/state.json` to a safe location before resetting, and
copy it back afterwards.

### Editing seed data

If `data/state.json` exists, it takes precedence over the JavaScript seeds
at startup. Editing `src/data/*.js` alone will not change what the app
displays until you reset or remove the saved state. See
[section 11](#11-tearing-down-and-resetting) above for the reset procedure.