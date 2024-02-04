import { createContext, useContext, useState, ReactNode } from "react";

interface HtmlContentContextProps {
  htmlContent: string;
  isLoading: boolean;
  apiType: string;
  selectedDate: string;
  setHtmlContent: (html: string) => void;
  setIsLoading: (loading: boolean) => void;
  setApiType: (type: string) => void;
  setSelectedDate: (date: string) => void;
}

const HtmlContentContext = createContext<HtmlContentContextProps | undefined>(
  undefined,
);

export const useHtmlContent = (): HtmlContentContextProps => {
  const context = useContext(HtmlContentContext);
  if (context === undefined) {
    throw new Error("useHtmlContent must be used within a HtmlContentProvider");
  }
  return context;
};

export const HtmlContentProvider = ({ children }: { children: ReactNode }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiType, setApiType] = useState("wind");
  const [selectedDate, setSelectedDate] = useState(getLatestDate());

  return (
    <HtmlContentContext.Provider
      value={{
        htmlContent,
        setHtmlContent,
        isLoading,
        setIsLoading,
        apiType,
        setApiType,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </HtmlContentContext.Provider>
  );
};

function getLatestDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 2);
  return date.toISOString().split("T")[0];
}
