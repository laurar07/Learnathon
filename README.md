# Learnathon

This mobile app created with React Native is your perfect mobile companion for learning on the go. Learning a new language? Have a test tomorrow? Need a quick reference guide for your topic? With Learnathon, you can create flashcards that you can use to test your knowledge whenever, wherever. Start by entering your topic, and any number of questions/answers, and you will be able to start a quiz right away. To keep your knowledge fresh, the app will remind you to take at least one quiz every day. Keep on learning!

To get you started, we have included a few decks on React, React Native, Redux, as well as some languages.

## How to run

This app works on both Android and iOS devices and simulators.
You will need to have installed [npm](https://www.npmjs.com/) in your machine.
1. Clone this repository and navigate to the root folder of the app
2. Run 'npm install' to download all the packages needed
3. Run 'npm start' to start up the application. 

#### To run the app on an Android or iOS device:
You will need to have Expo installed ([Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS App Store](https://itunes.com/apps/exponent)). Once installed, you can scan the QR code in the terminal to download the app. 
#### To run the app on an iOS simulator:
You will have to have [Xcode](https://developer.apple.com/xcode/downloads/) installed. Once you have a simulator installed, type 'i' in the terminal to load the app in the simulator. 
#### To run the app on an Android simulator:
You will have to have [Genymotion](https://www.genymotion.com/fun-zone/) installed. Follow the installation guide [here](https://docs.genymotion.com/Content/01_Get_Started/Installation.htm). Once you've installed Genymotion, create a simulator (e.g. Nexus 6) and type 'a' in the terminal to load the app in the simulator.

For more information on Expo and loading this app in a device or simulator, click [here](https://docs.expo.io/versions/latest/introduction/installation.html).


## List of Decks

The landing page contains a list of your decks with the card count of each:
<img width="379" alt="decks" src="https://user-images.githubusercontent.com/1109471/33359467-bc1cde02-d483-11e7-9006-8e92c51451ca.png">

## Deck Details

You can get more details on a specific deck by tapping on it from the list of decks:
<img width="376" alt="deckview" src="https://user-images.githubusercontent.com/1109471/33359479-cf8e5fba-d483-11e7-85dc-a2f0e0033b3b.png">

## Add Deck

You can add a new deck by clicking on the 'Add Deck' tab:
<img width="375" alt="adddeck" src="https://user-images.githubusercontent.com/1109471/33359436-9e5437bc-d483-11e7-85ac-602d8c57cb84.png">

## Add Card

You can also add a card to an existing deck from the Deck Details view:
<img width="376" alt="addcard" src="https://user-images.githubusercontent.com/1109471/33359400-7269b136-d483-11e7-9657-0bdbd99d6363.png">

## Quiz

You can start a quiz on an existing deck from the Deck Details view. You will be presented with the flashcards for that topic, and initially the answer will be hidden behind 'Show Answer':
<img width="374" alt="quizfront" src="https://user-images.githubusercontent.com/1109471/33359512-f888eaac-d483-11e7-8d4e-7ac76978b10f.png"> 

Once you are ready to see the answer, you can tap on 'Show Answer', which will reveal the correct answer to the question. You can then mark yourself as 'Correct' or 'Incorrect' to move on to the next question:
<img width="376" alt="quizback" src="https://user-images.githubusercontent.com/1109471/33359494-e4e62244-d483-11e7-909f-5077efaa4d87.png">

## Results

Once you have gone through all the questions in a deck, you will be given the final score, which includes a tailored message that reflects your performance. Here are a few examples:

<img width="375" alt="results_welldone" src="https://user-images.githubusercontent.com/1109471/33359530-17081af2-d484-11e7-9cf6-789e4e8afb1d.png">
<img width="377" alt="results_excellent" src="https://user-images.githubusercontent.com/1109471/33359524-0bada640-d484-11e7-8bdd-091808480925.png">
