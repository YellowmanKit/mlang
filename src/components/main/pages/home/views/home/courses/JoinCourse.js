import React from 'react';
import View from 'components/main/pages/home/views/View';

class JoinCourse extends View {

  render() {
    return(
      <div style={this.viewStyle()}>
        {this.gap('4%')}

        {this.subTitle(['Course Code','班別代碼'])}
        {this.sep()}
        {this.inputs.inputField('code','text', '', '')}
        {this.gap('2%')}

        {this.buttons.rectGreen(['Confirm','確定'], ()=>{this.joinCourse()})}
      </div>
    )
  }

  joinCourse(){
    const app = this.props.app;
    const actions = app.actions;

    const _code = document.getElementById('code').value;
    if(_code === ''){
      return this.failedMessage(['Failed to join! Code is missing!', '操作失敗! 未填入班別代碼!'])
    }
    const joinedCourses = app.store.courses.joinedCourses;
    for(var i=0;i<joinedCourses.length;i++){
      if(joinedCourses[i].code === _code){
        return this.failedMessage(['You already joined this course!', '此班別已經加入!'])
      }
    }

    actions.courses.joinCourse({
      userId: app.store.user._id,
      code: _code
    });
  }
}

export default JoinCourse;
