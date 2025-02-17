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
  url?: string;
  file?: File | null;
  urlValue?: string;
};

export const useCard = () => {
  const { set, getSync } = useLS();

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

  return {
    currentLink,
    listsOfIcons,
    urlValue,
    inputFileRef,
    activateLink,
    setAvatarUrlWithBlur,
    uploadAvatarWithFile,
    clearAvatar,
    url,
    file,
    uploadAvatarWithLink,
  };
};
