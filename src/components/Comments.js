import { UserAuth } from "../context/AuthContext";

const Comments = ({ commentArray }) => {
  const { user, userImg } = UserAuth();

  console.log(commentArray);

  return (
    <div className="commentSection">
      <div>comments will go here</div>
      <div className="answeringSection">
        <img
          className="profilePic"
          src={userImg}
          alt={`${user.displayName}'s profile`}
        />
        <input type="text" />
      </div>
    </div>
  );
};

export default Comments;
