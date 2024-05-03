import { useToast } from "@chakra-ui/react"


const useCustomToast = () => {
    const toast = useToast({});
    return toast ;
}