import { FC } from "react";
import { useInfoEdit } from "../../hooks/useInfoEdit";

export const Author: FC = () => {
  const {
    isDescriptionEditEnabled,
    isNameEditEnabled,
    isPositionEditEnabled,
    setIsNameEditEnabled,
    setIsPositionEditEnabled,
    setIsDescriptionEditEnabled,
    name,
    infoData,
    setInfoData,
  } = useInfoEdit();
  return (
    <>
      {isNameEditEnabled ? (
        <input
          onBlur={() => name.length && setIsNameEditEnabled(false)}
          className="name"
          autoFocus
          name="name"
          onChange={(e) => setInfoData(e)}
          type="text"
          value={name}
        />
      ) : (
        <h1 onDoubleClick={() => setIsNameEditEnabled(true)} className="name">
          {name}
        </h1>
      )}

      {isPositionEditEnabled ? (
        <input
          onBlur={() =>
            infoData.position.length && setIsPositionEditEnabled(false)
          }
          className="profession"
          autoFocus
          name="position"
          onChange={(e) => setInfoData(e)}
          type="text"
          value={infoData.position}
        />
      ) : (
        <p
          onDoubleClick={() => setIsPositionEditEnabled(true)}
          className="profession"
        >
          {infoData.position}
        </p>
      )}

      {isDescriptionEditEnabled ? (
        <textarea
          onBlur={() =>
            infoData.description.length && setIsDescriptionEditEnabled(false)
          }
          className="description"
          autoFocus
          name="description"
          onChange={(e) => setInfoData(e)}
          value={infoData.description}
        >
          {infoData.description}
        </textarea>
      ) : (
        <p
          onDoubleClick={() => setIsDescriptionEditEnabled(true)}
          className="description"
        >
          {infoData.description}
        </p>
      )}
    </>
  );
};
