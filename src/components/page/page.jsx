import React from 'react';
import BigBus from '../bigBus/bigBus';
import BusNotice from '../busNotice/busNotice';
import Company from '../company/company';
import Footer from '../footer/footer';
import Header from '../header/header';
import Limousine from '../limousine/limousine';
import Main from '../main/main';
import ServiceCenter from '../serviceCenter/serviceCenter';
import SmallBus from '../smallBus/smallBus';

const Page = (props) => {

  return (
    <section>
      <Header logoURL={props.logoURL} changePage={props.changePage} />
      <main>
        {props.state == 'main' &&
          <Main
            Ref={props.Ref}
            getData={props.getData}
          />
        }

        {props.state == 'introduce' &&
          <Company
            menu={props.menu}
            changeMenu={props.changeMenu}
            menus={props.menus}
          />
        }

        {props.state == 'notice' &&
          <BusNotice
            menu={props.menu}
            changeMenu={props.changeMenu}
            menus={props.menus}
          />
        }

        {props.state == 'smallBus' &&
          <SmallBus
            menu={props.menu}
            changeMenu={props.changeMenu}
            menus={props.menus}
          />
        }

        {props.state == 'limousine' &&
          <Limousine
            menu={props.menu}
            changeMenu={props.changeMenu}
            menus={props.menus}
          />
        }

        {props.state == 'bigBus' &&
          <BigBus
            menu={props.menu}
            changeMenu={props.changeMenu}
            menus={props.menus} />
        }

        {props.state == 'serviceCenter' &&
          <ServiceCenter
            menu={props.menu}
            changeMenu={props.changeMenu}
            menus={props.menus} />
        }
      </main>
      <Footer />
    </section>
  )
};

export default Page;