import { supertestSetup } from '../../test/SupertestSetup';

const request = supertestSetup(undefined);

let heroId = '';
let questId = '';
let unusedHeroId = '';

describe('Quests Module', () => {
    beforeAll(async () => {
        // Get a hero id to use for getting/updating/deleting
        await request.post('/heroes').send({
            name: 'Teach',
            class: 'Thaumaturge',
            level: 25,
        });
        await request.post('/heroes').send({
            name: 'Fiona',
            class: 'Signifier',
            level: 56,
        });
        let res = await request.get('/heroes');
        heroId = res.body[0].id;
        unusedHeroId = res.body[1].id;

        // Get quest id to use for updating and deleting
        await request.post(`/heroes/${heroId}/quests`).send({
            name: 'Going Beyond Power',
            description: "Teach's  Quest: Going Beyond Power",
        });
        res = await request.get(`/heroes/${heroId}/quests`);
        questId = res.body[0].id;
    });

    /**
     * Test: Getting Quest with specified Hero ID route.
     *
     */
    describe('GET /heroes/:id/quests', () => {
        it('should return a 200 for a found hero', (done) => {
            request.get(`/heroes/${heroId}/quests`).expect(200, done);
        });
        it('should return a 404 for not found hero', (done) => {
            request.get('/heroes/abc/quests').expect(404, done);
        });
    });

    /**
     * Test: Creating a new Quest in Quests database
     *
     */
    describe('POST /heroes/:id/quests', () => {
        it('should return a 201 for complete quest', (done) => {
            request
                .post(`/heroes/${heroId}/quests`)
                .send({
                    name: 'Where the Heart Is',
                    description: "Zeon's Quest: Where the Heart Is",
                })
                .expect(201, done);
        });
        it('should return a 404 for not found hero', (done) => {
            request
                .post(`/heroes/123/quests`)
                .send({
                    name: 'The Kind Right Hand',
                    description: "Valdi's Quest: The Kind Right Hand",
                })
                .expect(404, done);
        });
    });

    /**
     * Test: Updating a Quest in Quests database
     *
     */
    describe('PATCH /heroes/:heroId/quests/:questId', () => {
        it('should return a 204 for correct updating of  quest', (done) => {
            request
                .patch(`/heroes/${heroId}/quests/${questId}`)
                .send({
                    description: "Commander Ashera's Quest: The Wrath of Ashera",
                })
                .expect(204, done);
        });
        it('should return a 404 for not found hero', (done) => {
            request
                .patch(`/heroes/123/quests/${questId}`)
                .send({
                    description: "Juniper's Quest: Natural Selection",
                })
                .expect(404, done);
        });
        it('should return a 404 for not found quest', (done) => {
            request
                .patch(`/heroes/${heroId}/quests/123`)
                .send({
                    description: "Juniper's Quest: Natural Selection",
                })
                .expect(404, done);
        });
        it("should return a 400 for heroId does not match the Quest's heroId", (done) => {
            request
                .patch(`/heroes/${unusedHeroId}/quests/${questId}`)
                .send({
                    description: "Fiona's Quest: Transparent Dreams",
                })
                .expect(400, done);
        });
    });

    /**
     * Test: Deleting  a Quest in Quests database
     *
     */
    describe('DELETE /heroes/:heroId/quests/:questId', () => {
        it("should return a 400 for heroId does not match the Quest's heroId", (done) => {
            request.delete(`/heroes/${unusedHeroId}/quests/${questId}`).expect(400, done);
        });
        it('should return a 404 for not found hero', (done) => {
            request.delete(`/heroes/123/quests/${questId}`).expect(404, done);
        });
        it('should return a 204 for correct deletion of a  quest', (done) => {
            request.delete(`/heroes/${heroId}/quests/${questId}`).expect(204, done);
        });
        it('should return a 404 for not found quest', (done) => {
            request.delete(`/heroes/${heroId}/quests/${questId}`).expect(404, done);
        });
    });
});
