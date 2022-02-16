import "./NavTab.css";

function NavTab(props) {
    return (
<section className="navtab">
<a href="#AboutProject" className="navtab__link">
О проекте
</a>
<a href="#Techs" className="navtab__link">
Технологии
</a>
<a href="#AboutMe" className="navtab__link">
Студент
</a>
</section>
    )
}

export default NavTab;