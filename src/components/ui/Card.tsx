import { FC } from "react";
import { useCard } from "../../hooks/useCard";
import { Avatar } from "./Avatar";
import { CardInfo } from "./CardInfo";
import { Author } from "./Author";
import { Socials } from "./Socials";



export const Card: FC = () => {


  const {activateLink, url, currentLink, listsOfIcons} = useCard()
 
  return (
    <div className="card">
      
      <Avatar url={url}/>

      <CardInfo>
        <Author />

        <Socials 
         activateLink={activateLink}
         currentLink={currentLink}
         listsOfIcons={listsOfIcons}
        />
      </CardInfo>
    </div>
  );
};
