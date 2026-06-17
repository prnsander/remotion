import "./index.css";
import { Composition } from "remotion";
import { ProductLaunch } from "./compositions/ProductLaunch";
import type { ProductLaunchProps } from "./compositions/ProductLaunch";
import { LocalesyLaunch } from "./compositions/LocalesyLaunch";
import type { LocalesyLaunchProps } from "./compositions/LocalesyLaunch";
import { LocalesyFullLaunch } from "./compositions/LocalesyFullLaunch";
import type { LocalesyFullLaunchProps } from "./compositions/LocalesyFullLaunch";
import { LocalesyLaunchV2 } from "./compositions/LocalesyLaunchV2";
import type { LocalesyLaunchV2Props } from "./compositions/LocalesyLaunchV2";

const productLaunchDefaultProps: ProductLaunchProps = {
  productName: "Your Product",
  tagline: "The tagline goes here",
  accentColor: "#C8FF00",
  productImageUrl: "",
  backgroundVideoUrl: "",
  audioUrl: "",
};

const localesyDefaultProps: LocalesyLaunchProps = {};

const localesyFullDefaultProps: LocalesyFullLaunchProps = {};

const localesyV2DefaultProps: LocalesyLaunchV2Props = {};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductLaunch"
        component={ProductLaunch}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={productLaunchDefaultProps}
      />
      <Composition
        id="LocalesyLaunch"
        component={LocalesyLaunch}
        durationInFrames={700}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={localesyDefaultProps}
      />
      <Composition
        id="LocalesyFullLaunch"
        component={LocalesyFullLaunch}
        durationInFrames={876}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={localesyFullDefaultProps}
      />
      <Composition
        id="LocalesyLaunchV2"
        component={LocalesyLaunchV2}
        durationInFrames={1650}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={localesyV2DefaultProps}
      />
    </>
  );
};
