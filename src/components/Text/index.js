import useTranslation from '../../js/hooks/use-translation'

const Text = ({
    translationKey,
    defaultText
}) => {
    const { t } = useTranslation({ translationKey, defaultText })
    return <span>{t}</span>
}

export default Text;