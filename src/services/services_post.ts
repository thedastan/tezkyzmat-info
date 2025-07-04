import { PUBLIC_API } from "@/api/interceptors";
import { IGetFromUae } from "../models/types/types";

class ClinicServicesPost {
	private BASE_URL = "private/v1/orders/";

	async getFromUae(data: IGetFromUae) {
		const response = await PUBLIC_API.post(this.BASE_URL + "from_uae/", data);
		return response.data;
	}
}

export const clinicServicePost = new ClinicServicesPost();
