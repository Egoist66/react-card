import { useCallback, useEffect, useState } from "react";
import { useLS } from "./service/useLS";
import { debounce } from "../utils/debounce";

export enum SocialLinks {
    twitter = "twitter",
    facebook = "facebook",
    linkedIN = "linkedIN",
}
export type ListItemsProps = {
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
  

type AvatarState = {
    url?: string
    file?: File | null
}


export const useCard = () => {

    const {set, getSync} = useLS()


    const [currentLink, setCurrentLink] = useState<SocialLinks>(
        SocialLinks.twitter
    );

    const [avatarData, setAvatar] = useState<AvatarState>({
        url: getSync<AvatarState>('avatar')?.url,
        file: null
    })
    
    const activateLink = useCallback((name: SocialLinks) => {
        setCurrentLink(name);
    }, []);

    const uploadAvatarWithLink = useCallback((url: string) => {
        setAvatar({
            ...avatarData,
            url
        })
    }, [avatarData.url])


    
    const saveAvatarToLSDebounced = debounce(
        () => set<AvatarState>('avatar', avatarData),
        1000
    );

    useEffect(() => {
        saveAvatarToLSDebounced();

        return () => {
        };
    }, [avatarData.url]);


    const {url, file} = avatarData

    return {
        currentLink,
        listsOfIcons,
        activateLink,
        url,
        file,
        uploadAvatarWithLink
    }

}