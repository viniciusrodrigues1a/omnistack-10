const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      
      const { name = login, avatar_url, bio } = apiResponse.data;
    
      const techsArray = parseStringAsArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    
      return res.json(dev);
    }

    return res.send('Usuário já cadastrado!');
  },
  async show(req, res) {
    const dev = await Dev.findById(req.params.id)
                         .then(res => res)
                         .catch(err => {
                           return {
                             error: true,
                             errMsg: 'Couldn\'t find specified id.',
                             err
                           }
                         });

    return res.json(dev);
  }
}
