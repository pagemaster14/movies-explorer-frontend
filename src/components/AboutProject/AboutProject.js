import "./AboutProject.css";

function AboutProject(props) {
    return (
<section className="aboutproject" id="AboutProject">
<h2 className="aboutproject__title">
О проекте
</h2>
<div className="aboutproject__container">
<h3 className="aboutproject__subtitle">
Дипломный проект включал 5 этапов
</h3>
<p className="aboutproject__text">
Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
</p>
<h3 className="aboutproject__subtitle">
На выполнение диплома ушло 5 недель
</h3>
<p className="aboutproject__text">
У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
</p>
</div>
<ul className="aboutproject__columns">
        <li className="aboutproject__columns-text">1 неделя</li>
        <li className="aboutproject__columns-text">4 недели</li>
        <li className="aboutproject__columns-text">Back-end</li>
        <li className="aboutproject__columns-text">Front-end</li>
      </ul>
</section>
    );
  }
  
  export default AboutProject;