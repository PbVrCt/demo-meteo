import { HtmlContentProvider } from "../components/htmlContentContext";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  return (
    <HtmlContentProvider>
      <Component {...pageProps} />
    </HtmlContentProvider>
  );
}

export default MyApp;
