import { FC } from "react";
import { useCard } from "../../hooks/useCard";
import { Avatar } from "./Avatar";
import { CardInfo } from "./CardInfo";
import { Author } from "./Author";
import { Socials } from "./Socials";

export const Card: FC = () => {
  const { activateLink, setHrefToSocials, currentLink, listsOfIcons } = useCard();

  return (
    <div className="card">
      <Avatar url="https://static.vecteezy.com/system/resources/previews/003/337/584/large_2x/default-avatar-photo-placeholder-profile-icon-vector.jpg" />

      <CardInfo>
        <Author />

        <Socials
          activateLink={activateLink}
          setHrefToSocials={setHrefToSocials}
          currentLink={currentLink}
          listsOfIcons={listsOfIcons}
        />
      </CardInfo>
    </div>
  );
};
