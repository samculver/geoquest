import React, { useState } from "react"
import styles from "../styles.module.scss"
import Layout from "../components/layout"
import BottomDrawer, {
  BottomDrawerPeek,
  BottomDrawerFull,
} from "../components/bottomDrawer"

const DrawerDemo = () => {
  const [drawerMode, setDrawerMode] = useState(null)
  /* 
    To use the drawer you just have to change the "display" prop
    on the "BottomDrawer" component to "peek", "full", or null
    to change the appearance. This demo is built as as 
    "functional stateless React component" so it uses a "useState" hook
    for updating the state, but if you use a normal stateful React component
    you could use the normal "state" to change the "display" prop on
    the "BottomDrawer" component.
  */
  return (
    <>
      <p>
        <h2>Drawer component demo</h2>
        <button className={styles.button} onClick={() => setDrawerMode("peek")}>
          Peek
        </button>
        <button className={styles.button} onClick={() => setDrawerMode("full")}>
          Full
        </button>
        <button className={styles.button} onClick={() => setDrawerMode(null)}>
          Hide
        </button>
      </p>
      <BottomDrawer display={drawerMode}>
        <BottomDrawerPeek>This is the drawer "peek" area.</BottomDrawerPeek>
        <BottomDrawerFull>
          <p>
            This is the drawer full details. Put whatever you want in here and
            the drawer will make it visible.
          </p>
        </BottomDrawerFull>
      </BottomDrawer>
    </>
  )
}

export default DrawerDemo
