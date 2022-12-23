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

**Date: Fri Dec 23 - 15:07:30 EST**\
**Task Type:** Bug fix\
**Task Completed:** Fixed getQuestsByHeroId function.\
**Description:** getQuestsByHeroId function in [QuestDB](../backend/src/database/HeroesDB.js) would only get the first quest that matched with the hero id. But, I wanted to get all quests matching with heroId. I did some searches and came across [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) documentation, which returns an array of elements that match the specified condition.
