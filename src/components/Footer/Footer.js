import "./Footer.css";

function Footer(props) {
    return (
<section className="footer">
<h2 className="footer__title">
Учебный проект Яндекс.Практикум х BeatFilm.
</h2>
<div className="footer__info">
<div className="footer__links">
<a href="https://praktikum.yandex.ru" target="blank" className="footer__link">
Яндекс.Практикум
</a>
<a href="https://github.com/pagemaster14" target="blank" className="footer__link">
Github
</a>
<a href="https://vk.com/id2674643" target="blank" className="footer__link">
VK
</a>
</div>
<p className="footer__copyright"> ©2022 </p>
</div>
</section>
    );
  }
  
  export default Footer;