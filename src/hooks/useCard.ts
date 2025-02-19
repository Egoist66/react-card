import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
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
  to:string;
  linksClassNames?: string;
  id: string;
};



type AvatarState = {
  url?: string;
  file?: File | null;
  urlValue?: string;
};

export const useCard = () => {
  const { set, getSync } = useLS();


  const defaultData = [
    {
      name: SocialLinks.twitter,
      imgpath: "/Vector-1.svg",
      to: '',
      id: "1",
      linksClassNames: "social-link",
    },
    {
      name: SocialLinks.facebook,
      to: '',
      imgpath: "/Vector.svg",
      id: "2",
      linksClassNames: "social-link",
    },
    {
      name: SocialLinks.linkedIN,
      to: '',
      imgpath: "/Vector-2.svg",
      id: "3",
      linksClassNames: "social-link",
    },
  ] as ListItemsProps[];

  const [listsOfIcons, setListsOfIcons] = useState<ListItemsProps[]>(getSync<ListItemsProps[]>("socials") || defaultData);

  const [currentLink, setCurrentLink] = useState<SocialLinks>(
    SocialLinks.twitter
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  const [avatarData, setAvatar] = useState<AvatarState>({
    url: getSync<AvatarState>("avatar")?.url || "",
    urlValue: getSync<AvatarState>("avatar")?.urlValue || "",
    file: null,
  });

  const saveAvatarToLSDebounced = debounce(
    () => set<AvatarState>("avatar", avatarData),
    500
  );

  const activateLink = useCallback((name: SocialLinks) => {
    setCurrentLink(name);
  }, []);

  const uploadAvatarWithLink = (url: string) => {
    setAvatar({
      ...avatarData,
      urlValue: url,
    });
  };

  const setAvatarUrlWithBlur = () => {
    if (!avatarData.urlValue?.match(/\.(jpeg|jpg|gif|png)$/i)) {
      return;
    }
    setAvatar({
      ...avatarData,
      url: avatarData.urlValue,
    });
  };

  const uploadAvatarWithFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const fileRaw = e.target.files[0];
      const file = new FileReader();
      file.onload = () => {
        setAvatar({
          ...avatarData,
          file: fileRaw,
          url: file.result as string,
          urlValue: file.result as string,
        });
        e.target.value = "";
      };

      file.readAsDataURL(fileRaw);


      file.onerror = () => {
        setAvatar({
          ...avatarData,
          file: null,
          urlValue: "",
        });
      };

      console.log(file);
    }
  };

  const clearAvatar = () => {
    setAvatar({
      ...avatarData,
      url: "",
      urlValue: "",
      file: null,
    });
  }

  useEffect(() => {
    saveAvatarToLSDebounced();

    return () => {};
  }, [avatarData]);

  useEffect(() => {
    if (!avatarData.urlValue?.length) {
      setAvatar({
        url: "",
        urlValue: "",
        file: null,
      });
    }

    return () => {};
  }, [avatarData.urlValue]);
  const { url, file, urlValue } = avatarData;



  const setHrefToSocials = useCallback((e: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {
    e.preventDefault();


    const newValue = window.prompt("Enter a link to your social media profile", listsOfIcons.find((item) => item.id === id)?.to || '');
    if(newValue && newValue.length) {
      setListsOfIcons((newListOfIcons) => newListOfIcons.map((item) =>item.id === id ? { ...item, to: newValue } : item));

    }
    
    
  },[setListsOfIcons])


  useEffect(() => {
    set<ListItemsProps[]>("socials", listsOfIcons)
  }, [listsOfIcons])

  return {
    currentLink,
    listsOfIcons,
    urlValue,
    inputFileRef,
    activateLink,
    setAvatarUrlWithBlur,
    uploadAvatarWithFile,
    setHrefToSocials,
    clearAvatar,
    url,
    file,
    uploadAvatarWithLink,
  };
};
