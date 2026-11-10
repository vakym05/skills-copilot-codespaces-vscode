# Complexe Mundi — nouveau site

Refonte de [complexemundi.com](https://www.complexemundi.com/) en **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4**.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # version de production
```

## Structure

| Chemin | Rôle |
| --- | --- |
| `src/lib/site.ts` | **Tout le contenu** : coordonnées, chambres et tarifs, horaires, photos. C'est le seul fichier à modifier pour mettre à jour un prix, un horaire ou un numéro. |
| `src/app/` | Les pages : accueil, `chambres`, `restauration`, `evenements`, `bien-etre`, `a-propos`, `contact`, `reservation`. |
| `src/components/` | Composants (explorateur du domaine, frise horaire, comparatif, galerie, formulaires…). |
| `public/images/` | Photos reprises du site actuel, redimensionnées et compressées. |

## Ce qui change par rapport à l'ancien site

- **Explorateur du domaine** (accueil) : cinq envies — séjourner, savourer, réunir, se ressourcer, performer — à la place du carrousel.
- **« Une journée au Mundi »** : tous les services sur une frise de 24 h, avec l'heure locale du complexe et l'état ouvert / fermé en direct.
- **Comparatif des chambres** équipement par équipement, galerie photo plein écran.
- **Réservation** : dates, catégorie, estimation du montant ; la demande part déjà rédigée par WhatsApp ou par e-mail.
- **Mobile** : barre d'actions fixe Appeler / WhatsApp / Réserver.
- **Performance** : pages statiques, images AVIF/WebP adaptées à l'écran, polices auto-hébergées, carte Google chargée à la demande.
- **Référencement** : métadonnées par page, données structurées `Hotel`, `sitemap.xml`, redirections des anciennes URL (`page1.html` → `/chambres`, etc.).

## Formulaires

Il n'y a pas d'envoi d'e-mail côté serveur : les formulaires ouvrent WhatsApp ou la messagerie du visiteur avec la demande pré-remplie, adressée au service commercial. Pour un envoi direct depuis le site, il faudra ajouter une route d'API avec des identifiants SMTP.

## Déploiement

Le projet se déploie tel quel sur Vercel ou tout hébergement Node (`npm run build`, `npm start`). Répertoire racine du projet : `complexe-mundi/`.
