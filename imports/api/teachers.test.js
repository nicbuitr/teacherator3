/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { chai } from 'meteor/practicalmeteor:chai';
import { Teachers } from './teachers.js';

//if (Meteor.isServer) {
    describe('Teachers Module', function () {
        let teachers = [];
        describe('performs CRUD on mongodb', function () {
            it('inserts and removes a teacher', function () {
                // This code will be executed by the test driver when the app is started
                // in the correct mode
                Teachers.insert({                
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
                chai.assert(teachers.length === 1, 'Failed to add teacher');
                
                Teachers.remove(teachers[0]._id);
                teachers = Teachers.find().fetch();
                chai.assert(teachers.length === 0, 'Failed to remove teacher');
            });
            it('adds and remove a review to the teacher', function () {
                // This code will be executed by the test driver when the app is started
                // in the correct mode
                Teachers.insert({                
                    profile_pic_url: 'xavier.png',
                    name: 'Charles Francis Xavier (Professor X)',
                    copyright: 'http://marvel.com/universe/Professor_X',
                    avg_review: 3,
                    occupation: 'Mutant rights activist, geneticist, teacher, formerly adventurer, soldier',
                    studies: [
                        {
                            title: 'Ph.D in Genetics'
                        }
                    ],
                    classes_given: [
                        {
                            name: 'Genetics 101'
                        }
                    ],
                    reviews: []
                });
                teachers = Teachers.find().fetch();
                chai.assert(teachers.length === 1, 'Failed to add teacher');
                

                teachers[0]._id = new Meteor.Collection.ObjectID(teachers[0]._id),
                Meteor.call('teachers.addReview', teachers[0],
                {criterias: [{selection: 0, description: 'Desc1'},{selection: 0, description: 'Desc2'},{selection: 0, description: 'Desc3'},{selection: 0, description: 'Desc4'},{selection: 0, description: 'Desc5'}], totalScore: 5, comments: 'Add review Unit Test', createdAt: new Date()});
                teachers = Teachers.find().fetch();
                chai.assert(teachers[0].reviews.length === 1, 'Failed to add review');

                Meteor.call('teachers.deleteReview', teachers[0],
                {criterias: [{selection: 0, description: 'Desc1'},{selection: 0, description: 'Desc2'},{selection: 0, description: 'Desc3'},{selection: 0, description: 'Desc4'},{selection: 0, description: 'Desc5'}], totalScore: 5, comments: 'Add review Unit Test', createdAt: new Date()});
                teachers = Teachers.find().fetch();
                chai.assert(teachers[0].reviews.length === 0, 'Failed to remove review');

                Teachers.remove(teachers[0]);
                teachers = Teachers.find().fetch();
                chai.assert(teachers.length === 0, 'Failed to remove teacher');
            });
        });
    });
//}