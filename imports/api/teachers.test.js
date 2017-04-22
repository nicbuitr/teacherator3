/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import { Teachers } from './teachers.js';

if (Meteor.isServer) {
    describe('Teachers Module', function () {
        let teachers = [];
        describe('Performs CRUD on mongodb', function () {
            it('Inserts a teacher', function () {
                // This code will be executed by the test driver when the app is started
                // in the correct mode
                Teachers.insert({
                    _id: new Meteor.Collection.ObjectID(),            
                    profile_pic_url: 'xavier.png',
                    name: 'Charles Francis Xavier (Professor X)',
                    copyright: 'http://marvel.com/universe/Professor_X',
                    avg_review: 3,
                    occupation: 'Mutant rights activist, geneticist, teacher, formerly adventurer, soldier',
                    studies: [
                        {
                            title: 'Ph.D in Genetics'
                        },
                        {
                            title: 'Ph.D in Biophysics'
                        },
                        {
                            title: 'Ph.D in Psychology'
                        },
                        {
                            title: 'Ph.D in Anthropology'
                        },
                        {
                            title: 'M.D. in Psychiatry'
                        }
                    ],
                    classes_given: [
                        {
                            name: 'Genetics 101'
                        },
                        {
                            name: 'Introduction to Biophysics'
                        },
                        {
                            name: 'Psychology of the Gifted'
                        },
                        {
                            name: 'Anthropology Basics'
                        },
                        {
                            name: 'Psychiatry for the Ill Minded'
                        }
                    ],
                    reviews: []
                });
                teachers = Teachers.find().fetch();
                chai.assert(teachers.length == 1, 'Failed to add teacher');
                
            });
            it('Adds a review to the teacher', function () {
                // This code will be executed by the test driver when the app is started
                // in the correct mode             
                
                Meteor.call('teachers.addReview', teachers[0],
                {criterias: [{selection: 0, description: 'Desc1'},{selection: 0, description: 'Desc2'},{selection: 0, description: 'Desc3'},{selection: 0, description: 'Desc4'},{selection: 0, description: 'Desc5'}], totalScore: 5, comments: 'Add review Unit Test', createdAt: new Date()});
                teachers = Teachers.find().fetch();
                chai.assert(teachers[0].reviews.length == 1, 'Failed to add review');

            });
            it('Removes the review from the teacher', function () {
                Meteor.call('teachers.deleteReview', teachers[0],
                {criterias: [{selection: 0, description: 'Desc1'},{selection: 0, description: 'Desc2'},{selection: 0, description: 'Desc3'},{selection: 0, description: 'Desc4'},{selection: 0, description: 'Desc5'}], totalScore: 5, comments: 'Add review Unit Test', createdAt: new Date()});
                teachers = Teachers.find().fetch();
                chai.assert(teachers[0].reviews.length == 0, 'Failed to remove review');
            });
            it('Removes the teacher', function () {
                Teachers.remove(teachers[0]._id);
                teachers = Teachers.find().fetch();
                chai.assert(teachers.length == 0, 'Failed to remove teacher');
            });
        });
    });
}