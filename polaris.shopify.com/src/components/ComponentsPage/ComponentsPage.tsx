import ComponentGrid from "../ComponentGrid";
import Layout from "../Layout";

import components from "../../data/components.json";
import {
  getComponentCategories,
  stripMarkdownLinks,
  slugify,
  getComponentNav,
} from "../../utils/various";
import { Status } from "../../types";
import styles from "./ComponentsPage.module.scss";
import PageMeta from "../PageMeta";

const componentCategories = getComponentCategories();
const componentNav = getComponentNav();

interface Props {}

export default function ComponentsPage({}: Props) {
  return (
    <div className={styles.ComponentsPage}>
      <PageMeta
        title="Components"
        description="Components are reusable building blocks made of interface elements and styles, packaged through code. Piece them together, improve them, and create new ones to solve merchant problems."
      />

      <Layout navItems={componentNav} showTOC={false}>
        <h1>Components</h1>

        {componentCategories.map((category) => {
          return (
            <div key={category} className={styles.Category}>
              <h2 className={styles.CategoryName}>{category}</h2>
              <ComponentGrid>
                {components
                  .filter(
                    (component) => component.frontMatter.category === category
                  )
                  .map(({ frontMatter, intro }) => {
                    const { name, status } = frontMatter;
                    const url = `/components/${slugify(name)}`;
                    let typedStatus = status as Status | undefined;
                    return (
                      <ComponentGrid.Item
                        key={name}
                        name={name}
                        description={stripMarkdownLinks(intro)}
                        url={url}
                        status={typedStatus}
                      />
                    );
                  })}
              </ComponentGrid>
            </div>
          );
        })}
      </Layout>
    </div>
  );
}
