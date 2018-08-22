import React from 'react';
import UI from 'components/UI';

import topBar from 'resources/images/general/top_bar.png';
import back_arrow from 'resources/images/buttons/buttonIcons/back_arrow.png';
import menu from 'resources/images/buttons/buttonIcons/menu.png';
//import search from 'resources/images/buttons/buttonIcons/search.png';
import floppy from 'resources/images/buttons/buttonIcons/floppy.png';
import edit from 'resources/images/buttons/buttonIcons/edit.png';

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
    const viewingProject = this.store.projects.viewingProject;
    const projectEndDate = new Date(viewingProject.endDate);
    const today = new Date();

    var leftOnClick, rightOnClick, leftIcon, rightIcon, title;

    leftOnClick = ()=>{ this.actions.content.pullView(); }
    rightOnClick = this.none;
    rightOnClick = ()=>{ this.actions.modal.errorMessage(['No effect!', '沒有效果!']); }

    leftIcon = back_arrow;

    if(view === 'studentHome' ||  view === 'teacherHome'){
      leftOnClick = this.actions.content.toggleMenu;
      leftIcon = menu;
      //rightIcon = search;
      title = ['HOME','主頁'];
    }else{
      switch (view) {
        case 'account':
          title = ['ACCOUNT','帳號資訊'];
          break;
        case 'profile':
          title = ['PROFILE','個人檔案'];
          break;
        case 'forceProfile':
          title = ['WELCOME!','歡迎!'];
          leftOnClick = this.none;
          leftIcon = null;
          break;
        case 'setting':
          title = ['SETTING','設定'];
          break;
        case 'credit':
          title = ['CREDIT','鳴謝'];
          break;
        case 'addCourse':
          title = ['ADD COURSE','創建班別'];
          break;
        case 'joinCourse':
          title = ['JOIN COURSE', '加入班別'];
          break;
        case 'course':
          title = ['COURSE', '班別'];
          if(user.type === 'teacher' && this.store.content.subView === 'courseDetail'){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editCourse');
            }
          }
          break;
        case 'addProject':
          title = ['ADD PROJECT', '創建專題研習'];
          break;
        case 'project':
          title = ['PROJECT', '專題研習'];
          if(user.type === 'teacher' && this.store.content.subView === 'projectDetail'){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.content.pushView('editProject');
            }
          }
          break;
        case 'addCard':
          title = ['ADD CARD', '製作卡片'];
          break;
        case 'viewCards':
          title = ['VIEW CARDS', '檢視卡片'];
          if(viewingCard.author === user._id && viewingCard.grade === 'notGraded' && projectEndDate > today){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.langs.setEditLangs([]);
              this.actions.content.pushView('editCard');
            }
          }else if(viewingCard.author === user._id && viewingCard.grade === 'failed' && projectEndDate > today){
            rightIcon = edit;
            rightOnClick = ()=>{
              this.actions.main.setPhoto({url: null, blob: null});
              this.actions.langs.setEditLangs([]);
              this.actions.content.pushView('resubmitCard');
            }
          }
          break;
        case 'gradingCards':
          title = ['GRADING CARDS', '評核卡片'];
          rightIcon = floppy;
          rightOnClick = this.saveGradeCard.bind(this)
          break;
        case 'editCourse':
          title = ['EDIT COURSE', '修改班別'];
          break;
        case 'editProject':
          title = ['EDIT PROJECT', '修改專題研習'];
          break;
        case 'editCard':
          title = ['EDIT CARD', '修改卡片'];
          break;
        case 'resubmitCard':
          title = ['RESUBMIT CARD', '重新提交卡片'];
          break;
        default:
          title = ['','']
          break;
      }
    }
    this.setState({
      leftNav: ()=>{ return this.buttons.nav(leftIcon, ()=>{ leftOnClick() })},
      rightNav: ()=>{ return this.buttons.nav(rightIcon, ()=>{ rightOnClick() })},
      titleArea: ()=>{ return this.titleArea(this.func.multiLang(title[0], title[1]));},
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
