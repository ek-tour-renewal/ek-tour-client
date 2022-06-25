import React, { useEffect } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import Menu from '../menu/menu';
import SubHeader from '../subHeader/subHeader';
import styles from './company.module.css';

const Company = ({ logoURL, menu, changeMenu }) => {
  useEffect(() => {
    changeMenu('CEO 인사말');
    console.log(menu);
  },[]);
  
  return (
    <main className={styles.company}>
      <Header logoURL={logoURL} />
      <section className={styles.main}>
        <section className={styles.sideMenu}>
          <Menu />
        </section>

        <section className={styles.mainDetail}>
          <SubHeader menu={menu}/>
          <p className={styles.shortContent}>고객의 행복을 함께 만들어갑니다.</p>
          <div className={styles.detail}>
            <h1 className={styles.title}>TRUST & HONEST!</h1>
            <ul className={styles.contents}>
              <li className={styles.contentDetail}>
                저희 회사는 언제나 고객의 만족과 행복을 위해 최선을 다하고자 <br />
                노력하고 있습니다.
              </li>

              <li className={styles.contentDetail}>
                지난 수년간의 노력과 시행착오를 통해 저희 회사는 고객님들과 더불어 성장하였습니다. <br />
                관련업계의 경쟁이 점점 더 격화되고 있는 상황에서도 고객님을 먼저 생각하는 마음은 <br />
                고객님의 마음을 감동시켰습니다.
              </li>

              <li className={styles.contentDetail}>
                앞으로 저희기업은 더 나아가 21세기에 적합한 세계적인 기업으로 성장해 나가 <br />
                고객 여러분의 성원에 보답하도록 하겠습니다.
              </li>

              <li className={styles.contentDetail}>믿음과 신뢰!</li>

              <li className={styles.contentDetail}>
                이 두가지는 회사 경영에 가장 필요하고 필수적인 것임에도 불구하고 <br />
                많은 기업들이 생겨나고 없어지는 현실에서 믿음과 신뢰를 바탕으로 <br />
                회사를 경영해 나가는 곳은 드뭅니다.
              </li>

              <li className={styles.contentDetail}>
                (주)이케이투어는 언제나 고객과 임직원들에게 믿음과 신뢰를 주는 <br />
                회사로 소문이 나기를 바라며 아울러 대한민국에서 그 이름을 널리 <br />
                알리도록 노력하겠습니다.
              </li>

              <li className={styles.contentDetail}>
                이익만을 챙기는 기업이 아니라 사회의 일원으로서 <br />
                더 좋은, 살기좋은 사회를 만들어가는 데 좀  더 앞장서는 <br />
                회사가 되도록 노력하겠습니다.
              </li>

              <li className={styles.contentDetail}>
                실수가 있고 모자란 점이 있더라도 고객님들의 넓은 마음으로 <br />
                이해해 주시고 그럴때마다 채찍질 해주시는 조언이 필요합니다. <br />
              </li>

              <li className={styles.contentDetail}>
                고객님 한 분 한 분의 즐거운 여행을 위하여 앞으로도 정말 <br />
                혼신의 힘을 다하여 노력할 것을 약속드립니다.
              </li>

              <li className={styles.contentDetail}>감사합니다.</li>
            </ul>
            <div className={styles.ceo}>
              <p>대표이사</p>
              <p className={styles.ceoName}>배 승 원</p>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </main >
  );
};

export default Company;