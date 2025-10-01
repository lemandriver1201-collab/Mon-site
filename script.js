// script.js - gère le menu, langue et Google Autocomplete + distance calc
// --- UI: drawer hamburger ---
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('hamburger');
  const drawer = document.getElementById('drawer');
  burger.addEventListener('click', ()=> {
    const open = drawer.style.display === 'block';
    drawer.style.display = open ? 'none' : 'block';
    drawer.setAttribute('aria-hidden', open ? 'true' : 'false');
  });
  // second hamburger on contact page
  const burger2 = document.getElementById('hamburger2');
  if (burger2){
    const drawer2 = document.getElementById('drawer2');
    burger2.addEventListener('click', ()=> drawer2.style.display = drawer2.style.display === 'block' ? 'none' : 'block');
  }

  // smooth scroll for links with data-scroll
  document.querySelectorAll('[data-scroll]').forEach(a=> a.addEventListener('click', (e)=>{
    e.preventDefault();
    const href = a.getAttribute('href');
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    drawer.style.display='none';
  }));

  // language toggle (switch simple texts)
  document.querySelectorAll('.lang').forEach(btn=> btn.addEventListener('click', ()=>{
    document.querySelectorAll('.lang').forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    const lang = btn.dataset.lang;
    applyLang(lang);
  }));

  // set year
  const y = new Date().getFullYear();
  const yf = document.getElementById('year'); if (yf) yf.textContent = y;

}); // DOMContentLoaded

// --- simple translations (only hero text + title) ---
function applyLang(lang){
  const texts = {
    fr: {title:'Driver Léman', tagline: 'Idéalement situé en plein cœur de Genève, laissez-vous transporter par notre flotte de véhicules haut de gamme. Que ce soit pour trajets d’affaires, transferts aéroport ou déplacements vers la montagne — discrétion, ponctualité et professionnalisme sont nos maîtres mots.'},
    en: {title:'Driver Léman', tagline: 'Located in the heart of Geneva, let us transfer you with our fleet of premium vehicles. For business trips, airport transfers or mountain journeys — discretion, punctuality and professionalism are at the core of our service.'},
    de: {title:'Driver Léman', tagline: 'Im Herzen von Genf gelegen, bringen wir Sie mit unserer Flotte hochwertiger Fahrzeuge komfortabel ans Ziel. Geschäftsreisen, Flughafentransfers oder Bergfahrten — Diskretion, Pünktlichkeit und Professionalität stehen bei uns im Mittelpunkt.'}
  };
  const t = texts[lang] || texts.fr;
  const title = document.getElementById('title'); const tagline = document.getElementById('tagline');
  if (title) title.textContent = t.title;
  if (tagline) tagline.textContent = t.tagline;
}

// --- Google Maps Autocomplete and Distance calculation ---
let pickupAC, dropoffAC, pickupPlace, dropoffPlace;
function initAutocomplete(){
  const pickupInput = document.getElementById('pickup');
  const dropoffInput = document.getElementById('dropoff');
  if (!window.google || !google.maps || !google.maps.places){ alert('Google Maps API non disponible'); return; }
  pickupAC = new google.maps.places.Autocomplete(pickupInput, {types:['geocode']});
  dropoffAC = new google.maps.places.Autocomplete(dropoffInput, {types:['geocode']});
  pickupAC.addListener('place_changed', ()=> pickupPlace = pickupAC.getPlace());
  dropoffAC.addListener('place_changed', ()=> dropoffPlace = dropoffAC.getPlace());

  document.getElementById('calc-btn').addEventListener('click', onCalculate);
  document.getElementById('reset-btn').addEventListener('click', onReset);
}

// reset
function onReset(){
  document.getElementById('booking-form').reset();
  pickupPlace = null; dropoffPlace = null;
  document.getElementById('result').hidden = true;
}

// tariffs & calculate distance using DistanceMatrixService
function applyTariff(distanceKm, vehicle) {
  if (distanceKm <= 20) {
    if (vehicle === 'economy') return 70;
    if (vehicle === 'van') return 90;
    if (vehicle === 'luxe') return 100;
  } else if (distanceKm <= 40) {
    if (vehicle === 'economy') return 90;
    if (vehicle === 'van') return 110;
    if (vehicle === 'luxe') return 130;
  } else {
    if (vehicle === 'economy') return +(distanceKm * 2.5).toFixed(2);
    if (vehicle === 'van') return +(distanceKm * 3.0).toFixed(2);
    if (vehicle === 'luxe') return +(distanceKm * 4.0).toFixed(2);
  }
  return null;
}

function onCalculate(){
  if (!pickupPlace || !pickupPlace.geometry || !dropoffPlace || !dropoffPlace.geometry){
    alert('Veuillez sélectionner des adresses valides dans les suggestions.');
    return;
  }
  const pLat = pickupPlace.geometry.location.lat();
  const pLng = pickupPlace.geometry.location.lng();
  const dLat = dropoffPlace.geometry.location.lat();
  const dLng = dropoffPlace.geometry.location.lng();

  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix({
    origins:[{lat:pLat,lng:pLng}],
    destinations:[{lat:dLat,lng:dLng}],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.METRIC
  }, (response, status)=>{
    if (status !== 'OK'){ alert('Erreur Google Maps API : ' + status); return; }
    const el = response.rows[0].elements[0];
    if (el.status !== 'OK'){ alert('Distance non disponible entre ces adresses.'); return; }
    const distanceKm = el.distance.value/1000;
    const pass = Number(document.getElementById('passengers').value);
    let vehicle = 'economy';
    if (pass <= 4) vehicle = 'economy';
    else if (pass <= 7) vehicle = 'van';
    else vehicle = 'luxe';
    const price = applyTariff(distanceKm, vehicle);
    document.getElementById('distance-text').textContent = `Distance estimée (route) : ${distanceKm.toFixed(2)} km`;
    document.getElementById('price-text').textContent = `Prix estimé : ${price} CHF (${vehicle})`;
    document.getElementById('result').hidden = false;
  });
}
