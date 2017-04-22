/* eslint-env mocha */

import { Meteor } from 'meteor/meteor';
import { shallow } from 'enzyme';
import { chai } from 'meteor/practicalmeteor:chai';
import App from './App.jsx';
import TeacherReviews from './TeacherReviews.jsx';
import ReviewStars from './ReviewStars.jsx';

if (Meteor.isClient) {
    describe('<App>', function () {
/*        it('should have an input to type names', function () {
            const wrapper = shallow(<App/>);
            chai.assert(wrapper.find('input').length == 1);
        });

        it('should have an image for the logo', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.find('img')).to.have.length(1);
        });*/

        it('should have props for constructor', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().constructor).to.be.defined;
        });
        it('should have props for componentDidMount', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().componentDidMount).to.be.defined;
        });
        it('should have props for componentDidUpdate', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().componentDidUpdate).to.be.defined;
        });
        it('should have props for handleClick', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().handleClick).to.be.defined;
        });
        it('should have props for handleKeyDown', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().handleKeyDown).to.be.defined;
        });
        it('should have props for toggleHideCompleted', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().toggleHideCompleted).to.be.defined;
        });
        it('should have props for renderTeachers', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().renderTeachers).to.be.defined;
        });
        it('should have props for render', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.props().render).to.be.defined;
        });


/*      it('contains a <ReviewStars/> component', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.find(ReviewStars)).to.have.length(1);
        });
        it('contains a <TeacherReviews/> component', function () {
            const wrapper = shallow(<App/>);
            chai.expect(wrapper.find(TeacherReviews)).to.have.length(1);
        });*/
    });
}