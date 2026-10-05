import { Config } from "@remotion/cli/config";
// Remotion downloads its own headless browser. Set REMOTION_BROWSER only to use a specific one.
if (process.env.REMOTION_BROWSER) Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
Config.setChromiumOpenGlRenderer("swangle");
