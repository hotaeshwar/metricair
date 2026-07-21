import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translationRules = {
  'en-US': [
    [/\bneighbourhoods\b/gi, (m) => m[0] === 'N' ? 'Neighborhoods' : 'neighborhoods'],
    [/\bneighbourhood\b/gi, (m) => m[0] === 'N' ? 'Neighborhood' : 'neighborhood'],
    [/\blabour\b/gi, (m) => m[0] === 'L' ? 'Labor' : 'labor'],
    [/\blicences\b/gi, (m) => m[0] === 'L' ? 'Licenses' : 'licenses'],
    [/\blicence\b/gi, (m) => m[0] === 'L' ? 'License' : 'license'],
    [/\bcentre\b/gi, (m) => m[0] === 'C' ? 'Center' : 'center'],
    [/\bcentres\b/gi, (m) => m[0] === 'C' ? 'Centers' : 'centers'],
    [/\bcolour\b/gi, (m) => m[0] === 'C' ? 'Color' : 'color'],
    [/\bcolours\b/gi, (m) => m[0] === 'C' ? 'Colors' : 'colors'],
    [/\bdefence\b/gi, (m) => m[0] === 'D' ? 'Defense' : 'defense'],
    [/\bspecialising\b/gi, (m) => m[0] === 'S' ? 'Specializing' : 'specializing'],
    [/\bspecialised\b/gi, (m) => m[0] === 'S' ? 'Specialized' : 'specialized'],
    [/\bspecialisation\b/gi, (m) => m[0] === 'S' ? 'Specialization' : 'specialization'],
    [/\bprogramme\b/gi, (m) => m[0] === 'P' ? 'Program' : 'program'],
    [/\bprogrammes\b/gi, (m) => m[0] === 'P' ? 'Programs' : 'programs'],
    [/\bauthorised\b/gi, (m) => m[0] === 'A' ? 'Authorized' : 'authorized']
  ],
  'en-CA': [
    [/\bneighborhoods\b/gi, (m) => m[0] === 'N' ? 'Neighbourhoods' : 'neighbourhoods'],
    [/\bneighborhood\b/gi, (m) => m[0] === 'N' ? 'Neighbourhood' : 'neighbourhood'],
    [/\blabor\b/gi, (m) => m[0] === 'L' ? 'Labour' : 'labour'],
    [/\blicenses\b/gi, (m) => m[0] === 'L' ? 'Licences' : 'licences'],
    [/\blicense\b/gi, (m) => m[0] === 'L' ? 'Licence' : 'licence'],
    [/\bcenter\b/gi, (m) => m[0] === 'C' ? 'Centre' : 'centre'],
    [/\bcenters\b/gi, (m) => m[0] === 'C' ? 'Centres' : 'centres'],
    [/\bcolor\b/gi, (m) => m[0] === 'C' ? 'Colour' : 'colour'],
    [/\bcolors\b/gi, (m) => m[0] === 'C' ? 'Colours' : 'colours'],
    [/\bdefense\b/gi, (m) => m[0] === 'D' ? 'Defence' : 'defence'],
    [/\bspecialising\b/gi, (m) => m[0] === 'S' ? 'Specializing' : 'specializing'],
    [/\bspecialised\b/gi, (m) => m[0] === 'S' ? 'Specialized' : 'specialized'],
    [/\bspecialisation\b/gi, (m) => m[0] === 'S' ? 'Specialization' : 'specialization'],
    [/\bprogramme\b/gi, (m) => m[0] === 'P' ? 'Program' : 'program'],
    [/\bprogrammes\b/gi, (m) => m[0] === 'P' ? 'Programs' : 'programs'],
    [/\bauthorised\b/gi, (m) => m[0] === 'A' ? 'Authorized' : 'authorized']
  ],
  'en-GB': [
    [/\bneighborhoods\b/gi, (m) => m[0] === 'N' ? 'Neighbourhoods' : 'neighbourhoods'],
    [/\bneighborhood\b/gi, (m) => m[0] === 'N' ? 'Neighbourhood' : 'neighbourhood'],
    [/\blabor\b/gi, (m) => m[0] === 'L' ? 'Labour' : 'labour'],
    [/\blicenses\b/gi, (m) => m[0] === 'L' ? 'Licences' : 'licences'],
    [/\blicense\b/gi, (m) => m[0] === 'L' ? 'Licence' : 'licence'],
    [/\bcenter\b/gi, (m) => m[0] === 'C' ? 'Centre' : 'centre'],
    [/\bcenters\b/gi, (m) => m[0] === 'C' ? 'Centres' : 'centres'],
    [/\bcolor\b/gi, (m) => m[0] === 'C' ? 'Colour' : 'colour'],
    [/\bcolors\b/gi, (m) => m[0] === 'C' ? 'Colours' : 'colours'],
    [/\bdefense\b/gi, (m) => m[0] === 'D' ? 'Defence' : 'defence'],
    [/\bspecializing\b/gi, (m) => m[0] === 'S' ? 'Specialising' : 'specialising'],
    [/\bspecialized\b/gi, (m) => m[0] === 'S' ? 'Specialised' : 'specialised'],
    [/\bspecialization\b/gi, (m) => m[0] === 'S' ? 'Specialisation' : 'specialisation'],
    [/\bprogram\b/gi, (m) => m[0] === 'P' ? 'Programme' : 'programme'],
    [/\bprograms\b/gi, (m) => m[0] === 'P' ? 'Programmes' : 'programmes'],
    [/\bauthorized\b/gi, (m) => m[0] === 'A' ? 'Authorised' : 'authorised']
  ]
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('metricair_lang') || 'en-CA';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('metricair_lang', lang);
  };

  // Run DOM-level spelling replace whenever language changes
  useEffect(() => {
    const rules = translationRules[language] || [];
    if (rules.length === 0) return;

    const translateText = (text) => {
      if (!text || typeof text !== 'string') return text;
      let result = text;
      for (const [regex, replacer] of rules) {
        result = result.replace(regex, replacer);
      }
      return result;
    };

    const processNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const val = node.nodeValue;
        const newVal = translateText(val);
        if (val !== newVal) {
          observer.disconnect();
          node.nodeValue = newVal;
          observer.observe(document.body, observerConfig);
        }
      } else {
        const skipTags = ['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'NOSCRIPT'];
        if (!skipTags.includes(node.nodeName)) {
          for (let child = node.firstChild; child; child = child.nextSibling) {
            processNode(child);
          }
        }
      }
    };

    const observerConfig = { childList: true, subtree: true, characterData: true };
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') {
          processNode(mutation.target);
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => processNode(node));
        }
      }
    });

    // Translate initially
    processNode(document.body);

    // Observe body
    observer.observe(document.body, observerConfig);

    return () => observer.disconnect();
  }, [language]);

  // Fallback direct translation helper
  const t = (text) => {
    if (!text || typeof text !== 'string') return text;
    const rules = translationRules[language] || [];
    let result = text;
    for (const [regex, replacer] of rules) {
      result = result.replace(regex, replacer);
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
