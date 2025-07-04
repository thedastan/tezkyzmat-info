import axios, { CreateAxiosDefaults } from 'axios'

// export const API_ADDRESS = process.env.BASE_API_URL
export const API_ADDRESS = 'https://api.tezkyzmat.com.kg/api/'
// https://api.tezkyzmat.com.kg/api/private/v1/orders/from_uae/

const options: CreateAxiosDefaults = {
	baseURL: API_ADDRESS,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: false
}

const PUBLIC_API = axios.create(options)

// const PRIVATE_API = axios.create(options)

// PRIVATE_API.interceptors.request.use(config => {
// 	const accessToken = getAccessToken()

// 	if (config?.headers && accessToken)
// 		config.headers.Authorization = `Bearer ${accessToken}`

// 	return config
// })

// PRIVATE_API.interceptors.response.use(
// 	config => config,
// 	async error => {
// 		const originalRequest = error.config
// 		errorUserNotFound(error)

// 		if (
// 			(error?.response?.status === 401 ||
// 				errorCatch(error) === 'jwt expired' ||
// 				errorCatch(error) === 'jwt must be provided') &&
// 			error.config &&
// 			!error.config._isRetry
// 		) {
// 			originalRequest._isRetry = true
// 			try {
// 				await authService.getNewTokens()
// 				return PRIVATE_API.request(originalRequest)
// 			} catch (error) {
// 				if (errorCatch(error) === 'jwt expired') removeFromStorage()
// 			}
// 		}

// 		throw error
// 	}
// )

export { PUBLIC_API }
