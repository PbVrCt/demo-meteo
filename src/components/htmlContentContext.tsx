import { createContext, useContext, useState, ReactNode } from "react";

interface HtmlContentContextProps {
  htmlContent: string;
  setHtmlContent: (html: string) => void;
}

const HtmlContentContext = createContext<HtmlContentContextProps | undefined>(
  undefined,
);

export const useHtmlContent = () => {
  const context = useContext(HtmlContentContext);
  if (context === undefined) {
    throw new Error("useHtmlContent must be used within a HtmlContentProvider");
  }
  return context;
};

export const HtmlContentProvider = ({ children }: { children: ReactNode }) => {
  const [htmlContent, setHtmlContent] = useState("");
  return (
    <HtmlContentContext.Provider value={{ htmlContent, setHtmlContent }}>
      {children}
    </HtmlContentContext.Provider>
  );
};
