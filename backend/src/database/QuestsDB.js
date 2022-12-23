import { Quest } from '../types/Quest.js';

/**
 * Defines Quests database
 */
export class QuestsDB {
    static instance = undefined;
    quests = []; // Database array

    /**
     * Gets an instance of the quest database
     *
     * @returns {QuestsDB} An instance of QuestDb
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new QuestsDB();
        }
        return this.instance;
    }

    /**
     * Gets all the quests in the database
     *
     * @returns {Quest[]} An array of quests
     */
    getQuests() {
        return this.quests;
    }

    /**
     * Gets a quest with specified id
     *
     * @param {string} id The id of the quest to be returned
     * @returns {Quest} A quest with the specified id
     */
    getQuest(id) {
        return this.quests.find((quest) => quest.id === id);
    }

    /**
     * Gets all quests in the database with specified heroId
     *
     * @param {string} heroId The id of quest's hero
     * @returns Array of quests with specified heroId
     */
    getQuestsByHeroId(heroId) {
        return this.quests.find((quest) => quest.heroId === heroId);
    }

    /**
     * Adds a quest to the database
     *
     * @param {Quest} quest The quest to be added to the database
     */
    createQuest(quest) {
        this.quests.push(quest);
    }

    /**
     * Updates a quest by id in the database
     *
     * @param {string} id The id of the quest to be updated
     * @param {Partial<Quest>} questUpdates A partial quest object
     */
    updateQuest(id, questUpdates) {
        const quest = this.getQuest(id);
        this.deleteQuest(id);
        quest.updateQuest(questUpdates);
        this.createQuest(quest);
    }

    /**
     * Deletes a quest by id the database
     *
     * @param {string} id The id of the quest to be deleted
     */
    deleteQuest(id) {
        const index = this.quests.findIndex((quest) => quest.id === id);
        if (index >= 0) {
            this.quests.splice(index, 1);
        }
    }
}
