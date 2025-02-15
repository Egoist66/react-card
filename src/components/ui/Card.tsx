import { FC, useState } from "react";
import { Link } from "react-router";

enum SocialLinks {
  twitter = "twitter",
  facebook = "facebook",
  linkedIN = "linkedIN",
}
type ListItemsProps = {
  imgpath: string;
  name: SocialLinks;
  linksClassNames?: string;
  id: string;
};

const listsOfIcons: ListItemsProps[] = [
  {
    name: SocialLinks.twitter,
    imgpath: "/Vector-1.svg",
    id: "1",
    linksClassNames: "social-link",
  },
  {
    name: SocialLinks.facebook,
    imgpath: "/Vector.svg",
    id: "2",
    linksClassNames: "social-link",
  },
  {
    name: SocialLinks.linkedIN,
    imgpath: "/Vector-2.svg",
    id: "3",
    linksClassNames: "social-link",
  },
];

export const Card: FC = () => {
  const [currentLink, setCurrentLink] = useState<SocialLinks>(
    SocialLinks.twitter
  );

  const activateLink = (name: SocialLinks) => {
    setCurrentLink(name);
  };
  return (
    <div className="card">
      <div className="wrapper-img">
        <img className="img" src="/natka.JPG" alt="" />
      </div>

      <div className="card-info">
        <h1 className="name">Natali Yarosh</h1>
        <p className="profession">Frontend-developer</p>

        <p className="description">
          Website software developer using modern HTML5, CSS3 and JavaScript.
          Creating modern, easy-to-use, user-friendly websites and applications;
          Building state-of-the-art, easy to use, user friendly web sites and
          applications; actively seek out new technologies.
        </p>
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
      </div>
    </div>
  );
};
