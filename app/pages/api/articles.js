export const db = [{
  slug: 'LaFerrari',
  title: 'LaFerrari',
  message: 'LaFerrari (project name, F150) is a limited production hybrid sports car built by Italian automotive manufacturer Ferrari. LaFerrari means "The Ferrari" in Italian and some other Romance languages, in the sense that it is the "definitive" Ferrari.',
  image: '../laferrari.jpeg'
}, {
  slug: 'F40',
  title: 'F40',
  message: 'F40 is a sports car produced by Italian automobile manufacturer Ferrari from 1987 to 1992 as the successor to the Ferrari 288 GTO. It was designed by Leonardo Fioravanti and was the last Ferrari automobile personally approved by Enzo Ferrari.',
  image: '../f40.jpg'
}, {
  slug: 'Monza SP2',
  title: 'Monza SP2',
  message: 'The Monza SP1 and SP2 are limited production sports cars produced by Italian automobile manufacturer Ferrari, introduced in 2018 for the 2019 model year. The cars mark the start of a new lineage of models called "Icona" by the manufacturer, drawing inspiration from the most iconic Ferrari models of the 1950s.',
  image: '../monza.jpg'
}]

export default function handler(req, res) {
  res.status(200).json(db)
}
