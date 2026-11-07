/** "/" → "/en/". A meta refresh works in the static export (no server) and in `next dev`. */
export default function RootRedirect() {
  return (
    <main style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}>
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <p>
        <a href="/en/" style={{ color: "#3fb950" }}>
          English
        </a>{" "}
        ·{" "}
        <a href="/ar/" lang="ar" style={{ color: "#3fb950" }}>
          العربية
        </a>
      </p>
    </main>
  );
}
