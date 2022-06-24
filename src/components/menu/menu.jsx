import React,{ memo } from 'react';
import Button from '../button/button';
import DetailMenu from '../detailMenu/detailMenu';
import styles from './menu.module.css';

const Menu = memo((props) => {
  return (
    <main>
      <section className={styles.menu}>
        <ul>
          <DetailMenu />
        </ul>
      </section>
      <Button />
    </main>
  )
});

export default Menu;