import { useState, useRef, ChangeEvent } from 'react';
import { useStatuses } from './useStatuses';

export const useUpload = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploadData, setUploadData] = useState<File | null>(null);

    const { statuses, setError, resetStatuses, setRestoring, setLoading, setSuccess } = useStatuses();

   const upload = (e: ChangeEvent<HTMLInputElement>) => {
       if(e.target.files?.length){
           const file = e.target.files[0];
           console.log(file);
           
       }
   }

  

    return {
        inputRef,
        upload,
        uploadData,
        statuses,
    };
};
