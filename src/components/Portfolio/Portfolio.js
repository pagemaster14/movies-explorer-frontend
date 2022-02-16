import "./Portfolio.css";

function Portfolio(props) {
    return (
<section className="portfolio">
<h2 className="portfolio__title">
Портфолио
</h2>
<div className="portfolio__links">
<a href="https://github.com/pagemaster14/how-to-learn.git" target="blank" className="portfolio__link">
Статичный сайт
</a>
<a href="https://github.com/pagemaster14/russian-travel.git" target="blank" className="portfolio__link">
Адаптивный сайт
</a>
<a href="https://github.com/pagemaster14/mesto.git" target="blank" className="portfolio__link">
Одностраничное приложение
</a>
</div>
</section>
    );
  }
  
export default Portfolio;