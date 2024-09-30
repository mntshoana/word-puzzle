import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppGeneratorComponent from "src/component/generator/generator";
import AppRandomSequenceComponent from "src/component/random-sequence/random-sequence";
import css from "./home.module.css";

const AppLandingPage = () => {
  const [selected, setSelected] = useState(1);
  const tabs = [
    { id: 0, name: "Generator", component: <AppGeneratorComponent /> },
    {
      id: 1,
      name: "Random Sequence",
      component: <AppRandomSequenceComponent />,
    },
  ];
  const reroute = useNavigate();

  return (
    <main className={css.main}>
      <div className={css.tabcontent}>
        <nav className={css.tab}>
          <ul>
            {tabs.map((tab, index) => (
              <li
                className={`${
                  selected === index ? css.selected_tab : css.non_selected_tab
                }`}
                onClick={() => setSelected(tab.id)}
              >
                {tab.name}
              </li>
            ))}
          </ul>
        </nav>
        <section className={css.section}>{tabs[selected].component}</section>
      </div>
    </main>
  );
};

export default AppLandingPage;
