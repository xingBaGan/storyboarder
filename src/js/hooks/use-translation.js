import { useState } from 'react'
import i18n from '../services/i18next.config'

const useTranslation = ({
    translationKey,
    defaultText
}) => {
  const [t, setT] = useState(i18n.t(translationKey, defaultText))
  return { t, setT }
}

export default useTranslation