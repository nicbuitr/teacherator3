/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import TeacherInfo from './TeacherInfo.jsx';
import ReviewStars from './ReviewStars.jsx';

if (Meteor.isClient) {
    describe('<TeacherInfo>', function () {
        const wrapper = shallow(<TeacherInfo teacher={
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
        }}/>);
        it('should have a div with class \'teacher-profile-img inline-img-responsive\'', function () {
            chai.expect(wrapper.find('.teacher-profile-img .inline-img-responsive')).to.have.length(1);
        });

        it('should have a profile picture', function () {
            chai.expect(wrapper.find('img')).to.have.length(1);
        });

        it('contains a <ReviewStars/> component', function () {
            chai.expect(wrapper.find(ReviewStars)).to.have.length(1);
        });
    });
}