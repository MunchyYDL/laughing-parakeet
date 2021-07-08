import { FunctionComponent, useState } from "react";

import data from "./data.json";
import styles from "./Menu.module.css";

interface MenuNode {
  name: string;
  children?: Array<MenuNode>;
}

const Menu = () => {
  return (
    <>
      <div className={styles.menu}>
        <ul>
          {data.map((item, index) => (
            <MenuItem key={index} node={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

interface MenuItemProps {
  node: MenuNode;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ node }) => {
  let hasChildren = node.children !== undefined;

  let children = node.children
    ? node.children.map((item, index) => <MenuItem key={index} node={item} />)
    : null;

  const [expanded, setExpanded] = useState(false);

  let arrow = hasChildren && expanded ? <i>&and;</i> : <i>&or;</i>;

  return (
    <>
      {hasChildren ? (
        <>
          <li className={styles.parent} onClick={() => setExpanded(!expanded)}>
            {arrow} {node.name}
          </li>
          <ul className={expanded ? styles.expanded : undefined}>{children}</ul>
        </>
      ) : (
        <li>{node.name}</li>
      )}
    </>
  );
};

export default Menu;
