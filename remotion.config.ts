import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

// PNG for lossless intermediate frames at 1920x1080
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableTailwind);

// Set to your Mac's logical CPU count (run: sysctl -n hw.logicalcpu)
Config.setConcurrency(8);
