const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

function handleCatch(err, errMsg='Error! (Maybe you have specified the wrong id?)') {
  return {
      error: true,
      errMsg,
      err
  }
}

async function handleUserCreationOrUpdate(github_username, techs, latitude, longitude) {
  const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
                                 .then(res => res)
                                 .catch(err => { return { error: true, err } });

  if (apiResponse.error) {
    return apiResponse.err.response;
  }

  const { name = login, avatar_url, bio } = apiResponse.data;

  const techsArray = parseStringAsArray(techs);

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude],
  }

  return {
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location,
  }
}

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      devInfo = await handleUserCreationOrUpdate(github_username, techs, latitude, longitude);
      if (devInfo.status === 404) {
        return res.json(devInfo.statusText);
      }

      dev = await Dev.create(devInfo);

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        parseStringAsArray(techs),
      );
    
      sendMessage(sendSocketMessageTo, 'new-dev', dev);

      return res.json(dev);
    }

    return res.send('Usuário já cadastrado!');
  },
  async show(req, res) {
    const dev = await Dev.findById(req.params.id)
                         .then(res => res)
                         .catch(err => handleCatch(err));

    return res.json(dev);
  },
  async update(req, res) {
    const dev = await Dev.findById(req.params.id)
                         .then(res => res)
                         .catch(err => handleCatch(err));

    if (dev.error) {
      return res.json(dev);
    }

    const { github_username, techs, latitude, longitude } = req.body;

    devInfo = await handleUserCreationOrUpdate(github_username, techs, latitude, longitude);
    if (devInfo.status === 404) {
      return res.json(devInfo.statusText);
    }

    const updatedDev = await Dev.findByIdAndUpdate(req.params.id, devInfo, {
      new: true,
      useFindAndModify: false,
    });

    return res.json(updatedDev);
  },
  async destroy(req, res) {
    const { id } = req.params;

    const dev = await Dev.findByIdAndRemove(id, {
      useFindAndModify: false,
    }).then(res => { return { message: `ID ${id} removed with success` } })
      .catch(err => handleCatch(err));

    return res.json(dev);
  }
}
