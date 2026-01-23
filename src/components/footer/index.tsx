import { Box, Typography, Link } from "@mui/material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        👨🏻‍💻 2026 — Created by{" "}
        <Link
          href="https://github.com/flaviodamaiajr"
          target="_blank"
          rel="noopener"
        >
          @flaviodamaiajr
        </Link>{" "}
        ✌🏻
      </Typography>
    </Box>
  );
}
