import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import QuizResults from "./pages/quiz-results";
import QuizQuestion from "./pages/quiz-question";
import QuizSetup from "./pages/quiz-setup";

const Routes = () => {
  return (
    <BrowserRouter basename="/QuizMaster-Pro">
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<QuizSetup />} />
          <Route path="/quiz-results" element={<QuizResults />} />
          <Route path="/quiz-question" element={<QuizQuestion />} />
          <Route path="/quiz-setup" element={<QuizSetup />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
