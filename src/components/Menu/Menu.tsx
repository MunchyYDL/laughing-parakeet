import { useEffect, useState } from "react";

import styles from "./Menu.module.css";

interface MenuNode {
  name: string
  children?: MenuNode[]
}

interface AppState {
  loading: boolean
  menuNodes: MenuNode[]
}

const Menu = () => {
  const [selectedNode, setSelected] = useState('');

  const initialState: AppState = {
    loading: false,
    menuNodes: []
  };

  const [appState, setAppState] = useState(initialState);

  useEffect(() => {

    console.log('Effect!');
    setAppState({ ...appState, loading: true });

    const url = `https://run.mocky.io/v3/fd5940a6-2fc0-416f-8f72-ed1486508f68`;
    // Delete-link: https://designer.mocky.io/manage/delete/fd5940a6-2fc0-416f-8f72-ed1486508f68/zrVK6KlBWffp6eTshFL6s31YIteVmYVXYaqi

    fetch(url)
      .then(value => wait(2000, value))
      .then((res) => res.json())
      .then((nodes: MenuNode[]) => {
        setAppState({ ...appState, loading: false, menuNodes: nodes });
      });

  }, []);

  function wait<T>(ms: number, value: T) {
    return new Promise<T>((resolve) => setTimeout(resolve, ms, value));
  }

  return (
    <>
      <div className={styles.menu}>
        <ul>
          {appState.loading || appState.menuNodes === null
            ? <li>Loading...</li>
            : appState.menuNodes.map((item, index) => (
              <MenuItem key={index} node={item} selectedNode={selectedNode} selectNode={setSelected} />
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
