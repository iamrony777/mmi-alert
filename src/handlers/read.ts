import fs from 'node:fs';
import type { Now } from '../types/now.d.ts';


export const mmiLevels = {
    30: 'High extreme fear (<20) suggests a good time to open fresh positions, as markets are likely to be oversold and might turn upwards',
    50: 'It suggests that investors are fearful in the market, but the action to be taken depends on the MMI trajectory.If it is dropping from Greed to Fear, it means fear is increasing in the market & investors should wait till it reaches Extreme Fear, as that is when the market is expected to turn upwards. If MMI is coming from Extreme fear, it means fear is reducing in the market. If not best, might be a good time to open fresh positions.',
    70: 'It suggests that investors are acting greedy in the market, but the action to be taken depends on the MMI trajectory. If MMI is coming Neutral towards Greed zone, it means greed is increasing in the market and investors should be cautious in opening new positions. If MMI is dropping from Extreme Greed, it means greed is reducing in the market. But more patience is suggested before looking for fresh opportunities.',
    100: 'High extreme greed (>80) suggests investors should avoid opening fresh positions as markets are overbought and likely to turn downwards',
}



