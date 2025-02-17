import { ChangeEvent, useEffect, useState } from "react"
import { useLS } from "./service/useLS"

type InfoState = {
    name: string,
    position: string
    description: string
}

/**
 * A custom hook to manage the editing state of user information.
 *
 * @returns An object containing:
 * - `infoData`: The current state of the user's information (name, position, description).
 * - `name`: The current name in the information state.
 * - `position`: The current position in the information state.
 * - `description`: The current description in the information state.
 * - `isNameEditEnabled`: A boolean indicating if name editing is enabled.
 * - `isPositionEditEnabled`: A boolean indicating if position editing is enabled.
 * - `isDescriptionEditEnabled`: A boolean indicating if description editing is enabled.
 * - `setIsNameEditEnabled`: A function to toggle the name editing state.
 * - `setIsPositionEditEnabled`: A function to toggle the position editing state.
 * - `setIsDescriptionEditEnabled`: A function to toggle the description editing state.
 * - `setEditInfoData`: A function to update the user's information state.
 */

export const useInfoEdit = () => {

    const {set, getSync} = useLS()

    const [infoData, setEditInfoData] = useState<InfoState>({
        name: getSync<InfoState>("info")?.name || "John Doe",
        position: getSync<InfoState>("info")?.position || "Web Developer",
        description: getSync<InfoState>("info")?.description || "Website software developer using modern HTML5, CSS3 and JavaScript. Creating modern, easy-to-use, user-friendly websites and applications;",
    })


    const [isNameEditEnabled, setIsNameEditEnabled] = useState(false)
    const [isPositionEditEnabled, setIsPositionEditEnabled] = useState(false)
    const [isDescriptionEditEnabled, setIsDescriptionEditEnabled] = useState(false) 


    const {name, position, description} = infoData


    const setInfoData = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      

        setEditInfoData({
            ...infoData,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {

        set<InfoState>("info", infoData)

    }, [infoData])
    return {
        infoData,
        name,
        position,
        description,
        isNameEditEnabled,
        isPositionEditEnabled,
        isDescriptionEditEnabled,
        setInfoData,
        setIsNameEditEnabled,
        setIsPositionEditEnabled,
        setIsDescriptionEditEnabled,
    }
}