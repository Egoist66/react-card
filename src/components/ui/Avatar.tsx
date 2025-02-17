import { FC, memo } from "react";
import { useCard } from "../../hooks/useCard";

export const Avatar: FC<{ url?: string }> = memo(({ url }) => {
  const {
    url: urlAvatar,
    urlValue,
    inputFileRef,
    setAvatarUrlWithBlur,
    uploadAvatarWithFile,
    uploadAvatarWithLink,
  } = useCard();
  return (
    <div
      style={{ backgroundColor: !url || !urlAvatar ? "#292A2E" : "" }}
      className="wrapper-img"
    >
      <div className="upload-controls">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputFileRef}
            onChange={uploadAvatarWithFile}
            hidden
            className="avatar-upload"
            type="file"
            name="file"
          />
          <button
            onClick={() => inputFileRef.current?.click()}
            type="button"
            className="upload-btn"
          >
            Upload
          </button>
          <input
            value={urlValue}
            onChange={(e) => uploadAvatarWithLink(e.target.value)}
            onBlur={setAvatarUrlWithBlur}
            placeholder="Enter avatar url"
            className="avatar-url"
            type="url"
            name="url"
          />
        </form>
      </div>

      {(urlAvatar || url) && (
        <img
          style={{ objectPosition: url ? "0 -70px" : "" }}
          className="img"
          src={urlAvatar || url}
          alt=""
        />
      )}
    </div>
  );
});
