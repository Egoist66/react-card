import { FC, JSX } from "react";

type DefaultLayoutProps = {
    children?: React.ReactNode | JSX.Element,
    header?: React.ReactNode | (() => React.ReactNode) | JSX.Element,
    footer?: React.ReactNode | (() => React.ReactNode | JSX.Element),
    render?: (props: any) => React.ReactNode | JSX.Element
}

export const Default: FC<DefaultLayoutProps> = ({children, header, footer, render}) => {
    return (
        <div id="layout">
        
            {header && <header>
                {typeof header === 'function' ? header() : header}
            </header>}

            <main>
                {children ?? render?.({})}
            </main>

            {footer && <footer>
                {typeof footer === 'function' ? footer() : footer}
            </footer>}
        
        
        </div>
    )
}