import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks/useTypedReduxUtils";

import { MainLayout } from "../shared/layouts/MainLayout";
import { UserProfile } from "../shared/components/UserProfile";

export const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { user, initialized } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!initialized) return;

    if (!user) {
      navigate("/signin");
      return;
    }

    if (!userId) {
      navigate(`/profile/${user.id}`);
      return;
    }

    if (userId !== user.id.toString()) {
      navigate("/signin");
    }
  }, [user, userId, navigate, initialized]);

  if (!initialized) return null;

  return (
    <MainLayout>
      {userId && <UserProfile userId={userId} />}
    </MainLayout>
  );
};
