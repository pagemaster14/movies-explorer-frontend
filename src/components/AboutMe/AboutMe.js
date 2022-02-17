import "./AboutMe.css";
import photo from "../../images/9L7A0902.JPG";

function AboutMe(props) {
    return (
<section className="aboutme" id="AboutMe">
<h2 className="aboutme__title">
Студент
</h2>
<div className="aboutme__info">
<img src={photo} alt="Фото автора проекта" className="aboutme__photo"/>
<h3 className="aboutme__name">
Сергей
</h3>
<h4 className="aboutme__bio">
Фронтенд-разработчик, 33 года
</h4>
<p className="aboutme__text">
Я родился и живу в Москве, закончил юридический факультет МФЮА в 2011 году. У меня есть жена и двое сыновей. Я люблю музыку, кино и видеоигры. Последние несколько лет работал менеджером по работе с клиентами. Недавно начал кодить. Хочу сменить профессию.
</p>
<div className="aboutme__links">
<a href="https://vk.com/id2674643" target="blank" className="aboutme__link">
VK
</a>
<a href="https://github.com/pagemaster14" target="blank" className="aboutme__link">
Github
</a>
</div>
</div>
</section>
    );
  }
  
export default AboutMe;