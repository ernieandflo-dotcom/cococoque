# Coco Case — Site Web

Site statique pour le service de personnalisation de coques de téléphone, hébergé sur GitHub Pages.

---

## Structure de fichiers

```
/
├── index.html          ← Page principale (balisage uniquement)
├── css/
│   └── styles.css      ← Tous les styles (variables, composants, animations)
├── js/
│   ├── data.js         ← Données : modèles de téléphones, tarifs, presets
│   └── customizer.js   ← Toute la logique interactive
└── assets/
    ├── images/         ← Logo, og-image, favicon, photos de produit
    └── fonts/          ← Polices auto-hébergées (optionnel — Google Fonts utilisé par défaut)
```

---

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Ajouter / retirer un modèle de téléphone | `js/data.js` → `PHONE_MODELS` |
| Changer les prix | `js/data.js` → `PRICING_TIERS` |
| Modifier les dégradés proposés | `js/data.js` → `GRADIENT_PRESETS` |
| Changer les couleurs du site | `css/styles.css` → `:root` (variables CSS) |
| Modifier le texte / contenu | `index.html` |
| Ajouter une animation | `css/styles.css` (keyframes en bas du fichier) |
| Modifier la logique du customiseur | `js/customizer.js` |

---

## Déploiement sur GitHub Pages

1. Crée un dépôt GitHub (ex. `cococase`)
2. Pousse tous les fichiers à la racine **ou** dans un dossier `/docs`
3. Dans **Settings → Pages**, sélectionne la branche `main` et le dossier `/ (root)`
4. Ton site sera disponible à `https://ton-username.github.io/cococase/`

> Aucun build tool requis — HTML/CSS/JS natif, 100% statique.

---

## Prochaines étapes suggérées

- [ ] Remplacer le favicon et l'og-image dans `/assets/images/`
- [ ] Intégrer un formulaire de commande (Formspree, Netlify Forms, ou Google Forms embed)
- [ ] Ajouter une page `/contact` ou une modale de commande
- [ ] Connecter Google Analytics ou Plausible pour le suivi
- [ ] Ajouter la page Option B (vente de coques) quand prête
