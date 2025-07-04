// hooks/mutations/useSendFromUae.ts
import { useMutation } from "@tanstack/react-query";
import { IGetFromUae } from "@/models/types/types";
import { clinicServicePost } from "@/services/services_post";

export const useSendFromUae = () => {
	return useMutation({
		mutationFn: (data: IGetFromUae) => clinicServicePost.getFromUae(data),
	});
};
