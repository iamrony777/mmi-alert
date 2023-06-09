import type { Now } from './types/now';
import { request } from 'undici';
import { ZONES, getImage } from './handlers/mmi';

export async function getMMI() {
    const { statusCode, body } = await request('https://api.tickertape.in/mmi/now');

    if (statusCode !== 200) {
        throw new Error(await body.text());
    } else {
        const res = await body.json();
        const picutreOutput = 'out/mmi.jpg';
        const mmi: Now = {
            ...res,
            getLevel: function (mmiLevel: number): string {
                const level = Object.keys(ZONES.LEVELS).find(key => mmiLevel <= parseInt(key));
                // @ts-ignore
                return level ? ZONES.LEVELS[level] : '';
            },
            getAlert: function (mmiLevel: number): string {
                const level = Object.keys(ZONES.LEVELS).find(key => mmiLevel <= parseInt(key));
                // @ts-ignore
                return level ? ZONES.ALERTS[ZONES.LEVELS[level]] : '';
            }

        }
    
        // console.log(mmi);
        return {
            value: mmi.data.currentValue,
            level: mmi.getLevel(mmi.data.currentValue),
            picutrePath: await getImage(picutreOutput) ? picutreOutput : '',
            alertMessage: mmi.getAlert(mmi.data.currentValue)
        }
    }
}


// console.log(await getMMI())
