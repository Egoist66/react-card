import { FC, memo } from "react";
import { useCard } from "../../hooks/useCard";

export const Avatar: FC<{ url?: string }> = memo(({ url}) => {

    const {url: urlAvatar, uploadAvatarWithLink} =  useCard()
  return (
    <div
      style={{ backgroundColor: !url || !urlAvatar ? "#292A2E" : "" }}
      className="wrapper-img"
    >
      <div className="upload-controls">
        <form onSubmit={(e) => e.preventDefault()}>
          <input hidden className="avatar-upload" type="file" name="file" />
          <button type="button" className="upload-btn">
            Upload
          </button>
          <input
            value={urlAvatar ?? url}
            onChange={(e) => uploadAvatarWithLink(e.target.value)}
            placeholder="Enter avatar url"
            className="avatar-url"
            type="url"
            name="url"
          />
        </form>
      </div>

      {(urlAvatar || url) && <img className="img" src={urlAvatar ?? url} alt="" />}
    </div>
  );
});
