import { FC, memo } from "react";
import { ListItemsProps, SocialLinks } from "../../hooks/useCard";
import { Link } from "react-router";


type SocialsProps = {listsOfIcons: ListItemsProps[], activateLink: (name: SocialLinks) => void, currentLink: string}

export const Socials: FC<SocialsProps> = memo(({
    listsOfIcons,
    activateLink,
    currentLink
}) => {
  return (
    <ul className="socials-list">
      {listsOfIcons.map((listItem) => (
        <li onClick={() => activateLink(listItem.name)} key={listItem.id}>
          <Link
            className={`${listItem.linksClassNames} ${
              currentLink === listItem.name ? "active" : ""
            }`}
            to="/"
          >
            <img src={listItem.imgpath} alt="" />
          </Link>
        </li>
      ))}
    </ul>
  );
});
