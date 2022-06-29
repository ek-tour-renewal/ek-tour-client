import React, { useEffect } from 'react';
import styles from './serviceCenter.module.css';
import SubHeader from '../subHeader/subHeader';

const ServiceCenter = ({ menu, changeMenu, }) => {
  useEffect(() => {
    changeMenu('고객센터');
  }, []);

  return (
    <main>
    <section className={styles.serviceCenter}>
      <SubHeader menu={menu} />
      {/* 이용안내 */}
      <h1 className={styles.title}>이용안내</h1>
      <ul className={styles.useInfo}>
        <li className={styles.useStep}>
          <p className={styles.useStepNumber}>01</p>
          <p className={styles.mainUseStep}>견적요청 <br /> 전화상담</p>
        </li>
        <li className={styles.icon}>
          <i class='fa-solid fa-circle-arrow-right'></i>
        </li>
        <li className={styles.useStep}>
          <p className={styles.useStepNumber}>02</p>
          <p className={styles.mainUseStep}>상담후 견적서 제공</p>
          <p className={styles.subUseStep}>(전화, 메일, SMS 문자)</p>
        </li>
        <li className={styles.icon}>
          <i class='fa-solid fa-circle-arrow-right'></i>
        </li>
        <li className={styles.useStep}>
          <p className={styles.useStepNumber}>03</p>
          <p className={styles.mainUseStep}>계약금 입급 <br /> 계약서 작성</p>
        </li>
        <li className={styles.icon}>
          <i class='fa-solid fa-circle-arrow-right'></i>
        </li>
        <li className={styles.useStep}>
          <p className={styles.useStepNumber}>04</p>
          <p className={styles.mainUseStep}>배차</p>
          <p className={styles.subUseStep}>(1일~3일 전)</p>
        </li>
        <li className={styles.icon}>
          <i class='fa-solid fa-circle-arrow-right'></i>
        </li>
        <li className={styles.useStep}>
          <p className={styles.useStepNumber}>05</p>
          <p className={styles.mainUseStep}>배차 후 <br /> 기사님 확인전화</p>
        </li>
        <li className={styles.icon}>
          <i class='fa-solid fa-circle-arrow-right'></i>
        </li>
        <li className={styles.useStep}>
          <p className={styles.useStepNumber}>06</p>
          <p className={styles.mainUseStep}>당일출발</p>
        </li>
      </ul>
      <ul className={styles.useInfoDetailContainer}>
        <li className={styles.useInfoDetail}>견적요청시 자동으로 문자메시지가 발송됩니다.</li>
        <li className={styles.useInfoDetail}>모든 견적은 부가세 별도이며 카드, 현금영수증, 세금계산서 발급시 10% 추가됩니다.</li>
      </ul>
      {/* 취소 및 환불규정 */}
      <h1 className={styles.title}>취소 및 환불규정</h1>
      <ul className={styles.container}>
        <li>
          <li className={styles.list}><h3>전세버스 대절의 취소에 따른 환불은 당사의 취소 및 환불규정에 따라 운임을 환불합니다.</h3></li>
          <li className={styles.policyDetail}>
            <li>당사의 환불규정은 적합한 상거래 및 상도덕에 준하며 전세버스 표준 약관에 준합니다.</li>
            <li>취소 및 환불에 대한 규정은 예약부도에 대한 당사의 손해를 방지하고 장기적으로 고객님들에게 보다 나은 서비스를 제공하는</li>
            <li>차원에서 부과됩니다.</li>
            <li>특히 전세/관광버스의 특성상 운임요금 및 성수기와 비수기의 수요 공급에 따라 다르게 책정되오며 임차 운임자체가 비싸고</li>
            <li>미리 예약된 버스 및 운행예약이 취소가 되면 다른 고객과의 계약이 불가능하게 되므로 운휴대체비용이 부가되는 것입니다.</li>
            <br />
            <li>단, 운수 회사의 귀책으로 운행을 못하게 되었을시 운수회사는 예약금 100%를 고객에게 지급해야 합니다.</li>
            <br />
            <li>이외에 민법의 규정에도 계약은 상호 신의 성실의 원칙에 따라 지켜져야 한다고 규정되어 있으며, 규정되지 않은 사항에</li>
            <li>대해서는 상호간의 합의에 따라 해지 및 환불을 해드리고 있습니다.</li>
          </li>
        </li>
        <li>
          <li className={styles.list}><h3>차량 사용일 5일전부터 취소에 대한 환불규정이 책정됩니다.</h3></li>
        </li>
        <li>
          <li className={styles.list}><h3>취소 및 환불규정은 비수기와 성수기에 구분됩니다.</h3></li>
          <li className={styles.policyDetail}>
            <li className={styles.dateDetail}><h4>📅 성수기 : 4월~5월, 9월~10월</h4></li>
            <div className={styles.dateDetailContainer}>
              <li>- 운행예정일 (5일전 이후) 취소시 예약금액의 100% 환불</li>
              <li>- 운행예정일 (5일전~3일전까지) 취소시 예약금액의 50% 환불</li>
              <li>- 운행예정일 (2일전까지) 취소시 예약금액 20% 환불</li>
              <li>- 운행예정일 (당일) 취소시 예약금액 전액 환불불가/예약금이 없을시 위약금 20%</li>
            </div>
          </li>
          <li className={styles.policyDetail}>
            <li className={styles.dateDetail}><h4>📅 비수기 : 성수기 이외 달</h4></li>
            <div className={styles.dateDetailContainer}>
              <li>- 운행예정일 (3일전 이후) 취소시 예약금액의 100% 환불</li>
              <li>- 운행예정일 (3일전~당일전까지) 취소시 예약금액의 50% 환불</li>
              <li>- 운행예정일 (당일) 취소시 전액 환불불가/예약금이 없을 시 위약금 10%</li>
            </div>
          </li>
        </li>
      </ul>
      {/* 고객센터 */}
      <h1 className={styles.title}>고객센터</h1>
      <ul className={styles.container}>
        <li>
          <li className={styles.list}><h3>(주)이케이하나관광은 24시간 상담이 가능하며 카톡으로도 실시간 상담이 가능합니다.</h3></li>
          <li className={styles.serviceDetail}>
            <li className={styles.serviceNotice}><h4>💻 고객센터 안내</h4></li>
            <div className={styles.serviceDetailContainer}>
              <li>전화번호 : 02-3432-6545 팩스번호 : 02-6008-6545</li>
              <li>이메일 상담 : hanatour0914@gmail.com</li>
              <li>카톡아이디 : seanpapa</li>
            </div>
          </li>
          <li className={styles.accountDetail}>
            <li className={styles.accountNotice}><h4>💸 계좌번호 안내</h4></li>
            <div className={styles.accountDetailContainer}>
              <li>예금주 : (주)이케이투어</li>
              <li>계좌번호 : 국민은행 810137-04-006627</li>
            </div>
          </li>
        </li>
        <li className={styles.list}><h3>통장사본과 사업자등록증 사본은 이곳에서 다운로드 가능합니다.</h3></li>
      </ul>
      </section>
    </main>
  )
};

export default ServiceCenter;