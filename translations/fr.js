export default {
  formContact: {
    legend: "Et si on discutait ?",
    fields: {
      name: "Je m'appelle",
      mail: "tu peux me contacter à",
      message: "j'aimerais parler de",
    },
    submit: "Envoyer",
  },
  socials: {
    goTo: "Voir mon %label%",
  },
  goToWebsite: {
    fr: "Consulter le site en français",
    en: "Go to website in english",
  },
  nav: {
    work: "Travaux",
    about: "À propos",
    titles: {
      about: 'Consulter la page "À propos"',
      work: 'Consulter la page "Travaux"',
    },
  },
  footer: {
    designBy: `
      Conçu avec <span aria-hidden="true">%emoji%</span>
      <span class="hidden">habileté</span>
      par <strong class="font-500">%name%</strong>
    `,
    codeBy: `
      Développé avec <span aria-hidden="true">%emoji%</span>
      <span class="hidden">amour</span>
      par <strong class="font-500">
        <a title="Aller sur le Github de %name%" href="https://github.com/naomihauret">%name%</a>
      </strong>
    `,
  },
  pages: {
    home: {
      seeMore: "Envie d'en voir plus ?",
      goToProject: "Voir le projet %name%",
    },
    work: {
      projectDuration: '<span class="font-bold">Durée du projet:</span> %duration%',
      projectType: {
        personal: "Projet personnel",
        profesional: "Projet professionnel",
        professional: "Projet professionnel",
        school: "Projet d'école",
        freelance: "Freelance",
      },
      seeMore: {
        title: "Envie d'en voir plus ?",
        paragraph:
          'Vous pouvez <a href="%workUrl%">jeter un oeil à mon travail</a> ou en <a href="%aboutUrl%">apprendre plus sur moi</a>.',
      },
    },
  },
}
