import { v4 as uuid } from "uuid";

/**
 * Defines Quest type
 */
export class Quest {
    /**
     * Creates a new quest object
     *
     * @param {*} args An object containing quest properties
     */
    constructor(args) {
        this.id = uuid();
        this.name = args.name || "Default Quest Name";
        this.description = args.description || "Default Quest Description";
        this.id = args.id;
    }

    /**
     * Updates the quest with new update values
     *
     * @param {Partial<Quest>} args The partial quest object
     */
    updateQuest(args) {
        if (args.name) {
            this.name = args.name;
        }
        if (args.description) {
            this.description = args.description;
        }
    }
}
