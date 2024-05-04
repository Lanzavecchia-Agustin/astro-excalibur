# 🚀 CODEXCODE ASTRO STARTER

![Agency Aestro Template Page](/src/static/images/preview.webp)
[<img src="/src/static/images/link-live.png">](https://www.codexcode.store/)
[<img src="/src/static/images/link-contact.png">](https://www.codexcode.store/pages/contact)

## ⚠️ How to keep good performance?

If you make some changes (for example image) - make sure image is saved as .WEBP & its small! - avoid large images, because performance will drop!
use https://tinypng.com/ to reduce you'r images

## 🚀 Static Media

There are 3 folders

-   fonts
-   images
-   icons

every of those folders have index.ts where you can find import / export files + for images and icons, we create special components

# 💻 Sitemap & robots.tsx & SEO

## ⚠️ IMPORTANT ⚠️

Change links & add all your pages into sitemap.cjs to have better SEO optimization!

search for ⚠️ CHANGEME ⚠️ in files & replace all instances

Seo: search for "YOUR META DESCRIPTION FOR SEO" and change this with your meta description of page - you can change it for all websites

## 📞 Contact Form

For contact form you need to replace those ID with the correct one.
API: https://emailjs.com
Other solution: If you want to add other solution, then change axios request with other solution - should work

```
    service_id: "service_ID",
    template_id: "template_TEMPLATE_ID",
    user_id: "USER_ID",
```

## 🖼️ Images

Images can be stored in static/images and use it with srcLocal (typescript will give you types),
also Image component can be display with "custom" link - use src instead of scrLocal:

```
  <Image src="logo" alt="logo" width="50px" height="50px" />
```

To register new image check the images object and add image there

## 🎨 Icons

icons are stored in static/icons and use it with iconData (typescript will give you types)

```
  <Icon iconData="home" alt="home" />
```

To register new icon check the icons object and add icon there

Use those components for media to keep best performance or in astro files use images from astro - also good!

## 🚀 Styles

All global styles like, colors, fonts, normalize or things like mediaQuery are stored in styles folder,

MediaQuery can be used with MIN & MAX OR BETWEEN - that means code will display depends on what we need to do:

```
    @returns @media example: (min-width: 768px)
    ${MediaQuery.min(breakpoint)} {
        //code
    }
```

```
    @returns @media example: (min-width: 768px)
    ${MediaQuery.max(breakpoint)} {
        //code
    }
```

```
    @returns @media example: (min-width: 768px) and (max-width: 991px)
    ${MediaQuery.between("breakpoint1", "breakpoint2")} {
        //code
    }
```

## 🚀 Theme colors

All colors are used as css var to have easier access in app

## 🧞 Commands

#### All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📞🧞 Contact & Support

If you bought our theme, you get 100% our support!
have any problems or questions, please let us know here: [Contact Form](https://www.codexcode.store/pages/contact)

## 🧞 Authors

-   [@codexcode](https://www.codexcode.pl)
