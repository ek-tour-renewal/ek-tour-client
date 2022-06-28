import React from 'react';
import styles from './detailMenu.module.css';

const DetailMenu = ({ menu }) => {
  return (
    <li className={styles.detailMenu}>
      <a className={styles.menu} href={menu.url}>{menu.menu}</a>
    </li>
  )
};

export default DetailMenu;