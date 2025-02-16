import { FC, ReactNode } from "react";

export const CardInfo: FC<{children: ReactNode}> = ({children}) => {
    return (
        <div className="card-info">
            {children}
        </div>
    )
}