# Dupocracy

Multiplayer Defcon game made in Vanilla JS and GamedevCloud (Probably no longer maintained):
<https://github.com/gamedevpl/gamedev-cloud>

Details (Probably no longer maintained):
<http://www.gamedev.pl/projekt/dupocracy>

Playable demo (Probably no longer maintained):
<http://gtanczyk.warsztat.io/Dupocracy/game/index.html>

## About This Fork

This is a modified version of the original Dupocracy game. The original code required access to the gamedev.pl cloud servers to play, making it unplayable when those servers were unavailable.

This fork adds an offline mode that allows you to play the game locally without needing server access.

### Offline Mode?

The game uses "loopback" mode for offline play, which simulates network connections locally within your browser. This allows you to play the game without needing a real server connection.

## Game Description

Dupocracy is a browser-based multiplayer strategy game where players control continents and battle with missiles and radars.

## Running the Game Locally

There are two ways to run Dupocracy locally:

### Method 1: Using a local web server

1. Set up a local web server (like Python's built-in server, Node.js's http-server, or XAMPP)
2. Clone or download this repository
3. Place the files in your web server's directory
4. Open your browser and navigate to localhost
5. Click the "Play Offline (Local Mode)" button on the launcher

### Method 2: Opening directly in browser

1. Clone or download this repository
2. Open game/index.html in your web browser
3. Click the "Play Offline (Local Mode)" button on the launcher

## Game Instructions

### Prepare Stage
- Place radars and launchers on your continent
- Each continent can have 5 radars and 5 launchers maximum
- Click on the map to place units
- Right-click on units to set their mode (Attack, Defend, Scout)

### Warfare Stage
- Right-click on a point on the map to target your launchers
- Defend your units from enemy attacks
- Scout can reveal enemy positions
- Destroy all enemy units to win

## Troubleshooting

If you encounter any issues:
- Make sure JavaScript is enabled in your browser
- Try using a modern browser like Chrome, Firefox, or Edge
- Check your browser console for any error messages
- Try refreshing the page with Ctrl+F5 or Cmd+Shift+R
