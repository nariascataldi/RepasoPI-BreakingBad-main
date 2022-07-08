const { Router } = require('express');
const axios = require('axios');
const {Character, Occupation} = require('../db')
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
//aquí no sé si es necesario el async, ya que ya esta cargado.
const getAllCharacter = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
}
router.get('/characters', async (req, res) => {
  const name = req.query.name ;
  let charactersTotal = await getAllCharacter();
  // el includes(name). name es lo que le paso por el query
    if(name){
      let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); 
      characterName.length ? res.status(200).send(characterName) : res.status(404).send('No está el personaje');
    } else {
      res.status(200).send(charactersTotal)
    }
});
module.exports = router;
