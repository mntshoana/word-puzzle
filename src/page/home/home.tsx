import AppGeneratorComponent from "component/views/generator/generator";
import AppHistoryComponent from "component/views/history/history";
import AppRandomSequenceComponent from "component/views/random-sequence/random-sequence";
import { useState } from "react";
import css from "./home.module.css";

interface AppLandingPageTabItems {
  id: number;
  name: string;
  component: React.ReactElement;
}

const AppLandingPage = () => {
  const [selected, setSelected] = useState(0);
  const tabs: AppLandingPageTabItems[] = [
    { id: 0, name: "Generator", component: <AppGeneratorComponent /> },
    {
      id: 1,
      name: "Random Sequence",
      component: <AppRandomSequenceComponent />,
    },
    { id: 2, name: "History", component: <AppHistoryComponent /> },
  ];

  return (
    <main className={css.main}>
      <div className={css.tabcontent}>
        <nav className={css.tab}>
          <ul>
            {tabs.map((tab, index) => (
              <li
                key={index}
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
