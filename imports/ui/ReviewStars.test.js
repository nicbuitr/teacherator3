/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import ReviewStars from './ReviewStars.jsx';

if (Meteor.isClient) {
    describe('<ReviewStars>', function () {
        const wrapper = shallow(<ReviewStars 
                teacher={
                {
                    _id: new Meteor.Collection.ObjectID(),            
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
                }} section="teacher_list" stars={3} size='sm' />);
        it('should have a div with class \'rating-stars\'', function () {   
            chai.expect(wrapper.find('.rating-stars')).to.have.length(1);
        });
        it('should have a div with class \'empty-stars\'', function () {
            chai.expect(wrapper.find('.empty-stars')).to.have.length(1);
        });
        it('should have a div with class \'filled-stars\'', function () {
            chai.expect(wrapper.find('.filled-stars')).to.have.length(1);
        });

        it('should have a button to delete the review', function () {
            chai.assert(wrapper.find('span').length > 0);
        });

        it('should have props to render Teacher Stars', function () {
            chai.expect(wrapper.props().renderTeacherStars).to.be.defined;
        });
    });
}