export default function FacebookFeed() {
  return (
    <div className="relative w-full">
      <iframe
        title="facebook-feed"
        src={
          "https://www.facebook.com/plugins/page.php?" +
          "href=" +
          encodeURIComponent("https://www.facebook.com/huberslaw") +
          "&tabs=timeline" +
          "&width=340" +
          "&height=500" +
          "&small_header=false" +
          "&adapt_container_width=true" +
          "&hide_cover=false" +
          "&show_facepile=true"
        }
        width="100%"
        height="500"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="yes"
        frameBorder="0"
        allow="encrypted-media"
      ></iframe>

      {/* Clickable Overlay */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{ height: "100px", background: "transparent", cursor: "pointer" }}
        onClick={() =>
          window.open(
            "https://www.facebook.com/huberslaw?ref=embed_page",
            "_blank"
          )
        }
      ></div>
    </div>
  );
}
