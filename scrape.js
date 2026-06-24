const fs = require('fs');

async function scrapePlaylist() {
  const url = 'https://music.youtube.com/playlist?list=PLcwzilaKdgP4';
  console.log(`Fetching ${url}...`);
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  };

  try {
    const res = await fetch(url, { headers });
    const html = await res.text();
    
    const marker = 'var ytInitialData = ';
    const start = html.indexOf(marker);
    if (start === -1) {
      console.log('Could not find ytInitialData');
      return;
    }
    
    const jsonStart = start + marker.length;
    let depth = 0;
    let i = jsonStart;
    while (i < html.length) {
      if (html[i] === '{') depth++;
      else if (html[i] === '}') {
        depth--;
        if (depth === 0) {
          i++;
          break;
        }
      }
      i++;
    }
    
    const rawJson = html.slice(jsonStart, i);
    const ytData = JSON.parse(rawJson);
    
    const songs = [];
    function walk(obj) {
      if (!obj || typeof obj !== 'object') return;
      if (Array.isArray(obj)) {
        obj.forEach(walk);
        return;
      }
      if (obj.musicResponsiveListItemRenderer) {
        const r = obj.musicResponsiveListItemRenderer;
        try {
          const flexCols = r.flexColumns;
          const titleRuns = flexCols[0]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs;
          const title = titleRuns?.[0]?.text || '';
          
          const subtitleRuns = flexCols[1]?.musicResponsiveListItemFlexColumnRenderer?.text?.runs;
          const artist = subtitleRuns?.[0]?.text || '';
          
          const thumbnail = r.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails;
          const artworkUrl = thumbnail ? thumbnail[thumbnail.length - 1]?.url : '';
          
          const ytId = r.playlistItemData?.videoId || '';
          
          if (title && ytId) {
            songs.push({ title, artist, ytId, artworkUrl });
          }
        } catch(e) {}
      }
      Object.values(obj).forEach(walk);
    }
    
    walk(ytData);
    
    console.log(`Found ${songs.length} songs.`);
    fs.writeFileSync('scraped_songs.json', JSON.stringify(songs, null, 2));
    
  } catch (err) {
    console.error(err);
  }
}

scrapePlaylist();
