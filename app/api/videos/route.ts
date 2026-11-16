import { NextResponse } from 'next/server';

export const revalidate = 1800;
const API = 'https://www.googleapis.com/youtube/v3';

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || 'bloodxeditz699';
  if (!key || key === 'your_api_key_here') {
    return NextResponse.json({ configured: false, message: 'Add YOUTUBE_API_KEY to .env.local to load the channel uploads.' }, { status: 200 });
  }
  try {
    const channelUrl = new URL(`${API}/channels`);
    channelUrl.search = new URLSearchParams({ part: 'contentDetails,snippet', forHandle: handle, key }).toString();
    const channelRes = await fetch(channelUrl, { next: { revalidate: 1800 } });
    const channelData = await channelRes.json();
    if (!channelRes.ok || !channelData.items?.[0]) throw new Error(channelData.error?.message || 'Could not find the channel. Check the handle and API key.');
    const channel = channelData.items[0];
    const playlistId = channel.contentDetails.relatedPlaylists.uploads;
    let pageToken = '';
    const videos: any[] = [];
    do {
      const url = new URL(`${API}/playlistItems`);
      url.search = new URLSearchParams({ part: 'snippet,contentDetails', playlistId, maxResults: '50', key, ...(pageToken ? { pageToken } : {}) }).toString();
      const res = await fetch(url, { next: { revalidate: 1800 } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'YouTube uploads could not be loaded.');
      for (const item of data.items || []) {
        const s = item.snippet;
        const videoId = item.contentDetails?.videoId;
        if (!videoId || s?.title === 'Private video' || s?.title === 'Deleted video') continue;
        videos.push({ id: videoId, title: s.title, description: s.description, publishedAt: s.publishedAt, thumbnail: s.thumbnails?.maxres?.url || s.thumbnails?.high?.url || s.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` });
      }
      pageToken = data.nextPageToken || '';
    } while (pageToken);
    return NextResponse.json({ configured: true, channel: { title: channel.snippet.title, description: channel.snippet.description, thumbnail: channel.snippet.thumbnails?.high?.url }, videos });
  } catch (error) {
    return NextResponse.json({ configured: true, error: error instanceof Error ? error.message : 'Unexpected YouTube API error.' }, { status: 502 });
  }
}
