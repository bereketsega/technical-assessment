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

    // TODO: Task 3

    // TODO: Task 4

    return router;
}
