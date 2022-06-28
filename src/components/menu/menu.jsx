import React, { memo } from 'react';
import Button from '../button/button';
import DetailMenu from '../detailMenu/detailMenu';
import styles from './menu.module.css';

const Menu = memo(() => {
  return (
    <main className={styles.menu}>
      <section className={styles.container}>
        <ul>
          <menu type="context"></menu>
        </ul>
      </section>
      <Button />
    </main>
  )
});

export default Menu;