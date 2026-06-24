const fs = require('fs');

let raw = fs.readFileSync('playlist.json');
// Handle potential UTF-16 LE BOM from powershell
if (raw[0] === 0xFF && raw[1] === 0xFE) {
  raw = raw.toString('utf16le');
} else {
  raw = raw.toString('utf8');
}
// Strip UTF-8 BOM
if (raw.charCodeAt(0) === 0xFEFF) {
  raw = raw.substring(1);
}

const data = JSON.parse(raw);

const entries = data.entries || [];
console.log(`Loaded ${entries.length} songs from playlist.json`);

const songs = entries.map(e => {
  return {
    title: e.title,
    artist: e.uploader || e.channel || 'Unknown',
    ytId: e.id,
    artworkUrl: `https://i.ytimg.com/vi/${e.id}/hqdefault.jpg`
  };
});

let out = `const PLAYLIST_SONGS = [\n`;
for (let s of songs) {
  out += `  { title: ${JSON.stringify(s.title)}, artist: ${JSON.stringify(s.artist)}, ytId: "${s.ytId}", artworkUrl: "${s.artworkUrl}" },\n`;
}
out += `];\n`;

fs.writeFileSync('new_songs.js', out);
console.log('Wrote new_songs.js');
