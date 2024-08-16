import express from 'express';
import bodyParser from 'body-parser';
import aws from 'aws-sdk';
import { writeFile as _writeFile } from 'fs';
import { promisify } from 'util';

const { json } = bodyParser;
const { config, Polly } = aws;
const app = express();
const port = process.env.PORT || 3001;

// Configure AWS SDK
config.update({
  accessKeyId: 'AKIAWX2IF4Y5DYS5PB7H',
  secretAccessKey: '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',
  region: 'us-east-1'
});

const polly = new Polly();

app.use(json());

app.post('/speak', async (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).send('Text is required');
  }

  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Joanna', // You can choose other voices as well
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    const writeFile = promisify(_writeFile);
    await writeFile('output.mp3', data.AudioStream, 'binary');
    res.sendFile(__dirname + '/output.mp3');
  } catch (error) {
    res.status(500).send(error.message);
  }

  res.json({ message: 'Text received', text });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
