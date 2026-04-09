import Gallery from "../sections/Gallery";
import heroImage from "../assets/hero.jpg";

export default function Home() {
  return (
    <div className="page">
      <div className="hero-card">
        <img src={heroImage} alt="Home image" className="hero-img" />
        <div className="hero-overlay">
          <p className="hero-subtitle">THE NEW SUMMER FLAVOURS ARE HERE!</p>
          <h1 className="hero-title">Taste The Summer</h1>
          <button className="btn btn-primary btn-small">SHOP NOW</button>
        </div>
      </div>
      <div>
        <Gallery />
      </div>
    </div>
  );
}
