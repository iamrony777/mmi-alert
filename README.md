# 🚧 [WIP] mmi-alert

### Prerequisites

[Bun](https://bun.sh) is a fast all-in-one JavaScript runtime, this project was created using `bun init` in bun v0.6.6.  

### Installation

To install dependencies:

```bash
bun install
```

Get a apikey from [ApiFlash](https://apiflash.com/) (screenshot api) and save in .env file

```dotenv
APIFLASH_ACCESS_KEY=***
```

To run:

```bash
bun run src/index.ts
```

### Response (this is not final)

```bash
bun run src/index.ts

[0.04ms] ".env"
{
  value: 69.64984996339552,
  level: "GREED",
  picutrePath: "out/mmi.jpg",
  alertMessage: "It suggests that investors are acting greedy in the market, but the action to be taken depends on the MMI trajectory. If MMI is coming Neutral towards Greed zone, it means greed is increasing in the market and investors should be cautious in opening new positions. If MMI is dropping from Extreme Greed, it means greed is reducing in the market. But more patience is suggested before looking for fresh opportunities."
}
```