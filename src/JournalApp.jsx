import React from "react";

import { AppRouter } from "./routers/AppRouter";
import { AppTheme } from "./theme";

export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
