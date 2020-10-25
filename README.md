# Fantasy Football
## EECS 448 - Projects 3 & 4

## Structure Info
This project has been wired up to use Vue.js to help organize components of the game.

These components are defined in files that end in the `.component.js` extension, and are located in the `src/components/` directory.

The entry point for the project is the `index.html`. This file contains the basic logic for loading Vue, and adding the game board to the page.

Obviously, we'll flesh out the look-and-feel as we go along. This is just a basic starter for now.

## How to Run
The easiest way to run this project is by creating a basic static web server using Python. This is super simple:

1. Open a terminal or command prompt to the root of this project (i.e. the directory this file is in).
2. Start the server: `python -m http.server`

This will start a web server on port 8000. You can then run the game by navigating to http://localhost:8000/ from a web browser.

### Re-generating the documentation
To regenerate the docs, you need Node.js and the Yarn package manager installed. Then, just:

```shell script
cd documentation
./generate.sh
```

## Contributors
- Lucas Brakenridge
- Javier Barea Lara
- Garrett Mills
- Evan Powell
- Alec Horlick-Mills
