# Devlogs

This document contains a record of the progress I made on the assessment. It details the tasks I have completed, issues I encountered, and decisions I made during the development process.

**Date: Thu Dec 22, 2022 - 23:20:17 EST**\
**Task Type:** Documentation & Task Planning\
**Task Completed:** Read the assessment instructions and initialized my development environment.\
**Description:** I read the assessment instructions, criteria, tasks, and requirements. I decided to attempt 4 backend tasks. Downloaded all requirements needed to get started with the assessment. Forked the repository and started with the devlog documentation.

**Date: Fri Dec 23, 2022 - 08:31:08 EST**\
**Task Type:** Progress Report\
**Task Completed:** Implemented Quest type.\
**Description:** I created [Quest](../backend/src/types/Quest.js) class in types to define a Quest object attributes and behaviors. I used [Hero](../backend/src/types/Hero.js) class as an example.

**Date: Fri Dec 23, 2022 - 10:37:28 EST**\
**Task Type:** Progress Report\
**Task Completed:** Implemented Quest database.\
**Description:** I implemented [QuestsDB](../backend/src/database/QuestsDB.js) in databases folder to define a Quest database functionalities. I added necessary functions to do CRUD operations. I used [HeroesDB](../backend/src/database/HeroesDB.js) class as an example.

**Date: Fri Dec 23, 2022 - 13:37:28 EST**\
**Task Type:** Bug fix\
**Task Completed:** Fixed duplicated id in Quest type.\
**Description:** When I started testing _GET_ quests by hero id route on _Postman_, it wouldn't return quests even though a quest was added with specified hero Id. The issue was Quest class did not have heroId variable. Therefore heroId data was lost at creation of a quest. I fixed the issue by adding heroId variable to [Quest.js](../backend/src/types/Quest.js) to store the hero id value.

**Date: Fri Dec 23, 2022 - 15:07:30 EST**\
**Task Type:** Bug fix\
**Task Completed:** Fixed getQuestsByHeroId function.\
**Description:** getQuestsByHeroId function in [QuestDB](../backend/src/database/QuestsDB.js) would only get the first quest that matched with the hero id. But, I wanted to get all quests matching with heroId. I did some searches and came across [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) documentation, which returns an array of elements that match the specified condition.

**Date: Fri Dec 23, 2022 - 16:06:50 EST**\
**Task Type:** [Backend Task 1](https://github.com/Cyber4All/technical-assessment/blob/main/backend/README.md#task-1---getting-quests-for-a-hero)\
**Task Completed:** Implemented Get a Quest for a Hero route.\
**Description:** I created a _GET_ request with hero id parameter which gets quests for specified hero id or sends _Hero was not found for given ID_ if the hero id does not exist in heroes database.\
**Code:**

```javascript
router.get('/heroes/:id/quests', (req, res) => {
    const heroID = req.params.id;
    const hero = HeroesDB.getInstance().getHero(heroID);
    if (!hero) {
        res.status(404).send('Hero was not found for given ID');
    } else {
        const quests = QuestsDB.getInstance().getQuestsByHeroId(heroID);
        res.status(200).send(quests);
    }
});
```

&nbsp;

**Date: Fri Dec 23, 2022 - 16:36:50 EST**\
**Task Type:** [Backend Task 2](https://github.com/Cyber4All/technical-assessment/blob/main/backend/README.md#task-2---creating-a-quest)\
**Task Completed:** Implemented Create a Quest route.\
**Description:** Implemented a _POST_ request which creates a new quests with properties specified in the body and params and inserts it quests database. I tested the responses of task 1 and task 2 with _Postman_ and both routes work as intended.\
**Code:**

```javascript
router.post('/heroes/:id/quests', (req, res) => {
    const heroId = req.params.id;
    const hero = HeroesDB.getInstance().getHero(heroId);
    if (!hero) {
        res.status(404).send('Hero was not found for given ID');
    } else {
        const body = req.body;
        body.heroId = heroId;
        const quest = new Quest(body);
        QuestsDB.getInstance().createQuest(quest);
        res.status(201).send('Quest was added to the database');
    }
});
```

&nbsp;

**Date: Sat Dec 24, 2022 - 06:30:08 EST**\
**Task Type:** [Backend Task 3](https://github.com/Cyber4All/technical-assessment/tree/main/backend#task-3---updating-a-quest)\
**Task Completed:** Implemented Update a Quest route.\
**Description:** Implemented a _PATCH_ request which updates the description of a quest with specified heroID and questId. I used update heroes route in [hero-module](../backend/src/modules/hero-module/router.js) to guide me. I tested the three possible status outcomes, _400_, _404_ and _200_, with _POSTMAN_ and the responses match with my expectation.\
**Code:**

```javascript
router.patch('/heroes/:heroId/quests/:questId', (req, res) => {
    const heroId = req.params.heroId;
    const hero = HeroesDB.getInstance().getHero(heroId);

    const questId = req.params.questId;
    const quest = QuestsDB.getInstance().getQuest(questId);

    const body = req.body;

    if (!(hero && quest)) {
        res.status(404).send('Hero or Quest was not found for given IDs');
    } else if (quest.heroId !== heroId) {
        res.status(400).send("Route heroId does not match the Quest's heroId in database");
    } else {
        QuestsDB.getInstance().updateQuest(questId, body);
        res.sendStatus(204);
    }
});
```

&nbsp;

**Date: Sat Dec 24, 2022 - 11:50:11 EST**\
**Task Type:** [Backend Task 4](https://github.com/Cyber4All/technical-assessment/tree/main/backend#task-4---deleting-a-quest)\
**Task Completed:** Implemented Delete a Quest route.\
**Description:** Implemented a _DELETE_ request which deletes a quest with specified heroID and questId. I used delete hero route in [hero-module](../backend/src/modules/hero-module/router.js) to guide me. I tested the three possible status outcomes, _400_, _404_ and _200_, with _POSTMAN_ and the responses match with my expectation.\
**Code:**

```javascript
router.delete('/heroes/:heroId/quests/:questId', (req, res) => {
    const heroId = req.params.heroId;
    const hero = HeroesDB.getInstance().getHero(heroId);

    const questId = req.params.questId;
    const quest = QuestsDB.getInstance().getQuest(questId);

    if (!(hero && quest)) {
        res.status(404).send('Hero or Quest was not found for given IDs');
    } else if (quest.heroId !== heroId) {
        res.status(400).send("Route heroId does not match the Quest's heroId in database");
    } else {
        QuestsDB.getInstance().deleteQuest(questId);
        res.sendStatus(204);
    }
});
```

**Plan:** My next plan is to implement unit test with [jest](https://jestjs.io/). Prior to this, I was not familiar with jest, so I will take some time to research, understand the [hero-module](./../backend/src/modules/hero-module/Heroes.spec.js) test code, and read the documentations.
