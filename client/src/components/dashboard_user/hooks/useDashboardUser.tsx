import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { controllerUser } from "../../../../helpers/mercadopago/userPurchases";
import { useAppSelector } from "../../../Redux/hook";
import { userInterface } from "../../../Redux/slice/user/user.slice";
import { Payments } from "../interface/iDashboardUser";

export const useDashboardUser = () => {
  const { user, isAuthenticated } = useAuth0();
  const [purchase, setPurchase] = useState<Payments[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openFavo, setOpenFavo] = useState<boolean>(false);

  const userByBd: userInterface = useAppSelector(
    state => state.userReducer.userState
  );

  const email = userByBd.email;
  const verified = userByBd.email_verified;

  useEffect(() => {
    const handleGetItems = async () => {
      const response = await controllerUser(email);
      setPurchase(response);
    };
    if (isAuthenticated) {
      handleGetItems();
    }
  }, [isAuthenticated]);

  const handleFormatedDate = (date_created: string) => {
    const date = new Date(date_created);
    const [day, month, year] = date.toLocaleDateString().split("/");
    return `${day}-${month}-${year}`;
  };

  const infoRender = {
    information: {
      title: "My Information",
      p: "Manage your personal data",
      img: "https://icon-library.com/images/profile-png-icon/profile-png-icon-24.jpg",
    },
    favorites: {
      title: "My Favorites",
      p: "Manage your products favorites",
      img: "https://icon-library.com/images/profile-png-icon/profile-png-icon-24.jpg",
    },
    shopping: {
      title: "My Shopping",
      img: "https://icon-library.com/images/purchase-icon-png/purchase-icon-png-8.jpg",
    },
  };

  return [
    purchase,
    userByBd,
    user,
    email,
    verified,
    infoRender,
    openModal,
    openFavo,
    { setOpenModal, setOpenFavo, handleFormatedDate },
  ];
};
