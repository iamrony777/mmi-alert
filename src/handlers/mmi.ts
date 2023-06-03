
import { Zones } from "../types/now";
import { request } from "undici";
import { pipeline } from 'stream';
import { createWriteStream , existsSync, mkdirSync } from 'node:fs';
import { promisify } from "node:util";
import { parse } from 'node:path'


export const ZONES: Zones = {
    GREED: 'GREED',
    FEAR: 'FEAR',
    EXTREME_FEAR: 'EXTREME_FEAR',
    EXTREME_GREED: 'EXTREME_GREED',
    COLORS: {
        GREED: '#d06d00',
        FEAR: '#c2bd00',
        EXTREME_GREED: '#810000',
        EXTREME_FEAR: '#199d02',
    },
    LEVELS: {
        20: 'EXTREME_FEAR',
        50: 'FEAR',
        80: 'GREED',
        100: 'EXTREME_GREED'
    },
    ALERTS: {
        GREED: 'It suggests that investors are acting greedy in the market, but the action to be taken depends on the MMI trajectory. If MMI is coming Neutral towards Greed zone, it means greed is increasing in the market and investors should be cautious in opening new positions. If MMI is dropping from Extreme Greed, it means greed is reducing in the market. But more patience is suggested before looking for fresh opportunities.',
        FEAR: 'It suggests that investors are fearful in the market, but the action to be taken depends on the MMI trajectory.If it is dropping from Greed to Fear, it means fear is increasing in the market & investors should wait till it reaches Extreme Fear, as that is when the market is expected to turn upwards. If MMI is coming from Extreme fear, it means fear is reducing in the market. If not best, might be a good time to open fresh positions.',
        EXTREME_FEAR: 'High extreme fear (<20) suggests a good time to open fresh positions, as markets are likely to be oversold and might turn upwards',
        EXTREME_GREED: 'High extreme greed (>80) suggests investors should avoid opening fresh positions as markets are overbought and likely to turn downwards',
    }
}
export async function getImage(output: string = 'out/mmi.jpg') {
  const file = parse(output);

  // TODO: If file.dir not exits, mkdir it
  if (!existsSync(file.dir)) {
    mkdirSync(file.dir, { recursive: true });
  }
  const formatMap: { [key: string]: string } = {
    '.jpg': 'jpeg',
    '.jpeg': 'jpeg',
    '.png': 'png',
    '.webp': 'webp',
  };

  const format: string = formatMap[file.ext] || 'jpeg';

  const query = {
    access_key: process.env.APIFLASH_ACCESS_KEY,
    crop: '710,200,500,490',
    format: format,
    height: 1080,
    width: 1920,
    no_ads: true,
    no_cookie_banners: true,
    no_tracking: true,
    quality: 100,
    response_type: 'image',
    scale_factor: 1,
    url: 'https://www.tickertape.in/market-mood-index',
  };

  const asyncPipeline = promisify(pipeline);

  try {
    const { body } = await request('https://api.apiflash.com/v1/urltoimage', { query });
    await asyncPipeline(body, createWriteStream(output));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}


