import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router";
import { useEffect } from "react";
import i18n from "./locales";
import Home from "./react-pages/Home";
import SharedLayout from "./components/Layout";
import HowToUse from "./react-pages/HowToUse";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./react-pages/NotFound";
import Feedback from "./react-pages/Feedback";
import Download from "./react-pages/Download";

function AppRoutes() {
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("language");
    if (savedLanguage === "ar" || savedLanguage === "en") {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="how-to-use" element={<HowToUse />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="download" element={<Download />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App({ location = "/" }) {
  if (typeof window === "undefined") {
    return (
      <StaticRouter location={location}>
        <AppRoutes />
      </StaticRouter>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
