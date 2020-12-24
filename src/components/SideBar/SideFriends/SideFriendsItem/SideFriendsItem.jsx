import React from "react";
import classes from "./FriendsItem.module.css";
import FriendsPost from "./SideFriendsPost/SideFriendsPost";

const FriendsItem = (props) => {
  
  let friendsElements = props.friends.map((friend) => (
    <FriendsPost name={friend.name} />
  ));

  return (
    <div>
      <h3>Friends</h3>
      <div className={classes.postsBlock}>
        
        
      </div>
      <div className={classes.friendsPosts}>{friendsElements}</div>
    </div>
  );
};

export default FriendsItem;
