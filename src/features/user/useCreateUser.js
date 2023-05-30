
import { axiosInstance } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'

export const useCreateUser = ({ onError, onSuccess}) => {
    return useMutation ({
        mutationFn: async (body) => {
            const response = await axiosInstance.post("/register",body)

            return response
        },
        onError,
        onSuccess
    })
}