import React from 'react';
import Button from '../button/button';
import DetailMenu from '../detailMenu/detailMenu';
import styles from './menu.module.css';

const Menu = (props) => {
  return (
    <main>
      <section className={styles.menu}>
        <DetailMenu />
      </section>
      <Button />
    </main>
  )
};

export default Menu;