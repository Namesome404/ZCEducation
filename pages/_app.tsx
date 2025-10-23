import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import CustomCursor from "@/components/CustomCursor";
import ParticleBackground from "@/components/ParticleBackground";
import PageTransition from "@/components/PageTransition";
import ClickRipple from "@/components/ClickRipple";
import ScrollProgress from "@/components/ScrollProgress";
import ThemeToggle from "@/components/ThemeToggle";
import SmoothScroll from "@/components/SmoothScroll";
import SoundEffects from "@/components/SoundEffects";
import EasterEggs from "@/components/EasterEggs";
import "@/styles/globals.css";
import "@/styles/scrolly.css";
import "@/styles/capability.css";
import "@/styles/scroll-effects.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomCursor />
      <ParticleBackground />
      <ClickRipple />
      <ScrollProgress />
      <ThemeToggle />
      <SmoothScroll />
      <SoundEffects />
      <EasterEggs />
      <Layout>
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </Layout>
    </>
  );
}

