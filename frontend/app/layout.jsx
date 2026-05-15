import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

export const metadata = {
  title: "College Placement Tracker",
  description: "Track your college placements and manage applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
