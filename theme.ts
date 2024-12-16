import { createTheme } from "@mui/material/styles";

// Custom theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#dc004e", // Pink
    },
    error: {
      main: "#d32f2f", // Red
    },
    background: {
      default: "#f5f5f5", // Light grey background
    },
    text: {
      primary: "#000", // Black text
      secondary: "#666", // Grey text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 600
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem", // Smaller body text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded buttons
          textTransform: "none", // No uppercase
        },
      },
    },
  },
});

export default theme;
