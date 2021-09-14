import React from "react";

import classes from "./Footer.module.css";
import facebookIcon from "../../assets/images/socialMediaIcons/facebookIcon.png";
import instagramIcon from "../../assets/images/socialMediaIcons/instagramIcon.png";
import twitterIcon from "../../assets/images/socialMediaIcons/twitterIcon.png";

type PropsType = {};

export const Footer: React.FC<PropsType> = () => {
  return (
    <div className={classes.footerPage}>
      <div className={classes.footer}>
        <div className={classes.footerIcons}>
          <img src={facebookIcon} className={classes.icon} />
          <img src={instagramIcon} className={classes.icon} />
          <img src={twitterIcon} className={classes.icon} />
        </div>
        <div>
          <hr></hr>
        </div>
        <div className={classes.lowTab}>2021. All Rights Reserved ©</div>
      </div>
    </div>
  );
};
