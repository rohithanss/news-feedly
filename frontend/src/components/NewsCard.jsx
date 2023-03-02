export default function NewsCard(props) {
  const {
    source,
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
  } = props.news;

  const headingStyles = {
    display: "flex",
    width: "100%",
    gap: "10px",
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "20px",
          alignItems: "center",
          padding: "10px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <div style={{ width: "25%" }}>
          <img
            src={urlToImage}
            alt=""
            style={{
              aspectRatio: "1/1",
              width: "100%",
              objectFit: "contain",
              background: "#e6e6e6",

              borderRadius: "5px",
            }}
          />
        </div>
        <div
          style={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <h3 style={{ textAlign: "center", color: "blue" }}>{title}</h3>
          <div style={headingStyles}>
            <h4>Source:</h4> <p>{source}</p>
          </div>
          <div style={headingStyles}>
            <h4>Author:</h4> <p>{author}</p>
          </div>

          <div style={headingStyles}>
            <h4>Description:</h4> <p>{description}</p>
          </div>
          <div style={headingStyles}>
            <h4>Published on:</h4> <p>{publishedAt.split("T")[0]}</p>
          </div>
          <div style={headingStyles}>
            <h4>Content:</h4>
            <p>
              {content}{" "}
              <a
                href={url}
                target="_blank"
                alt="news image"
                rel="noopener noreferrer"
              >
                continue reading
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
