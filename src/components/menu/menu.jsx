import React, { memo } from 'react';
import Button from '../button/button';
import DetailMenu from '../detailMenu/detailMenu';
import styles from './menu.module.css';

const Menu = memo(({ menus }) => {
  return (
    <main className={styles.menu}>
      <section className={styles.container}>
        <ul>
          {menus.map(menu => (
            <DetailMenu menu={menu} />
          ))}
        </ul>
      </section>
      <Button />
    </main>
  )
});

export default Menu;