import { useLocale as useUntypedLocale } from 'next-intl'

import { IntlType } from '@/models/types/intl-types'

export default function useTypedLocale() {
	return useUntypedLocale() as IntlType
}
