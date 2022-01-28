#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Who Wants To Be A React Millionaire?');

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.green('HOW TO PLAY')}
    I am a process on your computer.
    I you get any question wrong, I will be ${chalk.red('Killed')}
    So get all of the questions right...
  `);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player';
    }
  });

  playerName = answer.player_name;
}

async function askQuestion1() {
  const answer = await inquirer.prompt({
    name: 'question1',
    type: 'list',
    message: 'What is React',
    choices: [
      'A library to find and fix problems in your JavaScript code.',
      'A UI Framework that provides the thinnest possible Virtual DOM abstraction on top of the DOM',
      'A JavaScript library for building user interfaces',
      'The most popular front-end framework'
    ]
  });

  return processAnswer(answer.question1 == 'A JavaScript library for building user interfaces');
}

async function askQuestion2() {
  const answer = await inquirer.prompt({
    name: 'question2',
    type: 'list',
    message: 'What dependencies are required to run React?',
    choices: [
      'react',
      'react && react-dom',
      'react && react-scripts',
      'react && react-dom && react-scripts'
    ]
  });

  return processAnswer(answer.question2 == 'react && react-dom');
}

async function askQuestion3() {
  const answer = await inquirer.prompt({
    name: 'question3',
    type: 'list',
    message: 'True or False. React code can only be executed from a .jsx file.',
    choices: ['True', 'False']
  });

  return processAnswer(answer.question3 == 'False');
}

async function askQuestion4() {
  const answer = await inquirer.prompt({
    name: 'question4',
    type: 'input',
    message: 'In what version of React were Hooks introduced?',

    validate: async (input) => {
      if (input?.trim() === '') {
        return 'Please enter a value.';
      }
      return true;
    }
  });

  return processAnswer(answer.question4 == '16.8.0' || answer.question4 == '16.8');
}

async function askQuestion5() {
  const answer = await inquirer.prompt({
    name: 'question5',
    type: 'checkbox',
    message: 'What new features were release in React v17.0?',
    choices: [
      'Added Support for new JSX Transform',
      'Error Boundaries',
      'Portals',
      'Fragments',
      'None'
    ],

    validate: async (input) => {
      if (input.length === 0) {
        return 'Please select at least one option.';
      }
      return true;
    }
  });

  return processAnswer(answer.question5.length === 1 && answer.question5.includes('None'));
}

async function askQuestion6() {
  const answer = await inquirer.prompt({
    name: 'question6',
    type: 'list',
    message: 'What does the acronym JSX stand for?',
    choices: [
      'JavaScript Syntax',
      'JavaScript XML',
      'JavaScript Syntax Extension',
      'Java Serialization to XML'
    ]
  });

  return processAnswer(
    answer.question6 == 'JavaScript Syntax Extension' || answer.question6 == 'JavaScript XML'
  );
}

async function processAnswer(isCorrect) {
  const spinner = createSpinner('Checking Answer...');
  spinner.start();
  await sleep(1000);

  if (isCorrect) {
    spinner.success({ text: `Nice Work, ${playerName}!` });
  } else {
    spinner.error({ text: `GAME OVER, ${playerName} :(` });
    process.exit(1);
  }
}

async function winner() {
  console.clear();

  figlet(`Congrats , ${playerName} !\nR 1 , 0 0 0 , 0 0 0`, async (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

// Node.js allows top-level await
await welcome();
await askName();
await askQuestion1();
await askQuestion2();
await askQuestion3();
await askQuestion4();
await askQuestion5();
await askQuestion6();
await winner();
