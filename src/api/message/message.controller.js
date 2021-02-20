import { keys } from '../../../config/watson.config'

import _ from 'lodash';

let MessageModel = require('./message.model')
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3')

const tone_analyzer = new ToneAnalyzerV3({
  iam_apikey: keys.apikey,
  url: keys.url,
  version: '2017-09-21',
});

export function send(req, res) {
  const io = req.sockets;
    console.log(req.body)
    if (req.body.message) {
      const toneParams = {
        tone_input: { 'text': req.body.message },
        content_type: 'application/json',
      };
       tone_analyzer.tone(toneParams)
        .then(toneAnalysis => {
          const result = toneAnalysis;
          let dominantTone = [];
          if (result.document_tone.tones) {
            dominantTone = _.maxBy(result.document_tone.tones, 'score');
          }
          let msg = new MessageModel({
            message: req.body.message,
            time: new Date(),
            tone: dominantTone && dominantTone.tone_name ? dominantTone.tone_name : '',
            sent_from: req.body.user,
          });
          msg.save()
            .then(doc => {
              io.sockets.emit('get_msg', doc);
  
              res.sendStatus(200)
            })
            .catch(err => {
              console.error(err)
            });
       })
    .catch(err => {
      console.log('error:', err);
    });
    }
    
      
}

export function getAll(req, res) {
  MessageModel.find()
       .then(doc => {
         res.json(doc)
       })
       .catch(err => {
         console.error(err)
       })
}

export default {
    getAll,
    send,
}