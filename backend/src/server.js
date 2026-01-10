import "dotenv/config";     // Only ONE loader
import app from "./app.js";

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
