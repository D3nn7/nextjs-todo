import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const font = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whats next 🧐",
  description: "A demo app for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				{children}
			</body>
		</html>
	);
}
