import { JSX, useMemo, useState } from "react";
import { useHistory } from "@docusaurus/router";
import styles from "./cookbook.module.css";
import SearchFilledImg from "../../assets/icons/SearchFilled.svg";
import FolderImg from "../../assets/icons/Icon.svg";
import CookBookRecipes from "../../../scripts/output/cookbook-recipes.json";

interface Recipe {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  tags: string[];
}

const recipes: Recipe[] = [
  {
    title: "Award Generator",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    difficulty: "Intermediate",
    time: "15 min",
    tags: ["Templates", "Automation", "Documents"],
  },
  {
    title: "RAG",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    difficulty: "Beginner",
    time: "30 min",
    tags: ["AI", "Search", "Knowledge Base"],
  },
  {
    title: "Simple Model Interaction",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    difficulty: "Advanced",
    time: "20 min",
    tags: ["Basics", "API", "Getting Started"],
  },
];

export default function Cookbook(): JSX.Element {
  const history = useHistory();
  const [searchKey, setSearchKey] = useState("");
  const cookbookContents = [];
  const folderName = "Cookbook Recipes";

  const CookBookRecipesFiltered = useMemo(() => {
    return (CookBookRecipes as unknown as Recipe[]).filter((r) =>
      r.title.toLowerCase().includes(searchKey.toLowerCase())
    );
  }, [searchKey]);

  const navigateToURL = (url: string, urlFromFile: string) => {
    if (urlFromFile) {
      history.push(urlFromFile);
      return;
    }
    if (url) {
      url = `Cookbook Recipes/${url}`;
      history.push(url);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.description}>
          Explore step-by-step guides and SOPs to help you use the platform
          effectively. Each recipe includes practical examples and clear
          instructions so you can get started fast.
        </p>

        {/* Search bar */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>
            <SearchFilledImg />
          </span>
          <input
            className={styles.search}
            type="text"
            placeholder="Search guides"
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {CookBookRecipesFiltered.map((r, idx) => (
            <div
              key={idx}
              className={styles.card}
              onClick={() => navigateToURL(r.title, r.url)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.folderIcon}>
                  <FolderImg />
                </div>
                <h3 className={styles.cardTitle}>{r.title}</h3>
              </div>

              <p className={styles.cardDescription}>{r.description}</p>
              <div className={styles.tags}>
                {r.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
