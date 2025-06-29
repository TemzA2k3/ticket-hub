import { FC } from "react"

import { IBlankPageProps } from "../types/index"



export const BlankSearch: FC<IBlankPageProps> = ({ image, title, description, border }) => {
    return (
        <div className={`text-center py-20 ${ border ? "border border-border" : ""} rounded bg-background`}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center text-xl text-muted-foreground">
              <i className={ image }></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">{ title }</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              { description }
            </p>
        </div>
    )
}