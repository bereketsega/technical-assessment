import express from 'express';
import { QuestsDB } from '../../database/QuestsDB.js';
import { HeroesDB } from '../../database/HeroesDB.js';
import { Quest } from '../../types/Quest.js';

/**
 * Returns the Quests Module express router
 *
 * @returns {express.Router} The quests module express router
 */
export function questsRouter() {
    const router = express.Router();

    /**
     * Gets Quests with specified Hero id
     *
     */
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

    /**
     * Creates a new Quest in Quests database
     *
     */
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

    /**
     * Updates a Quest with heroId and questId in Quests database
     *
     */
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

    /**
     * Deletes a Quest with heroId and QuestId in Quests database
     *
     */
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

    return router;
}
