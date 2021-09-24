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
        <div className={classes.lowTab}>
          Copyright © 2021 Taisia Novikova. All rights reserved.
        </div>
      </div>
    </div>
  );
};
 
