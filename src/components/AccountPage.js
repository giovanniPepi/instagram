import { UserAuth } from "../context/AuthContext";

const AccountPage = () => {
  const { logOut, user } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      Welcome, {user?.displayName}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default AccountPage;
