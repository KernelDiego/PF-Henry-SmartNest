import ModalUser from "./components/modalUser/ModalUser";
import FavoritesModal from "./components/favoritesModal/FavoritesModal";
import { UserInfo } from "./components/userInfo/UserInfo";
import { SectionShopping } from "./components/sectionShopping/SectionShopping";
import { MyShopping } from "./components/myShopping/MyShopping";
import { useDashboardUser } from "./hooks/useDashboardUser";

export const Dashboard_user = () => {

  const [
    purchase,
    userByBd,
    user,
    email,
    verified,
    infoRender,
    openModal,
    openFavo,
    { setOpenModal, setOpenFavo, handleFormatedDate },
  ]:any =
    useDashboardUser();

  return (
    <div className='all' style={!purchase?.length ? { height: "85vh" } : {}}>
      <UserInfo
        userByBd={userByBd}
        user={user}
        email={email}
        verified={verified}
      />

      <SectionShopping
        setOpen={setOpenModal}
        open={openModal}
        info={infoRender.information}
      />

      <SectionShopping
        setOpen={setOpenFavo}
        open={openFavo}
        info={infoRender.favorites}
      />

      <MyShopping
        purchase={purchase}
        handleFormatedDate={handleFormatedDate}
        info={infoRender.shopping}
      />

      {openModal && (
        <ModalUser
          close={setOpenModal}
          userByBd={userByBd}
        />
      )}

      {openFavo && (
        <FavoritesModal
          user_id={userByBd._id}
          closeModal={setOpenFavo}
          favorites={userByBd.favorites}
        />
      )}
    </div>
  );
};
