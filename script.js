const translations = {
  fr: {
    title: "Votre chauffeur privé haut de gamme à Genève",
    subtitle: "Discrétion, ponctualité et professionnalisme pour tous vos trajets",
    reservation: "Réservation",
    pickup: "Lieu de prise en charge",
    dropoff: "Destination",
    passengers: "Passagers",
    datetime: "Date et heure",
    book: "Réserver",
    airport: "Transferts aéroport",
    airport_desc: "Un chauffeur vous attend avec une pancarte pour un voyage sans stress.",
    private: "Transferts privés & professionnels",
    private_desc: "Des trajets élégants et confortables adaptés à vos besoins.",
    dispo: "Mise à disposition",
    dispo_desc: "Contactez-nous via WhatsApp pour un devis personnalisé.",
    mountain: "Transferts montagne",
    mountain_desc: "Des véhicules spacieux pour 8 passagers, valises et skis inclus.",
    about_title: "À propos de nous",
    about_desc: "Nous proposons un service de chauffeur privé haut de gamme à Genève.",
    contact_title: "Contactez-nous",
    name: "Nom",
    firstname: "Prénom",
    phone: "Téléphone",
    email: "Email",
    message: "Votre message",
    send: "Envoyer"
  },
  en: {
    title: "Your premium private driver in Geneva",
    subtitle: "Discretion, punctuality and professionalism for all your trips",
    reservation: "Booking",
    pickup: "Pickup location",
    dropoff: "Dropoff location",
    passengers: "Passengers",
    datetime: "Date & time",
    book: "Book",
    airport: "Airport transfers",
    airport_desc: "A driver awaits you with a sign for a stress-free journey.",
    private: "Private & business transfers",
    private_desc: "Elegant and comfortable rides tailored to your needs.",
    dispo: "On-demand service",
    dispo_desc: "Contact us via WhatsApp for a personalized quote.",
    mountain: "Mountain transfers",
    mountain_desc: "Spacious vehicles for 8 passengers, luggage and skis included.",
    about_title: "About us",
    about_desc: "We provide a premium chauffeur service in Geneva.",
    contact_title: "Contact us",
    name: "Last name",
    firstname: "First name",
    phone: "Phone",
    email: "Email",
    message: "Your message",
    send: "Send"
  },
  de: {
    title: "Ihr Premium-Privatfahrer in Genf",
    subtitle: "Diskretion, Pünktlichkeit und Professionalität für alle Ihre Fahrten",
    reservation: "Buchung",
    pickup: "Abholort",
    dropoff: "Zielort",
    passengers: "Passagiere",
    datetime: "Datum & Uhrzeit",
    book: "Buchen",
    airport: "Flughafentransfers",
    airport_desc: "Ein Fahrer erwartet Sie mit einem Schild für eine stressfreie Reise.",
    private: "Private & geschäftliche Transfers",
    private_desc: "Elegante und komfortable Fahrten, angepasst an Ihre Bedürfnisse.",
    dispo: "Bereitstellung",
    dispo_desc: "Kontaktieren Sie uns über WhatsApp für ein persönliches Angebot.",
    mountain: "Bergtransfers",
    mountain_desc: "Geräumige Fahrzeuge für 8 Passagiere, Gepäck und Skier inklusive.",
    about_title: "Über uns",
    about_desc: "Wir bieten einen Premium-Chauffeurservice in Genf.",
    contact_title: "Kontaktieren Sie uns",
    name: "Nachname",
    firstname: "Vorname",
    phone: "Telefon",
    email: "E-Mail",
    message: "Ihre Nachricht",
    send: "Senden"
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
      if (el.placeholder) el.placeholder = translations[lang][key];
    }
  });
}
