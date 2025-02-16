import { useState } from "react"

export enum TodoListCreateStatuses {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    RESTORING = 'RESTORING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    DELETING = 'DELETING',
}


export const useStatuses = () => {
    const [statuses, setStatuses] = useState<TodoListCreateStatuses>(TodoListCreateStatuses.IDLE)

    const setLoading = () => setStatuses(TodoListCreateStatuses.LOADING)
    const setRestoring = () => setStatuses(TodoListCreateStatuses.RESTORING)
    const setSuccess = () => setStatuses(TodoListCreateStatuses.SUCCESS)
    const setError = () => setStatuses(TodoListCreateStatuses.ERROR)
    const setDeleting = () => setStatuses(TodoListCreateStatuses.DELETING)
    
    const resetStatuses = () => setStatuses(TodoListCreateStatuses.IDLE)

    return {statuses, setLoading, setRestoring, setDeleting, setSuccess, setError, resetStatuses}
}
