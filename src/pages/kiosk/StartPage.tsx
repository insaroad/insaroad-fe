import React, { type JSX } from 'react';
import '@/styles/kiosk/style.css';

import imgInsaroad from '@/assets/img-insaroad.png';
import KioskLongButton from '@/components/kiosk/KioskLongButton';

export default function StartPage(): JSX.Element {
  return (
    <div className="kiosk">
      <div className="section-main">
        <div className="title">INSAROAD</div>

        <img className="img-insaroad" alt="Img insaroad" src={imgInsaroad} />
      </div>

      <div className="section-btns">
        <KioskLongButton text="Make Custom Route" />
        <KioskLongButton text="Follow Hot Course" />
      </div>
    </div>
  );
}
