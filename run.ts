import { getImage } from "./src/handlers/mmi";
import { LOGGER } from "./src/handlers/logger";

(async () => {
  const logger = LOGGER("cron-job");

  const images = ["mmi.jpg", "heatmap.jpg"];
  images.forEach(async (image) => {
    (await getImage(image))
      ? logger.info(`Updated ${image}`)
      : logger.error(`Unable to Update ${image}`);
  });
})();
