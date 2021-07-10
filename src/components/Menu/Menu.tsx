import { FC, useState } from "react";

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

const MenuItem: FC<MenuItemProps> = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  let hasChildren = node.children !== undefined;

  let children = node.children
    ? node.children.map((item, index) => <MenuItem key={index} node={item} />)
    : null;

  let arrow = hasChildren && expanded ? <i>&or;</i> : <i>&gt;</i>;

  const clickHandler = () => {
    console.log(node.name);
    if (hasChildren) {
      setExpanded(!expanded);
    }
  }

  return (
    <>
      {hasChildren ? (
        <>
          <li className={styles.parent} onClick={clickHandler}>
            {arrow} {node.name}
          </li>
          <ul className={expanded ? styles.expanded : undefined}>{children}</ul>
        </>
      ) : (
        <li className={styles.leaf} onClick={clickHandler}>{node.name}</li>
      )}
    </>
  );
};

export default Menu;
