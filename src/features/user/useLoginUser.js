import { axiosInstance } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

export const useLoginUser = ({ onError ,onSuccess}) => {
    return useMutation ({
        mutationFn: async (body) => {
            const response = await axiosInstance.post("/login",body)

            return response
        },
        onError,
        onSuccess,
        
    })
}