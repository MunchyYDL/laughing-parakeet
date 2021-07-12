import { useState } from "react";

import data from "./data.json";
import styles from "./Menu.module.css";

interface MenuNode {
  name: String
  children?: Array<MenuNode>
}

const Menu = () => {
  const [selected, setSelected] = useState('');

  return (
    <>
      <div className={styles.menu}>
        <ul>
          {data.map((item, index) => (
            <MenuItem key={index} node={item} selectedNode={selected} selectNode={setSelected} />
          ))}
        </ul>
      </div>
    </>
  );
};

interface MenuItemProps {
  node: MenuNode
  selectedNode: String
  selectNode: any
}

const MenuItem = ({ node, selectedNode, selectNode }: MenuItemProps) => {
  const [expanded, setExpanded] = useState(false);

  let hasChildren = node.children !== undefined;

  let children = node.children
    ? node.children.map((item, index) => <MenuItem key={index} node={item} selectedNode={selectedNode} selectNode={selectNode} />)
    : null;

  const clickHandler = () => {
    console.log(node.name);
    selectNode(node.name);
  }

  const toggleExpand = () => {
    if (hasChildren) {
      setExpanded(!expanded);
    }
  }

  // MenuItem parts
  let arrowState = expanded ? <>&#x276e;</> : <>&#x276f;</>;
  let arrow = hasChildren ? <i onClick={toggleExpand}>{arrowState}</i> : null;
  let subMenu = hasChildren ? <ul className={expanded ? styles.expanded : undefined}>{children}</ul> : null;

  return (
    <>
      <li>
        {arrow}
        <span className={selectedNode === node.name ? styles.selected : ''} onClick={clickHandler}>{node.name}</span>
      </li>
      {subMenu}
    </>
  );
};

export default Menu;
