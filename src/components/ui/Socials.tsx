import { FC, memo } from "react";
import { ListItemsProps, SocialLinks } from "../../hooks/useCard";
import { Link } from "react-router";


type SocialsProps = {
  listsOfIcons: ListItemsProps[], 
  activateLink: (name: SocialLinks) => void, 
  setHrefToSocials: (e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => void,
  currentLink: string
}

export const Socials: FC<SocialsProps> = memo(({
    listsOfIcons,
    activateLink,
    setHrefToSocials,
    currentLink
}) => {
  return (
    <ul className="socials-list">
      {listsOfIcons.map((listItem) => (
        <li onContextMenu={(e) => setHrefToSocials(e, listItem.id)} onClick={() => activateLink(listItem.name)} key={listItem.id}>
          <Link
            target="_blank"
            className={`${listItem.linksClassNames} ${
              currentLink === listItem.name ? "active" : ""
            }`}
            to={listItem.to}
          >
            <img src={listItem.imgpath} alt="" />
          </Link>
        </li>
      ))}
    </ul>
  );
});
