# A little something for you

Premium interactive birthday experience. Edit **one file** and it becomes hers.

## Customize

Open `src/content.ts` and replace:

- `herName` / `myName`
- opening lines, question copy, game count
- **exactly three** memory photos + captions
- song title, artist, `audioSrc`, dedication lines
- gift-box labels
- the final letter paragraphs
- colors in `palette`

### Photos

Drop files in `public/memories/` and point to them in `content.memories.items`:

```
photo: "/memories/01.jpg"
```

### Song

Put an audio file at `public/audio/dedication.mp3`.

The on-screen lines are an **original dedication**, not copyrighted lyrics. If you have permission to quote a short excerpt, replace `dedicationLines` with that excerpt only.

## Run

```bash
npm install
npm run dev
```

Open the **Network** URL on her phone (same Wi-Fi), or `http://localhost:5175/` on your computer. After `npm run build`, you can also deploy the `dist` folder.
