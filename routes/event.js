const router = require('express').Router();
const User = require('../models/user.model');
const slackService = require('../services/slack');
const Todo = require('../models/todo.model');

router.post('/', async (req, res) => {
  console.log('incoming');

  if (req.body.challenge) {
    res.send(req.body.challenge);
  } else {
    const userId = req.body.event.user;

    const currentUser = await User.findOne({
      userSlackId: userId
    });

    const event = req.body.event;
    if (currentUser && !event.bot_id) {
      if (event.type === 'message') {
        if (event.text === 'Show') {
          const todos = await Todo.find({ userId: currentUser._id });
          const formattedTodos = todos.map((todo, index) => `${index+1}. ${todo.note} ${todo.isCompleted?':large_green_circle:': ':red_circle:'}`).reduce((acc, curr) => {
            return acc + '\n' + curr;
          }, '');

          await slackService.sendMessage(currentUser, event.channel, formattedTodos);
        } else {
          await slackService.sendMessage(currentUser, event.channel, 'Hey there!\nYou can use Marbles to store your notes, maintain a todo list and what not.\n Anytime to wish to add a note to marbles, just mention @Marbles in the note. \n Also make sure the app is part of the channel. \n If you wish to see your notes, write - \`Show\` \n This will show a list of all your messages');
        }
      } else if (event.type === 'app_mention') {
        const processedText = event.text.replace(`<@${currentUser.botUserId}>`, '').trim();

        const newTodo = new Todo({
          userId: currentUser._id,
          note: processedText
        });

        await newTodo.save();

        await slackService.sendMessage(currentUser, event.channel, 'Your note is saved!');
      }      
    } else {
      console.log('Some other bot is spamming / you are spamming yourself');      
    }


    res.json({
      ok: true
    });
  }
});


module.exports = router;