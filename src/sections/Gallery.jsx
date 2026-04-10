import galleryCardImage from "../assets/product.jpg";

export default function Gallery() {
  const categories = ["New flavours", "Featured", "Best sellers", "Shop now"];
  return (
    <div className="gallery-section">
      {categories.map((category, index) => (
        <div className="gallery-card" key={index}>
          <img
            src={galleryCardImage}
            alt="Gallery Card Image"
            className="gallery-card-img"
          />
          <button className="gallery-card-btn">{category}</button>
        </div>
      ))}
    </div>
  );
}
