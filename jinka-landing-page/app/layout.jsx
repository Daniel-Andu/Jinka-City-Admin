import Providers from "./providers";
import Script from "next/script";
import SiteLayout from "../src/layouts/SiteLayout";
import "../src/styles/index.css";
export const metadata = {
    title: "Jinka City Administration",
    description: "Official website for Jinka City Administration",
};
export default function RootLayout({ children }) {
    return (<html lang="en">
      <body>
        <div id="fb-root"/>
        <Script strategy="afterInteractive" async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v25.0"/>
        <Providers>
          <SiteLayout>{children}</SiteLayout>
        </Providers>
      </body>
    </html>);
}
