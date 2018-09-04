import React from 'react';
import UI from 'components/UI';

import topBar from 'resources/images/general/top_bar.png';
import back_arrow from 'resources/images/buttons/buttonIcons/back_arrow.png';
import menu from 'resources/images/buttons/buttonIcons/menu.png';
//import search from 'resources/images/buttons/buttonIcons/search.png';
import floppy from 'resources/images/buttons/buttonIcons/floppy.png';
import edit from 'resources/images/buttons/buttonIcons/edit.png';
import add from 'resources/images/buttons/buttonIcons/add.png';
import exit from 'resources/images/buttons/buttonIcons/exit.png';
import rotate from 'resources/images/buttons/buttonIcons/rotate.png';

class NavBar extends UI {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    this.init(this.props);
    this.initNavBar(this.props);
  }

  componentWillReceiveProps(newProp){
    this.init(newProp);
    this.initNavBar(newProp);
  }

  initNavBar(newProp){
    const view = this.store.content.view;
    const user = this.store.user;
    const viewingCard = this.store.cards.viewingCard;
    //const viewingProject = this.store.projects.viewingProject;
    const viewingCourse = this.store.courses.viewingCourse;

    var leftOnClick, rightOnClick, leftIcon, rightIcon, title;

    leftOnClick = ()=>{ this.actions.content.pullView(); }
    rightOnClick = this.none;
    //rightOnClick = ()=>{ this.actions.modal.message(['No effect!', '沒有效果!', '没有效果!']); }

    leftIcon = back_arrow;

    if(view === 'studentHome' ||  view === 'teacherHome' ||  view === 'adminHome'){
      leftOnClick = this.actions.content.toggleMenu;
      leftIcon = menu;
      rightOnClick = ()=>{ this.actions.user.login(user.id, user.pw); }
      rightIcon = rotate;
      title = ['HOME','主頁','主页'];
    }else{
      switch (view) {
        case 'account':
          title = ['ACCOUNT','帳號資訊','帐号资讯'];
          break;
        case 'profile':
          title = ['PROFILE','個人檔案','个人档案'];
          break;
        case 'forceProfile':
          title = ['WELCOME!','歡迎!','欢迎!'];
          leftOnClick = this.none;
          leftIcon = null;
          break;
        case 'setting':
          title = ['SETTING','設定','设定'];
          break;
        case 'credit':
          title = ['CREDIT','鳴謝','鸣谢'];
          break;
        case 'addCourse':
          title = ['ADD COURSE','創建班別','创建班别'];
          break;
        case 'joinCourse':
          title = ['JOIN COURSE', '加入班別','加入班别'];
          break;
        case 'course':
          title = ['COURSE', '班別','班别'];
          if(user.type === 'teacher' && this.store.content.subView === 'courseDetail'){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editCourse');
            }
          }
          /*if(user.type === 'teacher' && this.store.content.subView === 'courseProjects' && !this.func.outDated(viewingCourse.endDate)){
            rightIcon = add;
            rightOnClick = ()=>{this.actions.content.pushView('addProject')}
          }*/
          if(user.type === 'teacher' && this.store.content.subView === 'courseSubjects' && !this.func.outDated(viewingCourse.endDate)){
            rightIcon = add;
            rightOnClick = ()=>{this.actions.content.pushView('addSubject')}
          }
          if(user.type === 'student' && this.store.content.subView === 'courseDetail'){
            rightIcon = exit;
            rightOnClick = ()=>{
              this.actions.courses.leaveCourse({
                userId: this.store.user._id,
                code: this.store.courses.viewingCourse.code
              });
            }
          }
          break;
        case 'addSubject':
          title = ['ADD SUBJECT', '創建議題','创建议题'];
          break;
        case 'subject':
          title = ['SUBJECT', '議題','议题'];
          if(user.type === 'teacher' && this.store.content.subView === 'subjectProjects' && !this.func.outDated(viewingCourse.endDate)){
            rightIcon = add;
            rightOnClick = ()=>{this.actions.content.pushView('addProject')}
          }
          break;
        case 'addProject':
          title = ['ADD PROJECT', '創建專題研習','创建专题研习'];
          break;
        case 'project':
          title = ['PROJECT', '專題研習','专题研习'];
          if(user.type === 'teacher' && this.store.content.subView === 'projectDetail'){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editProject');
            }
          }
          /*if(user.type === 'teacher' && this.store.content.subView === 'projectFeatured' && !this.func.outDated(viewingProject.endDate)){
            rightIcon = add;
            rightOnClick = ()=>{this.actions.content.pushView('addCard')}
          }*/
          break;
        case 'addCard':
          title = ['ADD CARD', '製作卡片','制作卡片'];
          break;
        case 'viewCards':
          title = ['VIEW CARDS', '檢視卡片','检视卡片'];
          if(viewingCard.author === user._id && (viewingCard.grade === 'notGraded' || user.type === 'teacher')){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.langs.setEditLangs([]);
              this.actions.content.pushView('editCard');
            }
          }else if(viewingCard.author === user._id && viewingCard.grade === 'failed'){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.langs.setEditLangs([]);
              this.actions.content.pushView('resubmitCard');
            }
          }
          break;
        case 'gradingCards':
          title = ['GRADING CARDS', '評核卡片','评核卡片'];
          rightIcon = floppy;
          rightOnClick = this.saveGradeCard.bind(this)
          break;
        case 'editCourse':
          title = ['EDIT COURSE', '修改班別','修改班别'];
          break;
        case 'editProject':
          title = ['EDIT PROJECT', '修改專題研習','修改专题研习'];
          break;
        case 'editCard':
          title = ['EDIT CARD', '修改卡片','修改卡片'];
          break;
        case 'resubmitCard':
          title = ['RESUBMIT CARD', '重新提交卡片','重新提交卡片'];
          break;
        case 'slideShow':
          title = ['SLIDESHOW', '投影片','投影片'];
          break;
        case 'student':
          title = ['STUDENT', '學生','学生'];
          break;
        case 'studentSubject':
          title = ['STUDENT(SUBJECT)', '學生(議題)','学生(议题)'];
          break;
        case 'studentProject':
          title = ['STUDENT(PROJECT)', '學生(專題研習)','学生(专题研习)'];
          break;
        case 'addSchool':
          title = ['ADD SCHOOL', '創建學校','创建学校'];
          break;
        case 'editSchool':
          title = ['EDIT SCHOOL', '修改學校','修改学校'];
          break;
        case 'joinSchool':
          title = ['JOIN SCHOOL', '加入學校','加入学校'];
          break;
        case 'school':
          title = ['SCHOOL', '學校','学校'];
          if(user.type === 'admin' && this.store.content.subView === 'schoolDetail' && this.store.schools.viewingSchool.admin === this.store.user._id){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editSchool');
            }
          }
          break;
        case 'teacher':
          title = ['TEACHER', '老師','老师'];
          break;
        default:
          title = ['','']
          break;
      }
    }
    this.setState({
      leftNav: ()=>{ return this.buttons.nav(leftIcon, ()=>{ leftOnClick() })},
      rightNav: ()=>{ return this.buttons.nav(rightIcon, ()=>{ rightOnClick() })},
      titleArea: ()=>{ return this.titleArea(this.func.multiLang(title[0], title[1], title[2]));},
      init: true
    });
  }

  titleArea(title){
    const titleAreaStyle = {
      flexGrow: 5,
      textAlign: 'center',
      color: 'white',
      fontSize: this.bs.height * 0.055,
      fontWeight: 'bold'
    }
    return <div style={titleAreaStyle}>{title}</div>
  }

  render() {
    this.init(this.props);
    const view = this.store.content.view;
    if(view === '' || !this.state.init){
      return null;
    }

    const navBarStyle = {
      width: '100%',
      height: this.bs.height * 0.08,
      backgroundImage: 'url(' + topBar + ')',
      backgroundSize: '100% 100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center'
    }
    return(
      <div style={navBarStyle}>
        {this.state.leftNav()}
        {this.state.titleArea()}
        {this.state.rightNav()}
      </div>
    )
  }

  none(){}

  saveGradeCard(){
    const project = this.store.projects.viewingProject;
    const studentProject = this.store.studentProjects.viewingStudentProject;
    const gradingCards = this.store.cards.gradingCards[studentProject._id];
    this.actions.cards.saveGradingCards(project._id, studentProject._id, gradingCards);
  }


}

export default NavBar;
