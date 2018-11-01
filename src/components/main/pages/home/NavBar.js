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
import copy from 'resources/images/buttons/buttonIcons/copy.png';

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

  navBack(){
    this.actions.switches.setAnimation('row', false);
    this.actions.content.pullView();
  }

  initNavBar(newProp){
    const view = this.store.content.view;
    const subView = this.store.content.subView;
    const user = this.store.user;
    const viewingCard = this.store.cards.viewingCard;
    //const viewingProject = this.store.projects.viewingProject;
    const viewingCourse = this.store.courses.viewingCourse;

    var leftOnClick, rightOnClick, leftIcon, rightIcon, title;

    leftOnClick = ()=>{ this.navBack(); }
    rightOnClick = ()=>{};
    //rightOnClick = ()=>{ this.actions.modal.message(['No effect!', '沒有效果!', '没有效果!']); }

    leftIcon = back_arrow;

    /*if(view === 'account' ||  view === 'profile' ||  view === 'credit'){
      leftOnClick = ()=>{ this.actions.content.pullView(); this.actions.content.toggleMenu(); }
    }*/

    if(view.includes('Home')){
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
        case 'forceAccount':
          title = ['WELCOME!','歡迎!','欢迎!'];
          leftOnClick = ()=>{};
          leftIcon = null;
          break;
        case 'profile':
          title = ['PROFILE','個人檔案','个人档案'];
          break;
        case 'forceProfile':
          title = ['WELCOME!','歡迎!','欢迎!'];
          leftOnClick = ()=>{};
          leftIcon = null;
          break;
        case 'setting':
          title = ['SETTING','設定','设定'];
          break;
        case 'credit':
          title = ['CREDIT','鳴謝','鸣谢'];
          break;
        case 'addCourse':
          title = ['ADD CLASS','創建班別','创建班别'];
          break;
        case 'joinCourse':
          title = ['JOIN CLASS', '加入班別','加入班别'];
          break;
        case 'course':
          title = ['CLASS', '班別','班别'];
          if(user.type === 'teacher' && subView === 'courseDetail' && !this.inSchool){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editCourse');
            }
          }
          if(user.type === 'teacher' && subView === 'courseSubjects' && !this.func.outDated(viewingCourse.endDate)){
            rightIcon = add;
            rightOnClick = ()=>{this.actions.content.pushView('addSubject')}
          }
          if(user.type === 'student' && subView === 'courseDetail'){
            rightIcon = exit;
            rightOnClick = ()=>{
              this.actions.modal.confirm(['Confirm to lease class?','確定退出班別?','确定退出班别?'], ()=>{
              this.actions.courses.leaveCourse({
                userId: this.store.user._id,
                code: this.store.courses.viewingCourse.code
              }); })
            }
          }
          break;
        case 'addSubject':
          title = ['ADD UNIT', '創建單元','创建单元'];
          rightIcon = copy;
          rightOnClick = ()=>{this.actions.main.setPrefabPicker('subjects');}
          break;
        case 'subject':
          title = ['UNIT', '單元','单元'];
          if(!this.inSchool && user.type === 'teacher' && subView === 'subjectProjects' && !this.func.outDated(viewingCourse.endDate)){
            rightIcon = add;
            rightOnClick = ()=>{this.actions.content.pushView('addProject')}
          }
          if(!this.inSchool && user.type === 'teacher' && subView === 'subjectDetail'){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editSubject');
            }
          }
          break;
        case 'addProject':
          title = ['ADD PROJECT', '創建專題研習','创建专题研习'];
          rightIcon = copy;
          rightOnClick = ()=>{this.actions.main.setPrefabPicker('projects');}
          break;
        case 'project':
          title = ['PROJECT', '專題研習','专题研习'];
          if(!this.inSchool && user.type === 'teacher' && subView === 'projectDetail'){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editProject');
            }
          }
          if(!this.inSchool && subView === 'projectGroup'){
            rightOnClick = ()=>{ this.actions.user.login(user.id, user.pw); }
            rightIcon = rotate;
          }
          /*if(user.type === 'teacher' && subView === 'projectFeatured' && !this.func.outDated(viewingProject.endDate)){
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
          title = ['EDIT CLASS', '修改班別','修改班别'];
          break;
        case 'editSubject':
          title = ['EDIT UNIT', '修改單元','修改单元'];
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
          title = ['STUDENT(UNIT)', '學生(單元)','学生(单元)'];
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
          if(user.type === 'admin' && subView === 'schoolDetail' && this.store.schools.viewingSchool.admin === this.store.user._id){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editSchool');
            }
          }
          if(user.type !== 'developer' && user.type !== 'admin' && subView === 'schoolDetail'){
            rightIcon = exit;
            rightOnClick = ()=>{
              this.actions.modal.confirm(['Confirm to lease school?','確定退出學校?','确定退出学校?'], ()=>{
              this.actions.schools.leaveSchool({
                userId: this.store.user._id,
                code: this.store.schools.viewingSchool.code
              }); })
            }
          }
          break;
        case 'teacher':
          title = ['TEACHER', '老師','老师'];
          break;
        case 'admin':
          title = ['ADMIN', '管理員','管理员'];
          break;
        case 'addAdmin':
          title = ['ADD ADMIN', '增加管理員','增加管理员'];
          break;
        case 'group':
          title = ['PROJECT - GROUP', '專題研習 - 小組','专题研习 - 小组'];
          rightOnClick = ()=>{ this.actions.user.login(user.id, user.pw); }
          rightIcon = rotate;
          break;
        default:
          title = ['','']
          break;
      }
    }
    if(this.store.courses.viewingCourse.mlanghku){
      rightIcon = null;
      rightOnClick = ()=>{};
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
      <div style={navBarStyle} onClick={()=>{ console.log(this.store); }}>
        {this.state.leftNav()}
        {this.state.titleArea()}
        {this.state.rightNav()}
      </div>
    )
  }

  saveGradeCard(){
    const project = this.store.projects.viewingProject;
    const studentProject = this.store.studentProjects.viewingStudentProject;
    const gradingCards = this.store.cards.gradingCards[studentProject._id];
    this.actions.cards.saveGradingCards(project._id, studentProject._id, gradingCards);
  }


}

export default NavBar;
