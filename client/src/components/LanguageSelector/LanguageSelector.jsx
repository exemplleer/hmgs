import ruFlag from './svg/ru-flag.svg';
import enFlag from './svg/en-flag.svg';

import { useTranslation } from 'react-i18next';
import './styles.css';

const availableLanguages = [
  { key: 'ru', title: 'Russian', small: 'RU', flagSrc: ruFlag },
  { key: 'en', title: 'English', small: 'EN', flagSrc: enFlag },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  return (
    <div className="language-selector">
      {availableLanguages.map((language) => {
        return (
          <button
            className="language-selector__btn"
            onClick={() => i18n.changeLanguage(language.key)}
            key={language.key}
          >
            <span
              className="language-selector__name"
              style={{
                textDecoration:
                  i18n.resolvedLanguage === language.key ? 'underline' : 'none',
              }}
            >
              {language.small}
            </span>
            <img className="language-selector__img" src={language.flagSrc} />
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;
