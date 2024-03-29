const { Router } = require('express');
const axios = require('axios');
const { Character, Occupation } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
  const apiUrl = await axios.get('https://breakingbadapi.com/api/characters');
  const apiInfo = await apiUrl.data.map(el => {
    return {
      id: el.char_id,
      name: el.name,      //aquí se puede unificar datos, ya que al "name:" le podemos asignar como querramos
      birthday: el.birthday,
      occupation: el.occupation.map(el => el),
      img: el.img,
      status: el.status,
      nickname: el.nickname,
      appearance: el.appearance.map(el => el)
    }
  });
  return apiInfo;
}
const getDbInfo = async () => {
  return await Character.findAll({
    include: {
      model: Occupation,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })
};

const getAllCharacter = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
}
router.get('/characters', async (req, res) => {
  const name = req.query.name;
  let charactersTotal = await getAllCharacter();
  // includes(name) --> name es lo que le paso por el query
  //el.name.toLowerCase() es la parte de la api walter y .includes(name.toLowerCase()) es para comparar como una busqueda más global.
  if (name) {
    let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    characterName.length ? res.status(200).send(characterName) : res.status(404).send('No está el personaje');
  } else {
    res.status(200).send(charactersTotal)
  }
});

router.get('/occupations', async (req, res) => {
  const occupationsApi = await axios.get('https://breakingbadapi.com/api/characters');
  const occupations = occupationsApi.data.map(el => el.occupation);
  const occEach = occupations.map(el => {
    for (let i = 0; i < el.length; i++) return el[i]
  });
  console.error(occEach);
  occEach.forEach(element => {
    Occupation.findOrCreate({
      where: { name: element }
    })
  });
  const allOccupations = await Occupation.findAll();
  res.send(allOccupations);
})

router.post('/characters', async (req, res) => {
  let {
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb,
    occupation
  } = req.body;
  
  let characterCreated = await Character.create({
    name,
    nickname,
    birthday,
    img,
    status,
    createdInDb
  })
  let occupationDb = await Occupation.findAll({ where: { name: occupation } })
  characterCreated.addOccupation(occupationDb); //addOccupation el add es un método de sequelize add + nombre de la tabla entidad.
  res.send('Personaje creado con éxito')
});

router.get('/characters/:id', async (req, res)=>{
const id = req.params.id; //esto es lo mismo: const { id } = req.params
let charactersTotal = await getAllCharacter();
if(id){
  let characterId = await charactersTotal.filter(el => el.id == id)
  characterId.length ? res.status(200).json(characterId) : res.status(404).send('No encontré ese personaje');
}
});

module.exports = router;